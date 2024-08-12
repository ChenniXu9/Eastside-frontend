"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createFolder, onSubmit, deleteObject } from './actions';

interface FileItem {
  name: string;
  type: 'file' | 'directory';
  url?: string;
  title?: string;
  downloadable?: boolean;
  key?: string;
  children?: FileItem[];
}

const FilesPage: React.FC<{ params: { courseCode: string } }> = ({ params }) => {
  const { courseCode } = params;
  const router = useRouter();

  const [files, setFiles] = useState<FileItem[]>([
    { 
      name: 'Leadership Principles', 
      type: 'directory',
      children: [
        { name: 'April 2023 - Insight.pdf', type: 'file', url: '#', title: 'April 2023 - Insight', downloadable: true }
      ]
    },
    { 
      name: 'Recruiting Preparation', 
      type: 'directory',
      children: [
        { name: 'Finding Your Voice - August 2023', type: 'file', url: 'https://example.com/finding-your-voice', title: 'Finding Your Voice - August 2023', downloadable: true },
        { name: 'How AI is affecting recruiting - August 2023.pdf', type: 'file', url: '#', title: 'How AI is affecting recruiting - August 2023', downloadable: true },
        { name: 'How to Squeeze the Most out of your Summer: Internships, Projects, and Interview Prep - June 2024.pdf', type: 'file', url: '#', title: 'How to Squeeze the Most out of your Summer: Internships, Projects, and Interview Prep - June 2024', downloadable: true }
      ]
    }
  ]);

  const [selectedFolder, setSelectedFolder] = useState<string>('');
  const [newFolderName, setNewFolderName] = useState<string>('');
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});
  const [newFile, setNewFile] = useState<File | null>(null);
  const [newFileUrl, setNewFileUrl] = useState<string>('');
  const [newFileTitle, setNewFileTitle] = useState<string>('');
  const [newFileDownloadable, setNewFileDownloadable] = useState<boolean>(true);
  const [showUpdateSection, setShowUpdateSection] = useState<boolean>(false);

  const handleFileUpload = async () => {
    if (!selectedFolder || (!newFile && !newFileUrl)) return;

    const formData = new FormData();
    if (newFile) {
      formData.append('file', newFile);
    } else if (newFileUrl) {
      formData.append('url', newFileUrl);
    }

    const key = await onSubmit(formData, selectedFolder);

    if (!key) return;

    let newFileItem: FileItem;
    if (newFile) {
      newFileItem = {
        name: newFile.name,
        type: 'file',
        url: URL.createObjectURL(newFile),
        title: newFileTitle || newFile.name,
        downloadable: newFileDownloadable,
        key: key
      };
    } else if (newFileUrl) {
      newFileItem = {
        name: newFileUrl,
        type: 'file',
        url: newFileUrl,
        title: newFileTitle || newFileUrl,
        downloadable: false, // URL links are not downloadable
        key: key
      };
    } else {
      return;
    }

    setFiles(prevFiles => {
      const updatedFiles = prevFiles.map(folder => {
        if (folder.name === selectedFolder) {
          return {
            ...folder,
            children: folder.children ? [...folder.children, newFileItem] : [newFileItem]
          };
        }
        return folder;
      });
      return updatedFiles;
    });

    // Reset the form
    setNewFile(null);
    setNewFileUrl('');
    setNewFileTitle('');
    setNewFileDownloadable(true);
    setSelectedFolder('');
  };

  const handleDelete = async (key: string) => {
    console.log(`Deleting file with key: ${key}`); 
    await deleteObject(key);

    setFiles(prevFiles => {
      const updatedFiles = prevFiles.map(folder => {
        return {
          ...folder,
          children: folder.children?.filter(file => file.key !== key) || []
        };
      });
      return updatedFiles;
    });
  };

  const createNewFolder = async () => {
    if (newFolderName.trim() === '') return;

    await createFolder(newFolderName);

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
    <div className="p-4 flex flex-col h-screen">
      <button 
        onClick={() => router.push('/dashboard/resources')} 
        className="self-start border border-[#90B8D6] text-[#90B8D6] py-2 px-4 rounded-full mb-8 bg-white hover:bg-blue-100"
      >
        Back
      </button>

      <div className="flex-grow space-y-4 overflow-auto">
        {files.map((file, folderIndex) => (
          <div key={folderIndex}>
            {file.type === 'directory' ? (
              <div>
                <div 
                  onClick={() => toggleFolder(file.name)} 
                  className="cursor-pointer flex items-center space-x-2"
                >
                  <span>{openFolders[file.name] ? '📂' : '📁'}</span>
                  <span className="font-semibold text-lg my-1">{file.name}</span>
                </div>
                {openFolders[file.name] && (
                  <div className="ml-4 space-y-2">
                    {file.children?.map((childFile, fileIndex) => (
                      <div key={fileIndex} className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-4">
                          <span>📄</span>
                          <div className="flex-1">
                            <span className="text-[#2F4559]">{childFile.title || childFile.name}</span>
                          </div>
                        </div>
                        <div className="ml-8 flex items-center space-x-4 text-sm">
                          {childFile.downloadable && (
                            <a href={childFile.url} download className="text-[#90B8D6] underline">Download</a>
                          )}
                          <a href={childFile.url} target="_blank" rel="noopener noreferrer" className="text-[#90B8D6] underline">View</a>
                          <button 
                            onClick={() => handleDelete(childFile.key || '')} 
                            className="text-[#D9534F] underline"
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
                  <span className="text-black">{file.title || file.name}</span>
                </div>
                <div className="flex space-x-4 text-sm">
                  {file.downloadable && (
                    <a href={file.url} download className="text-[#90B8D6] underline">Download</a>
                  )}
                  <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-[#90B8D6] underline">View</a>
                  <button 
                    onClick={() => handleDelete(file.key || '')} 
                    className="text-[#D9534F] underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        <div className="flex justify-center mt-4">
          <button 
            onClick={() => setShowUpdateSection(prev => !prev)} 
            className="border border-[#90B8D6] text-[#90B8D6] py-2 px-4 rounded-full bg-white hover:bg-blue-100"
          >
            {showUpdateSection ? 'Hide' : 'Update Files'}
          </button>
        </div>
      </div>

      {showUpdateSection && (
        <>
          <div className="flex justify-center">
            <input 
              type="text" 
              placeholder="New Folder Name" 
              value={newFolderName} 
              onChange={(e) => setNewFolderName(e.target.value)} 
              className="border p-2 mr-2"
            />
            <button onClick={createNewFolder} className="p-2 bg-[#8ABBD9] hover:bg-[#72A5C9] text-white rounded">Create Folder</button>
          </div>

          <form 
            className="space-y-4 w-2/3 mx-auto mt-4 mb-4"
            onSubmit={async (e) => {
              e.preventDefault();
              await handleFileUpload();
            }}
          >
            <div className="mb-4">
              <select 
                value={selectedFolder} 
                onChange={(e) => setSelectedFolder(e.target.value)} 
                className="border p-2 w-full"
              >
                <option value="" disabled>Select Folder to Upload</option>
                {files.map((file, index) => (
                  file.type === 'directory' && <option key={index} value={file.name}>{file.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <input 
                type="text" 
                placeholder="File Title" 
                value={newFileTitle} 
                onChange={(e) => setNewFileTitle(e.target.value)} 
                className="border p-2 w-full"
              />
            </div>

            <div className="mb-4">
              <input 
                type="file" 
                onChange={(e) => {
                  setNewFileUrl('');
                  if (e.target.files) setNewFile(e.target.files[0]);
                }} 
                className="border p-2 w-full"
              />
              <input 
                type="url" 
                placeholder="or add URL link" 
                value={newFileUrl} 
                onChange={(e) => {
                  setNewFile(null);
                  setNewFileUrl(e.target.value);
                }} 
                className="border p-2 w-full mt-2"
              />
            </div>

            <div className="mb-4">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={newFileDownloadable} 
                  onChange={(e) => setNewFileDownloadable(e.target.checked)} 
                  className="mr-2"
                  disabled={!!newFileUrl} 
                />
                Downloadable (only for files)
              </label>
            </div>

            <div className="mb-4">
              <button 
                type="submit" 
                className="p-2 bg-[#8ABBD9] text-white rounded w-full hover:bg-[#72A5C9]"
              >
                Upload
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default FilesPage;
