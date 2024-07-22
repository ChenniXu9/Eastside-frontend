"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const MobileMenu = () => {
    const [open, setOpen] = useState(false);

    const links = [
        { url: "/dashboard", title: "Dashboard" },
        { url: "/dashboard/resources", title: "Resources" },
        { url: "/dashboard/profile", title: "Profile" },
        { url: "/dashboard/channels", title: "Channels" },
    ];

    const topVariants = {
        closed: {
            rotate: 0,
        },
        opened: {
            rotate: 45,
            backgroundColor: "rgb(0,0,255)",
        },
    };
    const centerVariants = {
        closed: {
            opacity: 1,
        },
        opened: {
            opacity: 0,
        },
    };

    const bottomVariants = {
        closed: {
            rotate: 0,
        },
        opened: {
            rotate: -45,
            backgroundColor: "rgb(0,0,255)",
        },
    };

    const listVariants = {
        closed: {
            x: "100vw",
        },
        opened: {
            x: 0,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.2,
            },
        },
    };

    const listItemVariants = {
        closed: {
            x: -10,
            opacity: 0,
        },
        opened: {
            x: 0,
            opacity: 1,
        },
    };
    return (
        <div>
            <div className="md:hidden">
                {/* MENU BUTTON */}
                <button
                    className="flex flex-col gap-[4.5px] cursor-pointer z-50 relative"
                    onClick={() => setOpen((prev) => !prev)}
                >
                    <motion.div
                        variants={topVariants}
                        animate={open ? "opened" : "closed"}
                        className="w-6 h-1 bg-black rounded origin-left"
                    ></motion.div>
                    <motion.div
                        variants={centerVariants}
                        animate={open ? "opened" : "closed"}
                        className="w-6 h-1 bg-black rounded"
                    ></motion.div>
                    <motion.div
                        variants={bottomVariants}
                        animate={open ? "opened" : "closed"}
                        className="w-6 h-1 bg-black rounded origin-left"
                    ></motion.div>
                </button>
            </div>
            {open && (
                <motion.div
                    className="absolute top-0 left-0 w-screen h-screen bg-white text-black flex flex-col items-center justify-center gap-8 text-4xl z-40"
                    variants={listVariants}
                    initial="closed"
                    animate="opened"
                >
                    {links.map((link) => (
                        <motion.div
                            variants={listItemVariants}
                            className=""
                            key={link.title}
                        >
                            <Link
                                href={link.url}
                                onClick={() => setOpen((prev) => !prev)}
                            >
                                {link.title}
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default MobileMenu;
