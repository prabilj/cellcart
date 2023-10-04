// Users.js
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import './Users.css';
import Sidebar from '../Sidebar/Sidebar';

const Users = () => {
  // Sample user data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'url-to-john-avatar.jpg',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: 'url-to-jane-avatar.jpg',
    },
    // Add more user objects as needed
  ]);

  // Function to generate a random color based on user's ID
  const getRandomColor = (id) => {
    const colors = [
      "#FF5733", // Example colors, you can add more
      "#33FF57",
      "#5733FF",
    ];
    const index = id % colors.length;
    return colors[index];
  };

  // Function to delete a user by ID
  const deleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="users-page">
        <h1>Users</h1>
        <div className="user-list">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <div className="avatar-container">
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    fontSize: 36,
                    backgroundColor: getRandomColor(user.id),
                  }}
                >
                  {user.name[0]}
                </Avatar>
              </div>
              <div className="user-info">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </div>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
