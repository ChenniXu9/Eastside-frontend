'use client';

import React, { useState, useEffect } from 'react';
import { useAuth, useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/dashboard');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return null;
  }

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const result = await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      });
      setSuccessfulCreation(true);
      toast.success('Reset code sent to your email');
    } catch (err: any) {
      toast.error(err.errors[0].longMessage || "Failed to reset");
    }
  }
  
  const reset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      });
  
      if (result.status === 'needs_second_factor') {
        setSecondFactor(true);
        toast.info('2FA is required');
      } else if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        toast.success('Password reset successful. Redirecting...');
        setTimeout(() => {
          router.push('/dashboard');
        }, 3000);
      }
    } catch (err: any) {
      toast.error(err.errors[0].longMessage || "Reset failed");
    }
  }

  return (
    <div className="flex h-screen">
      <ToastContainer />
      <div className="w-full sm:w-1/2 bg-[#215473] text-white flex flex-col justify-center">
        <div className="my-8 mx-4 flex flex-col w-full max-w-[400px] self-center">
          <h1 className="text-2xl sm:text-3xl mb-3 self-start">Reset Password</h1>
          <form onSubmit={!successfulCreation ? create : reset} className="w-full">
            {!successfulCreation ? (
              <>
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 rounded bg-white text-black"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full mt-3 mb-2 bg-[#5799cb] text-white p-2 rounded"
                >
                  Send Reset Code
                </button>
              </>
            ) : (
              <>
                <div className="mb-4 relative">
                  <label htmlFor="password" className="block mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
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
                <div className="mb-4">
                  <label htmlFor="code" className="block mb-1">
                    Reset Code
                  </label>
                  <input
                    type="text"
                    id="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full p-2 rounded bg-white text-black"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full mt-3 mb-2 bg-[#5799cb] text-white p-2 rounded"
                >
                  Reset Password
                </button>
              </>
            )}
          </form>
          {secondFactor && <p className="mt-4">2FA is required, but this UI does not handle that</p>}
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

export default ResetPassword;