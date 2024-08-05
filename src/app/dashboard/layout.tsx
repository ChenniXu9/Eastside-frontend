import Navbar from "@/components/dashboard/navbar/navbar";
import Sidebar from "@/components/dashboard/Sidebar/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex dark:text-white">
            <div className="min-h-screen p-5 flex-1 bg-[#9ad0e3] hidden md:block dark:bg-[#182237]">
                <Sidebar />
            </div>
            <div className="flex-6 p-5 dark:bg-[#151c2c]">
                <Navbar />
                {children}
            </div>
        </div>
    );
}
