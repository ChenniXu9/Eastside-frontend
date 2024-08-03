"use client";
import { useClerk } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    MdDashboard,
    MdLogout,
    MdPerson2,
    MdShoppingBag,
    MdSupervisedUserCircle,
} from "react-icons/md";
import MenuLink from "../menuLink/menuLink";
import styles from "./sidebar.module.css";

// Sidebar item lists
const menuItems = [
    {
        title: "Pages",
        list: [
            {
                title: "Dashboard",
                path: "/dashboard",
                icon: <MdDashboard />,
            },
            {
                title: "Resource Library",
                path: "/dashboard/resources",
                icon: <MdSupervisedUserCircle />,
            },
            {
                title: "Channels",
                path: "/dashboard/channels",
                icon: <MdShoppingBag />,
            },
        ],
    },
    {
        title: "User",
        list: [
            {
                title: "My Profile",
                path: "/dashboard/profile",
                icon: <MdPerson2 />,
            },
            // {
            //     title: "Settings",
            //     path: "/dashboard/settings",
            //     icon: <MdOutlineSettings />,
            // },
        ],
    },
];

// Sidebar component for the dashboard
const Sidebar = () => {
    const { signOut } = useClerk();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        router.push("/login");
    };

    const user = {
        img: "/noavatar.png",
        username: "testing",
    };
    return (
        <div className="h-full flex justify-between flex-col ">
            <div className="md:flex flex items-center gap-5 h-[10%]">
                <Image
                    src={"/companyLogo.png"}
                    alt=""
                    sizes="100vw"
                    style={{
                        width: "100%",
                        height: "auto",
                    }}
                    width={400}
                    height={100}
                />
            </div>
            {/* CENTER */}
            <div className="md:flex h-[70%] text-sm justify-between flex-col">
                <ul className={styles.list}>
                    {menuItems.map((cat) => (
                        <li key={cat.title}>
                            <span className={styles.cat}>{cat.title}</span>
                            {cat.list.map((item) => (
                                <MenuLink item={item} key={item.title} />
                            ))}
                        </li>
                    ))}
                </ul>
            </div>
            {/* BOTTOM */}
            <div className="md:flex h-[10%] text-md justify-between flex-col">
                <button
                    type="button"
                    onClick={handleSignOut}
                    className={styles.logout}
                >
                    <MdLogout />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
