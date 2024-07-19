"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

interface CourseCardProps {
  courseCode: string;
  courseName: string;
  semester: string;
  courseFrontpage: string;
  onEditCourse: (courseCode: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ courseCode, courseName, semester, courseFrontpage, onEditCourse }) => {
  const router = useRouter();

  const handleFilesClick = () => {
    router.push(`resources/${encodeURIComponent(courseCode)}`);
  };

  const handleEditClick = () => {
    onEditCourse(courseCode);
  };

  return (
    <div className="border border-gray-300 rounded-lg shadow-lg overflow-hidden mb-4 w-full max-w-xs bg-white">
      <img src={courseFrontpage} alt={`${courseName} frontpage`} className="h-40 w-full object-cover" />
      <div className="p-4">
        <div className={courseCode}></div>
        <p className="font-bold text-lg mb-2">{courseName}</p>
        <p className="text-gray-500 mb-2">{semester}</p>
      </div>
      <div className="flex justify-around p-4 border-t border-gray-200 bg-gray-50">
        <span onClick={handleFilesClick} className="text-blue-800 cursor-pointer">📄 Files</span>
        <span onClick={handleEditClick} className="text-blue-800 cursor-pointer">✏️ Edit</span> 
      </div>
    </div>
  );
};

export default CourseCard;
