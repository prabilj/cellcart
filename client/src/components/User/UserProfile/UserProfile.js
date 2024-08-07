import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './UserProfile.css';
import { useNavigate } from 'react-router-dom';
import { getUserApi, updateUserApi } from '../../Api/Api';
import Swal from 'sweetalert2';
import Footer from '../../Header/Footer';

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  username: yup.string().required('Username is required'),
  phoneNumber: yup
    .number()
    .integer('Phone Number must be an integer')
    .typeError('Phone Number must be a valid number')
    .positive('Phone Number must be a positive number')
    .test('len', 'Phone Number must be exactly 10 digits', (val) => val && val.toString().length === 10)
    .required('Phone Number is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
});

const UserProfile = () => {
  const Navigate = useNavigate();
  const userId = localStorage.getItem('uId');
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserApi();
        setValue('firstName', response.data.firstname);
        setValue('lastName', response.data.lastname);
        setValue('username', response.data.username);
        setValue('phoneNumber', response.data.phone);
        setValue('email', response.data.email);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId, setValue]);

  const onSubmit = async (data) => {
    const response = await updateUserApi(data);
    console.log(response.data.data.firstName);
    localStorage.setItem('name', response.data.Data.name);
    if (response.status === 201) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'User details updated successfully',
      });
      Navigate('/productlist');
      
    }
    console.log('Form data:', data);
  };

  return (
    <>
      <div className='main_container'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='profile-container'>
            <Typography variant="h5">Edit Profile</Typography>
            <div className="profile-form">
              <div className='textname'>
                <div>
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    {...register('firstName')}
                  />
                  {errors.firstName && <p>{errors.firstName.message}</p>}
                </div>
                <div>
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    {...register('lastName')}
                  />
                  {errors.lastName && <p>{errors.lastName.message}</p>}
                </div>
              </div>
              <div className='textname'>
                <div>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    placeholder="Username"
                    {...register('username')}
                  />
                  {errors.username && <p>{errors.username.message}</p>}
                </div>
                <div>
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    {...register('phoneNumber')}
                  />
                  {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  id='email'
                  type="email"
                  placeholder="Email"
                  readOnly
                  {...register('email')}
                />
                {errors.email && <p>{errors.email.message}</p>}
              </div>
              <div style={{ marginTop: '16px' }}>
                <Button
                  variant="contained"
                  type='submit'
                  size='large'
                  style={{ backgroundColor: '#563517', color: 'white' }}
                >
                  Save Changes
                </Button>
                <Button
                  variant="contained"
                  size='large'
                  style={{ backgroundColor: '#563517', color: 'white', marginLeft: "50px" }}
                  onClick={() => {
                    Navigate('/productlist');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
