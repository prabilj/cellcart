import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { resetPasswordApi } from '../../Api/Api';
import './ResetPassword.css';
import Footer from '../../Header/Footer';

function ResetPassword() {
    // Validation schema for password reset
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state || {};
    const Email = email;
    const resetPasswordValidationSchema = yup.object().shape({
        newPassword: yup.string().required('New Password is required'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(resetPasswordValidationSchema),
    });

    const onSubmit = async (data) => {
        const formData = {
            newPassword: data.newPassword,
            email: Email,
        };

        try {
            // Call your resetPasswordApi function to reset the password
            const response = await resetPasswordApi(formData);

            if (response.message === 'Password reset successfully') {
                Swal.fire({
                    icon: 'success',
                    title: 'Password Reset Successful',
                    text: 'You can now log in with your new password.',
                }).then(() => {
                    // Redirect to the login page after the user clicks OK on the SweetAlert
                    navigate('/login');
                });
            } else {
                console.error('Password reset failed');
                // Display an error message to the user if needed
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            // Handle error here, you can display an error message to the user
        }
    };

    return (
        <>
            <div className="reset-password-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Reset Password</h2>
                    <div className="reset-password-form">
                        {/* Input fields for password reset */}
                        <input
                            type="password"
                            placeholder="New Password"
                            {...register('newPassword')}
                        />
                        <div className="errors-message">
                            <p>{errors.newPassword?.message}</p>
                        </div>

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            {...register('confirmPassword')}
                        />
                        <div className="errors-message">
                            <p>{errors.confirmPassword?.message}</p>
                        </div>

                        <div className="btn-div">
                            <button type="submit">Reset Password</button>
                        </div>
                        <p>
                            Remember your password? <Link to="/login">Login</Link>
                        </p>
                    </div>
                </form>

            </div>
            <Footer />
        </>
    );
}

export default ResetPassword;
