import React, { useEffect, useState } from 'react';
import blue from '@material-ui/core/colors/blue';
import { makeStyles, Grid, Chip, Avatar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Notification from '../Notification';
import HeaderTitle from '../controls/HeaderTitle';
import Login from '../Login/login';
import axios from 'axios';
import { UseForm } from '../../hooks/UseForm';
import { BASE_URL } from '../../api';
import BaseCards from './BaseCards';
import { setBase } from '../../redux/actions/baseActions';
import BaseModels from './BaseModels';
import SkeletonBase from './SkeletonBase';
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
  search: {
    justifyContent: 'centre',
    textAlign: 'centre',
  },
}));

const BaseListes = () => {
  const classes = useStyles();
  const { notify, setNotify } = UseForm({});

  const bases = useSelector((state) => state.allBases.bases);

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const dispatch = useDispatch();
  const fetchBases = async () => {
    const response = await axios.get(BASE_URL + 'Bases').catch((err) => {
      console.log('error = ', err);
    });

    dispatch(setBase(response.data));
    try {
      setBaseList(response.data);
    } catch (error) {
      setBaseList([]);
    }
  };

  useEffect(() => {
    fetchBases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notify]);

  //Begin  Search key

  const [BaseList, setBaseList] = useState(bases);
  const [BaseToEdit, setBaseToEdit] = useState({});
  const [searchKey, SetSearchKey] = useState('');
  useEffect(() => {
    let x = [...bases];
    if (x.length == 0 || searchKey == '') {
      setBaseList([...bases]);
    } else {
      x = x.filter((y) => {
        return y.fullName.toLowerCase().includes(searchKey.toLocaleLowerCase());
      });
      setBaseList(x);
    }
  }, [searchKey]);

  const SkeletonDisplay = () => {};

  const galleryImageList = [
    'https://raw.githubusercontent.com/dxyang/StyleTransfer/master/style_imgs/mosaic.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
    'https://raw.githubusercontent.com/ShafeenTejani/fast-style-transfer/master/examples/dora-maar-picasso.jpg',
    'https://pbs.twimg.com/profile_images/925531519858257920/IyYLHp-u_400x400.jpg',
    'https://raw.githubusercontent.com/ShafeenTejani/fast-style-transfer/master/examples/dog.jpg',
    'http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg',
  ];

  if (BaseList.length > 0) {
    return (
      <>
        {/* <ImageUpload imageGallery={galleryImageList}></ImageUpload> */}
        <Grid container alignItems="center" justifyContent="center">
          <HeaderTitle
            data={bases}
            open={open}
            setOpen={setOpen}
            searchKey={searchKey}
            SetSearchKey={SetSearchKey}
            setEdit={setEdit}
          ></HeaderTitle>
        </Grid>
        <br></br>
        <Grid container alignItems="center" justifyContent="center">
          <Chip
            style={{ fontSize: 'xx-large ', height: '50px' }}
            color="primary"
            size="medium"
            label={'المنشأة العسكرية'}
            avatar={
              <Avatar
                style={{ height: '70px', width: '70px' }}
                src={'/img/army.png'}
              />
            }
          />
        </Grid>

        <div className={classes.root}>
          {BaseList.map((x) => (
            <BaseCards
              BaseList={BaseList}
              setBaseList={setBaseList}
              key={x.baseID}
              id={x.baseID}
              fullName={x.fullName}
              shortName={x.shortName}
              img={x.imageSrc}
              open={open}
              setOpen={setOpen}
              edit={edit}
              setEdit={setEdit}
              BaseToEdit={BaseToEdit}
              setBaseToEdit={setBaseToEdit}
              setShowLogin={setShowLogin}
              showLogin={showLogin}
            ></BaseCards>
          ))}
        </div>

        <BaseModels
          notify={notify}
          setNotify={setNotify}
          open={open}
          setOpen={setOpen}
          tile="إضافة وحدة"
          edit={edit}
          setEdit={setEdit}
          BaseToEdit={BaseToEdit}
          setBaseToEdit={setBaseToEdit}
          showLogin={showLogin}
          setShowLogin={setShowLogin}
        />

        <Notification notify={notify} setNotify={setNotify} />

        <Grid container spacing={3} justifyContent="center">
          <Login
            showLogin={showLogin}
            setShowLogin={setShowLogin}
            notify={notify}
            setNotify={setNotify}
          ></Login>
        </Grid>
      </>
    );
  } else {
    return (
      <>
        {/* <ImageUpload imageGallery={galleryImageList}></ImageUpload> */}
        <Grid container alignItems="center" justifyContent="center">
          <HeaderTitle
            data={bases}
            open={open}
            setOpen={setOpen}
            searchKey={searchKey}
            SetSearchKey={SetSearchKey}
            setEdit={setEdit}
          ></HeaderTitle>
        </Grid>

        <div className={classes.root}>
          {[...Array(10)].map((x, i) => (
            <SkeletonBase key={i} />
          ))}
        </div>

        <BaseModels
          notify={notify}
          setNotify={setNotify}
          open={open}
          setOpen={setOpen}
          tile="إضافة وحدة"
          edit={edit}
          setEdit={setEdit}
          BaseToEdit={BaseToEdit}
          setBaseToEdit={setBaseToEdit}
          showLogin={showLogin}
          setShowLogin={setShowLogin}
        />

        <Notification notify={notify} setNotify={setNotify} />

        <Grid container spacing={3} justifyContent="center">
          <Login
            showLogin={showLogin}
            setShowLogin={setShowLogin}
            notify={notify}
            setNotify={setNotify}
          ></Login>
        </Grid>
      </>
    );
  }
};

export default BaseListes;
