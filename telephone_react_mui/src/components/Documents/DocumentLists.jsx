import { unstable_styleFunctionSx } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { UseForm } from '../../hooks/UseForm';
import blue from '@material-ui/core/colors/blue';
import { makeStyles, Grid, Chip, Avatar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Notification from '../Notification';
import HeaderTitle from '../controls/HeaderTitle';
import Login from '../Login/login';
import axios from 'axios';
import { BASE_URL } from '../../api';
import SkeletonDocument from './SkeletonDocument';
import DocumentModels from './DocumentModels';
import DocumentCard from './DocumentCard';
import { getDocument } from '../../redux/actions/DocumentActions';

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

const DocumentLists = () => {
  const classes = useStyles();
  const { notify, setNotify } = UseForm({});
  const Documents = useSelector((state) => state.allDocuments.documents);

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const dispatch = useDispatch();
  const fetchDocument = async () => {
    const response = await axios.get(BASE_URL + 'Documents').catch((err) => {
      console.log('error = ', err);
    });
    console.log('data doc  = ', response.data);
    dispatch(getDocument(response.data));
    try {
      setDocumentList(response.data);
    } catch (error) {
      setDocumentList([]);
    }
  };

  useEffect(() => {
    fetchDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notify]);

  //Begin  Search key

  const [DocumentList, setDocumentList] = useState(Documents);
  const [DocumentToEdit, setDocumentToEdit] = useState({});
  const [searchKey, SetSearchKey] = useState('');
  useEffect(() => {
    let x = [...Documents];
    if (x.length == 0 || searchKey == '') {
      setDocumentList([...Documents]);
    } else {
      x = x.filter((y) => {
        return y.fullName.toLowerCase().includes(searchKey.toLocaleLowerCase());
      });
      setDocumentList(x);
    }
  }, [searchKey]);

  if (DocumentList.length > 0) {
    return (
      <>
        <Grid container alignItems="center" justifyContent="center">
          <HeaderTitle
            data={Documents}
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
            label={'الوثائق'}
            avatar={
              <Avatar
                style={{ height: '70px', width: '70px' }}
                src={'/img/army.png'}
              />
            }
          />
        </Grid>

        <div className={classes.root}>
          {DocumentList.map((x) => (
            <DocumentCard
              DocumentList={DocumentList}
              setDocumentList={setDocumentList}
              ImageSrc={x.imageSrc}
              key={x.documentId}
              id={x.documentId}
              fullName={x.fullName}
              shortName={x.shortName}
              contenu={x.contenu}
              img={x.imageSrc}
              open={open}
              setOpen={setOpen}
              edit={edit}
              setEdit={setEdit}
              DocumentToEdit={DocumentToEdit}
              setDocumentToEdit={setDocumentToEdit}
              setShowLogin={setShowLogin}
              showLogin={showLogin}
            ></DocumentCard>
          ))}
        </div>

        <DocumentModels
          notify={notify}
          setNotify={setNotify}
          open={open}
          setOpen={setOpen}
          tile="إضافة وحدة"
          edit={edit}
          setEdit={setEdit}
          DocumentToEdit={DocumentToEdit}
          setDocumentToEdit={setDocumentToEdit}
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
    console.log('DocumentList = ', DocumentList);
    return (
      <>
        <Grid container alignItems="center" justifyContent="center">
          <HeaderTitle
            data={Documents}
            open={open}
            setOpen={setOpen}
            searchKey={searchKey}
            SetSearchKey={SetSearchKey}
            setEdit={setEdit}
          ></HeaderTitle>
        </Grid>

        <div className={classes.root}>
          {[...Array(10)].map((x, i) => (
            <SkeletonDocument key={i} />
          ))}
        </div>

        <DocumentModels
          notify={notify}
          setNotify={setNotify}
          open={open}
          setOpen={setOpen}
          tile="إضافة وحدة"
          edit={edit}
          setEdit={setEdit}
          DocumentToEdit={DocumentToEdit}
          setDocumentToEdit={setDocumentToEdit}
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

export default DocumentLists;
