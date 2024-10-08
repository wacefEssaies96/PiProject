const jwt = require('jwt-simple');
const User = require('../models/Users/user');
// const { vonage } = require('@vonage/server-sdk');
const { secret } = require('../config');
const { Vonage } = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: "20bbd0c0",
  apiSecret: "cW4fFfWv7jnKNL1g"
})

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  const token = jwt.encode({ sub: user.id, iat: timestamp }, secret);
  return token;
}


exports.signin = function (req, res) {

  User.find({ email: req.body.email })
    .then(data => {
      if (data.length === 0)
        res.status(404).send({ message: "Not found user with email " + req.body.email });
      else {
        let x = Math.floor((Math.random() * 1000000) + 1)
        const from = "Vonage APIs"
        const to = '21650048691'
        const text = " A text message sent using the Vonage SMS API " + x
        vonage.sms.send({ to, from, text })
          .then(resp => { console.log('Message sent successfully'); console.log(resp); })
          .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
        res.send({ token: tokenForUser(req.user), user: data, code: x });
        // '216'+data[0].phone


      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving user with email=" + err });
    });

};

exports.signup = async function (req, res, next) {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(422).send({
        message: "User already exists with email " + req.body.email
      });
    }

  var speciality =""
  var disease =""
  if(req.body.role == "DOCTOR"){
    speciality= req.body.speciality
  }else{
    disease = req.body.disease
  }
  var user = new User({
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    gender: req.body.gender,
    phone: req.body.phone,
    address: req.body.address,
    height: req.body.height,
    weight: req.body.weight,
    dateOfBirth: req.body.dateOfBirth,
    disease: disease,
    image: req.file.path,
    account_Verified: false,
    speciality: speciality,
  });
      


    user.save(function (err) {
      if (err) {
        return next(err);
      }
      res.json({ token: tokenForUser(user) });
    });
    
  // res.status(500)
  // .send({ message: "User = " + user  });

} catch (err) {
  res.status(500).send({
    message:
      "Some error occurred while creating the user."
  });
}
}

exports.requireRole = function (role) {
  return (req, res, next) => {

    var user = null
    User.findOne({ email: req.body.email, role: role })
      .then(data => {
        user = data
        if (user) {
          req.user = user;
          next();
        } else {
          return res.status(403).json({ message: 'Forbidden' });
        }
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving user with email=" + req.body.email + " and role =" + role });
      });

  };
  
}

/*const temp_secret= speakeasy.generateSecret()

exports.tfa=function(req,res,next){
    
     User.find({email:req.body.email})
     .then(data=>{
      if(!data)
         res.status(404).send({error:'User email is not found please register !'})
      else{
        try{
        const id =uuid.v4();
        const path = `/user/${id}`

         data =>{data.push(path, {id,temp_secret})}
        res.json({id, secret:temp_secret.base32})
        }
        
        catch(error) {
          res
            .status(500)
            .send({ message: "Error generating secret" });

      }}
    })}

     /*exports.veriff=function(req,res){
      const path =`/user/${id}`;
      const token= req.body;
       User.find({id:req.body.id})
       .then(data=>{data.getData(path)
        var user=data;
        const {base32:secret}= user.temp_secret;
        const verified= speakeasy.totp.verify({
          secret:base32secret,
          encoding: 'base32',
          token: userToken});
          if(verified){
            user=>user.push(path,{id: id, secret:user.temp_secret})
            res.json({verified:true})
          }else{
            res.json({verified:false})
         }}).catch(err => {
          res
            .status(500)
            .send({ message: "Error finding user"});
        });
      }


      exports.veriff=function(req,res,next){
    
        User.find({email:req.body.email})
        .then(data=>{
         if(!data)
            res.status(404).send({error:'User email is not found please register !'})
         else{
          try {
            const { userId, token } = req.body;
            // Retrieve user from database
            const path = `/user/${userId}`;
            data=>{data.getData(path)}
            
            console.log({data })
            const { base32: secret } = data.temp_secret;
            const verified = speakeasy.totp.verify({
              secret,
              encoding:'base32',
              token
            });
            if (verified) {
              // Update user data
              db.push(path, { id: userId, secret: data.temp_secret });
              res.json({ verified: true })
            } else {
              res.json({ verified: false})
            }
          } catch(error) {
            console.error(error);
            res.status(500).json({ message: 'Error retrieving user'})
          };

           
        
        }
       })}
   
     

      /*try
      {
      const path =`/user/${userId}`;
      user=>{User.getData(path)};
      const {base32:secret}= User.temp_secret;
      const verified= speakeasy.totp.verify({
        secret:base32secret,
        encoding: 'base32',
        token: userToken});
        if(verified){
          user=>user.push(path,{id:userId, secret:user.temp_secret})
          res.json({verified:true})
        }else{
          res.json({verified:false})
        }
      }catch(error){
        res.status(500).send({ message: "Error finding user" })
      }
    
      
        
        
        
      }
     
      const VerifyOtp= async(req,res)=>{
        try{
          const{user_id, token} = req.body;
          const user= await User.findOne({id:user_id})
          const message = "Token is invalid or user doesn't exist";
          if (!user) {
           return res.status(401).json({
             status: "fail",
              message,
                 });
    }
        }
      }
       
     
     


     
  
  
  
  /*const id =uuid.v4()
  try{
    const path = `/user/${id}`
    const temp_secret= speakeasy.


  } catch(error){

  }*/

//function sendOTP  (phoneNumber,countryCode,email) {}

//const {countryCode, phoneNumber}=req.body;
/* User.find({email: email})
.then(data=>{
 if(!data){
   res.status(404).send({message:'Not found user with email'+email})
 }else {
   const otpResponse = client.verify.v2
   .services(TWILIO_ACCOUNT_SID)
 .verifications.create({
   to: `${countryCode}${phoneNumber}`, 
   channel: "sms"});
   console.log(otpResponse);
   //res.status(200).send(`OTP send successfully !: ${JSON.stringify(otpResponse)}`);
    

 }
}).catch(err=>{/*res.status(err?.status || 400).send(err?.message || 'Something went wrong!');
console.log(err);})
*/

/*client.messages
  .create({
    body: message,
    from: '55434280',
    to: to
  })
  .then(message => console.log(message.sid))
  .catch(err => console.error(err));*/



async function sendSMS(user) {
  let x = Math.floor((Math.random() * 1000000) + 1)
  const from = "Vonage APIs"
  const to = user.phone
  const text = " A text message sent using the Vonage SMS API " + x


  /* await vonage.sms.send({to,from,text})
      .then(resp => { console.log('Message sent successfully'); console.log(resp); })
      .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });*/



}





