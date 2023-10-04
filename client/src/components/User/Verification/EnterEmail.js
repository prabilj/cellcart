import React, { useState } from 'react';
import OTPVerification from './OTPVerification';
import './EnterEmail.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios'
import { useLocation } from 'react-router-dom';

const EmailEntry = () => {
    const location = useLocation();
    console.log("location", location)
    const { status } = location.state || {}
    console.log("status1", status)
    const schema = yup.object().shape({
        email: yup.string().email('Invalid email format').required('Email is required')
    });

    const { register, handleSubmit, formState: { errors }, getValues } = useForm({
        resolver: yupResolver(schema),
    });

    const [email, setEmail] = useState('');
    const [showVerification, setShowVerification] = useState(false);
    const [otpSent, setOtpSent] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSendOTP = () => {
        console.log(email)
        axios.post('http://localhost:3000/sentemail', { email })
            .then((responce) => {
                //console.log(responce.data.code)
                if (responce.data.code === 200) {
                    setOtpSent(true)

                    setTimeout(() => {
                        setShowVerification(true);
                    }, 3000)
                }

            })
            .catch((error) => {
                console.log(error)
            })



    };

    return (
        <div className='email_container'>
            <h2>Email Entry</h2>
            <form onSubmit={handleSubmit(handleSendOTP)}>
                {!showVerification ? (
                    <div className='email_form'>
                        <p>Enter your registered email to receive an OTP</p>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            {...register('email')}
                            onChange={handleEmailChange}
                        />
                        <div className='errors-message'>
                            <p>{errors.email?.message}</p>
                        </div>
                        {otpSent && <p>OTP has been sent to your email.</p>}
                        <button type="submit">Send OTP</button>
                    </div>
                ) : (
                    <OTPVerification email={email} someState={status} />
                )}
            </form>
        </div>
    );
};

export default EmailEntry;
