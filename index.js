// npm install dependencies . and in the client folder
//npm run dev
//mail goes :
//website : https://ethereal.email/
//login: nsgdgocmdjg3rqlz@ethereal.email
//pass: SEhE8vGjXxdMEDugYj

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/api/form', (req, res) => {
    console.log(req.body)
    nodemailer.createTestAccount((err, account) => {
        const htmlEmail = `
        <h3>Contact Details</h3>
        <ul>
            <li>Email: ${req.body.email}</li>
            <li>Subject: ${req.body.subject}</li>
        </ul>
        <h3>Message:</h3>
            <p>${req.body.message}</p>
            <p>${req.body.file}</p>
            `
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            post: 587,
            auth: {
                user: '	nsgdgocmdjg3rqlz@ethereal.email',
                pass: 'SEhE8vGjXxdMEDugYj'
            }
        })

        
        let mailOptions = {
            from: 'test@gmail.com',
            to: 'nsgdgocmdjg3rqlz@ethereal.email',
            replyTo: req.body.email,
            subject: req.body.subject,
            test: req.body.message,
            html: htmlEmail,
            //photo doesn't work yet
            attachments: [{
                filename: '2.jpeg',
                path: '/Users/max_p/Desktop/mailingapp/2.jpeg',
                cid: 'unique@nodemailer.com' //same cid value as in the html img src
            }]
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return console.log(err)
            }
            console.log('Message sent: %s', info.messageId)
            console.log('Message URL: %s', nodemailer.getTestMessageUrl(info))
        })
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})