import {
  Avatar,
  Chip,
  makeStyles,
  Grid,
  Button as MuiButton,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import CorpsCard from "./CorpsCard";
import axios from "axios";
import { selectedBase } from "../../redux/actions/baseActions";
import HeaderTitle from "../controls/HeaderTitle";
import ModelCorps from "./ModelCorps";
import Popup from "../controls/PopUp";
import ServicesTables from "../Services/ServicesTables";
import Login from "../Login/login";
import { UseForm } from "../../hooks/UseForm";
import Notification from "../Notification";
import { fetchCorpsList } from "./../../redux/actions/corpsActions";
import { BASE_URL } from "../../api";

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

const CorpsListes = (props) => {
  const [openDetails, setOpenDetails] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchKey, SetSearchKey] = useState("");
  const [CorpsList, SetCorpsList] = useState([]);
  const [ServiceList, SetServiceList] = useState([]);
  const [selectedCorpsClick, SetselectedCorpsClick] = useState({});
  const [edit, setEdit] = useState(false);
  const { notify, setNotify } = UseForm({});

  const classes = useStyles();
  let data = useLocation();
  const { id, name, img, ...other } = data.state;

  const SelectedBaseId = useSelector((state) => state.base.baseID);
  console.log("id=", SelectedBaseId);
  const dispatch = useDispatch();

  const corps = useSelector((state) => state.corpsList.corps);

  const fetchBaseDetails = async () => {
    const response = await axios.get(BASE_URL + "Bases/" + id).catch((err) => {
      console.log("Error axios =", err);
    });
    dispatch(selectedBase(response.data));
  };

  const fetchCorpsListes = async () => {
    const response = await axios
      .get(BASE_URL + "Corps/GetListCorps?id=" + id)
      .catch((err) => {
        console.log("Error axios =", err);
      });

    dispatch(fetchCorpsList(response.data));

    SetCorpsList(response.data);
  };

  useEffect(() => {
    if (id && id !== "") {
      fetchBaseDetails();
      fetchCorpsListes();
    }
  }, [id]);

  useEffect(() => {
    let x = [...corps];

    if (x.length == 0 || searchKey == "") {
      SetCorpsList([...corps]);
    } else {
      x = x.filter((y) => {
        return y.fullName.toLowerCase().includes(searchKey.toLocaleLowerCase());
      });
      SetCorpsList(x);
    }
  }, [searchKey]);

  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Grid container alignItems="center" justifyContent="center">
        <HeaderTitle
          data={CorpsList}
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
            <Avatar style={{ height: "70px", width: "70px" }} src={img} />
          }
        />
      </div>
      <div className={classes.root}>
        {CorpsList.map((x) => (
          <CorpsCard
            setOpen={setOpen}
            open={open}
            key={x.corpsId}
            corps={x}
            openDetails={openDetails}
            setOpenDetails={setOpenDetails}
            ServiceList={ServiceList}
            SetServiceList={SetServiceList}
            edit={edit}
            setEdit={setEdit}
            showLogin={showLogin}
            setShowLogin={setShowLogin}
            SetCorpsList={SetCorpsList}
            CorpsList={CorpsList}
            selectedCorpsClick={selectedCorpsClick}
            SetselectedCorpsClick={SetselectedCorpsClick}
          ></CorpsCard>
        ))}
      </div>

      <ModelCorps
        edit={edit}
        setEdit={setEdit}
        open={open}
        setOpen={setOpen}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        setNotify={setNotify}
        SetCorpsList={SetCorpsList}
        CorpsList={CorpsList}
      ></ModelCorps>

      {/* ----------------  popUp ----------------  */}
      <Popup
        title="أرقام الهواتف"
        openPopup={openDetails}
        setOpenPopup={setOpenDetails}
      >
        <ServicesTables
          selectedCorpsClick={selectedCorpsClick}
          SetselectedCorpsClick={SetselectedCorpsClick}
          SetServiceList={SetServiceList}
          ServiceList={ServiceList}
        ></ServicesTables>
      </Popup>
      <Grid container spacing={3} justifyContent="center">
        <Login
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          notify={notify}
          setNotify={setNotify}
        ></Login>
      </Grid>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default CorpsListes;
