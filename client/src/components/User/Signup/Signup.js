import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import OTPVerificationModal from '../Verification/OTPVerification';
import './Signup.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
//import Swal from 'sweetalert2'
const Signup = () => {
    const schema = yup.object().shape({
        firstName: yup.string().required('First Name is required'),
        lastName: yup.string().required('Last Name is required'),
        username: yup.string().required('Username is required'),
        email: yup.string().email('Invalid email format').required('Email is required'),
        phoneNumber: yup.string().required('Phone Number is required').max(10),
        password: yup.string().required('Password is required'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const { register, handleSubmit, formState: { errors }, getValues } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        const formData = {
            firstname: data.firstName,
            lastname: data.lastName,
            username: data.username,
            email: data.email,
            phone: data.phoneNumber,
            password: data.password,
        };

        setUsernameExistsError('');
        setEmailExistsError('');

        const response = await axios.post('http://localhost:3000/signup', formData)
            .then(response => {

                if (response.status === 200) {
                    console.log(response);
                    setTimeout(() => {
                        setShowOTPModal(true);
                    }, 3000);

                }
            })
            .catch(error => {

                console.error('Signup failed:', error.response.data?.message);

                if (error.response.data?.message === "Username already exists") {
                    setUsernameExistsError('Username  already exists');
                }
                else if (error.response.data?.message === "Email already exists") {
                    setEmailExistsError('email  already exists');
                }
                else {
                    console.error(error.response)
                }
            })
    };

    const [showOTPModal, setShowOTPModal] = useState(false);
    const [usernameExistsError, setUsernameExistsError] = useState('');
    const [emailExistsError, setEmailExistsError] = useState('');

    const navigate = useNavigate();
    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Sign Up</h2>
                <div className="signup-form">
                    {/* Input fields for user registration */}
                    <input
                        type="text"
                        placeholder="First Name"
                        {...register('firstName')}
                    />
                    <div className='errors-message'>
                        <p>{errors.firstName?.message}</p>
                    </div>

                    <input
                        type="text"
                        placeholder="Last Name"
                        {...register('lastName')}
                    />
                    <div className='errors-message'>
                        <p>{errors.lastName?.message}</p>
                    </div>

                    <input
                        type="text"
                        placeholder="Username"
                        {...register('username')}
                    />
                    <div className='errors-message'>
                        <p>{errors.username?.message}</p>
                        <p>{usernameExistsError}</p>
                    </div>
                    <input
                        type="email"
                        placeholder="Email"
                        {...register('email')}
                    />
                    <div className='errors-message'>
                        <p>{errors.email?.message}</p>
                        <p>{emailExistsError}</p>
                    </div>
                    <input
                        type="text"
                        placeholder="Phone Number"
                        {...register('phoneNumber')}
                    />
                    <div className='errors-message'>
                        <p>{errors.phoneNumber?.message}</p>
                    </div>

                    <input
                        type="password"
                        placeholder="Password"
                        {...register('password')}
                    />
                    <div className='errors-message'>
                        <p>{errors.password?.message}</p>
                    </div>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        {...register('confirmPassword')}
                    />
                    <div className='errors-message'>
                        <p>{errors.confirmPassword?.message}</p>
                    </div>

                    <div className="btn-div">
                        <button type="submit">Sign Up</button>
                    </div>
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </form>
            {/* Render the OTPVerificationModal when showOTPModal is true */}
            {showOTPModal && (
                <OTPVerificationModal
                    email={getValues('email')}
                    someState={'login'} // Pass the email to the OTP modal
                />
            )}
        </div>
    );
};

export default Signup;
