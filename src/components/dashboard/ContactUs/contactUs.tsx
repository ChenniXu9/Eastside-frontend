"use client";
import { sendEmail } from "@/lib/send-email";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type FormData = {
    name: string;
    email: string;
    message: string;
};

const contactUs: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset, // Add the reset function from react-hook-form
        // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useForm<FormData>();

    async function onSubmit(data: FormData) {
        try {
            sendEmail(data);
            reset();
            toast.success("Your message has been sent successfully!");
        } catch (error) {
            toast.error(
                "There was an error sending your message. Please try again."
            );
        }
    }

    return (
        <h1>contact</h1>
        // <section className="bg-white dark:bg-gray-900">
        //     <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        //         <h2 className="font-glaical mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
        //             Contact Us
        //         </h2>
        //         <p className="font-avenir mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
        //             Got a technical issue? Want to send feedback about a beta
        //             feature? Need details about our Business plan? Let us know.
        //         </p>
        //         <form
        //             onSubmit={handleSubmit(onSubmit)}
        //             className="bg-white dark:bg-gray-900"
        //         >
        //             <div className="mb-5">
        //                 <label
        //                     htmlFor="name"
        //                     className="mb-3 block text-base font-medium text-black"
        //                 >
        //                     Full Name
        //                 </label>
        //                 <input
        //                     type="text"
        //                     placeholder="Full Name"
        //                     className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
        //                     {...register("name", { required: true })}
        //                 />
        //                 {errors.name && (
        //                     <span className="text-red-500">
        //                         This field is required
        //                     </span>
        //                 )}
        //             </div>
        //             <div className="mb-5">
        //                 <label
        //                     htmlFor="email"
        //                     className="mb-3 block text-base font-medium text-black"
        //                 >
        //                     Email Address
        //                 </label>
        //                 <input
        //                     type="email"
        //                     placeholder="example@domain.com"
        //                     className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
        //                     {...register("email", { required: true })}
        //                 />
        //                 {errors.email && (
        //                     <span className="text-red-500">
        //                         This field is required
        //                     </span>
        //                 )}
        //             </div>
        //             <div className="mb-5">
        //                 <label
        //                     htmlFor="message"
        //                     className="mb-3 block text-base font-medium text-black"
        //                 >
        //                     Message
        //                 </label>
        //                 <textarea
        //                     rows={4}
        //                     placeholder="Type your message"
        //                     className="w-full resize-none rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
        //                     {...register("message", { required: true })}
        //                 ></textarea>
        //                 {errors.message && (
        //                     <span className="text-red-500">
        //                         This field is required
        //                     </span>
        //                 )}
        //             </div>
        //             <div>
        //                 <button className="hover:shadow-form rounded-md bg-purple-500 py-3 px-8 text-base font-semibold text-white outline-none">
        //                     Submit
        //                 </button>
        //             </div>
        //         </form>
        //     </div>
        //     <ToastContainer />
        // </section>
    );
};

export default contactUs;

// <section className="bg-white dark:bg-gray-900">
//     <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
//         <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
//             Contact Us
//         </h2>
//         <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
//             Got a technical issue? Want to send feedback about a beta
//             feature? Need details about our Business plan? Let us know.
//         </p>
//         <form className="mt-8 space-y-4">
//             <input
//                 type="text"
//                 placeholder="Name"
//                 className="w-full rounded-md py-3 px-4 text-gray-800 bg-gray-100 focus:bg-transparent text-sm outline-blue-500"
//             />
//             <input
//                 type="email"
//                 placeholder="Email"
//                 className="w-full rounded-md py-3 px-4 text-gray-800 bg-gray-100 focus:bg-transparent text-sm outline-blue-500"
//             />
//             <input
//                 type="text"
//                 placeholder="Subject"
//                 className="w-full rounded-md py-3 px-4 text-gray-800 bg-gray-100 focus:bg-transparent text-sm outline-blue-500"
//             />
//             <textarea
//                 placeholder="Message"
//                 rows={6}
//                 className="w-full rounded-md px-4 text-gray-800 bg-gray-100 focus:bg-transparent text-sm pt-3 outline-blue-500"
//             ></textarea>
//             <button
//                 type="button"
//                 className="text-white bg-blue-500 hover:bg-blue-600 tracking-wide rounded-md text-sm px-4 py-3 w-full"
//             >
//                 Send
//             </button>
//         </form>
//     </div>
// </section>
