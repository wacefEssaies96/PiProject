const { spawn } = require('child_process');
const User = require('../../models/Users/user');

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

  const id = req.params.id;
  const shouldersWidth = req.params.shouldersWidth;
  const hipsWidth = req.params.hipsWidth;
  let bodyShape = ""
  let user = null
  let gender = ''
  let height = 0
  let weight = 0
  let age = 22

  //find user by id
  try {
    user = await User.findById(id);
    if (!user) {
      console.log("User not found");
    }
    gender = user.gender
    height = user.height
    weight = user.weight

  } catch (err) {
    console.log("Internal server error");
  }

  //get user age
  // const currentDate = new Date();
  // const currentYear = currentDate.getFullYear();
  // const birthYear = user.dateOfBirth.getFullYear();
  // const userAge = currentYear - birthYear;

  // // Check if the birth month and day are past the current month and day
  // const currentMonth = currentDate.getMonth();
  // const birthMonth = user.dateOfBirth.getMonth();
  // const currentDay = currentDate.getDate();
  // const birthDay = user.dateOfBirth.getDate();
  // if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
  //   // Subtract 1 from age if the birth month and day are not yet past
  //   userAge = userAge - 1;
  // }

  //get body type
  if (gender.toLocaleLowerCase() === 'male') {
    // Ectomorph
    if (shouldersWidth >= 38 && shouldersWidth <= 46 &&
      hipsWidth >= 38 && hipsWidth <= 46 &&
      age >= 20 && age <= 40 &&
      weight >= 55 && weight <= 75 &&
      height >= 165 && height <= 185) {
      bodyShape = 'Ectomorph';
    } else

      // Mesomorph
      if (shouldersWidth >= 45 && shouldersWidth <= 55 &&
        hipsWidth >= 45 && hipsWidth <= 55 &&
        age >= 20 && age <= 40 &&
        weight >= 65 && weight <= 85 &&
        height >= 170 && height <= 190) {
        bodyShape = 'Mesomorph';
      } else

        // Endomorph
        if (shouldersWidth >= 40 && shouldersWidth <= 50 &&
          hipsWidth >= 40 && hipsWidth <= 50 &&
          age >= 20 && age <= 40 &&
          weight >= 70 && weight <= 100 &&
          height >= 160 && height <= 180) {
          bodyShape = 'Endomorph';
        } else

          // Rectangle
          if (shouldersWidth >= 40 && shouldersWidth <= 50 &&
            hipsWidth >= 40 && hipsWidth <= 50 &&
            age >= 20 && age <= 40 &&
            weight >= 60 && weight <= 90 &&
            height >= 165 && height <= 185) {
            bodyShape = 'Rectangle';
          } else

            // Triangle
            if (shouldersWidth >= 45 && shouldersWidth <= 55 &&
              hipsWidth >= 35 && hipsWidth <= 45 &&
              age >= 20 && age <= 40 &&
              weight >= 60 && weight <= 85 &&
              height >= 170 && height <= 190) {
              bodyShape = 'Triangle';
            } else

              // Inverted Triangle
              if (shouldersWidth >= 50 && shouldersWidth <= 60 &&
                hipsWidth >= 35 && hipsWidth <= 45 &&
                age >= 20 && age <= 40 &&
                weight >= 65 && weight <= 90 &&
                height >= 170 && height <= 190) {
                bodyShape = 'Inverted Triangle';
              } else

                // Oval
                if (shouldersWidth >= 40 && shouldersWidth <= 50 &&
                  hipsWidth >= 40 && hipsWidth <= 50 &&
                  age >= 30 && age <= 50 &&
                  weight >= 70 && weight <= 100 &&
                  height >= 160 && height <= 180) {
                  bodyShape = 'Oval';
                } else

                  // Diamond
                  if (shouldersWidth >= 45 && shouldersWidth <= 55 &&
                    hipsWidth >= 35 && hipsWidth <= 45 &&
                    age >= 30 && age <= 50 &&
                    weight >= 65 && weight <= 90 &&
                    height >= 165 && height <= 185) {
                    bodyShape = 'Diamond';
                  } else {// If none of the above conditions are met, return 'Unknown'
                    bodyShape = 'Unknown';
                  }
  } else

    if (gender.toLocaleLowerCase() === 'female') {
      // Triangle (Pear)
      if (shouldersWidth >= 35 && shouldersWidth <= 45 &&
        hipsWidth >= 45 && hipsWidth <= 55 &&
        height >= 150 && height <= 190 &&
        weight >= 45 && weight <= 85 &&
        age >= 18 && age <= 45) {
        bodyShape = 'Triangle (Pear)';
      } else

        // Inverted Triangle
        if (shouldersWidth >= 45 && shouldersWidth <= 55 &&
          hipsWidth >= 35 && hipsWidth <= 45 &&
          height >= 150 && height <= 190 &&
          weight >= 45 && weight <= 85 &&
          age >= 18 && age <= 45) {
          bodyShape = 'Inverted Triangle';
        } else

          // Oval
          if (shouldersWidth >= 35 && shouldersWidth <= 45 &&
            hipsWidth >= 35 && hipsWidth <= 45 &&
            height >= 150 && height <= 190 &&
            weight >= 45 && weight <= 85 &&
            age >= 18 && age <= 45) {
            bodyShape = 'Oval';
          } else

            // Hourglass
            if (shouldersWidth >= 35 && shouldersWidth <= 45 &&
              hipsWidth >= 45 && hipsWidth <= 55 &&
              height >= 150 && height <= 190 &&
              weight >= 45 && weight <= 85 &&
              age >= 18 && age <= 45) {
              bodyShape = 'Hourglass';
            } else

              // Rhomboid (Diamond)
              if (shouldersWidth >= 45 && shouldersWidth <= 55 &&
                hipsWidth >= 35 && hipsWidth <= 45 &&
                height >= 150 && height <= 190 &&
                weight >= 45 && weight <= 85 &&
                age >= 18 && age <= 45) {
                bodyShape = 'Rhomboid (Diamond)';
              } else {// If no body shape type is matched
                bodyShape = 'Unknown';
              }
    } else {// If gender is neither male nor female
      bodyShape = 'Unknown';
    }

  try {
    const newUser = user;
    newUser.morphology = bodyShape
    
    // Update the user in the database
    const result = await User.findByIdAndUpdate(id, newUser, { new: true });

    res.json({ "morphology": bodyShape, "updatedUser": result }); // return the updated user object
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user' });
  }
}