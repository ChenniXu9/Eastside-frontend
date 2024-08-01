'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';
import Image from "next/image";

const Home = () => {
  // const router = useRouter();

  // useEffect(() => {
  //   // Logic to check if user is authenticated
  //   const isAuthenticated = false; // Replace with actual authentication logic

  //   if (!isAuthenticated) {
  //     router.push('/sign-in/[[...sign-in]]/page.tsx');
  //   }
  // }, [router]);

  return (
    <div>
      <h1>Welcome to the App</h1>
    </div>
  );
};

export default Home;
