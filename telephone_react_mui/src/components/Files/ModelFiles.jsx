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
import { BASE_URL, createAPIEndpointCorps, ENDPOINTS } from '../../api';
import { useSelector } from 'react-redux';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { makeStyles } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import { UseForm } from '../../hooks/UseForm';
import Form from '../controls/Form';
import { corpsForEdit } from '../../redux/actions/corpsActions';
import axios from 'axios';

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

export default function ModelFiles(props) {
  const User = useSelector((state) => state.user);
  const baseSelected = useSelector((state) => state.base);
  const CorpsForEdit = useSelector((state) => state.corpstoEdit);
  const edit = useSelector((state) => state.corpstoUpdate.edit);

  const { open, setOpen, showLogin, setNotify, setShowLogin } = props;

  const initialCorpValues = {
    selectedFile: '',
    status: '',
    progress: 0,
    name: '',
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

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];

      alert(imageFile.name);
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          imageFile: imageFile,
          imageSrc: x.target.result,
          name: imageFile.name,
        });
      };

      reader.readAsDataURL(imageFile);
    } else {
      setValues({ ...values, imageFile: null, imageSrc: defaultImageSrc });
    }
  };

  const selectFileHandler = (event) => {
    //1. define the array for the file type e.g. png, jpeg
    const fileTypes = ['image/png', 'image/jpeg'];

    // 2. get the file type
    let file = event.target.files;
    console.log(`File ${file}`);
    // 3. the message for error if the file type of not matched
    let errMessage = [];
    // 4. to check the file type to match with the fileTypes array iterate
    // through the types array
    if (fileTypes.every((extension) => file[0].type != extension)) {
      errMessage.push(`The file ${file.type} extension is not supported`);
    } else {
      let filename = file[0].name.split('.');
      setValues({
        ...values,
        selectedFile: file[0],
        name: filename[0],
      });
    }
  };
  // method contain logic to upload file
  const uploadHandler = (event) => {
    // 1. the FormData object that contains the data to be posted to the
    // WEB API
    const formData = new FormData();

    formData.append('uploadedfile', values.selectedFile);
    formData.append('filename', values.name);

    // 2. post the file to the WEB API
    axios
      .post(BASE_URL + 'Report/Upload', formData, {
        onUploadProgress: (progressEvent) => {
          setValues({
            ...values,
            progress: (progressEvent.loaded / progressEvent.total) * 100,
          });
        },
      })
      .then((response) => {
        setValues({
          ...values,
          status: `upload success ${response.data}`,
        });
        setOpen(false);
        setNotify({ isOpen: true, message: 'تمت الإضافة بنجاح ' });
      })
      .catch((error) => {
        setValues({
          ...values,
          status: `upload failed ${error}`,
        });

        setNotify({
          isOpen: true,
          type: 'error',
          message: `upload failed ${error}`,
        });
      });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Form onSubmit={submitOrder}>
          <Box width="286px" p={2} textAlign="center">
            <input
              type="file"
              className={classes.input}
              id="contained-button-file-popup"
              accept="image/*"
              onChange={selectFileHandler}
            ></input>
            <label htmlFor="contained-button-file-popup">
              <Fab component="span" className={classes.button}>
                <AddPhotoAlternateIcon />
              </Fab>
            </label>
            <TextField
              style={{ marginBottom: 20 }}
              fullWidth
              name="name"
              margin="dense"
              variant="outlined"
              label="الإسم الكامل"
              id="fullName"
              value={values.name}
              onChange={handleInputChange}
            />

            <hr />
            <div>{values.progress}</div>
            <br />
            <div>{values.status}</div>
            <Grid item xs={12}>
              <ButtonGroup className={classes.submitbuttonGroup}>
                <MuiButton
                  size="large"
                  // type="submit"
                  onClick={uploadHandler}
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
