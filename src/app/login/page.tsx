'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  ThemeProvider,
  createTheme,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#215473',
    },
    secondary: {
      main: '#5799cb',
    },
  },
});

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login attempted');
    // After successful login, you might want to redirect to home page
    // router.push('/');
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={12}
          sm={6}
          component={Paper}
          elevation={6}
          square
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              maxWidth: '400px',
              alignSelf: 'center',
            }}
          >
            <Typography component="h1" variant="h5" sx={{ mb: 3, alignSelf: 'flex-start', fontSize: { xs: '1.5rem', sm: '2rem' } }}>
              Sign In
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between' }}>
              Welcome to our Page{' '}
              <Box component="span" sx={{ textAlign: 'right' }}>
                <Link href="/signup" style={{ color: 'white', textDecoration: 'underline' }}>
                  Sign Up
                </Link>
              </Box>
            </Typography>
            <Box component="form" noValidate onSubmit={handleLogin} sx={{ width: '100%' }}>
              <Box sx={{ mb: 2 }}>
                <Typography component="label" htmlFor="email" sx={{ color: 'white', mb: 1, display: 'block' }}>
                  Username
                </Typography>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  InputProps={{
                    sx: { bgcolor: 'white', borderRadius: 1 },
                  }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography component="label" htmlFor="password" sx={{ color: 'white', mb: 1, display: 'block' }}>
                  Password
                </Typography>
                <TextField
                  required
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined"
                  InputProps={{
                    sx: { bgcolor: 'white', borderRadius: 1 },
                  }}
                />
              </Box>
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="secondary"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }}
                  />
                }
                label="Keep me logged in"
                sx={{ color: 'white', mt: 2 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: 'secondary.main', textTransform: 'none', textDecoration: 'none' }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={6}
          sx={{
            bgcolor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Box sx={{ position: 'absolute', top: 5, right: 5, width: { xs: '150px', sm: '200px', md: '250px' } }}>
            <img src="/logo.png" alt="Logo" style={{ width: '100%', height: 'auto' }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
