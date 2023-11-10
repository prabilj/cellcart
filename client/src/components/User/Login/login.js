import React, { useState, useContext } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../../../images/logo01.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Import icons

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {
        if (!username || !password) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please fill in both username and password fields.',
            });
            return;
        }
        console.log('Login submitted:', { username, password });
        const formData = {
            username: username,
            password: password,
        };

        axios
            .post('http://localhost:3000/login', formData)
            .then((response) => {
                console.log('response', response);

                localStorage.setItem('userToken', response.data.token);
                localStorage.setItem('uId', response.data.uId);
                localStorage.setItem('name', response.data.Data.name);
                localStorage.setItem('email', response.data.Data.email);
                localStorage.setItem('isadmin', response.data.Data.isadmin);
                if (response.status === 200) {
                    if (response.data.Data.isadmin) {
                        navigate('/dashboard');
                    }
                    else {
                        console.log("client side");
                        navigate('/productlist');
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Login failed',
                        text: response.data.message,
                    });
                    console.log('Login failed');
                }
            })
            .catch((err) => {
                if (err.response.data === 'Email is not verified') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Email verification',
                        text: err.response.data,
                    });
                    console.log('err', err);
                    navigate('/emailEnter', { state: { status: 'login' } });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid',
                        text: err.response.data,
                    });
                    console.log('err', err);
                }
            });
    };

    return (
        <div className="login-container">
            <div className="logo-container">
                <div className="center">
                    <img src={logo} alt="Logo" className="logo" />
                </div>
            </div>
            <h2>Login</h2>
            <div className="login-form">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <div className="password-input-container">
                    <input
                        type={showPassword ? 'text' : 'password'} // Toggle password visibility
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {showPassword ? (
                        <VisibilityOff onClick={togglePasswordVisibility} className="password-icon" />
                    ) : (
                        <Visibility onClick={togglePasswordVisibility} className="password-icon" />
                    )}
                </div>
                <div className="button-container">
                    <button onClick={handleLogin}>Login</button>
                </div>
                <p>
                    <Link to="/emailEnter">Forgot password?</Link>
                </p>
                <p>
                    Don't have an account? <Link to="/Signup">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
