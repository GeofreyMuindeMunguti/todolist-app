const nodemailer = require('nodemailer')
const environment = require('dotenv').config()

function inviteUser(reqParam){
    return new Promise((resolve, reject)=>{

      let options = {
          host: process.env.EMAILHOST,
          port: parseInt(process.env.EMAILPORT),
            auth: {
                user: process.env.EMAILUSER,
                pass: process.env.EMAILPASS
            }
        }
        let transporter = nodemailer.createTransport((options));
        let email = {
            from: process.env.EMAILUSER,
            to: reqParam.invitee,
            subject: "OurToDoList-App INVITE",
            text: 'Hello, you have been invited to OurToDoList app.',
            html: '<a href= "https://ourtodoapp.com?affiliate='+reqParam.affiliate+'/&newuser='+reqParam.invitee+'">Click to sign up</a>'
        };

        transporter.sendMail(email, function (err, data) {
            !err ? resolve() : reject( err);
         });


    });
}

function passwordResetEmail(reqParam){
    return new Promise((resolve, reject)=>{

      let options = {
          host: process.env.EMAILHOST,
          port: parseInt(process.env.EMAILPORT),
            auth: {
                user: process.env.EMAILUSER,
                pass: process.env.EMAILPASS
            }
        }
        let transporter = nodemailer.createTransport((options));
        let email = {
            from: process.env.EMAILUSER,
            to: reqParam.email,
            subject: "OurToDoList-App Password Reset Code",
            text: 'Hello, use this code to reset your password: Code = '+reqParam.resetcode+' .',
        
        };

        transporter.sendMail(email, function (err, data) {
            !err ? resolve() : reject( err);
         });


    });
}

module.exports = { inviteUser, passwordResetEmail }