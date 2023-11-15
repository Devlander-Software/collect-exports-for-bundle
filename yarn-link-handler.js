const { exec } = require('child_process');
const path = require('path');

function runCommand(command, options = {}) {
    return new Promise((resolve, reject) => {
        exec(command, options, (error, stdout, stderr) => {
            if (error) {
                reject({ error, stdout, stderr });
                return;
            }
            resolve(stdout.trim());
        });
    });
}

const unlinkPackage = async (packageName) => {
    try {
        console.log(`Attempting to unlink '${packageName}'...`);
        await runCommand(`yarn unlink "${packageName}"`);
        console.log(`Unlinked '${packageName}' successfully.`);
        return true;
    } catch (unlinkError) {
        console.log(`Package '${packageName}' was not previously linked or could not be unlinked.`);
        return false;
    }
}

const linkPackage = async (packageName) => {
    try {
        console.log(`Linking package '${packageName}'...`);
        await runCommand(`yarn link "${packageName}"`);
        console.log(`Linked '${packageName}' successfully.`);
        return true;
    } catch (linkedError) {
        console.error(`Failed to link '${packageName}': ${linkedError}`);
        return false;
    }
}

const linkChildrenPackage = async (packageName, dir) => {
    try {
        const dirPath = path.resolve(__dirname, dir);
        await runCommand(`yarn link "${packageName}"`, { cwd: dirPath });
        console.log(`Linked '${packageName}' in directory: ${dir}`);
    } catch (linkedChildrenError) {
        console.error(`Failed to link '${packageName}' in directory '${dir}': ${linkedChildrenError}`);
    }
}

async function checkAndRelinkPackage(packageName, directories) {
    try {
        await unlinkPackage(packageName);
        const linkedSuccessfully = await linkPackage(packageName);
        
        if (linkedSuccessfully) {
            for (const dir of directories) {
                // check the index 
                // if its the last one break
                await linkChildrenPackage(packageName, dir);

                
                
            }
        }
        return
    } catch (error) {
        console.error(`An error occurred: ${error}`);
    }
}

function linkPackages() {
    const packageName = '@devlander/collect-exports-for-bundle';
    const directories = ['example']; // Adjust the directories as needed
    checkAndRelinkPackage(packageName, directories);
}

linkPackages();
