import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import './Users.css';
import Sidebar from '../Sidebar/Sidebar';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';

import { deleteUsersApi, displayUsersApi } from '../../Api/Api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await displayUsersApi();
        const userData = response.data?.data?.data || [];
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getRandomColor = () => {
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    return randomColor;
  };


  const handleDeleteUser = async (userId) => {
    try {
      // Show a confirmation dialog
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to delete this user.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
      });

      if (result.isConfirmed) {
        // User clicked "Yes, delete it!" button, proceed with the delete action
        const response = await deleteUsersApi(userId);
        console.log("response", response.message)
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));

        // Show a success message after successful deletion
        await Swal.fire('Deleted!', 'The user has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      // Show an error message if the deletion fails
      await Swal.fire('Error!', 'There was an error deleting the user.', 'error');
    }
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="users-page">
        <h1>Users</h1>
        {loading ? (
          <CircularProgress />
        ) : users ? (
          <div className="user-list">
            {users.length > 0 ? (
              users.map((user) => (
                <div key={user._id} className="user-card">
                  <div className="avatar-container">
                    <Avatar
                      className="user-avatar"
                      style={{
                        backgroundColor: getRandomColor(user._id),
                      }}
                    >
                      {user.firstname[0]}
                    </Avatar>
                  </div>
                  <div className="user-info">
                    <h3 className="user-name">{user.firstname}</h3>
                    <p className="user-email">{user.email}</p>
                  </div>
                  <div className="button-container">
                    <Button
                      variant="outlined"
                      color="error"
                      className="delete-button"
                      onClick={() => handleDeleteUser(user._id)} // Use onClick to trigger the delete action
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-users-message">No users found.</p>
            )}
          </div>
        ) : (
          <p className="error-message">Error fetching users.</p>
        )}
      </div>
    </div>
  );
};

export default Users;
