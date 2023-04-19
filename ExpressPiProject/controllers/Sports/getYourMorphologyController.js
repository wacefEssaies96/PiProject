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

exports.morphologyType = async (req, res) => {
  // gender, shoulderWidth, hipWidth, height, weight, age
  if (gender === 'male') {
    // Rectangle
    if (shoulderWidth >= 40 && shoulderWidth <= 50 &&
      hipWidth >= 40 && hipWidth <= 50 &&
      height >= 150 && height <= 190 &&
      weight >= 45 && weight <= 85 &&
      age >= 18 && age <= 45) {
      return 'Rectangle';
    }

    // Trapezoid
    if (shoulderWidth >= 40 && shoulderWidth <= 50 &&
      hipWidth >= 40 && hipWidth <= 50 &&
      height >= 150 && height <= 190 &&
      weight >= 45 && weight <= 85 &&
      age >= 18 && age <= 45) {
      return 'Trapezoid';
    }

    // If no body shape type is matched
    return 'Unknown';
  }

  if (gender === 'female') {
    // Triangle (Pear)
    if (shoulderWidth >= 35 && shoulderWidth <= 45 &&
      hipWidth >= 45 && hipWidth <= 55 &&
      height >= 150 && height <= 190 &&
      weight >= 45 && weight <= 85 &&
      age >= 18 && age <= 45) {
      return 'Triangle (Pear)';
    }

    // Inverted Triangle
    if (shoulderWidth >= 45 && shoulderWidth <= 55 &&
      hipWidth >= 35 && hipWidth <= 45 &&
      height >= 150 && height <= 190 &&
      weight >= 45 && weight <= 85 &&
      age >= 18 && age <= 45) {
      return 'Inverted Triangle';
    }

    // Oval
    if (shoulderWidth >= 35 && shoulderWidth <= 45 &&
      hipWidth >= 35 && hipWidth <= 45 &&
      height >= 150 && height <= 190 &&
      weight >= 45 && weight <= 85 &&
      age >= 18 && age <= 45) {
      return 'Oval';
    }

    // Hourglass
    if (shoulderWidth >= 35 && shoulderWidth <= 45 &&
      hipWidth >= 45 && hipWidth <= 55 &&
      height >= 150 && height <= 190 &&
      weight >= 45 && weight <= 85 &&
      age >= 18 && age <= 45) {
      return 'Hourglass';
    }

    // Rhomboid (Diamond)
    if (shoulderWidth >= 45 && shoulderWidth <= 55 &&
      hipWidth >= 35 && hipWidth <= 45 &&
      height >= 150 && height <= 190 &&
      weight >= 45 && weight <= 85 &&
      age >= 18 && age <= 45) {
      return 'Rhomboid (Diamond)';
    }

    // If no body shape type is matched
    return 'Unknown';
  }

  // If gender is neither male nor female
  return 'Unknown';
}