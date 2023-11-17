# Define the base path to the submodules and the status file
$SubmodulesBasePath = "example/src/packages/@devlander"
$StatusFile = "submodule_status.json"

# Function to check if a directory is empty
function Test-IsEmpty {
    param([string]$path)
    return ([System.IO.Directory]::GetFileSystemEntries($path).Count -eq 0)
}

# Function to initialize and update git submodule
function Initialize-Submodule {
    param([string]$path)
    git submodule update --init -- $path
}

# Function to install npm package
function Install-Package {
    param([string]$path)
    Set-Location $path
    Write-Host "Current path for npm install: $(Get-Location)"
    npm install
    Set-Location -LiteralPath $PSScriptRoot
}

# Function to update the JSON status file
function Update-Status {
    param([string]$path)
    $now = Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ"
    
    if (!(Test-Path $StatusFile)) {
        "{}" | Out-File $StatusFile
    }

    $json = Get-Content $StatusFile | Out-String | ConvertFrom-Json

    if ($json.PSObject.Properties.Name -contains $path) {
        $json.$path = $now
    } else {
        $json | Add-Member -Type NoteProperty -Name $path -Value $now -Force
    }

    $json | ConvertTo-Json | Set-Content $StatusFile
}

# Main loop to process each submodule
Get-ChildItem -Path $SubmodulesBasePath -Directory | ForEach-Object {
    $submoduleName = $_.Name
    $fullSubmodulePath = Join-Path $SubmodulesBasePath $submoduleName

    Write-Host "Checking submodule: $submoduleName"

    if (Test-IsEmpty $fullSubmodulePath) {
        Write-Host "Submodule directory is empty. Initializing and updating submodule: $submoduleName"
        Initialize-Submodule $fullSubmodulePath

        Write-Host "Installing submodule: $submoduleName"
        Install-Package $fullSubmodulePath

        Write-Host "Updating status file for submodule: $submoduleName"
        Update-Status $submoduleName
    }
    else {
        $lastUpdate = $null
        if (Test-Path $StatusFile) {
            $json = Get-Content $StatusFile | Out-String | ConvertFrom-Json
            $lastUpdate = $json."$submoduleName"
        }

        $today = (Get-Date).ToString("yyyy-MM-dd")
        if ($lastUpdate -eq $null -or $lastUpdate.Substring(0,10) -ne $today) {
            Write-Host "Submodule $submoduleName has not been updated today. Pulling latest changes."
            Set-Location $fullSubmodulePath
            git pull
            Set-Location -LiteralPath $PSScriptRoot

            Write-Host "Updating status file for submodule: $submoduleName"
            Update-Status $submoduleName
        }
        else {
            Write-Host "Submodule $submoduleName is up-to-date. No action taken."
        }
    }
}
