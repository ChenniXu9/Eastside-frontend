import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
import HomepageScreen from "@/components/dashboard/HomepageScreen";
type Props = {};

const Dashboard = (props: Props) => {
    const { userId } = auth();
    return (
        <div>
            <HomepageScreen />
        </div>
    );
};

export default Dashboard;
