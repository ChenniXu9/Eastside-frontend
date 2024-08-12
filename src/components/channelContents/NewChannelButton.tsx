import { useFormStatus } from "react-dom";

type Props = {};

const NewChannelButton = (props: Props) => {
    const { pending } = useFormStatus();
    return (
        <button
            className="bg-[#438bb4] p-2 rounded-md text-white disabled:bg-[#224c6b] disabled:cursor-not-allowed"
            disabled={pending}
        >
            {pending ? (
                <div className="flex items-center gap-2">
                    <div className="inline-block h-[10px] w-[10px] animate-spin rounded-full border-2 border-white-300 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                    Sending
                </div>
            ) : (
                "Create Channel"
            )}
        </button>
    );
};

export default NewChannelButton;
