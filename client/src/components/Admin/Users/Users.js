import React, { useEffect, useState } from 'react';
import { deleteUsersApi, displayUsersApi } from '../../Api/Api';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import './Users.css';
import Sidebar from '../Sidebar/Sidebar';
import { Button } from '@mui/material';

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

  const getRandomColor = (_id) => {
    const colors = [
      "#FF5733",
      "#33FF57",
      "#5733FF",
    ];
    const index = _id % colors.length;
    return colors[index];
  };

  const handleDeleteUser = async (userId) => {
    try {
      // Send a DELETE request to delete the user by their ID
      //await deleteUsersApi(userId);

    
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
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
