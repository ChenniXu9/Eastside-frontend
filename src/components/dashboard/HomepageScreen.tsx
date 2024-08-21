import ContactUs from "./ContactUs/contactUs";
type Props = {};

// Main homepage that is displayed when the user initially signs up
const HompageScreen = (props: Props) => {
    return (
        <div className="md:m-10 m-2">
            <div className="" id="app-description ">
                <h1 className="text-3xl font-bold mb-5">
                    Application Description
                </h1>
                <h3 className="text-xl">
                    The aim of this application is to create a all-in-one
                    application for Leadership Eastside student to use where
                    they can connect with fellow alumni and student, share
                    information, and access resources. Leadership Eastside is an
                    inclusive organization that promotes connections, develops
                    and enriches leaders, and is a catalyst for communities to
                    address important issues and meet the challenges of a
                    diverse and dynamic region. We hope that you are able to use
                    this application to empower your experience with Leadership
                    Eastside!
                </h3>
            </div>

            <div className="w-full border-b-2 border-gray-300 my-5"></div>

            <div>
                <ContactUs />
            </div>
        </div>
    );
};

export default HompageScreen;
