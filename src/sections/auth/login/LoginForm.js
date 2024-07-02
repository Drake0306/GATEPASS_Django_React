import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import swal from 'sweetalert';
import axios from 'axios';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import JSON_CONST from '../../../components/CONSTVALUE.json';


// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    name: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    name: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (e) => {
    try {
      await axios.post(`${JSON_CONST.DB_URL}auth/login`, e)
        .then((response) => {
          // console.log(response);
          if (response.data === 'User Cannot Be Found') {
            swal({
              title: response.data,
              text: "",
              icon: "info",
              button: "close",
              timer: 2000
            });
          } else {
            localStorage.setItem('session',JSON.stringify(response.data))
            // document.location.reload();
            // document.location.href='/#/app/dashboard';
            navigate('/app/dashboard', { replace: true });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    const value = localStorage.getItem('session')
    // console.log(value)
    if(value !== null) {
      navigate('/app/dashboard', { replace: true });
    }
  }, [navigate])
  

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="name" label="Enter user ID" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <RHFCheckbox name="remember" label="Remember me" /> */}
        {/* <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      <LoadingButton size="large" type="submit" variant="flat" style={{backgroundColor: '#F37022', color: '#FEFEFE'}} loading={isSubmitting}>
        Login
      </LoadingButton>
    </FormProvider>
  );
}
