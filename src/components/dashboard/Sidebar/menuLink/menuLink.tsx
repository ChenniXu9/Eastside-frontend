"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Defining type of link we need to create
interface Item {
    path: string;
    icon: JSX.Element;
    title: string;
}

// Styling based on whether the link is active or not
const baseClasses =
    "p-5 flex items-center gap-2.5 my-1 rounded-lg text-[#224c6b]";
const activeClasses = "bg-white text-[#224c6b]";

// Defining link prop being passed
interface MenuLinkProps {
    item: Item;
}

// Component for the Sidebar which is displayed on the dashboard
// Creates the links that are on the sidebar
// Allows the sidebar to be server side component while still having interactability with links
const MenuLink: React.FC<MenuLinkProps> = ({ item }) => {
    // Extract pathname from the url
    const pathname = usePathname();

    return (
        <Link
            href={item.path}
            className={`font-avenir ${
                pathname === item.path ? activeClasses : ""
            } ${baseClasses}`}
        >
            {item.icon}
            <h1 className="font-avenir text-xl">{item.title}</h1>
        </Link>
    );
};

export default MenuLink;
