import { useNavigate } from 'react-router-dom';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
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
} from '../../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function MasterList() {
  const theme = useTheme();
  const navigate = useNavigate()

  const redirectPage = async (url) => {
    navigate(`/app/master/${url}`, { replace: true });
  };

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Master List (List, Create, Update, Delete)
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary onClick={() => redirectPage('registrarOffice')} className="zoom" title="Registrar Office Master" total={0} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary onClick={() => redirectPage('handledBy')} className="zoom" title="Handled By Master" total={0} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary onClick={() => redirectPage('del')} className="zoom" title="Del Master" total={0} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary onClick={() => redirectPage('remarks')} className="zoom" title="Different Remarks Master" total={0} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary onClick={() => redirectPage('bank')} className="zoom" title="Bank Master" total={0} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary onClick={() => redirectPage('dsa')} className="zoom" title="DSA Master" total={0} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary onClick={() => redirectPage('branch')} className="zoom" title="Branch Master" total={0} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary onClick={() => redirectPage('fee')} className="zoom" title="Fee Master" total={0} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary onClick={() => redirectPage()} className="zoom" title="User Master" total={0} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}
