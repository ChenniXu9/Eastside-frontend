"use client";
import { usePathname } from "next/navigation";

import Link from "next/link";

// Navbar component
const Navbar = () => {
    const pathname = usePathname();

    const getLastWordAndCapitalize = (path: string): string => {
        const parts = path.split("/");
        const lastWord = parts[parts.length - 1];
        return lastWord.charAt(0).toUpperCase() + lastWord.slice(1);
    };

    // Determine if the navbar should be hidden
    const hideNavbar =
        pathname.startsWith("/dashboard/channels/") &&
        pathname.includes("/members_detail/");

    const capitalizedTitle = getLastWordAndCapitalize(pathname);
    return (
        <div className="flex flex-col justify-between">
            <div className="flex items-center justify-between">
                {/* LEFT LOGO */}
                <div className="md:hidden lg:block w-[80%] md:w-[20%] flex">
                    <Link href="/" className="text-5xl font-bold">
                        {!hideNavbar
                            ? capitalizedTitle
                            : pathname.split("/")[-2]}
                    </Link>
                </div>
            </div>
            {!hideNavbar ? (
                <div className="w-full border-b-4 border-gray-300 mt-2"></div>
            ) : (
                ""
            )}
        </div>
    );
};

export default Navbar;
