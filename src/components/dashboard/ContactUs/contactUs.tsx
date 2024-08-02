export type FormData = {
    name: string;
    email: string;
    message: string;
};

const contactUs = () => {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
                    Contact Us
                </h2>
                <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                    Got a technical issue? Want to send feedback about a beta
                    feature? Need details about our Business plan? Let us know.
                </p>
                <form className="mt-8 space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full rounded-md py-3 px-4 text-gray-800 bg-gray-100 focus:bg-transparent text-sm outline-blue-500"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full rounded-md py-3 px-4 text-gray-800 bg-gray-100 focus:bg-transparent text-sm outline-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Subject"
                        className="w-full rounded-md py-3 px-4 text-gray-800 bg-gray-100 focus:bg-transparent text-sm outline-blue-500"
                    />
                    <textarea
                        placeholder="Message"
                        rows={6}
                        className="w-full rounded-md px-4 text-gray-800 bg-gray-100 focus:bg-transparent text-sm pt-3 outline-blue-500"
                    ></textarea>
                    <button
                        type="button"
                        className="text-white bg-blue-500 hover:bg-blue-600 tracking-wide rounded-md text-sm px-4 py-3 w-full"
                    >
                        Send
                    </button>
                </form>
            </div>
        </section>
    );
};

export default contactUs;
