// TeamMemberCard.js
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const ContactsCard = ({ name, role, imageSrc, socialLinks }) => {
  return (
    <Card>
      <img
        src={imageSrc}
        alt={name}
        style={{
          width: '100%',
          height: '350px', // Adjust the height as needed
          objectFit: 'cover', // Preserve aspect ratio while covering the container
        }}
      />
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="subtitle1">{role}</Typography>
        <Grid container spacing={1} justifyContent="center">
          {socialLinks.map((link, index) => (
            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
              <img src={link.icon} alt={link.url} className="social-icon" />
            </a>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ContactsCard;
