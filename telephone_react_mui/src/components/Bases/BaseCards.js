import { useEffect } from "react";
import { Paper, makeStyles, Avatar, Grid, Button } from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";
import LocalPhoneIcon from "@material-ui/icons/LocalPhone";
import React from "react";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import SettingsIcon from "@material-ui/icons/Settings";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { UseForm } from "../../hooks/UseForm";
import { BASE_URL, createAPIEndpoint, ENDPOINTS } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { selectedBase } from "../../redux/actions/baseActions";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1.5),
      width: theme.spacing(30),
      height: theme.spacing(30),
    },
  },
  card: {
    backgroundColor: "#d6d6d6",
    borderColor: "red",
    "&:hover": {
      backgroundColor: "#9e9e9e",
      transform: "scale(1.02)",
      border: `3px solid ${blue[700]}`,
    },
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    // marginTop : theme.spacing(3),
    "& .MuiAvatar-root": {
      margin: "auto !important",
      justifyContent: "centre",
    },
  },
  imgCard: {
    justifyContent: "centre",
    textAlign: "centre",
  },
  button: {
    margin: theme.spacing(1),
  },
}));
const BaseCards = (props) => {
  const MySwal = withReactContent(Swal);

  const classes = useStyles();

  const User = useSelector((state) => state.user);

  const {
    id,
    fullName,
    shortName,
    img,
    open,
    setEdit,
    edit,
    setOpen,
    BaseToEdit,
    setBaseToEdit,
    showLogin,
    setShowLogin,
    BaseList,
    setBaseList,
    ...other
  } = props;
  const { Logged, setLogged, ...rest } = UseForm({});

  useEffect(() => {
    User.isLogged ? setLogged(true) : setLogged(false);
  }, [User]);

  const history = useHistory();
  console.log("history= ", history);
  const handleOnClick = (id, name, img) => {
    history.push({
      pathname: "/base",
      state: { id: id, name: name, img: img },
    });
    fetchBaseDetails();
  };
  const dispatch = useDispatch();

  const fetchBaseDetails = async () => {
    const response = await axios.get(BASE_URL + "Bases/" + id).catch((err) => {
      console.log("Error axios =", err);
    });
    dispatch(selectedBase(response.data));
  };

  const handleEditClick = () => {
    setOpen(true);
    setEdit(true);
    const baseForEdit = {
      baseID: id,
      fullName: fullName,
      shortName: shortName,
      imageName: "",
      imageSrc: img,
      imageFile: null,
    };
    setBaseToEdit(baseForEdit);
  };

  const handleDeleteClick = () => {
    MySwal.fire({
      title: "هل أنت متأكد من حذف هذه الوحدة",
      text: fullName,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "فسخ",
      cancelButtonText: "إلغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        if (Logged) {
          createAPIEndpoint(ENDPOINTS.BASE)
            .delete(id)
            .then((res) => {
              setBaseList(BaseList.filter((x) => x.baseID != id));
              Swal.fire("", "<b>تمت عملية الحذف بنجاح</b>", "success");
            })
            .catch((err) => {
              Swal.fire("", err, "success");
              console.log(err);
            });
        } else {
          setShowLogin(true);
          Swal.fire({
            icon: "error",
            title: "تذكير",
            text: "لا يمكنك القيام بعملية الجذف!",
          });
          //Swal.fire('', '<b>لا يمكنك القيام بعملية الجذف</b>', 'success');
        }
      }
    });
  };
  return (
    <>
      <Paper elevation={24} className={classes.card}>
        <Grid container>
          <div style={{ textAlign: "right" }}>
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
            <Grid item style={{ padding: 10 }}>
              <Avatar
                alt="Remy Sharp"
                src={img}
                className={classes.large}
                classes={{ root: classes.imgCard }}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            key={id}
            className={classes.button}
            startIcon={<LocalPhoneIcon />}
            onClick={() => handleOnClick(id, fullName, img)}
          >
            {fullName}
          </Button>

          <Grid></Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default BaseCards;
