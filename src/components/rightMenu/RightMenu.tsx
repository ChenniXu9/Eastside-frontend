import { Suspense } from "react";
import Ad from "../Ad";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";

const RightMenu = ({ userId }: { userId?: string }) => {
    return (
        <div className="flex flex-col gap-6">
            {userId ? (
                <>
                    <Suspense fallback="loading...">
                        <UserInfoCard userId={userId} />
                    </Suspense>
                    <Suspense fallback="loading...">
                        <UserMediaCard userId={userId} />
                    </Suspense>
                </>
            ) : null}
            <Ad size="md" />
        </div>
    );
};

export default RightMenu;
