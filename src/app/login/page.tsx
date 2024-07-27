'use client';

import React, { useState, useEffect } from 'react';
import { useSignIn, useAuth } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/dashboard');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push('/dashboard');
      } else {
        toast.error('Sign in failed. Please check your email and password and try again.');
      }
    } catch (err: any) {
      toast.error('Sign in failed. Please check your email and password and try again.');
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <ToastContainer />
      <div className="w-full sm:w-1/3 bg-[#224c6b] text-white flex flex-col justify-center relative z-10">
        <div className="my-8 mx-4 flex flex-col w-full max-w-[400px] self-center">
          <h1 className="text-2xl sm:text-3xl mb-3 self-start">Sign In</h1>
          <div className="mb-3 text-lg flex justify-between">
            <span>Welcome to our Page</span>
            <Link href="/signup" className="text-white underline">
              Sign Up
            </Link>
          </div>
          <form onSubmit={handleLogin} className="w-full">
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1">
                Username
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
            <div className="mb-4 relative">
              <label htmlFor="password" className="block mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 rounded bg-white text-black"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-black"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4 mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2"
                />
                Keep me logged in
              </label>
              <Link href="/reset-password" className="text-white underline">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full mt-3 mb-2 bg-[#146c94] text-white p-2 rounded"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
      <div className="hidden sm:block sm:w-2/3 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#224c6b] to-transparent w-1/4 z-20"></div>
        <div className="absolute inset-0 z-10">
          <Image
            src="/login.jpg"
            alt="Login"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <svg className="absolute inset-y-0 left-0 h-full w-48 text-[#224c6b] z-30" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 0C40 0 60 100 100 100H0V0Z" />
        </svg>
      </div>
    </div>
  );
};

export default Login;