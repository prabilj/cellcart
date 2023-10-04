import React, { useState, useContext } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import logo from '../../../images/logo01.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import { useAuth } from '../../contexts/AuthContexts';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    //const { token, login } = useAuth()



    const handleLogin = async () => {
        if (!username || !password) {
            Swal.fire({
                icon: "error",
                title: "Validation Error",
                text: "Please fill in both username and password fields."
            });
            return;
        }
        console.log('Login submitted:', { username, password });
        const formData = {
            'username': username,
            'password': password
        }

        axios.post('http://localhost:3000/login', formData)
            .then(response => {
                console.log('response', response);

                // login(response.data.token, response.data.uId)

                localStorage.setItem("userToken", response.data.token)
                localStorage.setItem("uId", response.data.uId)
                localStorage.setItem("name", response.data.Data.name)
                localStorage.setItem('email',response.data.Data.email)

                if (response.status === 200) {
                    if (response.data.Data.isadmin === 'yes') {
                        console.log("user is admin")
                        navigate('/dashboard');
                    }
                    else {
                        console.log("login as user")
                        navigate('/productlist');
                    }
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Login failed",
                        text: response.data.message
                    })
                    console.log("login failed");
                    alert("Login failed. Please check your credentials");
                }

                // console.log("token", token)

            })
            .catch(err => {
                if (err.response.data === "Email is not verified") {
                    Swal.fire({
                        icon: "warning",
                        title: "email verification",
                        text: err.response.data
                    })
                    console.log('err', err);
                    navigate("/emailEnter", { state: { status: "login" } })
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "invaild",
                        text: err.response.data
                    })
                    console.log('err', err);
                }


            });
    }

    return (

        <div className="login-container">
            <div className="logo-container">
                <div className='center'>
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
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div className="button-container">
                    <button onClick={handleLogin}>Login</button>
                </div>

                <p> <a href='/emailEnter'>forgot password</a> </p>

                <p>Don't have an account? <Link to="/Signup">Sign up</Link></p>
            </div>
        </div>
    )
}


export default Login;
