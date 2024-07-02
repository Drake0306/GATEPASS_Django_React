import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Grid,
  TextField,
  Tooltip,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import moment from 'moment';
import swal from 'sweetalert';

// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@dashboard/user';
import JSON_CONST from '../../components/CONSTVALUE.json';
import './style.css';
// mock
// import USERLIST from '../../../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Card No', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'personToMeet', label: 'Meet With', alignRight: false },
  { id: 'vehicleNo', label: 'Vehicle No', alignRight: false },
  { id: 'inTime', label: 'In Time', alignRight: false },
  { id: 'outTime', label: 'Out Time', alignRight: false },
  { id: 'action', label: 'Action', alignRight: false },
  // { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function OutFormEntry(isDashboard) {
  const navigate = useNavigate()
  const params = useParams()

  const [fromData, setFromData] = useState({
    from: params.data !== '0' ? moment().format('YYYY-MM-DD') : moment().startOf('month').format('YYYY-MM-DD'),
    to: moment().format('YYYY-MM-DD'),
    name: '',
    status: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApprove, setIsApprove] = useState(false);


  const [USERLIST, setUSERLIST] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [sessionData, setSessionData] = useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const redirectPage = async (url) => {
    if(url === "homepage") {
      navigate(`/app/dashboard/`, { replace: true });
    } else {
      navigate(`/app/option/${url}`, { replace: true });
    }
  }

  const approveOutEntry = async (id) => {
    setIsApprove(true);
    const sendPost = {
      id,
      outTime: moment().format('YYYY-MM-DD hh:mm a')
    }

    console.log(sendPost)

    try {
      console.log(sendPost)
      await axios.post(`${JSON_CONST.DB_URL}gatePassEntry/outEntry/`, sendPost)
        .then((response) => {
          console.log(response);
          const sendPost = {
            from: fromData.from,
            to: fromData.to,
          }
          getResult(sendPost)
          swal({
            title: "Successfully",
            text: "Out entry Approved",
            icon: "success",
            button: "close",
            timer: 2000
          });
          setIsApprove(false);
        })
        .catch((error) => {
          setIsApprove(false);
          console.log(error);
        });
    }
    catch (err) {
      console.log(err)
    }
  };

  const deleteEntry = async (id) => {
    setIsApprove(true);

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.get(`${JSON_CONST.DB_URL}gatePassEntry/outEntry/delete/${id}`)
            .then((response) => {
              swal({
                title: "Successfully",
                text: "Entry Removed",
                icon: "success",
                button: "close",
                timer: 2000
              });
              setIsApprove(false);
              window.location.reload();
            })
            .catch((error) => {
              setIsApprove(false);
              console.log(error);
            });
        }
        catch (err) {
          console.log(err)
        }
      } else {
        console.log("cancel");
        setIsApprove(false);
      }
    });

    
  };

  const generatePass = (id) => {
    navigate(`/app/passGenerate/${id}`, { replace: false,   });
    // window.open(`${window.location.origin}/#/passGenerate/${id}`, '_blank');
  }
  
  const outEntryRemove = async (id) => {
    setIsApprove(true);
    const sendPost = {
      id,
      outTime: ''
    }

    try {
      console.log(sendPost)
      await axios.post(`${JSON_CONST.DB_URL}gatePassEntry/outEntryRemove/`, sendPost)
        .then((response) => {
          console.log(response);
          const sendPost = {
            from: fromData.from,
            to: fromData.to,
          }
          getResult(sendPost)
          swal({
            title: "Successfully",
            text: "Out entry Reverted",
            icon: "success",
            button: "close",
            timer: 2000
          });
          setIsApprove(false);
        })
        .catch((error) => {
          setIsApprove(false);
          console.log(error);
        });
    }
    catch (err) {
      console.log(err)
    }
  };

  const getResult = async (sendPost) => {
    try {
      // console.log(sendPost)
      await axios.post(`${JSON_CONST.DB_URL}gatePassEntry/ledgerSearch/`, sendPost)
        .then((response) => {
          // console.log(response);
          setUSERLIST(response.data)
          setIsSubmitting(false);
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

  const loadReportRecord = () => {
    let sendPost = {
      from: fromData.from,
      to: fromData.to,
      name: fromData.name,
    }

    
    sendPost = JSON.stringify(sendPost);
    sendPost = encodeURI(sendPost);


    navigate(`/app/report/PDFReport/${sendPost}`, { replace: true,  });
    // window.open(`${window.location.origin}/#/report/PDFReport/${sendPost}`, '_blank');
    
  }

  const redirectTo = (url) => {
      navigate(url, { replace: true,  });
  }

  const onSubmit = async (event) => {    
    event.preventDefault()
    setIsSubmitting(true);
    const fromElementsData = event.target.elements
    const sendPost = {
      from: fromElementsData.from.value,
      to: fromElementsData.to.value,
      name: fromElementsData.name.value,
    }

    getResult(sendPost)
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

  useEffect(() => {
    let sendPost = {}
    setUSERLIST([])
    if(params.data !== '0') {
      setFromData({
        from: moment().format('YYYY-MM-DD'),
        to: moment().format('YYYY-MM-DD'),
        status: true
      })

      sendPost = {
        from: moment().format('YYYY-MM-DD'),
        to: moment().format('YYYY-MM-DD'),
      }
    } else {
      setUSERLIST([])
      setFromData({
        // from: moment().subtract(1, 'months').startOf('month').format('DD-MM-YYYY'),
        from: moment().startOf('month').format('YYYY-MM-DD'),
        to: moment().format('YYYY-MM-DD'),
        status: true
      })

      sendPost = {
        from: moment().startOf('month').format('YYYY-MM-DD'),
        to: moment().format('YYYY-MM-DD'),
      }
    }
    getResult(sendPost)

    const permission = JSON.parse(localStorage.getItem('session'));
    setSessionData(JSON.parse(permission.permission.permissionSet));
  }, [params.data]);

  return (
    <Page title={params.data !== '0'? `Visitor Out` : `Search Visitor`}>
      <Container maxWidth="">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} className={typeof isDashboard.fromDashboard !== 'undefined' ? 'hideDiv' : 'showDiv'}>
          <Typography variant="h4" gutterBottom>
            {params.data !== '0'? `Visitor Out` : `Search Visitor`}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} className={typeof isDashboard.fromDashboard !== 'undefined' ? 'hideDiv' : 'showDiv'}>
          <Button variant="flat" style={{backgroundColor: '#02164F', color: '#FEFEFE'}} onClick={() => redirectPage('homepage')} startIcon={<Iconify icon="akar-icons:arrow-back" />}>
            Dashboard
          </Button>
        </Stack>

        <form methods="post" onSubmit={onSubmit} className={typeof isDashboard.fromDashboard !== 'undefined' ? 'hideDiv' : 'showDiv'}>
        <Card className="cardBackground">
            <Grid container alignItems="center" paddingLeft={2} paddingBottom={2} paddingRight={2} paddingTop={5} spacing={3}>
                <Grid item xs={12} sm={12} md={2} lg={2}>
                    <TextField
                        onChange={onChangeFields}
                        fullWidth
                        value={fromData.from}
                        name="from"
                        label="From"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={2} lg={2}>
                    <TextField
                        onChange={onChangeFields}
                        fullWidth
                        value={fromData.to}
                        name="to"
                        label="To"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={2} lg={2}>
                    <TextField
                        onChange={onChangeFields}
                        fullWidth
                        value={fromData.name}
                        name="name"
                        label="Name"
                        type="text"
                    />
                </Grid>
                
                <Grid item xs={12} sm={3} md={3} lg={3}>
                    <LoadingButton fullWidth size="large" startIcon={<Iconify icon="et:search" />} type="submit" variant="flat" style={{backgroundColor: '#F37022', color: '#FEFEFE'}} loading={isSubmitting}>
                        Search for Records
                    </LoadingButton>
                </Grid>
                <Grid item xs={12} sm={3} md={3} lg={3} className={params.data === '0'? 'showDiv': 'hideDiv'}>
                    <LoadingButton fullWidth size="large" startIcon={<Iconify icon="et:search" />} onClick={loadReportRecord} type="button" variant="flat" style={{backgroundColor: '#02164F', color: '#FEFEFE'}} loading={isSubmitting}>
                        Generate Report
                    </LoadingButton>
                </Grid>
            </Grid>
        </Card>
        </form>

        <Card sx={{ width: '100%', marginTop: '30px' }}>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800}} className={typeof isDashboard.fromDashboard !== 'undefined' ? 'minHeight' : ''}>
              <Table >
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, branch, contactPerson, address, email, phoneOne, status, avatarUrl } = row;
                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        // role="checkbox"
                        // selected={isItemSelected}
                        // aria-checked={isItemSelected}
                      >
                        {/* <TableCell padding="checkbox" /> */}

                        <TableCell component="th" style={{textAlign: "center"}} scope="row" paddingLeft="10px">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography style={{textAlign: "center"}} variant="subtitle2" noWrap>
                              {JSON_CONST.CARD_INCRIMENT}{row.id}
                            </Typography>
                          </Stack>
                        </TableCell>
                        
                        <TableCell component="th" style={{textAlign: "center"}} scope="row" paddingLeft="10px">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography style={{textAlign: "center"}} variant="subtitle2" noWrap>
                              {row.name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography style={{textAlign: "center"}} variant="subtitle2" noWrap>
                              {row.date}
                            </Typography>
                          </Stack>
                        </TableCell>
                        
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography style={{textAlign: "center"}} variant="subtitle2" noWrap>
                              {row.personToMeetName?.name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography style={{textAlign: "center"}} variant="subtitle2" noWrap>
                              {row.vehicleNo}
                            </Typography>
                          </Stack>
                        </TableCell>
                        
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography style={{textAlign: "center"}} variant="subtitle2" noWrap>
                              {moment(row.inTime).format('hh:mm a')}
                            </Typography>
                          </Stack>
                        </TableCell>
                        
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography style={{textAlign: "center"}} variant="subtitle2" noWrap>
                              {moment(row.outTime).format('hh:mm a')}
                            </Typography>
                          </Stack>
                        </TableCell>
                        
                        <TableCell component="th" scope="row" padding="10px">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography style={{textAlign: "center"}} variant="subtitle2" noWrap>

                            {sessionData.delete === true
                            ? <LoadingButton style={{marginRight: '10px', color: 'white'}} size="small" startIcon={<Iconify icon="material-symbols:delete-outline" />} type="button" variant="contained" onClick={() => {deleteEntry(row.id)}} color="orange" loading={isApprove}>Delete</LoadingButton>
                            : null }

                            {params.data !== '0'? (
                              <>
                                {row.outTime === ''? <LoadingButton  size="small" startIcon={<Iconify icon="ic:baseline-log-out" />} type="button" variant="contained" onClick={() => {approveOutEntry(row.id)}} color="success" loading={isApprove}>Out</LoadingButton>
                                  :
                                  null
                                }
                                {row.outTime !== '' && moment(row.outTime).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') 
                                  ?
                                  
                                    <Tooltip title="this is avaible for the entry done on the same day">
                                      <LoadingButton  size="small" startIcon={<Iconify icon="charm:square-cross" />} type="button" variant="contained" onClick={() => {outEntryRemove(row.id)}} color="warning" loading={isApprove}>Revert</LoadingButton>
                                    </Tooltip>
                                  
                                  : 
                                  null
                                }
                              </>
                            ) : (
                                  <LoadingButton  size="small" startIcon={<Iconify icon="prime:file-pdf" />} type="button" variant="contained" onClick={() => {generatePass(row.id)}} color="error" style={{color: 'white'}} loading={isApprove}> <span style={{marginTop: '4px'}}>Print Pass</span> </LoadingButton>
                                )
                            }

                            </Typography>
                          </Stack>
                        </TableCell>

                        {/* <TableCell align="left">
                          <Label variant="ghost" color={(status === false && 'error') || 'success'}>
                            {sentenceCase( status === true ? 'active' : 'in active')}
                          </Label>
                        </TableCell> */}

                        {/* <TableCell align="right">
                          <UserMoreMenu urlTo={'/app/option/prepareReports/newEntry/'} data={row} />
                        </TableCell> */}
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {/* Check For No Search Found  */}
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
          
          <LoadingButton 
            fullWidth 
            size="small" 
            startIcon={<Iconify icon="material-symbols:format-list-bulleted-rounded" />} 
            type="button" variant="contained" 
            onClick={() => {redirectTo('/app/out/1')}} 
            className={typeof isDashboard.fromDashboard !== 'undefined' ? 'showDiv' : 'hideDiv'}
            style={{backgroundColor: 'transparent'}}
            color="warning" loading={false}
          >
              View All
          </LoadingButton>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100, 500, 1000]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className={typeof isDashboard.fromDashboard !== 'undefined' ? 'hideDiv' : 'showDiv'}
          />
        </Card>
      </Container>
    </Page>
  );
}
