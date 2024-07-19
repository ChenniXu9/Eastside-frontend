"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CourseCard from '../../../components/resources/CourseCard';
import AddCourse from '../../../components/resources/AddCourse';
import EditCourse from '../../../components/resources/EditCourse';

const initialCourses = [
  {
    courseCode: "1",
    courseName: "Adaptive Leadership program",
    semester: "Class of 2025",
    courseFrontpage: "https://uploads.visitseattle.org/2023/01/11122537/Banner_rachael-jones-media_aerial-destination-photos-24_3.jpg"
  },
  {
    courseCode: "2",
    courseName: "Adaptive Leadership program",
    semester: "Class of 2024",
    courseFrontpage: "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/71/21/da.jpg"
  },
  {
    courseCode: "3",
    courseName: "Executive Insight",
    semester: "Spring 2024",
    courseFrontpage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV2-qJuHx3GgYorwKuGrRaqz-GNgB8MMWkhg&s"
  },
  {
    courseCode: "4",
    courseName: "Executive Insight",
    semester: "Fall 2023",
    courseFrontpage: "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/71/21/da.jpg"
  },
  {
    courseCode: "5",
    courseName: "Executive Insight",
    semester: "Spring 2023",
    courseFrontpage: "https://uploads.visitseattle.org/2023/01/11122537/Banner_rachael-jones-media_aerial-destination-photos-24_3.jpg"
  },
];

const ResourcePageContent: React.FC = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const router = useRouter();

  const handleAddCourse = (newCourse) => {
    setCourses([...courses, newCourse]);
    setIsAddingCourse(false);
  };

  const handleAddCourseButton = () => {
    setIsAddingCourse(true);
  };

  const getNextCourseCode = () => {
    const maxCode = courses.reduce((max, course) => Math.max(max, parseInt(course.courseCode)), 0);
    return (maxCode + 1).toString();
  };

  const handleEditCourse = (courseCode: string) => {
    const course = courses.find(c => c.courseCode === courseCode);
    setEditingCourse(course);
    setIsEditingCourse(true);
    setIsAddingCourse(false);
  };

  const handleSaveCourse = (updatedCourse) => {
    setCourses(courses.map(course => course.courseCode === updatedCourse.courseCode ? updatedCourse : course));
    setIsEditingCourse(false);
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 bg-white">
      {courses.map((course, index) => (
        <CourseCard
          key={index}
          courseCode={course.courseCode}
          courseName={course.courseName}
          semester={course.semester}
          courseFrontpage={course.courseFrontpage}
          onEditCourse={handleEditCourse} 
        />
      ))}
      <div className="w-full flex justify-center mt-8">
        <button
          onClick={handleAddCourseButton}
          className="bg-blue-800 text-white py-2 px-6 rounded-full transition duration-300 ease-in-out hover:bg-blue-700 transform hover:-translate-y-1"
        >
          Add Course
        </button>
      </div>
      {isAddingCourse && (
        <div>
          <AddCourse onAddCourse={handleAddCourse} nextCourseCode={getNextCourseCode()}/>
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
          />
        </div>
      )}
    </div>
  );
};

export default ResourcePageContent;
