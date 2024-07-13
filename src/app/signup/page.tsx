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

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your signup logic here
    console.log('Signup attempted');
    // After successful signup, you might want to redirect to login or home page
    // router.push('/login');
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
            padding: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: { xs: 2, sm: 4 },
              width: '100%',
            }}
          >
            <Box sx={{ width: '100%', maxWidth: '400px' }}>
              <Typography
                component="h1"
                variant="h5"
                sx={{
                  mb: 3,
                  fontSize: { xs: '1.5rem', sm: '2rem' },
                  textAlign: 'left',
                }}
              >
                Sign Up
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: 3,
                  fontSize: { xs: '1rem', sm: '1.2rem' },
                  textAlign: 'left',
                }}
              >
                Welcome to our Page{' '}
                <Link href="/login" style={{ color: 'white', textDecoration: 'underline' }}>
                  Sign In
                </Link>
              </Typography>
              <Box component="form" noValidate onSubmit={handleSignup} sx={{ width: '100%' }}>
                <Box sx={{ mb: 2 }}>
                  <Typography component="label" htmlFor="email" sx={{ color: 'white', mb: 1, display: 'block' }}>
                    Email
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
                  <Typography component="label" htmlFor="username" sx={{ color: 'white', mb: 1, display: 'block' }}>
                    Username
                  </Typography>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    name="username"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                    InputProps={{
                      sx: { bgcolor: 'white', borderRadius: 1 },
                    }}
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography component="label" htmlFor="confirmPassword" sx={{ color: 'white', mb: 1, display: 'block' }}>
                    Confirm Password
                  </Typography>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    variant="outlined"
                    InputProps={{
                      sx: { bgcolor: 'white', borderRadius: 1 },
                    }}
                  />
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, bgcolor: 'secondary.main' }}
                >
                  Sign Up
                </Button>
              </Box>
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

export default Signup;
