import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import Avatar from "@material-ui/core/Avatar";

import { blue, red } from "@material-ui/core/colors";
import { Button, ButtonGroup, IconButton } from "@material-ui/core";
import { BASE_URL } from "../../api/index";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSelector } from "react-redux";
import axios from "axios";
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

export default function FilesCard(props) {
  const MySwal = withReactContent(Swal);
  const Logged = useSelector((state) => state.user.isLogged);
  const { fullName, filename, apiAction, setShowLogin, ...rest } = props;

  const classes = useStyles();

  function handleDownloadOnClick(param) {
    window.open(BASE_URL + "Report/Download/" + param);
  }

  function handleOnClick(param) {
    MySwal.fire({
      title: "هل أنت متأكد من حذف هذه الوحدة",
      text: param,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "فسخ",
      cancelButtonText: "إلغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        if (Logged) {
          axios
            .post(BASE_URL + "Report/Delete_File/" + param)
            .then((response) => {
              Swal.fire("", "<b>تمت عملية الحذف بنجاح</b>", "success");
            })
            .catch((error) => {
              Swal.fire("", `Delete failed ${error}`, "success");
            });
        } else {
          setShowLogin(true);
          Swal.fire({
            icon: "error",
            title: "تذكير",
            text: "لا يمكنك القيام بعملية الجذف!",
          });
        }
      }
    });
  }

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          style={{ textAlign: "center" }}
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={"/img/report.png"}
            ></Avatar>
          }
          // action={
          // <SettingButton
          //   edit={edit}
          //   setEdit={setEdit}
          //   corps={corps}
          //   setOpen={setOpen}
          //   SetCorpsList={SetCorpsList}
          //   CorpsList={CorpsList}
          // ></SettingButton>
          // }
          title={fullName}
        />
        <CardMedia
          className={classes.media}
          image={"/img/report.png"}
        ></CardMedia>
        +
        <CardContent>
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<Avatar src={"/img/download.png"} />}
              onClick={() => handleDownloadOnClick(filename)}
            ></Button>
            <Button
              startIcon={
                <Avatar
                  src={"/img/deleteReport.png"}
                  onClick={() => handleOnClick(filename)}
                />
              }
            ></Button>
          </ButtonGroup>
        </CardContent>
        {/* <Stack direction="row" spacing={1}>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="delete" disabled color="primary">
            <DeleteIcon />
          </IconButton>
          <IconButton color="secondary" aria-label="add an alarm">
            <AlarmIcon />
          </IconButton>
          <IconButton color="primary" aria-label="add to shopping cart">
            <AddShoppingCartIcon />
          </IconButton>
        </Stack> */}
      </Card>
    </>
  );
}
