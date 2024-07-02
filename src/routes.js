import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';

import Logout from './pages/Logout';

import EmployeeMaster from './pages/master/EmployeeMaster/EmployeeMaster';
import EntryFormRO from './pages/master/EmployeeMaster/EntryForm';

import Users from './pages/master/Users/Users';
import EntryFormFEE from './pages/master/Users/EntryForm';

import EntryFormEntry from './pages/EntryFormEntry/EntryFormEntry';
import OutFormEntry from './pages/OutFormEntry/OutFormEntry';
import ReportEntry from './pages/Report/ReportEntry';
import PDFReport from './pages/Report/PDFReport';

import PDFPass from './pages/PassGenerate/PDFPass';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([


    // App Start
    {
      path: '/app',
      element: <DashboardLayout />,
      children: [
        { path: 'dashboard', element: <DashboardApp /> }, // Dashboard Main
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },

        // Master Start
        { path: 'master/employeeMaster', element: <EmployeeMaster /> },  // Master RegistrarOffice
        { path: 'master/employeeMaster/newEntry/:data', element: <EntryFormRO /> },  // Master RegistrarOffice
       
        { path: 'master/usersMaster', element: <Users /> },  // Master RegistrarOffice
        { path: 'master/usersMaster/newEntry/:data', element: <EntryFormFEE /> },  // Master RegistrarOffice
        // Master End

        // Gate Pass
        { path: 'entry/:data', element: <EntryFormEntry /> }, // Entry
        { path: 'Out/:data', element: <OutFormEntry /> }, // Out
        { path: 'search/:data', element: <OutFormEntry /> }, // Search

        // Report
        { path: 'report', element: <ReportEntry /> }, // 
        // { path: 'report/PDFReport/:data', element: <PDFReport /> },  // 

        // PDF
        { path: 'report/PDFReport/:data', element: <PDFReport /> },
        { path: 'passGenerate/:data', element: <PDFPass /> }, // Search
        
      ],
    },
    // App End

    // Auth Start
    {
      path: 'logout',
      element: <Logout />,
    },
    {
      path: 'login',
      element: <Login />,
    },
    // // PDF
    // { path: 'report/PDFReport/:data', element: <PDFReport /> },
    // { path: 'passGenerate/:data', element: <PDFPass /> }, // Search

    {
      path: 'register',
      element: <Register />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: '404', element: <NotFound /> },
        // { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />,
    // },
    // Auth End
  ]);
}
