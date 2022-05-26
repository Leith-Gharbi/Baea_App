import React, { useState, useEffect } from "react";
import { withStyles, Avatar, Box, Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { teal, grey } from "@material-ui/core/colors";
import Form from "../controls/Form";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import SaveIcon from "@material-ui/icons/Save";
import { UseForm } from "../../hooks/UseForm";
import { useSelector } from "react-redux";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  primaryColor: {
    color: teal[500],
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  secondaryColor: {
    color: grey[700],
  },

  padding: {
    padding: 0,
  },
  mainHeader: {
    backgroundColor: grey[100],
    padding: 20,
    alignItems: "center",
  },
  mainContent: {
    padding: 40,
  },
  secondaryContainer: {
    padding: "20px 25px",
    backgroundColor: grey[200],
  },
});

const defaultImageSrc = "/img/AddImg.png";

function BaseModels(props) {
  const User = useSelector((state) => state.user);
  console.log("user = ", User);
  const {
    classes,
    open,
    onClose,
    setOpen,
    notify,
    setNotify,
    BaseToEdit,
    edit,
    showLogin,
    setShowLogin,
    ...rest
  } = props;
  const initialFieldValues = {
    // "baseID": 2,
    
    fullName: edit ? BaseToEdit.fullName : "",
    shortName: edit ? BaseToEdit.shortName : "",
    imageName: edit ? BaseToEdit.imageName : "",
    imageSrc: edit ? BaseToEdit.imageSrc : defaultImageSrc,
    imageFile: null,
  };
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormContols,
    Logged,
    setLogged,
    axiosTestLogin,
  } = UseForm(initialFieldValues);

  const [name, setName] = useState("");

  const validate = () => {
    let temp = {};
    temp.fullName = values.fullName == "" ? false : true;
    temp.fullName = values.shortName == "" ? false : true;
    temp.imageSrc = values.imageSrc == defaultImageSrc ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x == true);
  };

  useEffect(() => {
    User.isLogged ? setLogged(true) : setLogged(false);
    console.log("logged eff = ", Logged);
  }, [User]);

  useEffect(() => {
    if (edit) {
      setValues(initialFieldValues);
    }
  }, [edit]);

  const submitOrder = (e) => {
    e.preventDefault();
    if (Logged) {
      if (validate()) {
        const formData = new FormData();
        formData.append("fullName", values.fullName);
        formData.append("shortName", values.shortName);
        formData.append("imageName", values.imageName);
        formData.append("imageFile", values.imageFile);
        if (edit) {
          formData.append("baseID", BaseToEdit.baseID);
          createAPIEndpoint(ENDPOINTS.BASE)
            .update(BaseToEdit.baseID, formData)
            .then((res) => {
              setOpen(false);
              setNotify({ isOpen: true, message: "تمت عملية التحيين بنجاح" });
            })
            .catch((err) => console.log(err));
        } else {
          createAPIEndpoint(ENDPOINTS.BASE)
            .create(formData)
            .then((res) => {
              setOpen(false);
              setNotify({ isOpen: true, message: "تمت عملية الإضافة بنجاح" });
            })
            .catch((err) => console.log(err));
        }
      }
    } else {
      setShowLogin(true);
    }
  };

  const showPreview = (e) => {
    console.log("leith sheck = ", e);
    if (e.target.files && e.target.files[0]) {
      console.log("leith sheck 2 = ", e.target.files[0]);
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          imageFile: imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setValues({ ...values, imageFile: null, imageSrc: defaultImageSrc });
    }
  };

  const resetForm = () => {
    setValues(initialFieldValues);
    document.getElementById("image-uploader").value = null;
    setErrors({});
  };

  return (
    <>
      <Dialog
        className={classes.root}
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogContent className={classes.padding}>
          {name}
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={12}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
                className={classes.mainHeader}
              >
                <Grid item xs={8}>
                  <Typography
                    className={classes.primaryColor}
                    align="center"
                    variant="h5"
                  >
                    {edit ? "تحيين" : "إضافة"}
                  </Typography>
                </Grid>
                <Grid item xs={2} align="center">
                  <Avatar
                    alt="Remy Sharp"
                    src="https://th.bing.com/th/id/R.820968e65a3ff865dcf24cf15118db3e?rik=uuzA1illbVyv4Q&pid=ImgRaw&r=0"
                    className={classes.large}
                    classes={{ root: classes.imgCard }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Box display="flex" alignItems="center">
                    <Box>
                      <IconButton onClick={() => setOpen(false)}>
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Form onSubmit={submitOrder}>
                <Grid
                  container
                  direction="row"
                  className={classes.mainContent}
                  spacing={1}
                >
                  <Grid item xs={12}>
                    <img
                      src={values.imageSrc}
                      width="200"
                      id="image-uploader"
                      height="200"
                    ></img>
                  </Grid>

                  <Grid item xs={12}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={showPreview}
                    ></input>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      style={{ marginBottom: 20 }}
                      fullWidth
                      name="fullName"
                      margin="dense"
                      variant="outlined"
                      label="الإسم الكامل"
                      id="fullName"
                      value={values.fullName}
                      onChange={handleInputChange}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      style={{ marginBottom: 20 }}
                      fullWidth
                      name="shortName"
                      margin="dense"
                      variant="outlined"
                      value={values.shortName}
                      label="الإسم المختصر"
                      id="shortName"
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className={classes.button}
                      startIcon={<SaveIcon />}
                    >
                      تسجيل
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default withStyles(styles)(BaseModels);
