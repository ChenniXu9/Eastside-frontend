'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
    <div className="flex h-screen">
      <div className="w-full sm:w-1/2 bg-[#215473] text-white flex flex-col justify-center p-4">
        <div className="flex flex-col items-center px-4 sm:px-8 w-full">
          <div className="w-full max-w-[400px]">
            <h1 className="text-2xl sm:text-3xl mb-3 text-left">Sign Up</h1>
            <p className="mb-3 text-base sm:text-lg text-left">
              Welcome to our Page{' '}
              <Link href="/login" className="text-white underline">
                Sign In
              </Link>
            </p>
            <form onSubmit={handleSignup} className="w-full">
              <div className="mb-4">
                <label htmlFor="email" className="block mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 rounded bg-white text-black"
                  required
                  autoFocus
                />
              </div>
              <div className="mb-4">
                <label htmlFor="username" className="block mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 rounded bg-white text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 rounded bg-white text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 rounded bg-white text-black"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full mt-6 mb-2 bg-[#5799cb] text-white p-2 rounded"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden sm:block sm:w-1/2 bg-white relative">
        <div className="absolute top-0 right-0 p-4">
          <img src="/logo.png" alt="Logo" className="w-[150px] sm:w-[200px] md:w-[250px] h-auto" />
        </div>
      </div>
    </div>
  );
};

export default Signup;