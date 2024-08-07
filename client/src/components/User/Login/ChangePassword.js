import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { changePasswordApi } from '../../Api/Api';
import './ResetPassword.css';
import Footer from '../../Header/Footer';

function ChangePassword() {
    // Validation schema for password reset
    const location = useLocation();
    const navigate = useNavigate();
    const [passwordExistError, setpasswordExistsError] = useState('');

    const resetPasswordValidationSchema = yup.object().shape({
        currentPassword: yup.string().required('Current Password is required'),
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
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,

        };
        try {
            const response = await changePasswordApi(formData)
            console.log("response", response)

            Swal.fire({
                title: 'Password Successfully Changed',
                text: 'Do you want to go back to the login page or back to the product list?',
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'Back to Login',
                cancelButtonText: 'Back to Product List',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login'); // Navigate to the login page
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    navigate('/productlist'); // Navigate to the product list
                }
            })


        }
        catch (error) {
            console.error("error", error.response.data.message)
            setpasswordExistsError(error.response.data.message)


        }
    };

    return (
        <>
        <div className="reset-password-container">

            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Change Password</h2>
                <div className="reset-password-form">
                    {/* Input fields for password reset */}
                    <input
                        type="password"
                        placeholder="Current Password"
                        {...register('currentPassword')}
                    />
                    <div className="errors-message">
                        <p>{errors.newPassword?.message}</p>
                        <p>{passwordExistError}</p>
                    </div>
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

                    <div>
                        <button type="submit">Change Password</button>
                        <p><Link to="/productlist">Back to products </Link></p>
                    </div>

                </div>
            </form>
           
        </div>
         <Footer/>
         </>
    );
}

export default ChangePassword;
