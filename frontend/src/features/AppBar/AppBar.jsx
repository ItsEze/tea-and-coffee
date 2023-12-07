import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../../contexts/UserContext';



const menuItems = [
    {
      label: 'Favorites',
      path: "favorites"
    },
    {
      label: 'Coffee',
      path: 'coffee',
    },
    {
      label: 'About',
      path: 'about',
    },
    {
      label: 'Contact Us',
      path: 'contacts'
    },
  ];

export default function ResponsiveAppBar({handleLogout}) {
  const {userData } = useContext(UserContext)
  return (
    <AppBar position="static" sx={{ backgroundColor: '#3C180E' /* Brown color */ }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
            <Box sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'space-between',
              alignItems: 'center', // Center items vertically
            }}>
            <Link to='/profile' style={{ textDecoration: 'none' }}>
              <div className='profile-menu-button'>
                <Avatar src={userData?.picture} alt='Profile Avatar'/>
                <Button
                  sx={{
                  mx:3,
                  my: 2,
                  display: 'block',
                  fontFamily: 'Montserrat-Regular, sans-serif',
                  fontSize: '2.0rem',
                  color: '#cacfcd',
                  }}
                  >My Profile
                    </Button>
              </div> 
            </Link>
            {menuItems.map((buttonInfo) => (
                <Link to={buttonInfo.path} key={`link${buttonInfo.label}`} style={{ textDecoration: 'none' }}>
                    <Button
                        key={`button${buttonInfo.label}`}
                        sx={{
                            mx:3,
                            my: 2,
                            display: 'block',
                            fontFamily: 'Montserrat-Regular, sans-serif',
                            fontSize: '2.0rem',
                            color: '#cacfcd', 
                          }}
                    >
                    {buttonInfo.label}
                    </Button>
              </Link>
             
           
            ))}
             <Link to="/" id="logout" style={{ textDecoration: 'none' }} >
              <Button onClick={handleLogout}
              variant="outlined"
              sx={{
                color: 'red',
                borderColor: 'red',
                mx:3,
                my: 2,
                display: 'block',
              }}>
                    Logout
                    </Button>
          </Link>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}