import {
  Avatar,
  Chip,
  makeStyles,
  Grid,
  Button as MuiButton,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { selectedBase } from '../../redux/actions/baseActions';
import HeaderTitle from '../controls/HeaderTitle';
import { UseForm } from '../../hooks/UseForm';
import { fetchCorpsList } from '../../redux/actions/corpsActions';
import { BASE_URL } from '../../api';
import ReportsCard from './ReportsCard';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(4.5),
  },
  alignItemsAndJustifyContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
}));

const ReportsListes = () => {
  const Report = [
    { fullName: 'رخصة طويلة', apiAction: 'GetPld/' },
    { fullName: 'بطاقة تغيير وضعية', apiAction: 'GetChangementStatus/' },
    { fullName: 'مطلب أشغال', apiAction: 'GetDemandeTraveau/' },
    { fullName: 'بطاقة محادثة', apiAction: 'GetFicheDiscours/' },
    { fullName: 'مطلب رخصة بالخارج', apiAction: 'GetPldVoyage/' },
    { fullName: 'تجديد عقد تطوع', apiAction: 'GetRenouvelementContrat/' },
    { fullName: 'عقوبة', apiAction: 'GetPunitions/' },
  ];
  const name = 'المطبوعات الإدارية';
  const [open, setOpen] = useState(false);
  const [searchKey, SetSearchKey] = useState('');
  const [ReportList, SetReportList] = useState(Report);
  const [edit, setEdit] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    let x = [...ReportList];

    if (x.length == 0 || searchKey == '') {
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
          data={Report}
          open={open}
          setOpen={setOpen}
          searchKey={searchKey}
          SetSearchKey={SetSearchKey}
          setEdit={setEdit}
        ></HeaderTitle>
      </Grid>
      <div className={classes.root}>
        <Chip
          style={{ fontSize: 'xx-large ', height: '50px' }}
          color="primary"
          size="medium"
          label={name}
          avatar={
            <Avatar
              style={{ height: '70px', width: '70px' }}
              src={'/img/report.png'}
            />
          }
        />
      </div>
      <div className={classes.root}>
        {ReportList.map((x) => (
          <ReportsCard
            key={x.fullName}
            fullName={x.fullName}
            apiAction={x.apiAction}
          ></ReportsCard>
        ))}
      </div>
    </>
  );
};

export default ReportsListes;
