"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
    const router = useRouter();

    useEffect(() => {
        // Logic to check if user is authenticated
        const isAuthenticated = false; // Replace with actual authentication logic

        if (!isAuthenticated) {
            router.replace("/login");
        }
    }, [router]);

    return null;
};

export default Home;
