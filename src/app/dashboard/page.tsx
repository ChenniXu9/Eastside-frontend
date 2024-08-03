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
            {/* <h1 className="text-3xl">Avenir black</h1>
            <h1 className="font-avenir text-3xl">Avenir Black</h1>
            <p className="font-avenir font-book text-lg">Avenir Book</p>
            <p className="font-avenir font-roman text-lg">Avenir Roman</p>
            <h1 className="font-glaical font-bold text-3xl">
                GlaicalIndifference Bold
            </h1>
            <p className="font-glaical font-regular text-lg">
                GlaicalIndifference Regular
            </p> */}
            <HomepageScreen />
        </div>
    );
};

export default Dashboard;
