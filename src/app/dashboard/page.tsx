import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
import HomepageScreen from "@/components/dashboard/HomepageScreen";
type Props = {};
// GlacialIndifference: Use this font for titles, headings, and other high-visibility elements. It can provide strong visual impact and distinctiveness.
// Avenir: Use this font for body text, small content, and secondary elements. It’s typically more neutral and optimized for readability, making it suitable for longer text passages.

const Dashboard = (props: Props) => {
    const { userId } = auth();
    return (
        <div>
            <HomepageScreen />
        </div>
    );
};

export default Dashboard;
