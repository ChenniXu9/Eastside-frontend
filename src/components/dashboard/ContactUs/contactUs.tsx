"use client";
import { sendEmail } from "@/lib/send-email";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Form data type for sending an email
export type FormData = {
    name: string;
    email: string;
    message: string;
};

// Contact us form utilizing NodeMailer
const ContactUs: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset, // Add the reset function from react-hook-form
        // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useForm<FormData>();

    // Function the handle sending the email
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
        <section className="bg-white">
            <div className="py-4 lg:py-8 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center">
                    Contact Us
                </h2>
                <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">
                    Got a technical issue? Want to send feedback about our new
                    application? Let us know.
                </p>
                <form
                    className="mt-4 space-y-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full rounded-md py-3 px-4 text-gray-800 bg-gray-100 focus:bg-transparent text-sm outline-blue-500"
                        {...register("name", { required: true })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full rounded-md py-3 px-4 text-gray-800 bg-gray-100 focus:bg-transparent text-sm outline-blue-500"
                        {...register("email", { required: true })}
                    />
                    <textarea
                        placeholder="Message"
                        rows={6}
                        className="w-full rounded-md px-4 text-gray-800 bg-gray-100 focus:bg-transparent text-sm pt-3 outline-blue-500"
                        {...register("message", { required: true })}
                    ></textarea>
                    <button className="text-white bg-[#438bb4] hover:bg-[#224c6b] tracking-wide rounded-md text-sm px-4 py-3 w-full">
                        Send
                    </button>
                    {errors.message && (
                        <span className="text-red-500">
                            This field is required
                        </span>
                    )}
                </form>
            </div>
            {/* Displays info on whether the email sent or if there was an error */}
            <ToastContainer />
        </section>
    );
};

export default ContactUs;
