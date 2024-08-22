import HomepageScreen from "@/components/dashboard/HomepageScreen";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
type Props = {};

// Main dashboard home page
const Dashboard = (props: Props) => {
    const { userId } = auth();

    // If user is not found, show error page
    if (!userId) return redirect("/login");

    return (
        <div>
            <HomepageScreen />
        </div>
    );
};

export default Dashboard;
