import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import Settings from '@mui/icons-material/Settings';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PrintIcon from '@mui/icons-material/Print';
import { useDispatch, useSelector } from 'react-redux';
import { editCorps, corpsForEdit } from '../../redux/actions/corpsActions';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { createAPIEndpointCorps, ENDPOINTS } from '../../api';

export default function SettingButton(props) {
  const MySwal = withReactContent(Swal);
  const Logged = useSelector((state) => state.user.isLogged);

  const {
    setEdit,
    setOpen,
    corps,
    setShowLogin,
    SetCorpsList,
    CorpsList,
    ...rest
  } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleDeleteClick = () => {
    MySwal.fire({
      title: 'هل أنت متأكد من حذف هذه الوحدة',
      text: corps.fullName,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'فسخ',
      cancelButtonText: 'إلغاء',
    }).then((result) => {
      if (result.isConfirmed) {
        if (Logged) {
          createAPIEndpointCorps(ENDPOINTS.CORPS)
            .delete(corps.corpsId)
            .then((res) => {
              Swal.fire('', '<b>تمت عملية الحذف بنجاح</b>', 'success');
              SetCorpsList(CorpsList.filter((x) => x.corpsId != corps.corpsId));
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
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const handleEditClick = () => {
    dispatch(editCorps(corps));
    dispatch(corpsForEdit(true));
    console.log('CorpsFieldValues to edit click  =', corps);
    setOpen(true);
    setEdit(true);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <SettingsApplicationsIcon></SettingsApplicationsIcon>
            {/* <Avatar sx={{ width: 32, height: 32 }}>
                M</Avatar> */}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <ListItemIcon>
            <PrintIcon fontSize="small" />
          </ListItemIcon>
          Print
        </MenuItem>
        <MenuItem onClick={handleEditClick}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon>
            <DeleteForeverIcon fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
