"use client";

import React, { useState } from 'react';
import FileUpload from '../../components/FileUpload';
import FileList from '../../components/FileList';

interface FileItem {
  name: string;
  type: 'file' | 'directory';
  url?: string;
}

const FilesPage: React.FC<{ params: { courseCode: string } }> = ({ params }) => {
  const { courseCode } = params;

  const [files, setFiles] = useState<FileItem[]>([
    { name: 'Lecture 1.pdf', type: 'file', url: '#' },
    { name: 'Assignment 1.docx', type: 'file', url: '#' },
    { name: 'Project.zip', type: 'file', url: '#' },
  ]);

  const handleFileUpload = (file: File) => {
    const newFile: FileItem = {
      name: file.name,
      type: 'file',
      url: URL.createObjectURL(file),
    };
    setFiles([...files, newFile]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Files for Course: {courseCode}</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      <FileList files={files} />
    </div>
  );
};

export default FilesPage;
