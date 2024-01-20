// controller-win32.js
// Import necessary modules
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

// Define any specific configurations or operations for Windows 32-bit
const config = {
    // Add any specific configurations for Windows 32-bit here
};

// Example function to perform a specific task
function performTask() {
    // Implement the task you want to perform. For example:
    console.log("Performing a specific task for Windows 32-bit system.");

    // You can execute system commands, read/write files, or any other operation
    // For example, checking for a specific file:
    const filePath = path.join(__dirname, '123.txt');
    // const filePath = `C:\\Users\\Hein Min Htet\\Downloads\\sandbox.txt`
    // console.log('here ===========>', filePath)
    if (fs.existsSync(filePath)) {
        console.log("File exists. Proceeding with operations...", filePath);
        // Add more operations here as needed
    } else {
        console.error("Required file does not exist. Exiting.");
    }
}

// Example of running a system command specific to Windows 32-bit
function runSystemCommand() {
    const command = 'echo %USERNAME%';  // Example command to get the username in Windows
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
        }
        console.log(`Logged in user is: ${stdout.trim()}`);
    });
}

// Call your functions to perform the operations
performTask();
runSystemCommand();

// You can add more functions and logic as per your application's requirements.
