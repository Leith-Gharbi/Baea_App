import React, { useEffect } from 'react';
import {
  makeStyles,
  Paper,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Face, Fingerprint } from '@material-ui/icons';
import { useState } from 'react';
import Form from '../controls/Form';
import { UseForm } from '../../hooks/UseForm';
import { useDispatch } from 'react-redux';
import { LoginSuccess } from '../../redux/actions/AuthActions';
import { AUTH_URL } from '../../api';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(1),
  },
}));
const initialFieldValues = {
  email: '',
  password: '',
};
const Login = (props) => {
  const { values, handleInputChange, setLogged } = UseForm(initialFieldValues);

  const { showLogin, setShowLogin, notify, setNotify } = props;
  const classes = useStyles();
  const [name, setName] = useState('');

  const dispatch = useDispatch();
  const submitOrder = async (e) => {
    e.preventDefault();
    await fetch(AUTH_URL + 'Auth/Login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message == 'success') {
          setLogged(true);
          setNotify({ isOpen: true, message: 'تمت عملية الدخول بنجاح' });
          dispatch(LoginSuccess({ isLogged: true, ...data.user }));
          setShowLogin(false);
        } else {
          dispatch(LoginSuccess({ isLogged: false }));
          setLogged(false);
          setShowLogin(true);
          setNotify({
            isOpen: true,
            type: 'error',
            message: 'الرجاء التثبت من المعطيات',
          });
        }
      });
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(AUTH_URL + 'auth/user', {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (response.status == 200) {
          const content = await response.json();
          dispatch(LoginSuccess({ isLogged: true, ...content }));
          setName(content.matricule);
          setLogged(true);
        } else {
          const NoUserLogged = { isLogged: false };
          dispatch(LoginSuccess(NoUserLogged));
        }
      } catch (error) {
        const NoUserLogged = { isLogged: false };
        dispatch(LoginSuccess(NoUserLogged));
      }
    })();
  }, []);

  return (
    <>
      <Dialog
        className={classes.root}
        fullWidth
        maxWidth="sm"
        open={showLogin}
        onClose={() => setShowLogin(false)}
      >
        <DialogContent className={classes.padding}>
          <h1>
            {' '}
            {name
              ? 'HI YOUR MATRICULE IS ' + name
              : ' YOU are not athenticated '}
          </h1>
          <Paper className={classes.padding}>
            <div className={classes.margin}>
              <Form onSubmit={submitOrder}>
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    <Face />
                  </Grid>
                  <Grid item md={true} sm={true} xs={true}>
                    <TextField
                      name="email"
                      label="Username"
                      type="email"
                      fullWidth
                      value={values.email}
                      onChange={handleInputChange}
                      autoFocus
                      required
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    <Fingerprint />
                  </Grid>
                  <Grid item md={true} sm={true} xs={true}>
                    <TextField
                      name="password"
                      label="Password"
                      type="password"
                      value={values.password}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <FormControlLabel
                      control={<Checkbox color="primary" />}
                      label="Remember me"
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      disableFocusRipple
                      disableRipple
                      style={{ textTransform: 'none' }}
                      variant="text"
                      color="primary"
                    >
                      Forgot password ?
                    </Button>
                  </Grid>
                </Grid>
                <Grid
                  container
                  justifyContent="center"
                  style={{ marginTop: '10px' }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    type="submit"
                    style={{ textTransform: 'none' }}
                  >
                    Login
                  </Button>
                </Grid>
              </Form>
            </div>
          </Paper>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Login;
