/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import axios from 'axios';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import JSON_CONST from '../../../components/CONSTVALUE.json';



// ----------------------------------------------------------------------

export default function UserMoreMenu(props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [urlTo, setUrlTo] = useState('');
  const [data, setData] = useState([]);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    setDataProps(props)
  });

  const setDataProps = async (data) => {
    setUrlTo(data.urlTo !== 'undefined' ? data.urlTo : '')
    // setData(JSON.stringify(data.data !== 'undefined' ? data.data : ''))
    localStorage.setItem('editValue', JSON.stringify(data.data !== 'undefined' ? data.data : ''))
    setData(1)
  };


  const deleteData = async (dataVal) => {
    const ID  = dataVal.dataID;
    const URL = dataVal.deleteURL;
    axios.get(`${JSON_CONST.DB_URL}${URL}${ID}`)
      .then((response) => {
        // eslint-disable-next-line no-alert
        alert('Deleted Successfully');
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={() => deleteData(props)} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem component={RouterLink} to={urlTo + data} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
