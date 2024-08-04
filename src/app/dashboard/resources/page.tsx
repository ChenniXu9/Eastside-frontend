"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import AddCourse from "../../../components/resources/AddCourse";
import ArchiveCourses from "../../../components/resources/ArchiveCourse";
import CourseCard from "../../../components/resources/CourseCard";
import EditCourse from "../../../components/resources/EditCourse";

const initialCourses = [
    {
        courseCode: "1",
        courseName: "Adaptive Leadership program",
        semester: "Class of 2025",
        courseFrontpage:
            "https://uploads.visitseattle.org/2023/01/11122537/Banner_rachael-jones-media_aerial-destination-photos-24_3.jpg",
        archived: false,
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

const ResourcePageContent: React.FC = () => {
    const [courses, setCourses] = useState(initialCourses);
    const [isAddingCourse, setIsAddingCourse] = useState(false);
    const [isEditingCourse, setIsEditingCourse] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [isArchiving, setIsArchiving] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
    const [viewMode, setViewMode] = useState<"card" | "list">("card"); // 新增
    const router = useRouter();

    const handleAddCourse = (newCourse) => {
        setCourses([...courses, newCourse]);
        setIsAddingCourse(false);
    };

    const handleAddCourseButton = () => {
        setIsAddingCourse(true);
    };

    const getNextCourseCode = () => {
        const maxCode = courses.reduce(
            (max, course) => Math.max(max, parseInt(course.courseCode)),
            0
        );
        return (maxCode + 1).toString();
    };

    const handleEditCourse = (courseCode: string) => {
        const course = courses.find((c) => c.courseCode === courseCode);
        setEditingCourse(course);
        setIsEditingCourse(true);
        setIsAddingCourse(false);
    };

    const handleSaveCourse = (updatedCourse) => {
        setCourses(
            courses.map((course) =>
                course.courseCode === updatedCourse.courseCode
                    ? updatedCourse
                    : course
            )
        );
        setIsEditingCourse(false);
    };

    const handleCancelAddCourse = () => {
        setIsAddingCourse(false);
    };

    const handleCancelEditCourse = () => {
        setIsEditingCourse(false);
    };

    const handleArchive = () => {
        setSelectedCourses(
            courses
                .filter((course) => course.archived)
                .map((course) => course.courseCode)
        );
        setIsArchiving(true);
    };

    const handleArchiveConfirm = (selectedCourses: string[]) => {
        setCourses(
            courses.map((course) =>
                selectedCourses.includes(course.courseCode)
                    ? { ...course, archived: true }
                    : { ...course, archived: false }
            )
        );
        setSelectedCourses(selectedCourses);
        setIsArchiving(false);
    };
    const handleArchive = () => {
        setIsArchiving(true);
    };

    const handleArchiveConfirm = (selectedCourses: string[]) => {
        setCourses(
            courses.map((course) =>
                selectedCourses.includes(course.courseCode)
                    ? { ...course, archived: true }
                    : course
            )
        );
        setSelectedCourses(selectedCourses);
        setIsArchiving(false);
    };

    const handleArchiveCancel = () => {
        setIsArchiving(false);
    };

    const toggleViewMode = () => {
        setViewMode((prevMode) => (prevMode === "card" ? "list" : "card"));
    };

    return (
        <div className="p-4 bg-white">
            <div className="flex justify-end mb-4">
                <button
                    onClick={toggleViewMode}
                    className="bg-gray-500 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out hover:bg-gray-600 transform hover:-translate-y-1"
                >
                    {viewMode === "card"
                        ? "Switch to List View"
                        : "Switch to Card View"}
                </button>
            </div>
            <div
                className={`flex ${
                    viewMode === "card"
                        ? "flex-wrap justify-center gap-4"
                        : "flex-col"
                } p-4`}
            >
                {courses.map(
                    (course, index) =>
                        !course.archived &&
                        (viewMode === "card" ? (
                            <CourseCard
                                key={index}
                                courseCode={course.courseCode}
                                courseName={course.courseName}
                                semester={course.semester}
                                courseFrontpage={course.courseFrontpage}
                                onEditCourse={handleEditCourse}
                            />
                        ) : (
                            <div
                                key={index}
                                className="border p-4 rounded w-full max-w-3xl mb-2 flex justify-between items-center"
                            >
                                <div>
                                    <h2 className="text-lg font-bold">
                                        {course.courseName}
                                    </h2>
                                    <p>{course.semester}</p>
                                </div>
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() =>
                                            router.push(
                                                `resources/${encodeURIComponent(
                                                    course.courseCode
                                                )}`
                                            )
                                        }
                                        className="text-blue-800 underline"
                                    >
                                        Files
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleEditCourse(course.courseCode)
                                        }
                                        className="text-blue-800 underline"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        ))
                )}
            </div>
            <div className="w-full flex justify-center mt-8">
                <button
                    onClick={handleArchive}
                    className="bg-blue-600 mr-10 text-white py-2 px-6 rounded-full transition duration-300 ease-in-out hover:bg-blue-700 transform hover:-translate-y-1"
                >
                    Archive
                </button>
                <button
                    onClick={handleAddCourseButton}
                    className="bg-blue-800 text-white py-2 px-6 rounded-full transition duration-300 ease-in-out hover:bg-blue-700 transform hover:-translate-y-1"
                >
                    Add Course
                </button>
            </div>
            {isAddingCourse && (
                <div>
                    <AddCourse
                        onAddCourse={handleAddCourse}
                        nextCourseCode={getNextCourseCode()}
                        onCancel={handleCancelAddCourse}
                    />
                </div>
            )}
            {isEditingCourse && editingCourse && (
                <div>
                    <EditCourse
                        courseCode={editingCourse.courseCode}
                        courseName={editingCourse.courseName}
                        semester={editingCourse.semester}
                        courseFrontpage={editingCourse.courseFrontpage}
                        onSaveCourse={handleSaveCourse}
                        onCancel={handleCancelEditCourse}
                    />
                </div>
            )}
            {isArchiving && (
                <ArchiveCourses
                    courses={courses}
                    selectedCourses={selectedCourses}
                    onArchive={handleArchiveConfirm}
                    onCancel={handleArchiveCancel}
                />
            )}
        </div>
    );
};

export default ResourcePageContent;
