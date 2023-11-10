import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const NotFound = () => {
    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 'calc(100vh - 64px)', 
                }}
            >
                <Typography variant="h3">404 - Not Found</Typography>
                <Typography variant="body1">
                    The page you are looking for does not exist.
                </Typography>
            </Box>
        </Container>
    );
};

export default NotFound;
