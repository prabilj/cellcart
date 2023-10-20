import React, { useEffect, useState } from 'react';
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
    Badge,
} from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
// import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { displayCartApi } from '../Api/Api';


const NavigationBar = () => {
    const name = localStorage.getItem("name")
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(null); // Use null to control Menu visibility
    const [anchorEl, setAnchorEl] = useState(null); // Anchor element for the Menu
    const [cartCount, setCartCount] = useState(0);

    let theme = createTheme({
        palette: {
            type: prefersDarkMode ? 'dark' : 'light',
            primary: {
                main: '#ffff',
            },
            customcolor: {
                main: '#563517'
            }
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
    useEffect(() => {
        displayCartApi()
            .then((response) => {
                //console.log("response of cart", response);
                setCartCount(response.length);
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);
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
                            <Badge badgeContent={cartCount} color="customcolor">
                                <ShoppingCartIcon />
                            </Badge>

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


                    <Menu
                        anchorEl={anchorEl}
                        open={isProfileMenuOpen}
                        onClose={handleCloseProfileMenu}
                    >
                        <MenuItem >
                            <h3>{name}</h3>
                        </MenuItem>
                        <MenuItem component={Link} to="/myorders" onClick={handleCloseProfileMenu}>
                            < LocalMallIcon />
                            My order
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
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
};

export default NavigationBar;


