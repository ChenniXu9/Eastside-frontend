import React, { useState, useEffect } from 'react';

interface Course {
  courseCode: string;
  courseName: string;
  semester: string;
  courseFrontpage: string;
  archived: boolean;
}

interface ArchiveCoursesProps {
  courses: Course[];
  selectedCourses: string[];
  onArchive: (selectedCourses: string[]) => void;
  onCancel: () => void;
}

const ArchiveCourse: React.FC<ArchiveCoursesProps> = ({ courses, selectedCourses, onArchive, onCancel }) => {
  const [selected, setSelected] = useState<string[]>(selectedCourses);

  useEffect(() => {
    setSelected(selectedCourses);
  }, [selectedCourses]);

  const handleCourseSelect = (courseCode: string) => {
    setSelected(prev => 
      prev.includes(courseCode) ? prev.filter(code => code !== courseCode) : [...prev, courseCode]
    );
  };

  const handleConfirm = () => {
    onArchive(selected);
  };

  return (
    <div className="w-full p-4 bg-gray-100 rounded-md shadow-md mt-10">
      <h2 className="text-blue-800 text-lg font-semibold mb-4">Select Courses to Archive</h2>
      {courses.map((course) => (
        <div key={course.courseCode} className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={selected.includes(course.courseCode)}
            onChange={() => handleCourseSelect(course.courseCode)}
            className="mr-2"
          />
          <span>{course.courseName} - {course.semester}</span>
        </div>
      ))}
      <div className="flex justify-end mt-4">
        <button
          onClick={onCancel}
          className="bg-gray-500 text-white py-2 px-4 rounded-full mr-2"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="bg-[#8ABBD9] text-white py-2 px-4 rounded-full hover:bg-[#72A5C9]"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ArchiveCourse;