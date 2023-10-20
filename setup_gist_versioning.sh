#!/bin/bash

# Check if current directory is a git directory
if [ ! -d ".git" ]; then
    echo "Error: This is not a git directory. Make sure you run this script inside a git (Gist) directory."
    exit 1
fi

# Create or update the version.txt file
if [ ! -f "version.txt" ]; then
    echo "0.1.0" > version.txt
    echo "Created version.txt with starter version 0.1.0"
fi

# Write the pre-push hook script
cat <<EOL > .git/hooks/pre-push
#!/bin/bash

# Bump version function
bump_version() {
  version_file="version.txt"
  
  # Get the current version and break it into parts
  version=\$(cat \$version_file)
  major=\$(echo \$version | cut -d. -f1)
  minor=\$(echo \$version | cut -d. -f2)
  patch=\$(echo \$version | cut -d. -f3)
  
  # For this example, we'll simply bump the patch number. Modify as needed.
  new_patch=\$((patch + 1))
  
  # Construct the new version
  new_version="\$major.\$minor.\$new_patch"
  
  # Save the new version back to the version file
  echo \$new_version > \$version_file

  # Update package.json with the new version
  jq --arg version \$new_version '.version = \$version' package.json > tmp.json && mv tmp.json package.json
}

# Bump the version
bump_version

# Add the version.txt and package.json files, then commit the changes
git add version.txt package.json
git commit -m "Bump version to \$(cat version.txt)"

exit 0
EOL

# Make the pre-push hook executable
chmod +x .git/hooks/pre-push
echo "Pre-push hook has been created and is now ready to use."

exit 0
