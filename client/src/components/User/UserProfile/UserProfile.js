import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './UserProfile.css';
import { useNavigate } from 'react-router-dom';
import { getUserApi, updateUserApi } from '../../Api/Api'
import Swal from 'sweetalert2';
import Footer from '../../Header/Footer';

const UserProfile = () => {
  const Navigate = useNavigate()
  const userId = localStorage.getItem('uId');

  const [defaultData, setdefaultData] = useState({});
  const { register, handleSubmit } = useForm();

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

  }, [userId]);

  const onSubmit = (data) => {
    const updateUserData = async () => {
      const response = await updateUserApi(data);
      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User details updated successfully',
        });
        Navigate('/productlist');
      }
      console.log('Form data:', data);
    }
    updateUserData();
  };

  return (
    <div className='main_container'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='profile-container'>
          <Typography variant="h5">Edit Profile</Typography>
          <div className="profile-form">
            <div className='textname'>
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  defaultValue={defaultData.firstname}
                  {...register('firstName', { required: true })}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  defaultValue={defaultData.lastname}
                  {...register('lastName', { required: true })}
                />
              </div>
            </div>
            <div className='textname'>
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  defaultValue={defaultData.username}
                  {...register('username', { required: true })}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Phone Number"
                  defaultValue={defaultData.phone}
                  {...register('phoneNumber', { required: true })}
                />
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
                  Navigate('/productlist')
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
      <Footer/>
    </div>
  );
};

export default UserProfile;
