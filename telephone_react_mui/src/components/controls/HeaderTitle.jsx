// imports the React Javascript Library
import React, { useState } from "react";
//Card
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import SearchIcon from "@material-ui/icons/Search";
import FileCopySharpIcon from "@mui/icons-material/FileCopySharp";
import CollectionsIcon from "@material-ui/icons/Collections";
import DescriptionTwoToneIcon from "@mui/icons-material/DescriptionTwoTone";
// Search
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ReplayIcon from "@material-ui/icons/Replay";
import HomeWorkTwoToneIcon from "@mui/icons-material/HomeWorkTwoTone";
import { makeStyles } from "@material-ui/core";
import InputSearch from "./InputSearch";
import { useHistory } from "react-router-dom";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

const imageGallery = [
  "https://raw.githubusercontent.com/dxyang/StyleTransfer/master/style_imgs/mosaic.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
  "https://raw.githubusercontent.com/ShafeenTejani/fast-style-transfer/master/examples/dora-maar-picasso.jpg",
  "https://pbs.twimg.com/profile_images/925531519858257920/IyYLHp-u_400x400.jpg",
  "https://raw.githubusercontent.com/ShafeenTejani/fast-style-transfer/master/examples/dog.jpg",
  "http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg",
];

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  icon: {
    margin: theme.spacing(2),
  },
  iconHover: {
    margin: theme.spacing(2),
    "&:hover": {
      color: red[800],
    },
  },
  cardHeader: {
    textalign: "center",
    align: "center",
    backgroundColor: "white",
  },
  input: {
    display: "none",
  },
  title: {
    color: blue[800],
    fontWeight: "bold",
    fontFamily: "Montserrat",
    align: "center",
  },
  button: {
    color: blue[900],
    margin: 10,
  },
  secondaryButton: {
    color: "gray",
    margin: 10,
  },
  typography: {
    margin: theme.spacing(2),
    backgroundColor: "default",
  },
  search: {
    justifyContent: "centre",
    textAlign: "centre",
  },
  searchRoot: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
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
}));

export default function HeaderTitle(props) {
  const { open, setOpen, SetSearchKey, setEdit, data } = props;
  const classes = useStyles();

  const renderInitialState = (classes) => {
    return (
      <React.Fragment>
        <CardContent>
          <Grid container justifyContent="center" alignItems="center">
            <Fab
              component="span"
              className={classes.button}
              onClick={handleHomeClick}
            >
              <HomeWorkTwoToneIcon />
            </Fab>
            <Fab className={classes.button} onClick={handleSearchClick}>
              <SearchIcon />
            </Fab>
            {/* <Fab className={classes.button} onClick={handleGalleryClick}>
              <CollectionsIcon />
            </Fab> */}

            <Fab className={classes.button} onClick={handleAddClick}>
              <AddCircleIcon />
            </Fab>
            <Fab className={classes.button} onClick={handleReportClick}>
              <DescriptionTwoToneIcon />
            </Fab>
            <Fab className={classes.button} onClick={handleFileClick}>
              <DriveFolderUploadIcon />
            </Fab>
            <Fab className={classes.button} onClick={handleDocClick}>
              <FileCopySharpIcon />
            </Fab>
          </Grid>
        </CardContent>
      </React.Fragment>
    );
  };

  const handleSearchURL = (event) => {
    console.log();
    var file = event.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setValues({
        ...values,
        selectedFile: [reader.result],
      });
    }.bind(this);
    console.log(url); // Would see a path?
    setValues({
      ...values,
      selectedFile: event.target.files[0],
      imageUploaded: 1,
    });
  };

  const handleImageSearch = (url) => {
    // alert(url);
    console.log("handleImageSearch =", url);

    var filename = url.substring(url.lastIndexOf("/") + 1);
  };

  const handleSeachClose = (event) => {
    setValues({
      ...values,
      mainState: "initial",
    });
  };
  const history = useHistory();
  function handleHomeClick() {
    history.push("/");
  }
  function handleReportClick() {
    history.push("/Report");
  }
  function handleFileClick() {
    history.push("/Files");
  }
  function handleDocClick() {
    history.push("/Documents");
  }

  const renderSearchState = (classes) => {
    return (
      <Paper className={classes.searchRoot} elevation={1}>
        <div className={classes.searchInput}>
          <InputSearch
            data={data}
            name="بحث"
            SetSearchKey={SetSearchKey}
          ></InputSearch>
        </div>
        <Divider className={classes.searchDivider} />
        <IconButton
          color="primary"
          className={classes.secondaryButton}
          aria-label="Close"
          onClick={handleSeachClose}
        >
          <CloseIcon />
        </IconButton>
      </Paper>
    );
  };

  const handleAvatarClick = (value) => {
    var filename = value.url.substring(value.url.lastIndexOf("/") + 1);
    console.log(filename);
    setValues({
      ...values,
      mainState: "uploaded",
      imageUploaded: true,
      selectedFile: value.url,
      fileReader: undefined,
      filename: filename,
    });
  };

  const renderGalleryState = (classes) => {
    const listItems = imageGallery.map((url) => (
      <div
        onClick={(value) => handleAvatarClick({ url })}
        style={{
          padding: "5px 5px 5px 5px",
          cursor: "pointer",
        }}
      >
        <Avatar src={url} />
      </div>
    ));

    return (
      <React.Fragment>
        <Grid>
          {listItems}
          <IconButton
            color="primary"
            className={classes.secondaryButton}
            aria-label="Close"
            onClick={handleSeachClose}
          >
            <ReplayIcon />
          </IconButton>
        </Grid>
      </React.Fragment>
    );
  };

  const renderUploadedState = (classes) => {
    return (
      <React.Fragment>
        <CardActionArea onClick={imageResetHandler}>
          <img
            width="100%"
            className={classes.media}
            src={values.selectedFile}
          />
        </CardActionArea>
      </React.Fragment>
    );
  };

  const imageResetHandler = (event) => {
    console.log("Click!");
    setValues({
      ...values,
      mainState: "initial",
      selectedFile: null,
      imageUploaded: 0,
    });
  };

  const [values, setValues] = useState({
    mainState: "initial", // initial, search, gallery, uploaded
    imageUploaded: 0,
    selectedFile: null,
  });

  const handleUploadClick = (event) => {
    console.log();
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setValues({ ...values, selectedFile: [reader.result] });
      //   this.setState({
      //     selectedFile: [reader.result],
      //   });
    }.bind(this);
    console.log(url); // Would see a path?

    setValues({
      ...values,
      mainState: "uploaded",
      selectedFile: event.target.files[0],
      imageUploaded: 1,
    });
    // this.setState({
    //   mainState: 'uploaded',
    //   selectedFile: event.target.files[0],
    //   imageUploaded: 1,
    // });
  };

  const handleSearchClick = (event) => {
    setValues({
      ...values,
      mainState: "search",
    });
  };

  const handleGalleryClick = (event) => {
    // this.setState({
    //   mainState: 'gallery',
    // });

    setValues({
      ...values,
      mainState: "gallery",
    });
  };

  const handleAddClick = (event) => {
    setEdit(false);
    setOpen(true);
  };

  return (
    <>
      <div className={classes.root}>
        <Card>
          {(values.mainState == "initial" && renderInitialState(classes)) ||
            (values.mainState == "search" && renderSearchState(classes)) ||
            (values.mainState == "gallery" && renderGalleryState(classes)) ||
            (values.mainState == "uploaded" && renderUploadedState())}
        </Card>
      </div>
    </>
  );
}
