"use client";
import MobileMenu from "@/components/MobileMenu";
import { usePathname } from "next/navigation";

import Link from "next/link";

// Navbar component
const Navbar = () => {
    const pathname = usePathname();

    // Determine if the navbar should be hidden
    const hideNavbar =
        pathname?.startsWith("/dashboard/channels/") &&
        pathname?.includes("/members_detail/");

<<<<<<< HEAD
=======
    let capitalizedTitle = getLastWordAndCapitalize(pathname || "");
    if(pathname?.startsWith("/dashboard/channels/")) {
        if (pathname?.includes("/members_detail/") || 
        pathname?.includes("/currentChannel/") || 
        pathname?.includes("/groups/") || 
        pathname?.includes("/posts_detail/")) {
            capitalizedTitle = "Channels"
        }
    }
>>>>>>> main
    return (
        <div className="flex flex-col justify-between">
            <div className="h-24 flex items-center justify-between">
                {/* LEFT LOGO*/}
                <div className="flex w-[80%]">
                    <Link
                        href="/"
                        className="font-glaical text-3xl md:text-5xl font-bold capitalize"
                    >
                        {pathname?.split("/").pop()}
                    </Link>
                </div>

                {/* RIGHT */}
                <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
                    <MobileMenu />
                </div>
            </div>
            <div className="w-full border-b-4 border-[#224c6b]"></div>
        </div>
    );
};

export default Navbar;
