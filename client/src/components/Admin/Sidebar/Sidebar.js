import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  // State to track the visibility of "Add Product" and "Product List" buttons
  const [showProductButtons, setShowProductButtons] = useState(false);

  // Function to toggle the visibility of the product buttons
  const toggleProductButtons = () => {
    setShowProductButtons(!showProductButtons);
  };

  return (
    <Drawer variant="permanent">
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/users">
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button onClick={toggleProductButtons}>
          <ListItemText primary="Products" />
        </ListItem>
        {/* Conditional rendering of "Add Product" and "Product List" buttons */}
        {showProductButtons && (
          <>
            <ListItem button component={Link} to="/addproduct">
              <ListItemText primary="Add Products" />
            </ListItem>
            <ListItem button component={Link} to="/viewproducts">
              <ListItemText primary="Product List" />
            </ListItem>
          </>
        )}
        <ListItem button component={Link} to="/settings">
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
