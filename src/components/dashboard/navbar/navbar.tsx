// "use client";

// import { usePathname } from "next/navigation";
// import {
//     MdNotifications,
//     MdOutlineChat,
//     MdPublic,
//     MdSearch,
// } from "react-icons/md";

// type Props = {};

// const Navbar = (props: Props) => {
//     const pathname = usePathname();

//     return (
//         <div className="p-5 rounded-lg bg-gray-200 flex items-center justify-between">
//             <div className="text-gray-600 font-bold capitalize">
//                 {pathname.split("/").pop()}
//             </div>
//             <div className="flex items-center gap-5">
//                 <div className="flex items-center gap-2.5 bg-gray-800 p-2.5 rounded-lg">
//                     <MdSearch />
//                     <input
//                         type="text"
//                         placeholder="Search..."
//                         className="bg-transparent border-none text-white"
//                     />
//                 </div>
//                 <div className="flex gap-5">
//                     <MdOutlineChat size={20} />
//                     <MdNotifications size={20} />
//                     <MdPublic size={20} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Navbar;
import MobileMenu from "@/components/MobileMenu";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    return (
        <div className="h-24 flex items-center justify-between md:hidden">
            {/* LEFT */}
            <div className="md:hidden lg:block w-[80%] md:w-[20%] flex">
                <Link href="/">
                    <Image
                        src={"/companyLogo.png"}
                        alt=""
                        sizes="100vw"
                        style={{
                            width: "100%",
                            height: "auto",
                        }}
                        width={400}
                        height={200}
                    />
                </Link>
            </div>
            {/* CENTER */}
            <div className="hidden md:flex w-[50%] text-sm items-center justify-between">
                {/* LINKS */}
                <div className="flex gap-6 text-gray-600">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/home.png"
                            alt="Homepage"
                            width={16}
                            height={16}
                            className="w-4 h-4"
                        />
                        <span>Homepage</span>
                    </Link>
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/friends.png"
                            alt="Friends"
                            width={16}
                            height={16}
                            className="w-4 h-4"
                        />
                        <span>Friends</span>
                    </Link>
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/stories.png"
                            alt="Stories"
                            width={16}
                            height={16}
                            className="w-4 h-4"
                        />
                        <span>Stories</span>
                    </Link>
                </div>
                <div className="hidden xl:flex p-2 bg-slate-100 items-center rounded-xl">
                    <input
                        type="text"
                        placeholder="search..."
                        className="bg-transparent outline-none"
                    />
                    <Image src="/search.png" alt="" width={14} height={14} />
                </div>
            </div>
            {/* RIGHT */}
            <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
                <MobileMenu />
            </div>
        </div>
    );
};

export default Navbar;
