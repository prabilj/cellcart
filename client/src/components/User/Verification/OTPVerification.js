import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import Swal from 'sweetalert2';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const OTPVerificationModal = ({ email, someState }) => {
    console.log(someState)
    const [otp, setOtp] = useState('');
    const [open, setOpen] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    const handleOtpChange = (e) => {
        const input = e.target.value;

        // Remove any non-numeric characters
        const numericInput = input.replace(/[^0-9]/g, '');

        // Limit the input to 6 characters
        const limitedInput = numericInput.slice(0, 6);

        setOtp(limitedInput);
    };

    const handleVerifyEmail = async () => {
        if (!otp) {
            setError('OTP is required.');
            return;
        }

        if (otp.length !== 6) {
            setError('OTP must be a 6-digit number.');
            return;
        }


        const formData = {
            email,
            otp,
        };

        try {
            const response = await axios.post('http://localhost:3000/verifyOTP', formData);

            if (response.status === 200) {

                if (someState === "login") {


                    Swal.fire({
                        icon: 'success',
                        title: 'Email verified successfully!',
                    });
                    setOpen(false);
                    navigate('/login')
                }
                else  {
                    navigate('/resetpassword', { state: { email: email } });
                }

            }
            else {

                console.error('OTP verification failed:', response.data);
                setError('Incorrect OTP. Please try again.')

            }
        } catch (error) {
            console.error('Error verifying OTP:', error);

            setError(error.response.data.message);


        }
    };

    return (
        <div className="otp-verification-container">
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Email Verification</DialogTitle>
                <DialogContent>
                    <p>Enter the OTP sent to your email ({email}):</p>
                    <TextField
                        type="text"
                        placeholder="OTP"
                        value={otp}
                        onChange={handleOtpChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        style={{ backgroundColor: '#563517', color: 'white' }}
                        onClick={handleVerifyEmail}
                    >
                        Verify
                    </Button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default OTPVerificationModal;
