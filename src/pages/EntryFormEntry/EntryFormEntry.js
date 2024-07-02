/* eslint-disable no-useless-concat */
/* eslint-disable no-useless-escape */
/* eslint-disable func-names */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import axios from 'axios';
import { parseJSON } from 'date-fns';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Link, Stack, Button, Card, TextField, Checkbox, FormControlLabel, Autocomplete, InputLabel, MenuItem, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// form
import { useForm } from 'react-hook-form';
import Webcam from 'react-webcam'
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import $ from 'jquery';
import swal from 'sweetalert';

// components
import moment from 'moment';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../components/hook-form';
import { GetMFS100KeyInfo, GetMFS100Info, CaptureFinger, MatchFinger, VerifyFinger } from '../../components/MantraConnectFunction';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import JSON_CONST from '../../components/CONSTVALUE.json';
import '../../styles.css';
import './style.css';
// ----------------------------------------------------------------------

export default function EntryFormEntry(props) {

  const quality = 60; // (1 to 100) (recommanded minimum 55)
  const timeout = 10; // seconds (minimum=10(recommanded), maximum=60, unlimited=0 )
  const nooffinger = '1';

  const navigate = useNavigate()
  const params = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paramsData, setParamsData] = useState([]);
  const [refBranch, setRefBranch] = useState([]);
  const [showHideDivOne, setShowHideDivOne] = useState(true);
  const [showHideDivTwo, setShowHideDivTwo] = useState(false);
  const [showScanner, setShowScanner] = useState(true);
  const [thumbImage, setThumbImage] = useState('');
  const [thumbImageCheck, setThumbImageCheck] = useState('');
  const [thumbImageCapture, setThumbImageCapture] = useState('');
  const [picture, setPicture] = useState('')
  const webcamRef = React.useRef(null)

  const [fromData, setFromData] = useState({
    cardNo: JSON_CONST.CARD_INCRIMENT,
    date: moment().format('YYYY-MM-DD'),
    name: '',
    address: '',
    mobile: '',
    vehicleNo: '',
    pourpose: '',
    noOfPerson: '',
    idNo: '',
    type: '',
    typeOf: '',
    personToMeet: '',
    inTime: moment().format('YYYY-MM-DD hh:mm a'),
    allowingEntryinLicanceArea: '',
    outTime: '',
    permittedBy: '',
    carringGadget: '',
    company: '',
    passNo: '',
    id: '',
    status: true
  });

  const videoConstraints = {
    width: 200,
    height: 250,
    facingMode: 'user',
  }

  const [fromDataAutoFill, setFromDataAutoFill] = useState({
    userList: [],
    yesOrNo: [
      {
        id: 'YES',
        name: 'YES'
      },
      {
        id: 'NO',
        name: 'NO'
      },
    ],
    typeList: [
      {
        id: 'AADHAR',
        name: 'AADHAR'
      },
      {
        id: 'PAN',
        name: 'PAN'
      },
      {
        id: 'D-LICANCE',
        name: 'D-LICANCE'
      },
      {
        id: 'VOTER-ID',
        name: 'VOTER-ID'
      },
      {
        id: 'OTHERS',
        name: 'OTHERS'
      },
    ],
    pourposeList: [
      {
        id: 'Official',
        name: 'Official'
      },
      {
        id: 'Personal',
        name: 'Personal'
      },
      {
        id: 'Technical',
        name: 'Technical'
      },
    ],
    gatePassList: [],
  });

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    if (params.data !== '0') {
      console.log(paramsData)
      setFromData({ 
        bank: typeof paramsData.bank !== 'undefined' ? paramsData.bank : [],
        branch: typeof paramsData.branch !== 'undefined' ? paramsData.branch : [],
        date: typeof paramsData.date !== 'undefined' ? paramsData.date : '',
        fileNo: typeof paramsData.fileNo !== 'undefined' ? paramsData.fileNo : '',
        loanACNo: typeof paramsData.loanACNo !== 'undefined' ? paramsData.loanACNo : '',
        collectedBy: typeof paramsData.collectedBy !== 'undefined' ? paramsData.collectedBy : '',
        handledByName: typeof paramsData.handledByName !== 'undefined' ? paramsData.handledByName : [],
        refNo: typeof paramsData.refNo !== 'undefined' ? paramsData.refNo : '',
        customerBorrower: typeof paramsData.customerBorrower !== 'undefined' ? paramsData.customerBorrower : [],
        address: typeof paramsData.address !== 'undefined' ? paramsData.address : '',
        payOrderNo: typeof paramsData.payOrderNo !== 'undefined' ? paramsData.payOrderNo : '',
        dated: typeof paramsData.dated !== 'undefined' ? paramsData.dated : '',
        forRs: typeof paramsData.forRs !== 'undefined' ? paramsData.forRs : '',
        favoring: typeof paramsData.favoring !== 'undefined' ? paramsData.favoring : '',
        reciptNo: typeof paramsData.reciptNo !== 'undefined' ? paramsData.reciptNo : '',
        amount: typeof paramsData.amount !== 'undefined' ? paramsData.amount : '',
        recDate: typeof paramsData.recDate !== 'undefined' ? paramsData.recDate : '',
        remarks: typeof paramsData.remarks !== 'undefined' ? paramsData.remarks : '',
        carringGadget: typeof paramsData.carringGadget !== 'undefined' ? paramsData.carringGadget : '',
        passNo: typeof paramsData.passNo !== 'undefined' ? paramsData.passNo : '',
        status:   paramsData.status === 'true'? true: false,
        id: typeof paramsData.id !== 'undefined' ? paramsData.id : '',
      });

      setPicture(paramsData.picture)
      setThumbImage(typeof paramsData.thumbImage !== 'undefined' ? paramsData.thumbImage : '',)
      setThumbImageCapture(typeof paramsData.thumbPrint !== 'undefined' ? paramsData.thumbPrint : '',)
    }

    // ------------------------------ Load data from database------------------------------ //

  },[params.data, paramsData]);

  useEffect(() => {
    setParamsData(JSON.parse(localStorage.getItem('editValue')))
    const api = async () => {
      let userList = []
      let gatePassList = []
      
      await axios.get(`${JSON_CONST.DB_URL}master/employee/list`)
      .then((response) => {
        // console.log(response)
        userList = arrageList(response);
      })
  
      await axios.get(`${JSON_CONST.DB_URL}gatePassEntry/listGatePssEntry/`)
      .then((response) => {
        console.log(response)
        gatePassList = response.data;
      })
  
      
      setFromDataAutoFill({
        ...fromDataAutoFill,
        userList,
        gatePassList,
      })
    }

    api();

  },[])

  

  const arrageList = (response) => {
    const list = []
    response.data.forEach((row) => {
      if(row.status === 'true') {
        list.push(row)
      }
    })

    return list
  }

  const DeviceInfo = () => 
  {
    const key = '';
    let res = '';
    if (key.length === 0) {
        res = GetMFS100Info();
    }
    else {
        // alert("GetMFS100KeyInfo");
        res = GetMFS100KeyInfo(key);
    }

    if (res.httpStaus) {

        console.log(`ErrorCode: ${  res.data.ErrorCode  } ErrorDescription: ${  res.data.ErrorDescription}`)

        if (res.data.ErrorCode === "0") {
          console.log(`tdSerial: ${ res.data.DeviceInfo.SerialNo }`);
          console.log(`tdCertification: ${ res.data.DeviceInfo.Certificate }`);
          console.log(`tdMake: ${ res.data.DeviceInfo.Make }`);
          console.log(`tdModel: ${ res.data.DeviceInfo.Model }`);
          console.log(`tdWidth: ${ res.data.DeviceInfo.Width }`);
          console.log(`tdHeight: ${ res.data.DeviceInfo.Height }`);
          console.log(`tdLocalMac: ${ res.data.DeviceInfo.LocalMac }`);
          console.log(`tdLocalIP: ${ res.data.DeviceInfo.LocalIP }`);
          console.log(`tdSystemID: ${ res.data.DeviceInfo.SystemID }`);
          console.log(`tdPublicIP: ${ res.data.DeviceInfo.PublicIP }`);

          return true;
        }
    }
    else {
        alert(res.err);
    }
    return false;
  }

  const Verify = (templateValue) => {
    let matchedValue = [];
    try {
      fromDataAutoFill.gatePassList.forEach((element, index) => {
        const isotemplate = element.thumbPrint;
        const res = VerifyFinger(templateValue, isotemplate);
        if (res.httpStaus) {
            if (res.data.Status) {
                matchedValue = element;
                setShowScanner(false)
                return matchedValue
            }
            if (res.data.ErrorCode !== "0") {
              console.log(res.data.ErrorDescription);
            }
        }
        else {
          console.log(res.err);
        }
      });
    }
    catch (e) {
      alert(e);
    }
    if(matchedValue.length === 0) {
      swal({
        title: "Match Not Found",
        text: " Create new !",
        icon: "error",
        button: "close",
        timer: 3000
      });
      setShowHideDivOne(false)
      setShowHideDivTwo(true)
      return false;
    } 
      swal({
        title: "Success",
        text: "Finger matched !",
        icon: "success",
        button: "close",
        timer: 3000
      });
      return matchedValue;

  }

  const CheckDevices = () => {
    const verify = DeviceInfo();
    if(verify === true) {
      // swal({
      //   title: "Place your fingure over the device",
      //   text: "'OK' to Proceed and 'Cancel' to stop",
      //   icon: "info",
      //   buttons: false,
      //   dangerMode: true,
      // })
      // .then((willDelete) => {
      //   if (willDelete) {
      //     CapturePrint();
      //   } else {
      //     console.log('Thing was not saved to the database.');
      //   }
      // });

      swal({
        title: "Place your fingure over the device",
        text: "",
        icon: "info",
        button: "ok",
        timer: 1000
      }).then(() => {
        CapturePrint()
      });
      
    }
  }


  const CapturePrint = () => {
    try {
        const res = CaptureFinger(quality, timeout);
        if (res.httpStaus) {

            if (res.data.ErrorCode === "0") {
              setThumbImage(`${  res.data.BitmapData}`)
                const imageinfo = `Quality: ${  res.data.Quality  } Nfiq: ${  res.data.Nfiq  } W(in): ${  res.data.InWidth  } H(in): ${  res.data.InHeight  } area(in): ${  res.data.InArea  } Resolution: ${  res.data.Resolution  } GrayScale: ${  res.data.GrayScale  } Bpp: ${  res.data.Bpp  } WSQCompressRatio: ${  res.data.WSQCompressRatio  } WSQInfo: ${  res.data.WSQInfo}`;
                setThumbImageCapture(res.data.IsoTemplate);
                // document.getElementById('txtImageInfo').value = imageinfo;
                // document.getElementById('txtIsoTemplate').value = res.data.IsoTemplate;
                // document.getElementById('txtAnsiTemplate').value = res.data.AnsiTemplate;
                // document.getElementById('txtIsoImage').value = res.data.IsoImage;
                // document.getElementById('txtRawData').value = res.data.RawData;
                // document.getElementById('txtWsqData').value = res.data.WsqImage;
                console.log(imageinfo);
                swal({
                  title: "Done",
                  text: "",
                  icon: "success",
                  button: "ok",
                  timer: 1000
                });
                return true;
            }
        }
        else {
            alert(res.err);
        }
    }
    catch (e) {
        alert(e);
    }
    return false;
  }



  const onSubmitCheckIdNo = async (event) => {
    event.preventDefault()
    setIsSubmitting(true);
    const fromElementsData = event.target.elements
    const sendPost = {
      idNo: fromElementsData.idNo.value,
    }
    // console.log(sendPost)
    try {
      await axios.post(`${JSON_CONST.DB_URL}gatePassEntry/searchExesting/`, sendPost)
        .then((response) => {
          // console.log(response);
          // console.log(response.data.length);
          setIsSubmitting(false);
          if(response.data === "CreateNew") {
            swal({
              title: "Not Found",
              text: "no old record found creating new one !",
              icon: "warning",
              button: "ok",
              timer: 3000
            });
            setFromData({...fromData, idNo: ''})
            setShowHideDivOne(false)
            setShowHideDivTwo(true)
          } 
          else if(response.data[response.data.length - 1]?.outTime === "") {
              swal({
                title: "Out Entry Pending",
                text: `Check Visitor Out From Date on ${moment(response.data[response.data.length - 1].date).format('DD-MM-YYYY')}`,
                icon: "error",
                button: "ok",
                timer: 2000
              }).then(() => {
                navigate(`/app/out/1`, { replace: true });
              });
            } 
            else {
              swal({
                title: "Found",
                text: "record found Data filled",
                icon: "success",
                button: "ok",
                timer: 2000
              });
              response.data[response.data.length - 1].date = moment().format('YYYY-MM-DD');
              response.data[response.data.length - 1].inTime = moment().format('YYYY-MM-DD hh:mm a');
  
              response.data[response.data.length - 1].noOfPerson = ''
              response.data[response.data.length - 1].pourpose = ''
              // response.data[response.data.length - 1].idNo = ''
              response.data[response.data.length - 1].type = response.data[response.data.length - 1].typeOf
              response.data[response.data.length - 1].permittedBy = ''
              response.data[response.data.length - 1].personToMeet = ''
              response.data[response.data.length - 1].allowingEntryinLicanceArea = ''
              response.data[response.data.length - 1].carringGadget = ''
              response.data[response.data.length - 1].passNo = ''
              
              setFromData(response.data[response.data.length - 1])
  
              setPicture(response.data[response.data.length - 1].picture)
              setThumbImage(response.data[response.data.length - 1].thumbImage)
              // console.log()
              setShowHideDivOne(false)
              setShowHideDivTwo(true)
            }
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
  
  
  const onSubmitCheckThumb = async (event) => {
    setIsSubmitting(true);
    event.preventDefault()

    const verify = DeviceInfo();
    let txtIsoTemplate = '';
    if(verify === true) {
      swal({
        title: "Place your fingure over the device",
        text: "",
        icon: "info",
        button: "ok",
        timer: 1000
      }).then(() => {
        try {
          const res = CaptureFinger(quality, timeout);
          if (res.httpStaus) {
  
              if (res.data.ErrorCode === "0") {
                  txtIsoTemplate = res.data.IsoTemplate;
                  swal({
                    title: "Processing",
                    text: "Please wait While Maching !",
                    icon: "warning",
                    button: "ok",
                    timer: 3000
                  });

              }
              setIsSubmitting(false);
          }
          else {
              alert(res.err);
          }
        }
        catch (e) {
            alert(e);
        }

        if(txtIsoTemplate !== '') {
          const checkReturn = Verify(txtIsoTemplate);
          if(checkReturn.outTime === '') {
            swal({
              title: "Out Entry Pending",
              text: `Check Visitor Out From Date on ${moment(checkReturn.date).format('DD-MM-YYYY')}`,
              icon: "error",
              button: "ok",
              // timer: 3000
            }).then(() => {
              navigate(`/app/out/1`, { replace: true });
            });
          }else {
            console.log(fromData)
            console.log(checkReturn)

            checkReturn.date = moment().format('YYYY-MM-DD');
            checkReturn.inTime = moment().format('YYYY-MM-DD hh:mm a');
            checkReturn.noOfPerson = ''
            checkReturn.pourpose = ''
            // checkReturn.idNo = ''
            checkReturn.type = checkReturn.typeOf
            checkReturn.permittedBy = ''
            checkReturn.personToMeet = ''
            checkReturn.allowingEntryinLicanceArea = ''
            checkReturn.carringGadget = ''
            checkReturn.passNo = ''

            setFromData(checkReturn)
            setShowHideDivOne(false)
            setShowHideDivTwo(true)

            setPicture(checkReturn.picture)
            setThumbImage(checkReturn.thumbImage)
            setThumbImageCapture(checkReturn.thumbPrint)
          }
        }
      });

      // swal({
      //   title: "Place your fingure over the device",
      //   text: "'OK' to Proceed and 'Cancel' to stop",
      //   icon: "info",
      //   buttons: true,
      //   dangerMode: true,
      // })
      // .then((willDelete) => {
      //   if (willDelete) {
      //     try {
      //       const res = CaptureFinger(quality, timeout);
      //       if (res.httpStaus) {
    
      //           if (res.data.ErrorCode === "0") {
      //               txtIsoTemplate = res.data.IsoTemplate;
      //               swal({
      //                 title: "Processing",
      //                 text: "Please wait While Maching !",
      //                 icon: "warning",
      //                 button: "ok",
      //                 timer: 3000
      //               });

      //           }
      //           setIsSubmitting(false);
      //       }
      //       else {
      //           alert(res.err);
      //       }
      //     }
      //     catch (e) {
      //         alert(e);
      //     }

      //     if(txtIsoTemplate !== '') {
      //       const checkReturn = Verify(txtIsoTemplate);
      //       checkReturn.date = moment().format('YYYY-MM-DD');
      //       checkReturn.inTime = moment().format('YYYY-MM-DD hh:mm a');
            
      //       console.log(fromData)

      //       checkReturn.noOfPerson = ''
      //       checkReturn.pourpose = ''
      //       checkReturn.idNo = ''
      //       checkReturn.typeOf = ''
      //       checkReturn.permittedBy = ''
      //       checkReturn.personToMeet = ''
      //       checkReturn.allowingEntryinLicanceArea = ''
      //       checkReturn.carringGadget = ''
      //       checkReturn.passNo = ''

      //       setFromData(checkReturn)
      //       setShowHideDivOne(false)
      //       setShowHideDivTwo(true)

      //       setPicture(checkReturn.picture)
      //       setThumbImage(checkReturn.thumbImage)
      //       setThumbImageCapture(checkReturn.thumbPrint)
      //     }
      //   } else {
      //     setIsSubmitting(false);
      //     console.log('Thing was not saved to the database.');
      //   }
      // });
    }


  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true);
    const fromElementsData = event.target.elements
    let sendPost = {
      cardNo: JSON_CONST.CARD_INCRIMENT,
      date: fromElementsData.date.value,
      name: fromElementsData.name.value,
      address: fromElementsData.address.value,
      mobile: fromElementsData.mobile.value,
      vehicleNo: fromElementsData.vehicleNo.value,
      pourpose: fromElementsData.pourpose.value,
      noOfPerson: fromElementsData.noOfPerson.value,
      idNo: fromElementsData.idNo.value,
      typeOf: fromElementsData.type.value,
      personToMeet: fromElementsData.personToMeet.value,
      inTime: moment().format('YYYY-MM-DD hh:mm a'),
      allowingEntryinLicanceArea: fromElementsData.allowingEntryinLicanceArea.value,
      thumbPrint: thumbImageCapture,
      outTime: '',
      permittedBy: fromElementsData.permittedBy.value,
      carringGadget: fromElementsData.carringGadget.value,
      passNo: fromElementsData.passNo.value,
      status: fromElementsData.status.value,
      picture,
      thumbImage,
      company: fromElementsData.company.value,
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),
      id: fromData.id,
    }

    console.log(sendPost)
    
    if(params.data !== '0') {
      try {
        await axios.post(`${JSON_CONST.DB_URL}builderPayment/update/${sendPost.id}`, sendPost)
          .then((response) => {
            console.log(response);
            setIsSubmitting(false);
            navigate(`/app/builerPayment`, { replace: true });
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
          await axios.post(`${JSON_CONST.DB_URL}gatePassEntry/create/`, sendPost)
            .then((response) => {
              console.log(response);
              setIsSubmitting(false);
              swal({
                title: "Done",
                text: "Record Saved !",
                icon: "success",
                button: "ok",
                timer: 2000
              });
              sendPost.thumbImage = ''
              sendPost.picture = ''
              sendPost.thumbPrint = ''
              sendPost = JSON.stringify(sendPost);
              sendPost = encodeURI(sendPost);

              navigate(`/app/passGenerate/${response.data}`, { replace: true });
              // window.open(`${window.location.origin}/#/passGenerate/${response.data}`, '_blank');
              window.location.reload();

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

    // Bank To Branch Change Logic
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
    navigate(`/app/${url}`, { replace: true });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot()
    setPicture(pictureSrc)
  })

  return (
    <Page title="Visitor Entry">
      <Container maxWidth="xl" className="container-custom">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Visitor Entry
          </Typography>
          <Button variant="flat" style={{backgroundColor: '#02164F', color: '#FEFEFE'}} onClick={() => redirectPage('dashboard')} startIcon={<Iconify icon="carbon:list-boxes" />}>
            Dashboard
          </Button>
        </Stack>
        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button variant="outlined" color="info" onClick={() => redirectPage('builerPayment')} startIcon={<Iconify icon="akar-icons:arrow-back" />}>
            View List
          </Button>
        </Stack> */}

        <div  className={showHideDivOne === true ? 'showDiv' : 'hideDiv'}>
          <Grid container alignItems="center" paddingLeft={5} paddingBottom={5} paddingRight={5} paddingTop={0} spacing={3}>
            <Grid mt={2} mb={2} item xs={6} sm={6} md={6} lg={6}>
              <form methods="post" onSubmit={onSubmitCheckIdNo} className={showHideDivOne === true ? 'showDiv' : 'hideDiv'}>
                <Card className="cardBackground">
                  <Grid container alignItems="center" paddingLeft={3} paddingBottom={2} paddingRight={3} paddingTop={0} spacing={3}>
                    <Grid mt={2} mb={2} item xs={12} sm={12} md={12} lg={12}>
                      <Typography variant="overline" gutterBottom>
                        Enter Details <Iconify icon="bi:arrow-down" />
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={10} lg={10}>
                      <TextField
                        onChange={onChangeFields}
                        fullWidth
                        value={fromData.idNo}
                        required
                        name="idNo"
                        label="Mobile No"
                        type="text"
                        autoFocus
                        color="orange"
                      />
                    </Grid>

                    


                    <Grid item xs={12} sm={1} md={1} lg={1}>
                      <LoadingButton fullWidth size="large" type="submit" style={{backgroundColor: '#F37022', color: '#FEFEFE'}} variant="flat" loading={isSubmitting}>
                        Search
                      </LoadingButton>
                    </Grid>

                    <Grid mt={2} item xs={12} sm={12} md={12} lg={12}>
                      <Typography variant="caption" gutterBottom>
                        * ID No is required <br />
                        * To go to Dashboard click on Dashboard on right side<br />
                      </Typography>
                    </Grid>

                  </Grid>
                </Card>
              </form>
            </Grid>

            <Grid mt={2} mb={2} item xs={6} sm={6} md={6} lg={6}>
              <form methods="post" onSubmit={onSubmitCheckThumb} className={showHideDivOne === true ? 'showDiv' : 'hideDiv'}>
                <Card className="cardBackground">
                  <Grid container alignItems="center" paddingLeft={3} paddingBottom={3} paddingRight={3} paddingTop={0} spacing={3}>
                    <Grid mt={2} mb={2} item xs={12} sm={12} md={12} lg={12}>
                      <Typography variant="overline" gutterBottom>
                        Scan Thumb <Iconify icon="bi:arrow-down" />
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={10} lg={10} style={{display: 'none'}}>
                      <TextField
                        onChange={onChangeFields}
                        fullWidth
                        value={fromData.thumbPrint}
                        name="thumbPrint"
                        label="Thumb Print"
                        type="text"
                        autoFocus
                      />
                    </Grid>

                    


                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <LoadingButton fullWidth size="large" style={{backgroundColor: '#F37022', color: '#FEFEFE'}} type="submit" variant="flat" loading={isSubmitting}>
                        Scan Thumb
                      </LoadingButton>
                    </Grid>

                    <Grid mt={2} item xs={12} sm={12} md={12} lg={12}>
                      <Typography variant="caption" gutterBottom>
                        * Scan to Check for Related Entry <br />
                        * Check for ThumbImpration <br />
                      </Typography>
                    </Grid>

                  </Grid>
                </Card>
              </form>
            </Grid>

          </Grid>
        </div>

       

        

        <form methods="post" onSubmit={onSubmit} className={showHideDivTwo === true ? 'showDiv' : 'hideDiv'}>
        <Card className="cardBackground">
          <Grid container alignItems="center" paddingLeft={10} paddingBottom={10} paddingRight={10} paddingTop={5} spacing={3}>
            <Grid mt={0} mb={0} item xs={12} sm={12} md={12} lg={12}>
              {/* <Typography variant="overline" gutterBottom>
                Bank Details <Iconify icon="bi:arrow-down" />
              </Typography> */}
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.cardNo}
                name="cardNo" 
                label="Card No"
                disabled
                color="orange"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.date}
                required
                name="date"
                label="Receipt Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                autoFocus
                disabled
                color="orange"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={moment().format('hh:mm a')}
                name="inTime" 
                label="In Time"
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
                disabled
                color="orange"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={moment(fromData.outTime).format('hh:mm')}
                name="outTime" 
                label="Out Time"
                type="time"
                InputLabelProps={{
                  shrink: true,
                }}
                disabled
                color="orange"
              />
            </Grid>
            
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.name}
                name="name"  
                label="Name"
                required
                color="orange"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.company}
                name="company" 
                label="Company Name"
                type="text"
                color="orange"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.mobile}
                name="mobile" 
                label="Mobile No"
                color="orange"
                required
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.vehicleNo}
                name="vehicleNo" 
                label="Vechile No"
                type="text"
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
                required
                color="orange"
              />
            </Grid>
            
            
            

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <FormControl fullWidth>
                <InputLabel color="orange" id="Bank-select-label">Pourpose</InputLabel>
                <Select
                  labelId="Bank-select-label"
                  id="Bank-select"
                  value={fromData.pourpose}
                  label="pourpose"
                  name="pourpose"  
                  fullWidth
                  onChange={onChangeFields}
                  color="orange"
                >
                  {fromDataAutoFill.pourposeList.map((option) => (<MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>


            <Grid item xs={12} sm={12} md={2} lg={2}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.noOfPerson}
                name="noOfPerson" 
                label="No Of Person"
                color="orange"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.idNo}
                name="idNo" 
                label="Id No"
                required
                color="orange"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={2} lg={2}>
              <FormControl fullWidth>
                <InputLabel color="orange" id="Bank-select-label">Type</InputLabel>
                <Select
                  labelId="Bank-select-label"
                  id="Bank-select"
                  value={fromData.type}
                  label="type"
                  name="type"  
                  fullWidth
                  onChange={onChangeFields}
                  color="orange"
                >
                  {fromDataAutoFill.typeList.map((option) => (<MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <FormControl fullWidth>
                <InputLabel color="orange" id="Bank-select-label">Person To Meet</InputLabel>
                <Select
                  labelId="Bank-select-label"
                  id="Bank-select"
                  value={fromData.personToMeet}
                  label="personToMeet"
                  name="personToMeet"  
                  fullWidth
                  onChange={onChangeFields}
                  color="orange"
                  required
                >
                  {fromDataAutoFill.userList.map((option) => (<MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
              <FormControl fullWidth>
                <InputLabel color="orange" id="Bank-select-label">Permitted By</InputLabel>
                <Select
                  labelId="Bank-select-label"
                  id="Bank-select"
                  value={fromData.permittedBy}
                  label="permittedBy"
                  name="permittedBy"  
                  fullWidth
                  onChange={onChangeFields}
                  color="orange"
                >
                  {fromDataAutoFill.userList.map((option) => (<MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>

            
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <FormControl fullWidth>
                <InputLabel color="orange" id="Bank-select-label">Allowing Entry in Licance Area</InputLabel>
                <Select
                  labelId="Bank-select-label"
                  id="Bank-select"
                  value={fromData.allowingEntryinLicanceArea}
                  label="allowingEntryinLicanceArea"
                  name="allowingEntryinLicanceArea"  
                  fullWidth
                  onChange={onChangeFields}
                  color="orange"
                >
                  {fromDataAutoFill.yesOrNo.map((option) => (<MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>

            
            
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <FormControl fullWidth>
                <TextField
                  onChange={onChangeFields}
                  fullWidth
                  value={fromData.carringGadget}
                  name="carringGadget" 
                  label="Carring Gadget"
                  type="text"
                  color="orange"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.passNo}
                name="passNo" 
                label="ACS PassNo"
                type="text"
                color="orange"
              />
            </Grid>

            

            
            <Grid item xs={12} sm={3} md={3} lg={3}  >
              <img
                src={`data:image/bmp;base64,${thumbImage}`}
                // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={`ThumbPrint`}
                loading="lazy"
                style={{width: '200px',height: '250px', border: '1px solid black'}}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3} >
              <LoadingButton fullWidth size="large" type="button" variant="flat" style={{backgroundColor: '#02164F', color: '#FEFEFE'}} onClick={CheckDevices} loading={isSubmitting}>
                Scan and Capture ThumbPrint
              </LoadingButton>
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3} >
              {picture === '' ? (
                <Webcam
                  audio={false}
                  // height={200}
                  ref={webcamRef}
                  // width={250}
                  style={{width: '200px',height: '250px', border: '1px solid black'}}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                />
              ) : (
                <img
                  src={picture}
                  // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={`ImagePic`}
                  loading="lazy"
                  style={{width: '200px',height: '250px', border: '1px solid black'}}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3}>
              {picture !== '' ? (
                <LoadingButton fullWidth size="large" type="button" variant="flat" style={{backgroundColor: '#02164F', color: '#FEFEFE'}} loading={isSubmitting}
                  onClick={(e) => {
                    e.preventDefault()
                    setPicture('')
                  }}
                >
                Retake
                </LoadingButton>
              ) : (
                <LoadingButton fullWidth size="large" type="button" variant="flat" style={{backgroundColor: '#02164F', color: '#FEFEFE'}} loading={isSubmitting}
                  onClick={(e) => {
                    e.preventDefault()
                    capture()
                  }}
                >
                Capture
                </LoadingButton>
              )}
            </Grid>
            
            <Grid item xs={12} sm={3} md={12} lg={12} />
            <Grid item xs={12} sm={2} md={2} lg={2}>
              <LoadingButton fullWidth size="large" type="submit" variant="flat" style={{backgroundColor: '#F37022', color: '#FEFEFE'}} loading={isSubmitting}>
                Save
              </LoadingButton>
            </Grid>
            
            <Grid item xs={12} sm={12} md={12} lg={12} style={{display: 'none'}}>
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
                * Address is required <br />
                * Only Text - numbers are not allowed in required fields<br />
              </Typography>
            </Grid>

          </Grid>
        </Card>
        </form>
      </Container>
    </Page>
  );
}
