import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './UserProfile.css';
import { useNavigate } from 'react-router-dom';
import { getUserApi } from '../Api/Api'



const validationSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  username: yup.string().required('Username is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  phoneNumber: yup
    .string()
    .matches(/^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/, 'Invalid phone number format')
    .required('Phone Number is required'),

});


const UserProfile = () => {
  const Navigate = useNavigate()
  const userId = localStorage.getItem('uId');

  const [defaultData, setdefaultData] = useState({})
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [usernameExistsError, setUsernameExistsError] = useState('');
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserApi();
        setdefaultData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();


  }, [userId])

  const onSubmit = (data) => {

    console.log('Form data:', data);
  };




  return (
    <div className='main_container'>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='profile-container'>
          <Typography variant="h5">Edit Profile</Typography>

          <div className="profile-form">
            {/* Input fields for user registration */}
            <div className='textname'>
              <div>
                <input
                  type="text"
                  placeholder="First Name"

                  defaultValue={defaultData.firstname}
                  {...register('firstName')}
                />
                <div className='errors-message'>
                  <p>{errors.firstName?.message}</p>
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  defaultValue={defaultData.lastname}
                  {...register('lastName')}
                />
                <div className='errors-message'>
                  <p>{errors.lastName?.message}</p>
                </div>
              </div>


            </div>
            <div className='textname'>
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  defaultValue={defaultData.username}
                  {...register('username')}
                />
                <div className='errors-message'>
                  <p>{errors.username?.message}</p>
                  <p>{usernameExistsError}</p>
                </div>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Phone Number"
                  defaultValue={defaultData.phone}
                  {...register('phoneNumber')}
                />
                <div className='errors-message'>
                  <p>{errors.phoneNumber?.message}</p>
                </div>
              </div>

            </div>

            <input
              id='email'
              type="email"
              placeholder="Email"
              readOnly="true"
              defaultValue={defaultData.email}
              {...register('email')}
            />


            <div style={{ marginTop: '16px' }}>
              <Button
                variant="contained"
                size='large'
                style={{ backgroundColor: '#563517', color: 'white', }}

              >
                Save Changes
              </Button>
              <Button
                variant="contained"
                size='large'

                style={{ backgroundColor: '#563517', color: 'white', marginLeft: "50px" }}
                onClick={() => {
                  Navigate('/productlist')
                }}

              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
