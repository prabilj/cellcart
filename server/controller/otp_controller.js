const nodemailer = require('nodemailer');
const dotenv= require('dotenv')


const User = require('../model/userSchema');
const Email=process.env.email
const Password =process.env.email_pass


// Send OTP to user's email
const sendOTP = async (email) => {
    console.log(email)
    const digits = '0123456789';
    let otp = '';

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        otp += digits.charAt(randomIndex);
    }
    console.log(otp)
    //  user.otp = otp;
    // await user.save();

    // Send OTP to user's email
    const transporter = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
            user: Email,
            pass: Password
        }
    });

    const mailOptions = {
        from: Email,
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP for email verification is: ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email: ', error);
        } else {
            console.log('Email sent: ', info.response);
        }
    });
    return otp
};

// Verify OTP
const verifyOTP = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        //console.log(user);
        console.log(req.body)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(req.body.otp)
        if (user.otp === req.body.otp) {
            console.log(user.otp)

            // OTP matched, mark email as verified
            user.isEmailverified = true;
            await user.save();

            return res.status(200).json({ message: 'Email verified successfully' });
        } else {
            return res.status(401).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = { User, sendOTP, verifyOTP };
