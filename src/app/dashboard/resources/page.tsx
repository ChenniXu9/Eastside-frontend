"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import AddCourse from "../../../components/resources/AddCourse";
import ArchiveCourses from "../../../components/resources/ArchiveCourse";
import CourseCard from "../../../components/resources/CourseCard";
import EditCourse from "../../../components/resources/EditCourse";

const ResourcePageContent: React.FC = () => {
    const [courses, setCourses] = useState([]);
    const [isAddingCourse, setIsAddingCourse] = useState(false);
    const [isEditingCourse, setIsEditingCourse] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);  
    const [isArchiving, setIsArchiving] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
    const [viewMode, setViewMode] = useState<"card" | "list">("card"); 
    const router = useRouter();

    useEffect(() => {
        async function fetchCourses() {
            try {
                const response = await fetch('/api/courses');
                if (!response.ok) {
                    console.error('Failed to fetch courses:', response.statusText);
                    return;
                }
                const fetchedCourses = await response.json();
                setCourses(fetchedCourses);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        }
        fetchCourses();
    }, []);

    const handleEditCourse = (id: number) => { 
        const course = courses.find((c) => c.id === id);
        setEditingCourse(course);
        setIsEditingCourse(true);
        setIsAddingCourse(false);
    };

    const handleAddCourse = async (newCourse) => {
        try {
            const response = await fetch('/api/courses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCourse),
            });
    
            if (!response.ok) {
                console.error('Failed to add course:', response.statusText);
                return;
            }
    
            const createdCourse = await response.json();
            setCourses((prevCourses) => [...prevCourses, createdCourse]);
            setIsAddingCourse(false);
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };    

    const handleSaveCourse = async (updatedCourse) => {
        const response = await fetch('/api/courses', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedCourse),
        });
        const savedCourse = await response.json();
        setCourses(
            courses.map((course) =>
                course.id === updatedCourse.id
                    ? savedCourse
                    : course
            )
        );
        setIsEditingCourse(false);
    };

    const handleArchive = () => {
        setSelectedCourses(
            courses
                .filter((course) => course.archived)
                .map((course) => course.id)
        );
        setIsArchiving(true);
    };

    const handleArchiveConfirm = async (coursesToArchive: number[], coursesToUnarchive: number[]) => {
        try {
            // Send request to update the courses
            const response = await fetch('/api/courses', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ coursesToArchive, coursesToUnarchive }),
            });
    
            if (!response.ok) {
                console.error('Failed to update courses:', response.statusText);
                return;
            }
    
            const updatedCourses = await response.json();
    
            // Update local state
            setCourses(
                courses.map((course) => {
                    if (coursesToArchive.includes(course.id)) {
                        return { ...course, archived: true };
                    } else if (coursesToUnarchive.includes(course.id)) {
                        return { ...course, archived: false };
                    } else {
                        return course;
                    }
                })
            );
    
            setSelectedCourses([]);
            setIsArchiving(false);
        } catch (error) {
            console.error('Error updating courses:', error);
        }
    };    

    const toggleViewMode = () => {
        setViewMode((prevMode) => (prevMode === "card" ? "list" : "card"));
    };

    return (
        <div className="p-4 bg-white">
            <div className="flex justify-end mb-4">
                <button
                    onClick={toggleViewMode}
                    className="bg-[#438bb4] text-white py-2 px-4 rounded-full transition duration-300 ease-in-out hover:bg-[#224c6b] transform hover:-translate-y-1"
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
                                id={course.id} 
                                courseName={course.courseName}
                                semester={course.semester}
                                courseFrontpage={course.frontpage}
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
                                                    course.id
                                                )}`
                                            )
                                        }
                                        className="text-blue-800 underline"
                                    >
                                        Files
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleEditCourse(course.id)
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
                    className="bg-[#8ABBD9] mr-10 text-white py-2 px-6 rounded-full transition duration-300 ease-in-out hover:bg-[#72A5C9] transform hover:-translate-y-1"
                >
                    Archive
                </button>
                <button
                    onClick={() => setIsAddingCourse(true)}
                    className="bg-[#5A8BB8] text-white py-2 px-6 rounded-full transition duration-300 ease-in-out hover:bg-[#467AA1] transform hover:-translate-y-1"
                >
                    Add Course
                </button>
            </div>
            {isAddingCourse && (
                <div>
                    <AddCourse
                        onAddCourse={handleAddCourse}
                        onCancel={() => setIsAddingCourse(false)}
                    />
                </div>
            )}
            {isEditingCourse && editingCourse && (
                <div>
                    <EditCourse
                        id={editingCourse.id}
                        courseName={editingCourse.courseName}
                        semester={editingCourse.semester}
                        courseFrontpage={editingCourse.frontpage}
                        onSaveCourse={handleSaveCourse}
                        onCancel={() => setIsEditingCourse(false)}
                    />
                </div>
            )}
            {isArchiving && (
                <ArchiveCourses
                    courses={courses}
                    selectedCourses={selectedCourses}
                    onArchive={handleArchiveConfirm}
                    onCancel={() => setIsArchiving(false)}
                />
            )}
        </div>
    );
};

export default ResourcePageContent;