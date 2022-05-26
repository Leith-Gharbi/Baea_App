import React, { Fragment, useRef, useState, memo } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
  Menu,
  MenuItem
} from "@material-ui/core";
import MoreIcon from "@material-ui/icons/MoreVert";
import GetAppIcon from "@material-ui/icons/GetApp";
import InfoIcon from "@material-ui/icons/Info";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles(() => ({}));

const GenericMoreButton = props => {
  const classes = useStyles();
  const moreRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuOpen = () => {
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  return (
    <Fragment>
      <Tooltip title="More options">
        <IconButton
          {...props}
          onClick={handleMenuOpen}
          ref={moreRef}
          size="small"
        >
          <MoreIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={moreRef.current}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        classes={{ paper: classes.menu }}
        onClose={handleMenuClose}
        open={openMenu}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <GetAppIcon />
          </ListItemIcon>
          <ListItemText primary="Export Data" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="Information" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

GenericMoreButton.propTypes = {
  className: PropTypes.string
};

export default memo(GenericMoreButton);
