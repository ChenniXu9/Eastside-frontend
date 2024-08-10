"use client";
import MobileMenu from "@/components/MobileMenu";
import { usePathname } from "next/navigation";

import Link from "next/link";

// Navbar component
const Navbar = () => {
    const pathname = usePathname();

    const getLastWordAndCapitalize = (path: string): string => {
        const parts = path.split("/");
<<<<<<< HEAD
        console.log("parts", parts);
        if (parts.length > 2) {
            return parts[2];
        } else {
            return parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
        }

        // const lastWord = parts[parts.length - 1];
        // return lastWord.charAt(0).toUpperCase() + lastWord.slice(1);
    };

    let capitalizedTitle = getLastWordAndCapitalize(pathname || "");

=======
        const lastWord = parts[parts.length - 1];
        return lastWord.charAt(0).toUpperCase() + lastWord.slice(1);
    };

    // Determine if the navbar should be hidden
    const hideNavbar =
        pathname?.startsWith("/dashboard/channels/") &&
        pathname?.includes("/members_detail/");

    let capitalizedTitle = getLastWordAndCapitalize(pathname || "");
>>>>>>> 7edba0b (merge with chenni)
    if (pathname?.startsWith("/dashboard/channels/")) {
        if (
            pathname?.includes("/members_detail/") ||
            pathname?.includes("/currentChannel/") ||
            pathname?.includes("/groups/") ||
            pathname?.includes("/posts_detail/")
        ) {
            capitalizedTitle = "Channels";
        }
    }

    return (
        <div className="flex flex-col justify-between">
            <div className="h-24 flex items-center justify-between">
                {/* LEFT LOGO*/}
                <div className="flex w-[80%]">
                    <Link
                        href="/"
                        className="font-glaical text-3xl md:text-5xl font-bold capitalize"
                    >
                        {capitalizedTitle}
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