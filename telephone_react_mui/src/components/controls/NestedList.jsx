import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ReplayIcon from '@material-ui/icons/Replay';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddCommentSharpIcon from '@mui/icons-material/AddCommentSharp';
import { UseForm } from '../../hooks/UseForm';
import { makeStyles } from '@material-ui/core';

import Form from './Form';
import {
  Box,
  Typography,
  Button,
  Dialog,
  TextField,
  Fab,
  Grid,
  ButtonGroup,
  Button as MuiButton,
} from '@material-ui/core';
import { createAPIEndpointService, ENDPOINTS } from '../../api';
import { useSelector } from 'react-redux';
import { blue } from '@material-ui/core/colors';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  icon: {
    margin: theme.spacing(2),
  },
  iconHover: {
    margin: theme.spacing(2),
    '&:hover': {},
  },
  cardHeader: {
    textalign: 'center',
    align: 'center',
    backgroundColor: 'white',
  },
  input: {
    display: 'none',
  },
  title: {
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    align: 'center',
  },
  button: {
    margin: 10,
  },
  secondaryButton: {
    color: 'gray',
    margin: 10,
  },
  typography: {
    margin: theme.spacing(2),
    backgroundColor: 'default',
  },

  searchRoot: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
  },
  searchIconButton: {
    padding: 10,
  },
  searchDivider: {
    width: 1,
    height: 28,
    margin: 4,
  },
  media: {},
}));
const initialCorpValues = () => ({
  corpsID: '',
  fullName: '',
  shortName: '',
  tel: 0,
});
export default function NestedList() {
  const {
    Corps,
    setCorps,
    values,
    setValues,
    handleInputChange,
    errors,
    setErrors,
    resetFormContols,
  } = UseForm(initialCorpValues());
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const validate = () => {
    let temp = {};
    temp.fullName = values.fullName == '' ? false : true;
    temp.shortName = values.shortName == '' ? false : true;
    temp.tel = values.temp == '' ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x == true);
  };
  const corps = useSelector((state) => state.corps);
  console.log('corps = ', corps);
  const submitOrder = (e) => {
    e.preventDefault();
    if (validate()) {
      values.corpsID = corps.corpsId;
      values.tel = parseInt(values.tel);
      console.log('data= ', values);
      createAPIEndpointService(ENDPOINTS.SERVICES)
        .create(values)
        .then((res) => {
          setOpen(false);
          alert('done');
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton
        style={{ backgroundColor: '#599ede' }}
        onClick={handleClick}
      >
        <ListItemIcon>
          <AddCommentSharpIcon />
        </ListItemIcon>
        <ListItemText primary="إضافة مصلحة" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Form onSubmit={submitOrder}>
          <Box width="286px" p={2} textAlign="center">
            <TextField
              style={{ marginBottom: 20 }}
              fullWidth
              name="shortName"
              margin="dense"
              variant="outlined"
              value={values.shortName}
              label="الإسم المختصر"
              id="shortName"
              onChange={handleInputChange}
            />
            <TextField
              style={{ marginBottom: 20 }}
              fullWidth
              name="fullName"
              margin="dense"
              variant="outlined"
              label="الإسم الكامل"
              id="fullName"
              value={values.fullName}
              onChange={handleInputChange}
            />
            <TextField
              style={{ marginBottom: 20 }}
              fullWidth
              name="tel"
              margin="dense"
              variant="outlined"
              label="رقم الهاتف"
              id="tel"
              value={values.tel}
              onChange={handleInputChange}
            />
            <Grid item xs={12}>
              <ButtonGroup className={classes.submitbuttonGroup}>
                <MuiButton
                  size="large"
                  type="submit"
                  color="primary"
                  variant="contained"
                  color="primary"
                  endIcon={<AddCircleIcon />}
                >
                  إضافة
                </MuiButton>
                <MuiButton
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={resetFormContols}
                  startIcon={<ReplayIcon />}
                ></MuiButton>
              </ButtonGroup>
            </Grid>
          </Box>
        </Form>
      </Collapse>
    </List>
  );
}
