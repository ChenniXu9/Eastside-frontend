"use client";

import React, { useState, useEffect } from 'react';

interface EditCourseProps {
  courseCode: string;
  courseName: string;
  semester: string;
  courseFrontpage: string;
  onSaveCourse: (updatedCourse: any) => void;
  onCancel: () => void;
}

const EditCourse: React.FC<EditCourseProps> = ({ courseCode, courseName, semester, courseFrontpage, onSaveCourse, onCancel }) => {
  const [editedCourseName, setEditedCourseName] = useState(courseName);
  const [editedSemester, setEditedSemester] = useState(semester);
  const [editedCourseFrontpage, setEditedCourseFrontpage] = useState(courseFrontpage);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const updatedCourse = {
      courseCode,
      courseName: editedCourseName,
      semester: editedSemester,
      courseFrontpage: editedCourseFrontpage,
    };
    onSaveCourse(updatedCourse);
  };

  useEffect(() => {
    setEditedCourseName(courseName);
    setEditedSemester(semester);
    setEditedCourseFrontpage(courseFrontpage);
  }, [courseName, semester, courseFrontpage]);

  return (
    <div className="p-20 bg-white min-h-screen">
      <h1 className="text-center text-blue-800 text-2xl font-bold mb-4 pb-4">Edit Course @ Leadership Eastside</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Course Name</label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            value={editedCourseName}
            onChange={(e) => setEditedCourseName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Semester</label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            value={editedSemester}
            onChange={(e) => setEditedSemester(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Course Frontpage URL</label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            value={editedCourseFrontpage}
            onChange={(e) => setEditedCourseFrontpage(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out hover:bg-gray-600 transform hover:-translate-y-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out hover:bg-blue-600 transform hover:-translate-y-1"
          >
            Save Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;

