import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import SimpleSnackbar from '../features/Contacts/ContactsSnack';
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import gitHubIcon from '../assets/githubblack.png'
import linkdinIcon from '../assets/LinkedIN.png'
import coolDeveloperLogo from '../assets/linkdinphoto.jpeg'
import mikeTyler from '../assets/mikeTyler.jpeg'
import ContactsCard from '../features/Contacts/ContactsCard';
import coolBatman from '../assets/batman.jpeg'
import coreyPlaceholder from "../assets/coreyplaceholder.png"
import tylerPicture from '../assets/half-body-headshot-tyler.jpg'
import demondPicture from '../assets/Kitchen-Brown-Background-Crop.png'
import coreyPicture from '../assets/ProfilePicture.png'
import philPicture from '../assets/Phil-Headshot-Resized.jpg'

export default function Contacts() {
  const [ firstName, setFirstName ] = useState("")
  const [ lastName, setLastName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ message, setMessage ] = useState("")

  const handleFirstName = (e) => setFirstName(e.target.value)
  const handleLastName = (e) => setLastName(e.target.value)
  const handleEmail = (e) => setEmail(e.target.value)
  const handleMessage = (e) => setMessage(e.target.value)

  const handleSnackbarClick = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setMessage('');
  };

  const teamMembers = [
    {
      name: 'Phillip Basti',
      role: 'Full Stack Software Engineer, with experience building full stack applications utilizing Django, React, PostgreSQL, Docker, and AWS.',
      imageSrc: `${philPicture}`, // Replace with actual image paths
      socialLinks: [
        { url: 'https://github.com/successPhil', icon: `${gitHubIcon}` },
        { url: 'https://www.linkedin.com/in/phillip-basti/', icon: `${linkdinIcon}` },
        // Add other social links as needed
      ],
    },
    {
      name: 'Tyler Kendall',
      role: `A seasoned diesel technician turned full-stack software engineer, bringing a decade of marriage, two kids, and a third on the way. Enthusiastic about coding, cooking, gaming, and outdoor adventures.`,
      imageSrc: `${tylerPicture}`, // Replace with actual image paths
      socialLinks: [
        { url: 'https://github.com/successPhil', icon: gitHubIcon },
        { url: 'https://www.linkedin.com/in/phillip-basti/', icon: linkdinIcon },
        // Add other social links as needed
      ],
    },
    {
      name: 'Demond Gildon',
      role: 'Full Stack Developer with a focus on Software Engineering, Extensive experience crafting end-to-end solutions, Mastery in Django, React, PostgreSQL, Docker, and AWS technologies',
      imageSrc: `${demondPicture}`, // Replace with actual image paths
      socialLinks: [
        { url: 'https://github.com/successPhil', icon: `${gitHubIcon}` },
        { url: 'https://www.linkedin.com/in/phillip-basti/', icon: `${linkdinIcon}` },
        // Add other social links as needed
      ],
    },
    {
      name: 'Corey Sullivan',
      role: 'Accomplished Full Stack Software Engineer, Expertise in developing robust applications, Utilizes a tech stack including Django, React, PostgreSQL, Docker, and AWS',
      imageSrc: `${coreyPicture}`, // Replace with actual image paths
      socialLinks: [
        { url: 'https://github.com/successPhil', icon: `${gitHubIcon}` },
        { url: 'https://www.linkedin.com/in/phillip-basti/', icon: `${linkdinIcon}` },
        // Add other social links as needed
      ],
    },
    // Add more team members as needed
  ];



    return (
      <div>
          <div className="container">
            <div className="">
      <div className="row">
        {teamMembers.map((member, index) => (
          <div key={index} className="col-lg-3 col-md-6 mb-4 mt-4">
            <ContactsCard
              name={member.name}
              role={member.role}
              imageSrc={member.imageSrc}
              socialLinks={member.socialLinks}
              className="contacts-card"
            />
          </div>
        ))}
      </div>
    </div>
        {/* <ContactsCard name={teamMembers.name} role={teamMembers.role} imageSrc={teamMembers.imageSrc} socialLinks={teamMembers.socialLinks}/> */}
        <div className="contact-form">
      <h1 className='contact-title'>Contact Us</h1>
      <FormControl component="form">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            required
            id="first-name"
            label="First Name"
            value={firstName}
            onChange={handleFirstName}
            fullWidth
            color="secondary"
            InputLabelProps={{
              style: { color: '#362417'},
              shrink: true, 
            }}
            InputProps={{
              style: { color: '#362417', backgroundColor: '#F9ECCC' }}}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="last-name"
            label="Last Name"
            value={lastName}
            onChange={handleLastName}
            fullWidth
            color="secondary"
            InputLabelProps={{
              style: { color: '#362417'},
              shrink: true, 
            }}
            InputProps={{
              style: { color: '#362417', backgroundColor: '#F9ECCC' }}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            label="Email Address"
            value={email}
            onChange={handleEmail}
            fullWidth
            color="secondary"
            InputLabelProps={{
              style: { color: '#362417'},
              shrink: true, 
            }}
            InputProps={{
              style: { color: '#362417', backgroundColor: '#F9ECCC' }}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="message"
            label="Message"
            value={message}
            onChange={handleMessage}
            multiline
            rows={4} // Adjust the number of rows as needed
            fullWidth
            color="secondary"
            InputLabelProps={{
              style: { color: '#362417'},
              shrink: true, 
            }}
            InputProps={{
              style: { color: '#362417', backgroundColor: '#F9ECCC' }}}
          />
        </Grid>
      </Grid>
      </FormControl>
      <div style={{marginTop: '20px'}}>
      <SimpleSnackbar handleSnackbarClick={handleSnackbarClick}/>
      </div>
    </div>
    </div>
    </div>
  );
}