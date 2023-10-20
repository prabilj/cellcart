import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ViewListIcon from '@mui/icons-material/ViewList';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AssignmentIcon from '@mui/icons-material/Assignment'; // Add the Orders icon
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [showProductButtons, setShowProductButtons] = useState(false);
  const navigate = useNavigate();

  const toggleProductButtons = () => {
    setShowProductButtons(!showProductButtons);
  };

  const logout = () => {
    // Perform any logout logic (e.g., clearing user session)
    // Redirect the user to the logout page
    navigate('/login');
  };

  return (
    <Drawer variant="permanent">
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/users">
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItem>
        <ListItem
          button
          onClick={toggleProductButtons}
          style={{ backgroundColor: showProductButtons ? '#563517' : 'transparent' }}
        >
          <ListItemText primary="Products" />
        </ListItem>
        {showProductButtons && (
          <>
            <ListItem button component={Link} to="/addproduct">
              <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Add Products" />
            </ListItem>
            <ListItem button component={Link} to="/viewproducts">
              <ListItemIcon>
                <ViewListIcon />
              </ListItemIcon>
              <ListItemText primary="Product List" />
            </ListItem>
          </>
        )}
        <ListItem button component={Link} to="/orders"> {/* Add Orders Page */}
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>
        <ListItem button onClick={logout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
      <style>
        {`
          .MuiListItem-button:hover {
            background-color: #563517;
            color: #ffffff;
          }
        `}
      </style>
    </Drawer>
  );
};

export default Sidebar;
