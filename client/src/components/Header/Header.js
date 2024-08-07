import React from 'react';
import { AppBar, Toolbar, Avatar, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const HeaderBox = styled('div')({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
        transform: 'scale(1.05)',
        transition: 'transform 0.3s ease-in-out',
    },
});

const Headerr = styled(AppBar)({
    backgroundColor: '#563517',
});

const Header = () => {
    return (
        <Headerr position="static">
            <Toolbar>
                <HeaderBox>
                    <Link to="/productlist" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography variant="h6" noWrap>
                            CellCart
                        </Typography>
                    </Link>
                </HeaderBox>
            </Toolbar>
        </Headerr>
    );
};

export default Header;
