import { React, useEffect, useState } from 'react';
//Card
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

import { makeStyles } from '@material-ui/core';
const defaultImageSrc = '/images/add-image.png';

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
    '&:hover': {
      color: red[800],
    },
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

export const ImageLoader = (props) => {
  const { values, setValues } = props;
  const classes = useStyles();

  const imageResetHandler = (event) => {
    console.log('Click!');
    //setImage(null);
  };

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      let imageName = imageFile.name;
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          imageName,
          imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...values,
        imageFile: null,
        imageSrc: defaultImageSrc,
      });
    }
  };
  return (
    <>
      <CardContent>
        <Grid container justifyContent="center" alignItems="center">
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            onChange={showPreview}
          />
          <label htmlFor="contained-button-file">
            <Fab component="span" className={classes.button}>
              <AddPhotoAlternateIcon />
            </Fab>
          </label>
          <CardActionArea
            onClick={imageResetHandler}
            justify="centre"
            alignItems="center"
          >
            <img
              width="300px"
              height="300px"
              className={classes.media}
              src={values.imageSrc}
            />
          </CardActionArea>
        </Grid>
      </CardContent>
    </>
  );
};
