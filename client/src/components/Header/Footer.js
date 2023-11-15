import React from 'react';
import { AppBar, Toolbar, Typography, Link, Box, Grid, Button } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    const socialMediaIconStyle = {
        '&:hover': {
            color: 'orange',
        },
    };

    const linkStyle = {
        textDecoration: 'none', // Remove underline from links
        color: 'inherit', // Use the default color
        margin: '0 20px',
    };

    return (
        <AppBar position="static" style={{ backgroundColor: '#563517', color: 'white' }}>
            <Toolbar position="absolute">
                <Grid container justifyContent="space-between">
                    <Grid item xs={12} sm={6}>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Typography variant="body2">
                                &copy; {new Date().getFullYear()} Your Online Store. All rights reserved.
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Link href="/about" style={linkStyle}>
                                About Us
                            </Link>
                            <Link href="/about" style={linkStyle}>
                                Contact Us
                            </Link>
                            <Link style={linkStyle}>
                                Privacy Policy
                            </Link>
                            <Link style={linkStyle}>
                                Terms and Conditions
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Button
                                variant="text"
                                color="inherit"
                                href="https://www.facebook.com/youronlinestore"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={socialMediaIconStyle}
                            >
                                <FacebookIcon />
                            </Button>
                            <Button
                                variant="text"
                                color="inherit"
                                href="https://www.instagram.com/youronlinestore"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={socialMediaIconStyle}
                            >
                                <InstagramIcon />
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;
