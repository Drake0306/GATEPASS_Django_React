// component
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

let session = []

if(localStorage.getItem('session') !== null) {
  session = JSON.parse(localStorage.getItem('session'))
}

const permissionSet = typeof session.permission === 'undefined' ? [] : JSON.parse(session?.permission.permissionSet)



const logout = () => {
  localStorage.clear();
};

const navConfig = [
  {
    title: 'dashboard',
    path: '/app/dashboard',
    icon: getIcon('mdi:monitor-dashboard'),
    permission: permissionSet === [] ? 0 :permissionSet.dashboard,
  },

  {
    title: 'Entry Section',
    path: '#', 
    icon: getIcon('icon-park-outline:permissions'),
    permission: permissionSet === [] ? 0 :permissionSet.builerPayment,
    children: [
      // { 
      //   head: '',
      //   title: 'Visitor',
      //   path: '/app/entry/0',
      //   icon: getIcon(''),
      // },
      {
        head: 'gatePassEntry',
        title: 'Visitor Entry',
        path: '/app/entry/0',
        icon: getIcon(''),
      },
      {
        head: 'gatePassOut',
        title: 'Visitor Out',
        path: '/app/out/1',
        icon: getIcon(''),
      },
      {
        head: 'gatePassSearch',
        title: 'Visitor Search',
        path: '/app/search/0',
        icon: getIcon(''),
      },
      

    ]
  },

  // {
  //   title: 'Reports',
  //   path: '#', 
  //   icon: getIcon('eva:people-fill'),
  //   permission: permissionSet === [] ? 0 :permissionSet.builerPayment,
  //   children: [
  //     { 
  //       head: '',
  //       title: 'Report',
  //       path: '#',
  //       icon: getIcon(''),
  //     },
  //     { 
  //       head: 'report',
  //       title: 'Gate Pass Report',
  //       path: '/app/report/',
  //       icon: getIcon(''),
  //     },
      
  //   ]
  // },



  // -------------------------------MASTER START--------------------------------- //
  { 
    head: 'master',
    title: 'Master',
    path: '#',
    icon: getIcon('fluent-mdl2:entry-view'),
    permission: permissionSet === [] ? 0 :permissionSet.master,
    children: [
      { 
        head: 'employeeMaster',
        title: 'Employee Master',
        path: '/app/master/employeeMaster',
        icon: getIcon(''),
      },
      { 
        head: 'userMaster',
        title: 'User Master',
        path: '/app/master/usersMaster',
        icon: getIcon(''),
      },
    ]
  },

  {
    title: 'logout',
    path: '/logout',
    icon: getIcon('material-symbols:logout'),
    logout: true,
    permission: true,
  },
  
];

export default navConfig;
