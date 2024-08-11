import Navbar from "@/components/dashboard/navbar/navbar";
import Sidebar from "@/components/dashboard/Sidebar/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex">
            <div className="min-h-screen p-5 flex-1 hidden md:block bg-[#9ad0e3]">
                <Sidebar />
            </div>
            <div className="flex-6 p-5">
                <Navbar />
                {children}
            </div>
        </div>
    );
}
