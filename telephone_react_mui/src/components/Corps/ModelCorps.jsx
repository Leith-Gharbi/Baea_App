import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  TextField,
  Fab,
  Grid,
  ButtonGroup,
  Button as MuiButton,
} from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';
import { createAPIEndpointCorps, ENDPOINTS, URL_IMAGES } from '../../api';
import { useDispatch, useSelector } from 'react-redux';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { makeStyles } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import { UseForm } from '../../hooks/UseForm';
import Form from '../controls/Form';
import { corpsForEdit } from '../../redux/actions/corpsActions';
import { useLocation } from 'react-router-dom';

const defaultImageSrc = '/img/AddImg.png';

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
    color: blue[800],
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    align: 'center',
  },
  button: {
    color: blue[900],
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

export default function ModelCorps(props) {
  const User = useSelector((state) => state.user);
  const baseSelected = useSelector((state) => state.base);
  const CorpsForEdit = useSelector((state) => state.corpstoEdit);
  const edit = useSelector((state) => state.corpstoUpdate.edit);

  const {
    open,
    setOpen,
    showLogin,
    setNotify,
    setShowLogin,
    SetCorpsList,
    CorpsList,
  } = props;

  const initialCorpValues = {
    baseID: edit ? CorpsForEdit.baseID : baseSelected.baseID,
    corpsId: edit ? CorpsForEdit.corpsId : '',
    fullName: edit ? CorpsForEdit.fullName : '',
    shortName: edit ? CorpsForEdit.shortName : '',
    imageName: edit ? CorpsForEdit.imageName : '',
    imageSrc: edit ? CorpsForEdit.imageSrc : defaultImageSrc,
    imageFile: null,
  };
  const {
    values,
    setValues,
    handleInputChange,
    errors,
    setErrors,
    resetFormContols,
    Logged,
    setLogged,
  } = UseForm(initialCorpValues);

  useEffect(() => {
    if (edit) {
      setValues(initialCorpValues);
    }
  }, [edit]);

  const classes = useStyles();
  const adImage = '/img/AddImg.png';

  useEffect(() => {
    User.isLogged ? setLogged(true) : setLogged(false);
  }, [User]);

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          imageFile: imageFile,
          imageSrc: x.target.result,
        });
      };

      reader.readAsDataURL(imageFile);
    } else {
      setValues({ ...values, imageFile: null, imageSrc: defaultImageSrc });
    }
  };

  const validate = () => {
    let temp = {};
    temp.fullName = values.fullName == '' ? false : true;
    temp.fullName = values.shortName == '' ? false : true;
    temp.imageSrc = values.imageSrc == defaultImageSrc ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x == true);
  };

  const submitOrder = (e) => {
    e.preventDefault();
    if (Logged) {
      const formData = new FormData();
      formData.append('baseID', baseSelected.baseID);
      formData.append('fullName', values.fullName);
      formData.append('shortName', values.shortName);
      formData.append('imageName', values.imageName);
      formData.append('imageFile', values.imageFile);
      if (validate()) {
        if (edit) {
          formData.append('corpsId', CorpsForEdit.corpsId);
          createAPIEndpointCorps(ENDPOINTS.CORPS)
            .update(values.corpsId, formData)
            .then((res) => {
              console.log('res= ', res);
              setOpen(false);
              setNotify({ isOpen: true, message: 'تمت عملية التحيين بنجاح' });

              SetCorpsList(
                CorpsList.map((x) =>
                  x.corpsId == values.corpsId
                    ? {
                        ...x,
                        fullName: values.fullName,
                        shortName: values.shortName,
                      }
                    : x
                )
              );
            })
            .catch((err) => console.log(err));
        } else {
          createAPIEndpointCorps(ENDPOINTS.CORPS)
            .create(formData)
            .then((res) => {
              setOpen(false);
              setNotify({ isOpen: true, message: 'تمت عملية الإضافة بنجاح' });
            })
            .catch((err) => console.log(err));
        }
      }
    } else {
      setShowLogin(true);
    }
  };
  const dispatch = useDispatch();

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          dispatch(corpsForEdit(false));
        }}
      >
        <Form onSubmit={submitOrder}>
          <Box width="286px" p={2} textAlign="center">
            <input
              type="file"
              className={classes.input}
              id="contained-button-file-popup"
              accept="image/*"
              onChange={showPreview}
            ></input>
            <label htmlFor="contained-button-file-popup">
              <Fab component="span" className={classes.button}>
                <AddPhotoAlternateIcon />
              </Fab>
            </label>
            <img
              width="300px"
              height="300px"
              className={classes.media}
              src={values.imageSrc}
            />

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
                  {edit ? 'تحيين' : 'أضافة'}
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
      </Dialog>
    </div>
  );
}
