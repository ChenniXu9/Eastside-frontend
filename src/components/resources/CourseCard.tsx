"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; 

interface CourseCardProps {
  id: number; 
  courseName: string;
  semester: string;
  courseFrontpage: string;
  onEditCourse: (id: number) => void; 
}

const CourseCard: React.FC<CourseCardProps> = ({ id, courseName, semester, courseFrontpage, onEditCourse }) => {
  const router = useRouter();

  const handleFilesClick = () => {
    router.push(`resources/${id}`);
  };

  const handleEditClick = () => {
    onEditCourse(id); 
  };

  return (
    <div className="border border-gray-300 rounded-lg shadow-lg overflow-hidden mb-4 w-full max-w-xs bg-white">
      <div className="relative w-full h-40">
        <Image
          src={courseFrontpage}
          alt={`${courseName} frontpage`}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
          unoptimized
        />
      </div>
      <div className="p-4">
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