var express = require('express');
// var router = express.Router();
var nodemailer = require('nodemailer');
const creds = require('../config/config');

var transport = {
  host: 'smtp.gmail.com',
  auth: {
    user: creds.USER,
    pass: creds.PASS
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

const emailRouter = express.Router();

emailRouter.post('/send', async(req,res) => {
    try{
        var email = req.body.emails; //change this to be fetched from db by filter(emails of students who are enrolled to that class)
        var content = `You have been on a date with someone in the past 14 days who has tested positive for Covid. Please take extra precautions, and follow your local state guidlines.`;
        console.log(email);
      
        var mail = {
          from: 'safelovesse@gmail.com',
          to: "Undisclosed Recipients",
          bcc: email,
          subject: 'IMPORTANT: Covid Tracing',
          text: content
        }
      
        transporter.sendMail(mail, (err, data) => {
          if (err) {
            res.json({
              msg: 'fail'
            })
          } else {
            res.json({
              msg: 'success'
            })
          }
        })
    }catch(error){
        res.status(401).json({error: error.message});
    }
});


module.exports = emailRouter
