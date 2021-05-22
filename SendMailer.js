const mailer = require("nodemailer");
require("dotenv").config();

const sendMailer = ( email,userid) => {
    

    
    return new Promise((resolve, reject) => {
        let transport = mailer.createTransport({
            service: "gmail",
            auth: {
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
            }
        });
        let options = {
            from:'"SaiChaitanya"<saichaitanya735@gmail.com>',
            to:email,
            sunject:"Enter  signup page",
            text:"It works",
            html:`
            <img src='https://pbs.twimg.com/profile_images/1345986523636793344/qKdY222k.jpg' style=" display: block;
    margin-left: auto;
    margin-right: auto;"
    />
           <h1>Welcome, to Private Mailing System</h1>
           <h3>Hello </h3>
           <p>Thank you for registering into our application.</p>
            
            <p>To activate your account please follow this link:<a target="_" href="http://localhost:5000/auth/verify/${userid}">Activate Link</a></p>
            <p>Cheers</p>
            <p>Your application team</p>
            `
        };

        transport.sendMail(options, err => {
            if (err) //reject(false);
            console.log("error Occurs",err);
            else {
                console.log(`Email sent: ${email}`);
                resolve(true);
            }
        });
    });

};

module.exports = sendMailer;