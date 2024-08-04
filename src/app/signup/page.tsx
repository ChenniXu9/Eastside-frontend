'use client';

import React, { useState, useEffect } from 'react';
import { useSignUp, useAuth } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
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
      router.push('/dashboard');
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

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      const errorMessage = err.errors?.[0]?.message || "Sign up failed. Please try again.";
      let refactoredMsg;
        
      if (errorMessage === "That email address is taken. Please try another.") {
        refactoredMsg = "The email address you entered is already in use. Please try another one.";
      } else {
        refactoredMsg = errorMessage
      }
      toast.error(refactoredMsg);
    }
  };

  const createUserInDatabase = async (userId: string) => {
    if (!userId) {
      toast.error('Failed to complete registration. Please contact support.');
      return;
    }
    try {
      await axios.post('/api/createUser', { userId });
    } catch (error) {
      console.error('Failed to create user in database:', error);
      toast.error('Failed to complete registration. Please contact support.');
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
        try {
          await setActive({ session: completeSignUp.createdSessionId });
          await createUserInDatabase(completeSignUp.createdUserId);
          router.push("/dashboard");
        } catch (error) {
          console.error("Error in completion process:", error);
          toast.error("An error occurred during registration completion. Please try again.");
        }
      }
    } catch (err: any) {
      const errorMessage = err.errors?.[0]?.message || "Verification failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <ToastContainer />
      <div className="w-full sm:w-1/3 bg-[#224c6b] text-white flex flex-col justify-center relative z-10">
        <div className="my-8 mx-4 flex flex-col w-full max-w-[400px] self-center">
          <h1 className="text-2xl sm:text-3xl mb-3 self-start">Sign Up</h1>
          <p className="mb-3 text-lg flex justify-between">
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
                className="w-full mt-6 mb-2 bg-[#146c94] text-white p-2 rounded"
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
                className="w-full mt-6 mb-2 bg-[#224c6b] text-white p-2 rounded"
              >
                Verify Email
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="hidden sm:block sm:w-2/3 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#224c6b] to-transparent w-1/4 z-20"></div>
        <div className="absolute inset-0 z-10">
          <Image
            src="/signup.jpg"
            alt="Sign Up"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <svg className="absolute inset-y-0 left-0 h-full w-48 text-[#224c6b] z-30" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 0C40 0 60 100 100 100H0V0Z" />
        </svg>
        <div className="absolute top-0 right-0 p-4 z-40">
          <img src="/whitelogo.png" alt="Logo" className="w-[150px] sm:w-[200px] md:w-[250px] h-auto" />
        </div>
      </div>
    </div>
  );
};

export default Signup;