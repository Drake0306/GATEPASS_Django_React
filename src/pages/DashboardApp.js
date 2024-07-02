import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import axios from 'axios';
import moment from 'moment';
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import JSON_CONST from '../components/CONSTVALUE.json';
import './style.css';

// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';


import OutFormEntry from './OutFormEntry/OutFormEntry';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const navigate = useNavigate()
  const theme = useTheme();
  const [ gatePassTotal, setGatePassTotal] = useState(0);
  const [ gatePassPendigList, setGatePassPendigList] = useState([]);
  const [ pendingOutEntry, setPendingOutEntry] = useState(0);
  const [ R, setR] = useState(0);
  const [ BT, setBT] = useState(0);
  const [ DATEArray, setDATEArray] = useState([]);


  useEffect(() => {
    const sendPost = {
      from: moment().format('YYYY-MM-DD'),
      to: moment().format('YYYY-MM-DD'),
    }
    // gatePassTotal
    axios.post(`${JSON_CONST.DB_URL}gatePassEntry/ledgerSearch/`, sendPost)
     .then((response) => {
      setGatePassTotal(response.data.length)

      // setPendingOutEntry
      const tempOutEntry = [];
      response.data.forEach((data) => {
        if(data.outTime === "") tempOutEntry.push(data)
      })
      setPendingOutEntry(tempOutEntry.length)

     })
     .catch((error) => {
       console.log(error);
     });

      getLastmonthsDate();
 
 }, [])

 const getLastmonthsDate = () => {
   const data = [];
   data.push(moment().format('MM/01/YYYY')); // Current Month
   // eslint-disable-next-line no-plusplus
    for(let i=1; i<=5; i++) {
      const DATE = moment().subtract(i, 'months').format('MM/01/YYYY')
      data.push(DATE);
    }
    setDATEArray(data);
 }

 const navigateTO = (value) => {
    navigate(`/app/${value}`, { replace: true });
 }

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Visitor Management Software
        </Typography>

        <Grid container spacing={10}>
          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary title={`Visitor Total Entry for`} text="Click TO View" style={{cursor: 'pointer', backgroundColor: '#02164F'}} className="zoom" onClick={() => navigateTO('search/0')} total={gatePassTotal} icon={'fluent:payment-28-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary title={`Pending Visitor Out Entry for`} text="Click TO View" style={{cursor: 'pointer', backgroundColor: '#F37022', color: '#FEFEFE'}} className="zoom" onClick={() => navigateTO('out/1')} total={pendingOutEntry} color="info" icon={'fluent:payment-28-regular'} />
          </Grid>

        </Grid>
        <Grid container spacing={5} mt={1}>
          <Grid item xs={12} md={12} lg={12}>
              {/* <AppNewsUpdate
                title="News Update"
                list={[...Array(5)].map((_, index) => ({
                  id: faker.datatype.uuid(),
                  title: faker.name.jobTitle(),
                  description: faker.name.jobTitle(),
                  image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                  postedAt: faker.date.recent(),
                }))}
              /> */}
              <h3 style={{marginLeft: '30px'}}>Showing today's Top 10 Visitor pending out entry</h3>
              <OutFormEntry fromDashboard />
            </Grid>

            {/* <Grid item xs={12} md={6} lg={4}>
              <AppCurrentVisits
                title="Total Count"
                chartData={[
                  { label: 'Gate Pass Total Entry', value: gatePassTotal },
                  { label: 'Pending Gate Pass Out Entry', value: pendingOutEntry },
                ]}
                chartColors={[
                  theme.palette.primary.main,
                  theme.palette.chart.blue[0],
                ]}
              />
            </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
