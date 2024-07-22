'use client';

import React, { useState, useEffect } from 'react';
import { useSignIn, useAuth } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/dashboard/channels');
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
        router.push('/dashboard'); // Redirect to home page after successful login
      } else {
        console.error("Sign in failed", result);
      }
    } catch (err: any) {
      console.error("Error during sign in:", err.message);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-full sm:w-1/2 bg-[#215473] text-white flex flex-col justify-center">
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
              <Link href="/forgot-password" className="text-white underline">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full mt-3 mb-2 bg-[#5799cb] text-white p-2 rounded"
            >
              Sign In
            </button>
          </form>
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

export default Login;