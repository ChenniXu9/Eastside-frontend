const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
require('dotenv').config(); // Load environment variables from .env file


const prisma = new PrismaClient();
async function seedData() {
    try {
        // Read data from the JSON file
        const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

        // Insert data into the database
        for (const user of data.users) {
            await prisma.user.create({ data: user });
            for (const post of data.posts) {
                await prisma.post.create({ data: post });
            }
        }
        // Add more models here as needed// for example:
        // for (const otherModel of data.otherModels) {//   await prisma.otherModel.create({ data: otherModel });// }console.log('Data seeded successfully!');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seedData();