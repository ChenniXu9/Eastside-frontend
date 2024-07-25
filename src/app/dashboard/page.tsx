
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
type Props = {}

const Dashboard = (props: Props) => {
  const { userId } = auth();
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard;
