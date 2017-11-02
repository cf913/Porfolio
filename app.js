const express = require('express')
const bodyparser = require('body-parser')
// const mongoose = require('mongoose')
// const cors = require('cors')
var path = require('path')
const nodemailer = require('nodemailer')
const request = require('request')
const app = express()

// mongoose.Promise = global.Promise
// mongoose.connect('mongodb://localhost:27017/posts');
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error"));
// db.once("open", function(callback){
//   console.log("Connection Successful");
// });

app.use(bodyparser.urlencoded({ extended: false}))
app.use(bodyparser.json())
// app.use(cors())
app.use(express.static(path.join(__dirname, 'src')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/index.html'));
})

app.get('/download', (req, res, next) => {
    var file = __dirname + '/src/RESUME_Chad_Fallotin.pdf'
    res.download(file) // Set disposition and send it.
})

app.post('/send', (req, res) => {
    // if (req.body.captcha === undefined
    //  || req.body.captcha === '' 
    //  || req.body.captcha === null) {
    //     return res.json({'sucess': false, 'msg': 'Please select captcha'})
    // }

    // // Secret Key
    // const secretKey = '6Lcg3jYUAAAAABUCInx_lqrfU3q6A3QQuhOGGsFl'
    // // Verify URL
    // const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secreKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`
    // // Request to verify URL
    // request(verifyURL, (err,res,body) => {
    //     body = JSON.parse(body)

    //     // If NOT sucessful
    //     if (body.sucess !== undefined && !body.sucess) {
    //         return res.json({'sucess': false, 'msg': 'Failed Captcha verification'})
    //     }

    //     // If Sucessful
    //     return res.json({'sucess': true, 'msg': 'Captcha Passed'})
    // })
    
    // NODEMAILER
    const output = `
        <p>New contact from Porfolio</p>
        <h3>Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
        </ul>
        <h3>Content</h3>
        <p>${req.body.message}</p>
    `

    let transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        tls: {
            ciphers: 'SSLv3'
        },
        auth: {
            user: 'porfolio@outlook.com', // generated ethereal user
            pass: 'Plopplop'  // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"NodeMailer Contact" porfolio@outlook.com', // sender address
        to: 'chaddudz@hotmail.fr', // list of receivers
        subject: 'Porfolio Contact Us Query', // Subject line
        text: 'Plain Text', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });

    res.redirect('/')
})

app.get('/*', (req, res) => {
    res.redirect('/')
})

let port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`Listenning on port ${port}`)
})