"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./menuLink.module.css";

interface Item {
    path: string;
    icon: JSX.Element;
    title: string;
}

interface MenuLinkProps {
    item: Item;
}

// Component for the Sidebar
// Allows the sidebar to be server side component while still having interactability with links
const MenuLink: React.FC<MenuLinkProps> = ({ item }) => {
    const pathname = usePathname();

    return (
        <Link
            href={item.path}
            className={`${styles.container} ${
                pathname === item.path && styles.active
            }`}
        >
            {item.icon}
            {item.title}
        </Link>
    );
};

export default MenuLink;
