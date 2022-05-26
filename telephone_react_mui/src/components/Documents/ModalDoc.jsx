import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import { Avatar, Grid, makeStyles } from '@material-ui/core';

import blue from '@material-ui/core/colors/blue';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1.5),
      width: theme.spacing(30),
      height: theme.spacing(30),
    },
  },
  card: {
    backgroundColor: '#d6d6d6',
    borderColor: 'red',
    '&:hover': {
      backgroundColor: '#9e9e9e',
      transform: 'scale(1.02)',
      border: `3px solid ${blue[700]}`,
    },
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    // marginTop : theme.spacing(3),
    '& .MuiAvatar-root': {
      margin: 'auto !important',
      justifyContent: 'centre',
    },
  },
  imgCard: {
    justifyContent: 'centre',
    textAlign: 'centre',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function CustomizedDialogs(props) {
  const { id, fullName, shortName, ImageSrc, contenu, ...other } = props;
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<ZoomOutMapIcon />}
        onClick={handleClickOpen}
        className={classes.button}
      >
        {fullName}
      </Button>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          textAlign="center"
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {fullName}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <h3 dir="rtl"> الوثائق المطلوبة</h3>
          <hr></hr>

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Avatar
                alt="Remy Sharp"
                src={ImageSrc}
                className={classes.large}
                classes={{ root: classes.imgCard }}
              />
            </Grid>
            <Grid item xs={8}>
              <div dir="rtl" dangerouslySetInnerHTML={{ __html: contenu }} />
            </Grid>
          </Grid>

          {/* <div dir="rtl" dangerouslySetInnerHTML={{ __html: contenu }} />
          <Avatar
            alt="Remy Sharp"
            src={ImageSrc}
            className={classes.large}
            classes={{ root: classes.imgCard }}
          /> */}
        </DialogContent>
        <DialogActions>
          {/* <Button autoFocus onClick={handleClose}>
            Save changes
          </Button> */}
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
