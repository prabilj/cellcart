import React from 'react';
import { AppBar, Toolbar, Avatar } from '@mui/material';
import { styled } from '@mui/system';

const Headerr = styled(AppBar)({
    backgroundColor: '#563517',
});

const Header = () => {
    return (
        <Headerr position="static">
            <Toolbar>
                <div style={{ marginLeft: 'auto' }}>
                    <Avatar alt="User" src="/path/to/user-avatar.jpg" />
                </div>
            </Toolbar>
        </Headerr>
    );
};

export default Header;
