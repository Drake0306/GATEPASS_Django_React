import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
// sections
import { LoginForm } from '../sections/auth/login';
import AuthSocial from '../sections/auth/AuthSocial';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function Logout() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.clear();
    navigate(`/`, { replace: true });
  };

  useEffect(() => {
    logout()
  })


  return (
    <></>
  );
}
