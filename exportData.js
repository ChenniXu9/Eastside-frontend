const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function exportData() {
  try {
    // Fetch all data from your models
    const users = await prisma.user.findMany();
    const channels = await prisma.channel.findMany();
    const posts = await prisma.post.findMany();
    const comments = await prisma.comment.findMany();
    // Add more models as needed

    // Combine data into a single object
    const data = {
      users,
      channels,
      posts,
      comments,
      // Add more models here
    };

    // Write data to a JSON file
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    console.log('Data exported successfully!');
  } catch (error) {
    console.error('Error exporting data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

exportData();
