// import Sidebar from "@/components/dashboard/sidebar/sidebar";
// import styles from "../../components/dashboard/dashboard.module.css";
// export default function DashboardLayout({
//     children,
// }: {
//     children: React.ReactNode;
// }) {
//     return (
//         <div className={styles.container}>
//             {/* hide whent the screen is less than medium size */}
//             <div className="flex-1 bg-[var(--bgSoft)] p-5 min-h-screen bg-white hidden md:block fixed top-0 left-0">
//                 <Sidebar />
//             </div>
//             <div className={styles.content}>
//                 <Navbar />
//                 <div className="h-[calc(100vh)]">{children}</div>
//                 {/* <Footer /> */}
//             </div>
//         </div>
//     );
// }
import Navbar from "@/components/dashboard/navbar/navbar";
import Sidebar from "@/components/dashboard/Sidebar/sidebar";
import styles from "../../components/dashboard/dashboard.module.css";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <Sidebar />
            </div>
            <div className={styles.content}>
                <Navbar />
                {children}
            </div>
        </div>
    );
}
