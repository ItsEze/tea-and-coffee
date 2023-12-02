import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import SimpleSnackbar from '../features/Contacts/ContactsSnack';
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';

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



    return (
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
  );
}