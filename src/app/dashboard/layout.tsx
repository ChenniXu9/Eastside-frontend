import Sidebar from "@/components/dashboard/Sidebar/sidebar";
import Navbar from "@/components/dashboard/navbar/navbar";
import styles from "../../components/dashboard/dashboard.module.css";
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.container}>
            {/* hide whent the screen is less than medium size */}
            <div className="flex-1 bg-[var(--bgSoft)] p-5 min-h-screen bg-white hidden md:block">
                <Sidebar />
            </div>
            <div className={styles.content}>
                <Navbar />
                <div className="h-[calc(100vh-6rem)]">{children}</div>
                {/* <Footer /> */}
            </div>
        </div>
    );
}

// example layout once we have the sidebar and navbar done
//   import Navbar from "../ui/dashboard/navbar/navbar"
// import Sidebar from "../ui/dashboard/sidebar/sidebar"
// import styles from "../ui/dashboard/dashboard.module.css"
// import Footer from "../ui/dashboard/footer/footer"

// const Layout = ({children}) => {
//   return (
//     <div className={styles.container}>
//       <div className={styles.menu}>
//         <Sidebar/>
//       </div>
//       <div className={styles.content}>
//         <Navbar/>
//         {children}
//         <Footer/>
//       </div>
//     </div>
//   )
// }
