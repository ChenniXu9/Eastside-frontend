
import Link from "next/link";
import Image from "next/image";

type User = {
    id: string;
    username: string;
    profile_image: string | null;
    first_name: string | null;
    last_name: string | null;
    organization: string | null;
    title: string | null;
    phone: string | null; 
    description: string | null;
    password: string | null;
    personal_email: string | null;
    graduation_year: string | null;
    work_email: string | null;
    createdAt: Date;
  };
  
type Channel = {
    id: number;
    channel_name: string;
    channel_image: string | null;
    channel_description: string | null;
    users: {
      user: User;
    }[];
    posts: {
      id: number;
      desc: string;
      img: string;
      user: User;
    }[];
};

interface GroupFixProps {
    channel: Channel;
    currentUser: User;
}


const ChannelFix: React.FC<GroupFixProps> = ({ channel, currentUser }) => {
    return (
        <div className='p-4 bg-white rounded-lg shadow-md text-lg'>
            <div className="flex justify-between">
                <div className="flex items-center gap-4">
                    <Image src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=600" 
                        alt="" 
                        width={24} 
                        height={24} 
                        className="w-6 h-6 rounded-full"
                    />
                    <span className="font-medium">{channel.channel_name}</span>   
                </div>
                <button className="bg-gray-500 text-white text-xs px-2 py-1 rounded-md my-10">Joined</button>
            </div>
            <p className="text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat minus enim consequuntur sed quaerat et veniam quia animi officia, excepturi vero ex aperiam incidunt quos fugiat neque facilis ea praesentium.</p>
        </div>
    )
}

export default ChannelFix;