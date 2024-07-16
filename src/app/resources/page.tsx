import React from 'react';
import CourseCard from '../components/CourseCard';

const ResourcePage: React.FC = () => {
  const courses = [
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

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {courses.map((course, index) => (
        <CourseCard
          key={index}
          courseCode={course.courseCode}
          courseName={course.courseName}
          semester={course.semester}
          courseFrontpage={course.courseFrontpage}
        />
      ))}
    </div>
  );
};

export default ResourcePage;
