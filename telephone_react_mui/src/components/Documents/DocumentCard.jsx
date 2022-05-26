import React, { useEffect } from 'react';

import { Paper, makeStyles, Avatar, Grid } from '@material-ui/core';
import withReactContent from 'sweetalert2-react-content';
import blue from '@material-ui/core/colors/blue';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import Swal from 'sweetalert2';
import CustomizedDialogs from './ModalDoc';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import { UseForm } from '../../hooks/UseForm';
import { useSelector } from 'react-redux';
const editorConfiguration = {
  language: {
    // The UI will be English.
    ui: 'ar',

    // But the content will be edited in Arabic.
    content: 'ar',
  },
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

const DocumentCard = (props) => {
  const MySwal = withReactContent(Swal);
  const { Logged, setLogged, ...Other } = UseForm({});
  const User = useSelector((state) => state.user);

  useEffect(() => {
    User.isLogged ? setLogged(true) : setLogged(false);
  }, [User]);
  const classes = useStyles();
  //const handleDeleteClick = () => {};
  const handleEditClick = () => {};
  const handleOnClick = () => {};
  const {
    id,
    fullName,
    ImageSrc,
    shortName,
    contenu,
    DocumentList,
    setDocumentList,
    setShowLogin,
    ...rest
  } = props;
  const handleDeleteClick = () => {
    MySwal.fire({
      title: 'هل أنت متأكد من حذف هذه الوثيقة',
      text: fullName,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'فسخ',
      cancelButtonText: 'إلغاء',
    }).then((result) => {
      if (result.isConfirmed) {
        if (Logged) {
          createAPIEndpoint(ENDPOINTS.DOCUMENT)
            .delete(id)
            .then((res) => {
              setDocumentList(DocumentList.filter((x) => x.documentId != id));
              Swal.fire('', '<b>تمت عملية الحذف بنجاح</b>', 'success');
            })
            .catch((err) => {
              Swal.fire('', err, 'success');
              console.log(err);
            });
        } else {
          setShowLogin(true);
          Swal.fire({
            icon: 'error',
            title: 'تذكير',
            text: 'لا يمكنك القيام بعملية الجذف!',
          });
          //Swal.fire('', '<b>لا يمكنك القيام بعملية الجذف</b>', 'success');
        }
      }
    });
  };
  return (
    <div>
      <Paper elevation={24} className={classes.card}>
        <Grid container>
          <div style={{ textAlign: 'right' }}>
            <IconButton aria-label="delete" onClick={() => handleDeleteClick()}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => handleEditClick()}>
              <SettingsIcon />
            </IconButton>
          </div>
        </Grid>
        <Grid container justifyContent="center" alignItems="center" spacing={3}>
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            xs={12}
          >
            <Avatar
              alt="Remy Sharp"
              src={ImageSrc}
              className={classes.large}
              classes={{ root: classes.imgCard }}
            />
            <Grid item style={{ padding: 10 }}></Grid>
          </Grid>

          <CustomizedDialogs
            style={{ paddingBottom: 20, marginBottom: 120 }}
            id={id}
            ImageSrc={ImageSrc}
            fullName={fullName}
            shortName={shortName}
            contenu={contenu}
          ></CustomizedDialogs>
          <Grid></Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default DocumentCard;
