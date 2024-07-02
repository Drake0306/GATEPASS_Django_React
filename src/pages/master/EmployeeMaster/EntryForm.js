/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Link, Stack, Button, Card, TextField, Checkbox, FormControlLabel  } from '@mui/material';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import axios from 'axios';

// components
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import JSON_CONST from '../../../components/CONSTVALUE.json'; 
// ----------------------------------------------------------------------

export default function EntryFormRO(props) {

  const navigate = useNavigate()
  const params = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paramsData, setParamsData] = useState([]);
  const [fromData, setFromData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    id: '',
    status: true
  });

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    setParamsData(JSON.parse(localStorage.getItem('editValue')))
    if (params.data !== '0') {
      setFromData({ 
        name: typeof paramsData.name !== 'undefined' ? paramsData.name : '',
        phone: typeof paramsData.phone !== 'undefined' ? paramsData.phone : '',
        email: typeof paramsData.email !== 'undefined' ? paramsData.email : '',
        address: typeof paramsData.address !== 'undefined' ? paramsData.address : '',
        status: typeof paramsData.status !== 'undefined' ? paramsData.status : 'true',
        id: typeof paramsData.id !== 'undefined' ? paramsData.id : '',
      });
    }
  },[params?.data, paramsData?.address, paramsData?.email, paramsData?.id, paramsData?.name, paramsData?.phone, paramsData?.status]);
  

    const onSubmit = async (event) => {
      event.preventDefault()
      setIsSubmitting(true);
      const fromElementsData = event.target.elements
      const sendPost = {
        name: fromElementsData.name.value,
        phone: fromElementsData.phone.value,
        email: fromElementsData.email.value,
        address: fromElementsData.address.value,
        status: fromElementsData.status.value,
        id: fromData.id,
      }
        
      if(params.data !== '0') {
        try {
          await axios.post(`${JSON_CONST.DB_URL}master/employee/update/${sendPost.id}`, sendPost)
            .then((response) => {
              console.log(response);
              setIsSubmitting(false);
              navigate(`/app/master/employeeMaster`, { replace: true });
            })
            .catch((error) => {
              setIsSubmitting(false);
              console.log(error);
            });
        }
        catch (err) {
          console.log(err)
        }
      } else {
          try {
            await axios.post(`${JSON_CONST.DB_URL}master/employee/create`, sendPost)
              .then((response) => {
                console.log(response);
                setIsSubmitting(false);
                navigate(`/app/master/employeeMaster`, { replace: true });
              })
              .catch((error) => {
                setIsSubmitting(false);
                console.log(error);
              });
          }
          catch (err) {
            console.log(err)
          }
        };
      }
  
  const onChangeFields = async (event) => {
    if(event.target.name === 'status') {
      setFromData({
        ...fromData,
        [event.target.name]: !fromData.status
      });
    } else {
      setFromData({
        ...fromData,
        [event.target.name]: event.target.value
      });
    }
  };
  
  const redirectPage = async (url) => {
    navigate(`/app/master/${url}`, { replace: true });
  };

  return (
    <Page title="Registrar Office Form">
      <Container maxWidth="">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Registrar Office
          </Typography>
          {/* <Button variant="contained" color="secondary" onClick={() => redirectPage('')} startIcon={<Iconify icon="carbon:list-boxes" />}>
            Home
          </Button> */}
        </Stack>
        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button variant="outlined" color="info" onClick={() => redirectPage('registrarOffice')} startIcon={<Iconify icon="akar-icons:arrow-back" />}>
            View List
          </Button>
        </Stack> */}
        <form methods="post" onSubmit={onSubmit}>
        <Card className="cardBackground">
          <Grid container alignItems="center" padding={3} spacing={3}>

            <Grid item xs={12} sm={4} md={4} lg={4}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.name}
                required
                name="name" 
                label="Enter Name"
                autoFocus
                color="orange"
              />
            </Grid>
            

            <Grid item xs={12} sm={4} md={4} lg={4}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.phone}
                name="phone" 
                label="Enter Phone No"
                autoFocus
                color="orange"
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.email}
                name="email" 
                label="Enter Email"
                autoFocus
                color="orange"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.address}
                name="address" 
                label="Address"
                multiline
                rows={2}
                color="orange"
              />
            </Grid>

            <Grid item xs={12} sm={1} md={1} lg={1}>
              <LoadingButton fullWidth size="large" type="submit" variant="flat" style={{backgroundColor: '#F37022', color: '#FEFEFE'}} loading={isSubmitting}>
                Save
              </LoadingButton>
            </Grid>
            
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="status"
                    checked={fromData.status}
                    value={fromData.status}
                    onChange={onChangeFields}
                    color="orange"
                  />
                }
                label="Status"
              />
            </Grid>

            <Grid mt={2} item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="caption" gutterBottom>
                * Name is required <br />
                * To go back to page click on view list<br />
              </Typography>
            </Grid>

          </Grid>
        </Card>
        </form>
      </Container>
    </Page>
  );
}
