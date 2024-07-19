"use client";

import React, { useState, useEffect } from 'react';

const AddCourse: React.FC<{ onAddCourse: (course) => void, nextCourseCode: string }> = ({ onAddCourse, nextCourseCode }) => {
  const [courseCode, setCourseCode] = useState('');

  useEffect(() => {
    setCourseCode(nextCourseCode);
  }, [nextCourseCode]);

  const [courseName, setCourseName] = useState('');
  const [semester, setSemester] = useState('');
  const [courseFrontpage, setCourseFrontpage] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newCourse = {
      courseCode,
      courseName,
      semester,
      courseFrontpage,
    };
    onAddCourse(newCourse);
    setCourseCode('');
    setCourseName('');
    setSemester('');
    setCourseFrontpage('');
  };

  return (
    <div className="p-20 bg-white min-h-screen">
      <h1 className="text-center text-blue-800 text-2xl font-bold mb-4 pb-4">New Course @ Leadership Eastside</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Course Name</label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Semester</label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Course Frontpage URL</label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            value={courseFrontpage}
            onChange={(e) => setCourseFrontpage(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out hover:bg-blue-600 transform hover:-translate-y-1"
          >
            Add Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
