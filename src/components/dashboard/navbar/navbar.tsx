"use client";
import MobileMenu from "@/components/MobileMenu";
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
        pathname?.startsWith("/dashboard/channels/") &&
        pathname?.includes("/members_detail/");

    const capitalizedTitle = getLastWordAndCapitalize(pathname || "");
    return (
        <div className="flex flex-col justify-between">
            <div className="h-24 flex items-center justify-between">
                {/* LEFT LOGO*/}
                <div className="md:hidden lg:block w-[80%] md:w-[20%] flex">
                    <Link
                        href="/"
                        className="font-glaical text-3xl md:text-5xl font-regular"
                    >
                        {!hideNavbar
                            ? capitalizedTitle
                            : pathname?.split("/")[-2]}
                    </Link>
                </div>

                {/* RIGHT */}
                <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
                    <MobileMenu />
                </div>
            </div>
            {!hideNavbar ? (
                <div className="w-full border-b-4 border-[#224c6b]"></div>
            ) : (
                ""
            )}
        </div>
    );
};

export default Navbar;
