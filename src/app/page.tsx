'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // Logic to check if user is authenticated
    const isAuthenticated = false; // Replace with actual authentication logic

    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div>
      <h1>Welcome to the App</h1>
    </div>
  );
};

export default Home;
