import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const folderId = searchParams.get('id');
    const courseId = searchParams.get('courseId');

    // Handling GET request by folder ID
    if (folderId) {
      const folder = await prisma.folder.findUnique({
        where: { id: Number(folderId) },
        include: { files: true },
      });

      if (!folder) {
        return NextResponse.json({ error: 'Folder not found' }, { status: 404 });
      }

      return NextResponse.json(folder);
    }

    // Handling GET request by course ID
    if (courseId) {
      const folders = await prisma.folder.findMany({
        where: { courseId: Number(courseId) },
        include: { files: true },
      });

      if (folders.length === 0) {
        return NextResponse.json({ error: 'No folders found for this course' }, { status: 404 });
      }

      return NextResponse.json(folders);
    }

    // If neither folderId nor courseId is provided
    return NextResponse.json({ error: 'Folder ID or Course ID is required' }, { status: 400 });

  } catch (error) {
    console.error('Error fetching folder:', error);
    return NextResponse.json({ error: 'Failed to fetch folder' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  try {
    const { folderName, courseId } = await request.json();

    if (!folderName || !courseId) {
      return NextResponse.json({ error: 'Folder name and Course ID are required' }, { status: 400 });
    }

    // Create the new folder in the database
    const newFolder = await prisma.folder.create({
      data: {
        folderName: folderName,
        courseId: Number(courseId),
      },
    });

    // Return the created folder's ID
    return NextResponse.json({ id: newFolder.id }, { status: 201 });
  } catch (error) {
    console.error('Error creating folder:', error);
    return NextResponse.json({ error: 'Failed to create folder' }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma after the request
  }
}
