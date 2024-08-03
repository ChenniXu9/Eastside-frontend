import ContactUs from "./ContactUs/contactUs";
type Props = {};

const HompageScreen = (props: Props) => {
    const pageContent = [
        {
            title: "1",
            desc: "Presents the mathematical techniques used for the design and analysis of computer algorithms. Focuses on algorithmic design paradigms and techniques for analyzing the correctness, time, and space complexity of algorithms. Topics may include asymptotic notation, recurrences, loop invariants, Hoare triples, sorting and searching, advanced data structures, lower bounds, hashing, greedy algorithms, dynamic programming, graph algorithms, and NP-completeness.",
        },
        {
            courseCode: "2",
            courseName: "Adaptive Leadership program",
            semester: "Class of 2024",
            courseFrontpage:
                "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/71/21/da.jpg",
            archived: false,
        },
        {
            courseCode: "3",
            courseName: "Executive Insight",
            semester: "Spring 2024",
            courseFrontpage:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV2-qJuHx3GgYorwKuGrRaqz-GNgB8MMWkhg&s",
            archived: false,
        },
        {
            courseCode: "4",
            courseName: "Executive Insight",
            semester: "Fall 2023",
            courseFrontpage:
                "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/71/21/da.jpg",
            archived: false,
        },
        {
            courseCode: "5",
            courseName: "Executive Insight",
            semester: "Spring 2023",
            courseFrontpage:
                "https://uploads.visitseattle.org/2023/01/11122537/Banner_rachael-jones-media_aerial-destination-photos-24_3.jpg",
            archived: false,
        },
    ];
    return (
        <div className="p-10">
            <div className="" id="app-description ">
                <h1 className="text-3xl font-bold mb-5">
                    Application Description
                </h1>
                <h3 className="text-xl">
                    The aim of this application is to create a all-in-one
                    application for leadership Eastside student to use where
                    they can connect with fellow alumni and student, share
                    information, and access resources. Leadership Eastside is an
                    inclusive organization that promotes connections, develops
                    and enriches leaders, and is a catalyst for communities to
                    address important issues and meet the challenges of a
                    diverse and dynamic region.
                </h3>
            </div>

            <div className="w-full border-b-2 border-gray-300 mt-2 mb-5"></div>

            <div>
                {/* Create a contact us form for people to send information to */}
                {/* use nodemailer to send the email */}
                <ContactUs />
            </div>
        </div>
    );
};

export default HompageScreen;
