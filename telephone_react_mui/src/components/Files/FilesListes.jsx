import {
  Avatar,
  Chip,
  makeStyles,
  Grid,
  Button as MuiButton,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderTitle from "../controls/HeaderTitle";
import { BASE_URL } from "../../api";
import FilesCard from "./FilesCard";
import ModelFiles from "./ModelFiles";
import Login from "../Login/login";
import { UseForm } from "../../hooks/UseForm";
import Notification from "../Notification";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    display: "flex",
    flexWrap: "wrap",
    margin: theme.spacing(4.5),
  },
  alignItemsAndJustifyContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
  },
}));

const FilesListes = () => {
  const name = "الوثائق الإدارية";
  const [open, setOpen] = useState(false);
  const [searchKey, SetSearchKey] = useState("");
  const [ReportList, SetReportList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { notify, setNotify } = UseForm({});

  const classes = useStyles();

  const fetchFiles = async () => {
    const response = await axios
      .get(BASE_URL + "Report/GetFiles")
      .catch((err) => {
        console.log("error = ", err);
      });
    try {
      SetReportList(response.data);
    } catch (error) {
      SetReportList([]);
    }
  };
  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    let x = [...ReportList];

    if (x.length == 0 || searchKey == "") {
      SetReportList([...ReportList]);
    } else {
      x = x.filter((y) => {
        return y.fullName.toLowerCase().includes(searchKey.toLocaleLowerCase());
      });
      SetReportList(x);
    }
  }, [searchKey]);

  return (
    <>
      <Grid container alignItems="center" justifyContent="center">
        <HeaderTitle
          data={ReportList}
          open={open}
          setOpen={setOpen}
          searchKey={searchKey}
          SetSearchKey={SetSearchKey}
          setEdit={setEdit}
        ></HeaderTitle>
      </Grid>
      <div className={classes.root}>
        <Chip
          style={{ fontSize: "xx-large ", height: "50px" }}
          color="primary"
          size="medium"
          label={name}
          avatar={
            <Avatar
              style={{ height: "70px", width: "70px" }}
              src={"/img/report.png"}
            />
          }
        />
      </div>
      <div className={classes.root}>
        {ReportList.map((x) => (
          <FilesCard
            key={x.name}
            filename={x.filename}
            fullName={x.name}
            apiAction={x.name}
            setShowLogin={setShowLogin}
          ></FilesCard>
        ))}
      </div>

      <Grid container spacing={3} justifyContent="center">
        <Login
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          notify={notify}
          setNotify={setNotify}
        ></Login>
      </Grid>
      <ModelFiles
        edit={edit}
        setEdit={setEdit}
        open={open}
        setOpen={setOpen}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        setNotify={setNotify}
      ></ModelFiles>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default FilesListes;
