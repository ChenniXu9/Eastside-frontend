"use client"

import React, { useState } from 'react';

interface FileItem {
  name: string;
  type: 'file' | 'directory';
  url?: string;
  children?: FileItem[];
}

const FilesPage: React.FC<{ params: { courseCode: string } }> = ({ params }) => {
  const { courseCode } = params;

  const [files, setFiles] = useState<FileItem[]>([
    { 
      name: 'Leadership Principles', 
      type: 'directory',
      children: [
        { name: 'April 2023 - Insight.pdf', type: 'file', url: '#' }
      ]
    },
    { 
      name: 'Recruiting Preparation', 
      type: 'directory',
      children: [
        { name: 'Finding Your Voice - August 2023', type: 'file', url: 'https://example.com/finding-your-voice' },
        { name: 'How AI is affecting recruiting - August 2023.pdf', type: 'file', url: '#' },
        { name: 'How to Squeeze the Most out of your Summer: Internships, Projects, and Interview Prep - June 2024.pdf', type: 'file', url: '#' }
      ]
    }
  ]);

  const [selectedFolder, setSelectedFolder] = useState<string>('');
  const [newFolderName, setNewFolderName] = useState<string>('');
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});

  const handleFileUpload = (file: File) => {
    const newFile: FileItem = {
      name: file.name,
      type: 'file',
      url: URL.createObjectURL(file),
    };

    setFiles(prevFiles => {
      const updatedFiles = [...prevFiles];
      const folderIndex = updatedFiles.findIndex(folder => folder.name === selectedFolder);
      if (folderIndex >= 0 && updatedFiles[folderIndex].children) {
        updatedFiles[folderIndex].children.push(newFile);
      }
      return updatedFiles;
    });
  };

  const handleDelete = (folderIndex: number, fileIndex: number) => {
    setFiles(prevFiles => {
      const updatedFiles = [...prevFiles];
      updatedFiles[folderIndex].children?.splice(fileIndex, 1);
      return updatedFiles;
    });
  };

  const createNewFolder = () => {
    if (newFolderName.trim() === '') return;

    const newFolder: FileItem = {
      name: newFolderName,
      type: 'directory',
      children: []
    };

    setFiles(prevFiles => [...prevFiles, newFolder]);
    setNewFolderName('');
  };

  const toggleFolder = (folderName: string) => {
    setOpenFolders(prevState => ({
      ...prevState,
      [folderName]: !prevState[folderName]
    }));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Files for Course: {courseCode}</h1>

      <div className="space-y-4">
        {files.map((file, folderIndex) => (
          <div key={folderIndex}>
            {file.type === 'directory' ? (
              <div>
                <div 
                  onClick={() => toggleFolder(file.name)} 
                  className="cursor-pointer flex items-center space-x-2"
                >
                  <span>{openFolders[file.name] ? '📂' : '📁'}</span>
                  <span className="font-semibold">{file.name}</span>
                </div>
                {openFolders[file.name] && (
                  <div className="ml-4 space-y-2">
                    {file.children?.map((childFile, fileIndex) => (
                      <div key={fileIndex} className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-4">
                          <span>📄</span>
                          <div className="flex-1">
                            {childFile.url?.startsWith('http') ? (
                              <a href={childFile.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                {childFile.name}
                              </a>
                            ) : (
                              <a href={childFile.url} download className="text-blue-500 underline">
                                {childFile.name}
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="ml-8 flex items-center space-x-4 text-sm">
                          {childFile.name.endsWith('.pdf') && (
                            <a href={childFile.url} download className="text-blue-500 underline">Download</a>
                          )}
                          {childFile.url?.startsWith('http') && (
                            <a href={childFile.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View</a>
                          )}
                          <button 
                            onClick={() => handleDelete(folderIndex, fileIndex)} 
                            className="text-red-500 underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  {file.url?.startsWith('http') ? (
                    <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      {file.name}
                    </a>
                  ) : (
                    <a href={file.url} download className="text-blue-500 underline">
                      {file.name}
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mb-4 mt-10">
        <input 
          type="text" 
          placeholder="New Folder Name" 
          value={newFolderName} 
          onChange={(e) => setNewFolderName(e.target.value)} 
          className="border p-2 mr-2"
        />
        <button onClick={createNewFolder} className="p-2 bg-blue-500 text-white">Create Folder</button>
      </div>

      <div className="mb-4">
        <select 
          value={selectedFolder} 
          onChange={(e) => setSelectedFolder(e.target.value)} 
          className="border p-2"
        >
          <option value="" disabled>Select Folder to Upload</option>
          {files.map((file, index) => (
            file.type === 'directory' && <option key={index} value={file.name}>{file.name}</option>
          ))}
        </select>
        <input type="file" onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])} className="ml-2"/>
      </div>
    </div>
  );
};

export default FilesPage;
