import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import Avatar from '@material-ui/core/Avatar';

import { blue, red } from '@material-ui/core/colors';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import { Button, ButtonGroup, IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectedCorps } from '../../redux/actions/corpsActions';
import axios from 'axios';
import { BASE_URL } from './../../api/index';

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(40),
    margin: theme.spacing(1),
    '& > *': {
      textAlign: 'center',
    },
    '&:hover': {
      backgroundColor: '#9e9e9e',
      transform: 'scale(1.02)',
      border: `3px solid ${blue[700]}`,
    },
  },
  media: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: 'auto',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  button: {
    textAlign: 'center',
    justifyContent: 'center',
  },
}));

export default function ReportsCard(props) {
  const { fullName, apiAction, ...rest } = props;

  const classes = useStyles();

  function handleOnClick(param) {
    window.open(BASE_URL + 'Report/' + apiAction + param);
  }

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          style={{ textAlign: 'center' }}
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={'/img/report.png'}
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
          image={'/img/report.png'}
        ></CardMedia>

        <CardContent>
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Avatar src={'/img/pdf.png'} />}
              onClick={() => handleOnClick('png')}
            ></Button>
            <Button
              color="success"
              startIcon={<Avatar src={'/img/excel.png'} />}
              onClick={() => handleOnClick('xslx')}
            ></Button>
            <Button
              startIcon={
                <Avatar
                  src={'/img/word.png'}
                  onClick={() => handleOnClick('docx')}
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
