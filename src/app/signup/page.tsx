'use client';

import React, { useState, useEffect } from 'react';
import { useSignUp, useAuth } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/dashboard/channels');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return null;
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      const errorMessage = err.errors?.[0]?.message || "Sign up failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  const onPressVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) {
      toast.error("Please enter a verification code");
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        const errorMessage = completeSignUp.errors?.[0]?.message || "Verification failed. Please try again.";
        toast.error(errorMessage);
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/dashboard/channels");
      }
    } catch (err: any) {
      const errorMessage = err.errors?.[0]?.message || "Verification failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex h-screen">
      <ToastContainer />
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
            {!pendingVerification ? (
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
                <div className="mb-4 relative">
                  <label htmlFor="confirmPassword" className="block mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-2 rounded bg-white text-black"
                      required
                    />
                    <span
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 cursor-pointer text-black"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full mt-6 mb-2 bg-[#5799cb] text-white p-2 rounded"
                >
                  Sign Up
                </button>
              </form>
            ) : (
              <form onSubmit={onPressVerify} className="w-full">
                <div className="mb-4">
                  <label htmlFor="code" className="block mb-1">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    id="code"
                    name="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full p-2 rounded bg-white text-black"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full mt-6 mb-2 bg-[#5799cb] text-white p-2 rounded"
                >
                  Verify Email
                </button>
              </form>
            )}
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