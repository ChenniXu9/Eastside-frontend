'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Login.module.css';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Perform login logic here
      const isAuthenticated = true; // Replace with actual login check
      if (isAuthenticated) {
        router.push('/');
      } else {
        alert('Login failed. Please try again.');
      }
    } catch (error) {
      alert('Login failed. Please try again.');
    }
  };

  const handleEmailChange = (e) => {
    console.log('Email changing:', e.target.value);
    setEmail(e.target.value);
  };
  
  const handlePasswordChange = (e) => {
    console.log('Password changing:', e.target.value);
    setPassword(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1>Sign In</h1>
        <p>Welcome to our Page <a href="/register">Sign Up</a></p>
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label>Username</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className={styles.checkboxGroup}>
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Keep me logged in</label>
          </div>
          <button type="submit" className={styles.button}>Sign In</button>
        </form>
      </div>
      <div className={styles.right}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
      </div>
    </div>
  );
};

export default Login;
