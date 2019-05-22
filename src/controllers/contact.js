module.exports = {
    sendEmailViaContactForm
}

const nodemailer = require('nodemailer');
require('dotenv').config();

const smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});

const mailOptions = {
    from: process.env.MAIL,
    to: '',
    replyTo: '',
    subject: '',
    html: ''
}

async function sendEmailViaContactForm(req, res){
    try {
        const { email, name, mailBody } = req.body;
        await smtpTransport.sendMail({
            ...mailOptions,
            to: process.env.MAIL,
            replyTo: email,
            subject: `[MentorMatch]: ${name} sent you a message!`,
            html: `
                <h1>Hello from MentorMatch!</h1>
                <p>Somebody tried to reach you out via contact form at the landing page.</p>
                
                <h4>From: ${name} (${email})</h4>
                <h4>Date: ${new Date()}</h4>
                <p><b>Mail:</b> ${mailBody}</p>
                <hr>
                <h4>See you soon @ MentorMatch!</h4>
                <p>Team MentorMatch</p>
            `
        }, async (err, response) => {
            if(err) throw err;
            await smtpTransport.close();
        })
        return await res.status(200).json({ message: 'Email has been sent!' });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}