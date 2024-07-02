/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Link, Stack, Button, Card, TextField, Checkbox, FormControlLabel, Autocomplete, InputLabel, MenuItem, FormControl  } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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

export default function EntryFormFEE(props) {

  const navigate = useNavigate()
  const params = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paramsData, setParamsData] = useState([]);
  const [fromData, setFromData] = useState({
    employeeID: [],
    name: [],
    particulars: [
      {id: 1, label: 'Legal Report'},
      {id: 2, label: 'Vetting Report'},
      {id: 3, label: 'TSR Report'},
      {id: 4, label: 'Opinion'},
      {id: 5, label: 'OVD'},
      {id: 6, label: 'Project'},
      {id: 7, label: 'Certified Copy'},
      {id: 8, label: 'Disturbed'},
      {id: 9, label: 'ROC Search'},
      {id: 10, label: 'Bulder Payment'},
      {id: 11, label: 'Others'},
    ],
    password: '',
    email: '',
    confirmPassword: '',
    defaultPassword: '',
    permission: '',
    id: '',
    status: true
  });

  const [fromDataAutoFill, setFromDataAutoFill] = useState({
    userList: [],
  });

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    setParamsData(JSON.parse(localStorage.getItem('editValue')))
    if (params.data !== '0') {
      setFromData({ 
        employeeID: typeof paramsData.employeeID !== 'undefined' ? paramsData.employeeID : [],
        name: typeof paramsData.name !== 'undefined' ? paramsData.name : [],
        password: typeof paramsData.password !== 'undefined' ? paramsData.password : [],
        defaultPassword: typeof paramsData.password !== 'undefined' ? paramsData.password : [],
        confirmPassword: typeof paramsData.password !== 'undefined' ? paramsData.password : [],
        permission: typeof paramsData.permission !== 'undefined' ? paramsData.permission : [],
        email: typeof paramsData.email !== 'undefined' ? paramsData.email : '',
        status: paramsData.status === 'true' ? true : false,
        id: typeof paramsData.id !== 'undefined' ? paramsData.id : '',
      });
    }

    api();
    // ------------------------------ Load data from database------------------------------ //
  }, [params.data, paramsData?.email, paramsData?.employeeID, paramsData?.id, paramsData?.name, paramsData?.password, paramsData?.permission, paramsData?.status]);




  const api = async () => {
    let userList = []
    
    await axios.get(`${JSON_CONST.DB_URL}master/employee/list`)
    .then((response) => {
      console.log(response)
      userList = arrageList(response);
    })
    
    setFromDataAutoFill({
      userList,
    })
  }
  
    const arrageList = (response) => {
      const list = []
      response.data.forEach((row) => {
        if(row.status === 'true') {
          list.push(row)
        }
      })
  
      return list
    }
  

    const onSubmit = async (event) => {
      event.preventDefault()
      setIsSubmitting(true);
      const fromElementsData = event.target.elements
      const sendPost = {
        employeeID: fromElementsData.employeeID.value,
        name: fromElementsData.name.value,
        email: fromElementsData.email.value,
        password: fromElementsData.password.value,
        status: fromElementsData.status.value,
        permission: fromElementsData.permission.value,
        id: fromData.id,
      }
        
      if(params.data !== '0') {
        // eslint-disable-next-line no-restricted-globals, no-alert
        if (confirm('Do you with to update your password ? Press "OK" to Update All OR press "Cancel" to Update the rest of the fields')) {
          try {
            await axios.post(`${JSON_CONST.DB_URL}auth/userUpdate/${sendPost.id}`, sendPost)
              .then((response) => {
                console.log(response);
                setIsSubmitting(false);
                navigate(`/app/master/usersMaster`, { replace: true });
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
          sendPost.password = FormData.defaultPassword;
          try {
            await axios.post(`${JSON_CONST.DB_URL}auth/userUpdate/${sendPost.id}`, sendPost)
              .then((response) => {
                console.log(response);
                setIsSubmitting(false);
                navigate(`/app/master/usersMaster`, { replace: true });
              })
              .catch((error) => {
                setIsSubmitting(false);
                console.log(error);
              });
          }
          catch (err) {
            console.log(err)
          }
        }
      } else {
          try {
            await axios.post(`${JSON_CONST.DB_URL}auth/userAdd`, sendPost)
              .then((response) => {
                console.log(response);
                setIsSubmitting(false);
                navigate(`/app/master/usersMaster`, { replace: true });
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
    <Page title="Users Master">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Users Master
          </Typography>
          {/* <Button variant="contained" color="secondary" onClick={() => redirectPage('')} startIcon={<Iconify icon="carbon:list-boxes" />}>
            Home
          </Button> */}
        </Stack>
        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button variant="outlined" color="info" onClick={() => redirectPage('fee')} startIcon={<Iconify icon="akar-icons:arrow-back" />}>
            View List
          </Button>
        </Stack> */}
        <form methods="post" onSubmit={onSubmit}>
        <Card className="cardBackground">
          <Grid container alignItems="center" paddingLeft={10} paddingBottom={10} paddingRight={10} paddingTop={5} spacing={3}>
            <Grid mt={2} mb={2} item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="overline" gutterBottom>
              Users Details <Iconify icon="bi:arrow-down" />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <FormControl fullWidth>
                  <InputLabel color="orange" id="particulars-select-label">User Permission</InputLabel>
                  <Select
                    labelId="particulars-select-label"
                    id="particulars-select"
                    value={fromData.permission}
                    label="permission"
                    name="permission"  
                    fullWidth
                    onChange={onChangeFields}
                    color="orange"
                    required
                  >
                    <MenuItem value={`officer`}>Officer</MenuItem>
                    <MenuItem value={`guard`}>Guard</MenuItem>
                  </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <FormControl fullWidth>
                  <InputLabel color="orange" id="particulars-select-label">Employee</InputLabel>
                  <Select
                    labelId="particulars-select-label"
                    id="particulars-select"
                    value={fromData.employeeID}
                    label="employee"
                    name="employeeID"  
                    fullWidth
                    onChange={onChangeFields}
                    color="orange"
                  >
                    {fromDataAutoFill.userList.map((option) => (<MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>))}
                  </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.name}
                name="name" 
                label="User ID"
                required
                color="orange"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.email}
                name="email" 
                label="Email"
                type="email"
                color="orange"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.password}
                name="password" 
                label="Password"
                type="password"
                required
                color="orange"
              />
            </Grid>
            {/* <Grid item xs={12} sm={12} md={4} lg={4} /> */}
            
            {/* <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.confirmPassword}
                name="confirmPassword" 
                label="Confirm Password"
                type="password"
                required
              />
            </Grid> */}
            <Grid item xs={12} sm={12} md={4} lg={4} />



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
                * User ID / Name is required <br />
                * Email is required <br />
                * Password is required <br />
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
