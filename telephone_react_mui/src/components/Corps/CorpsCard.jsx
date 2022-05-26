import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import Avatar from "@material-ui/core/Avatar";

import { blue, red } from "@material-ui/core/colors";
import LocalPhoneIcon from "@material-ui/icons/LocalPhone";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { selectedCorps } from "../../redux/actions/corpsActions";
import axios from "axios";

import SettingButton from "./../controls/SettingButton";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../../api";
const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(40),
    margin: theme.spacing(1),
    "& > *": {
      textAlign: "center",
    },
    "&:hover": {
      backgroundColor: "#9e9e9e",
      transform: "scale(1.02)",
      border: `3px solid ${blue[700]}`,
    },
  },
  media: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: "auto",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  button: {
    textAlign: "center",
    justifyContent: "center",
  },
}));

export default function CorpsCard(props) {
  const {
    corps,
    open,
    setOpen,
    openDetails,
    setOpenDetails,
    ServiceList,
    SetServiceList,
    imageName,
    edit,
    SetCorpsList,
    CorpsList,
    setEdit,
    selectedCorpsClick,
    SetselectedCorpsClick,
    ...rest
  } = props;

  const CorpsFieldValues = {
    BaseID: corps.BaseID,
    corpsId: corps.corpsId,
    fullName: corps.fullName,
    shortName: corps.shortName,
    imageName: corps.imageName,
    imageSrc: corps.imageSrc,
    imageFile: null,
  };
  let data = useLocation();
  const { id, name, img, ...other } = data.state;
  const dispatch = useDispatch();
  const classes = useStyles();
  const base = useSelector((state) => state.base);

  const fetchServicesListes = async (id) => {
    const response = await axios
      .get(BASE_URL + "Services/GetListServices?id=" + id)
      .catch((err) => {
        console.log("Error axios =", err);
      });
    const data = JSON.stringify(response);
    SetServiceList(response.data);
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    const { corpsId, fullName } = corps;
    const Corps = { corpsId, fullName };
    console.log(Corps);
    dispatch(selectedCorps(Corps));
    fetchServicesListes(corpsId);
    SetselectedCorpsClick(Corps);
    setOpenDetails(true);
  };

  

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          style={{ textAlign: "center" }}
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={img}
            ></Avatar>
          }
          action={
            <SettingButton
              edit={edit}
              setEdit={setEdit}
              corps={corps}
              setOpen={setOpen}
              SetCorpsList={SetCorpsList}
              CorpsList={CorpsList}
            ></SettingButton>
          }
          title={corps.fullName}
        />
        <CardMedia className={classes.media} image={corps.imageSrc}></CardMedia>

        <CardContent>
          <Button
            variant="contained"
            color="primary"
            key={corps.corpsId}
            className={classes.button}
            startIcon={<LocalPhoneIcon />}
            onClick={handleOnClick}
          >
            {corps.shortName}
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
