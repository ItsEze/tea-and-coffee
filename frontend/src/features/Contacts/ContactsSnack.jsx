import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function SimpleSnackbar( {handleSnackbarClick}) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
    handleSnackbarClick()
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };



  return (
    <div>
      <Button onClick={handleClick} sx={{ fontWeight: 'bold', fontSize: '1.0rem', color: '#F9ECCC', backgroundColor: '#362417'}} >Submit</Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          <span>Thanks for submitting your info, we'll be in contact soon</span>
        </Alert>
      </Snackbar>
    </div>
  );
}