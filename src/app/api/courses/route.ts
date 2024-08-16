import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle GET requests
export async function GET() {
    try {
        const courses = await prisma.course.findMany();
        return NextResponse.json(courses);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

// Handle POST requests
export async function POST(req: Request) {
    try {
        const newCourse = await req.json();

        const createdCourse = await prisma.course.create({
            data: {
                courseName: newCourse.courseName,
                semester: newCourse.semester,
                frontpage: newCourse.frontpage, 
                archived: newCourse.archived,
            },
        });

        return NextResponse.json(createdCourse, { status: 201 });
    } catch (error) {
        console.error('Error creating course:', error);
        return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

// Handle PUT requests
export async function PUT(req: Request) {
    try {
        const updatedCourse = await req.json();

        const savedCourse = await prisma.course.update({
            where: { id: updatedCourse.id },
            data: {
                courseName: updatedCourse.courseName, 
                semester: updatedCourse.semester,     
                frontpage: updatedCourse.courseFrontpage, 
            },
        });

        return NextResponse.json(savedCourse);
    } catch (error) {
        console.error('Error updating course:', error);
        return NextResponse.json({ error: 'Failed to update course' }, { status: 500 });
    } finally {
        await prisma.$disconnect(); 
    }
}
  
// Handle PATCH requests
export async function PATCH(req: Request) {
    try {
        const { coursesToArchive, coursesToUnarchive } = await req.json();

        await prisma.course.updateMany({
            where: { id: { in: coursesToArchive } },
            data: { archived: true },
        });

        await prisma.course.updateMany({
            where: { id: { in: coursesToUnarchive } },
            data: { archived: false },
        });

        const allCourses = await prisma.course.findMany();
        return NextResponse.json(allCourses);
    } catch (error) {
        console.error('Error updating courses:', error);
        return NextResponse.json({ error: 'Failed to update courses' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
