import React, { useState } from 'react';
import axios from 'axios';
import './NavigationBar.css';
import {
    AppBar,
    Toolbar,
    IconButton,
    Button,
    ThemeProvider,
    createTheme,
    responsiveFontSizes,
    useMediaQuery,
    Box,
    Menu, 
    MenuItem, 
    Avatar,
} from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


const NavigationBar = () => {
    const name = localStorage.getItem("name")
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(null); // Use null to control Menu visibility
    const [anchorEl, setAnchorEl] = useState(null); // Anchor element for the Menu

    let theme = createTheme({
        palette: {
            type: prefersDarkMode ? 'dark' : 'light',
            primary: {
                main: '#ffff',
            },
        },
    });

    theme = responsiveFontSizes(theme);

    const handleProfileButtonClick = (event) => {
        setAnchorEl(event.currentTarget); // Set anchor element for Menu
        setIsProfileMenuOpen(true); // Open the Menu
    };

    const handleCloseProfileMenu = () => {
        setIsProfileMenuOpen(false); // Close the Menu
    };

    const handleLogOut = () => {
        const userToken = localStorage.getItem('userToken')

        axios
            .post('http://localhost:3000/logout', { userToken })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        localStorage.removeItem('userToken', 'uId');
        window.location.href = '/login';
        console.log('user logout');
    };

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static" style={{ width: '100%', height: '80px' }}>
                <Toolbar>
                    <div className="center">
                        <IconButton color="inherit" component={Link} to="/productlist">
                            CellCart
                        </IconButton>
                    </div>

                    <Box flexGrow={1} />
                    <Button color="inherit" component={Link} to="/productlist">
                        Products
                    </Button>

                    <Box flexGrow={1} />
                    <Button color="inherit" component={Link} to="/cart">
                        <IconButton color="inherit">
                            <ShoppingCartIcon />
                        </IconButton>
                    </Button>
                    <Button color="inherit" component={Link} to="/wishlist">
                        <IconButton color="inherit">
                            <FavoriteIcon />
                        </IconButton>
                    </Button>
                    <Button color="inherit" onClick={handleProfileButtonClick}>
                        <IconButton color="inherit">
                            <Avatar style={{ backgroundColor: '#563517', color: 'white' }}>{name.charAt(0)}</Avatar>
                        </IconButton>
                    </Button>

                    {/* Profile Dropdown */}
                    <Menu
                        anchorEl={anchorEl}
                        open={isProfileMenuOpen}
                        onClose={handleCloseProfileMenu}
                    >
                        <MenuItem >
                            <h3>{name}</h3>
                        </MenuItem>
                        <MenuItem component={Link} to="/editprofile" onClick={handleCloseProfileMenu}>
                            Edit Profile
                        </MenuItem>
                        <MenuItem component={Link} to="/changepassword" onClick={handleCloseProfileMenu}>
                            Change Password
                        </MenuItem>
                        <MenuItem onClick={handleLogOut}>
                            <ExitToAppIcon />
                            Logout
                        </MenuItem>
                    </Menu>
                    {/* End of Profile Dropdown */}
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
};

export default NavigationBar;
