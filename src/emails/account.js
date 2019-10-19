const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'vincenicoara@gmail.com',
        subject: 'Welcome!',
        text: `Welcome to the application, ${name}. Let me know how you like it!`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'vincenicoara@gmail.com',
        subject: 'Sorry you\'re leaving!',
        text: `Hi ${name}. Is there anything we can do to make you stay? Please let us know!`
    })
}

// sendWelcomeEmail('vincenicoara@gmail.com', 'vince')
module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}

// const msg = {
//     to: 'vincenicoara@gmail.com',
//     from: 'vincenicoara@gmail.com',
//     subject: 'Sending with Twilio SendGrid is Fun',
//     text: 'and easy to do anywhere, even with Node.js',
//     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//   }
//   sgMail.send(msg)
