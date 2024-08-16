const { PrismaClient } = require('@prisma/client');
require('dotenv').config({ path: '.env.local' });

const prisma = new PrismaClient();

async function main() {

  // Insert initial course data for demo
  const courses = [
    {
      courseName: "Adaptive Leadership program",
      semester: "Class of 2025",
      frontpage:
        "https://uploads.visitseattle.org/2023/01/11122537/Banner_rachael-jones-media_aerial-destination-photos-24_3.jpg",
      archived: false,
    },
    {
      courseName: "Adaptive Leadership program",
      semester: "Class of 2024",
      frontpage:
        "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/71/21/da.jpg",
      archived: false,
    },
    {
      courseName: "Executive Insight",
      semester: "Spring 2024",
      frontpage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV2-qJuHx3GgYorwKuGrRaqz-GNgB8MMWkhg&s",
      archived: false,
    },
  ];

  for (const course of courses) {
    await prisma.course.create({
      data: course,
    });
  }

  console.log('Courses seeded successfully.');
}

main()
  .then(() => {
    console.log('Seeding completed.');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
