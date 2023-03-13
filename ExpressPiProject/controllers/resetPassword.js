const sgMail = require('@sendgrid/mail')
API_KEY = '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'
const User = require('../models/Users/user')
const jwt = require("jsonwebtoken")
const { secret } = require('../config')
const bcrypt = require("bcrypt")

sgMail.setApiKey(API_KEY)

const sendEmail = async (receiver, source, subject, content) => {
  // msg object
  const message = {
    to: receiver,
    from: source,
    subject: subject,
    html: content,
  }

  //send email
  await sgMail.send(message)
    .then(res => console.log({ result: res, msg: 'Email sent...' }))
    .catch(err => console.log(err.message))
}

exports.sendResetLink = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res.status(404).send({ error: 'User email not found !' })
    }

    const secretForUser = secret + user.password
    const payload = {
      email: user.email,
      id: user._id
    }
    const token = jwt.sign(payload, secretForUser, { expiresIn: '10m' })

    const link = `${req.protocol}://localhost:3000/resetPassword?userId=${user._id}&token=${token}`

    await sendEmail(
      email,
      'haifa.arouri@esprit.tn',
      'Change Password',
      `<div>Click the link below to reset your password</div><br/>
           <div>${link}</div>`
    )
    return res.status(200).send({ message: 'Password reset link has been successfully sent to your inbox' });
  } catch (e) {
    console.log('err')
    return new Error(e)
  }
}

exports.resetPassword = async (req, res) => {
  const { id, token } = req.params
  const { password, newPassword } = req.body
  const { email } = req.body

  const user = await User.findById(req.params.id)

  if (!user) {
    return res.status(404).send({ error: `User not found with id : ${id} !` })
  }

  const userEmail = await User.findOne({ where: { email } })
  if (!userEmail) {
    return res.status(404).send({ error: 'User email not found !' })
  }

  const secretForUser = secret + userEmail.password

  //find user with the payload email and id and then update the user
  // const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
  // .then((res)=> console.log(res))
  // .then(data => {
  //   if (data) {
  //     res.send({ message: "user was updated successfully." });
  //   } else {
  //     res.status(404).send({
  //       message: `Cannot update user with id=${id}. Maybe user was not found!`
  //     });
  //   }
  // }).catch(err => {
  //   res.status(500).send({
  //     message: "Error updating user with id=" + id
  //   });
  // });

  const updatedUser = await User.findById(req.params.id)
    .then(u => {
      const salt = bcrypt.genSalt(10)
      const hash = bcrypt.hashSync(req.body.password, salt)
      
      u.email = req.body.email;
      u.password = hash;

      // console.log(req.body.email, req.body.password)

      u.save()
        .then(() => res.json('Password reseted syccessfully!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));

  console.log(updatedUser)
  try {
    const payload = jwt.verify(token, secretForUser)
    res.send({ email: updatedUser.email })
  } catch (e) {
    console.log(e)
    return e.message
  }
}