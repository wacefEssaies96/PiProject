const { spawn } = require('child_process');

// Handle file upload
exports.uploadUserImage = async (req, res) => {
  const imagePath = req.file.path;

  // Spawn a new Python process
  const pythonProcess = spawn('python', ['C://Users/Lenovo/Desktop/ProjetPI/PiProject/expresspiproject/controllers/Sports/openPose.py']);
  // Send image path to Python script through standard input
  pythonProcess.stdin.write(imagePath);
  pythonProcess.stdin.end();
  // // Listen for output from Python script
  pythonProcess.stdout.on('data', (data) => {
    // const jsonData = JSON.parse(data); // Parse the data as a JSON object
    // console.log(`Python script output: ${data}`);
    // Send Python script output back to client

    res.send(data);
  });

  // Listen for errors from Python script
  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python script error: ${data}`);
    res.status(500).send('Internal server error');
  });
}