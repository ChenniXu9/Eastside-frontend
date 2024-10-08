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
import MenuLink from "./menuLink/menuLink";

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
    // Signout function from clerk
    const { signOut } = useClerk();
    const router = useRouter();

    // Function to handle signing out
    const handleSignOut = async () => {
        await signOut();
        router.push("/login");
    };

    return (
        <div className="sticky top-10 flex flex-col justify-between items-stretch">
            <div className="md:flex items-center gap-5 my-5">
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
            <div className="flex flex-col justify-between flex-1">
                <div className="md:flex text-sm justify-between flex-col">
                    <ul className="list-none">
                        {menuItems.map((cat) => (
                            <li key={cat.title}>
                                <span className="font-bold text-xs mx-2.5 ">
                                    {cat.title}
                                </span>
                                {cat.list.map((item) => (
                                    <MenuLink item={item} key={item.title} />
                                ))}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* BOTTOM */}
            <div className="mt-auto">
                <button
                    type="button"
                    onClick={handleSignOut}
                    className="p-5 my-1 flex items-center gap-2.5 cursor-pointer rounded-lg bg-transparent border-none w-full hover:bg-white hover:text-[#224c6b]"
                >
                    <MdLogout />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
