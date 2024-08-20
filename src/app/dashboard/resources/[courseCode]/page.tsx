"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createFolder, onSubmit, deleteObject, fetchFilesAndFolders, getPresignedUrl } from './actions';
import { FolderItem, FileItem } from '@/types';

const FilesPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseCode;

  console.log('FilesPage loaded with courseId:', courseId);

  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
  const [newFolderName, setNewFolderName] = useState<string>('');
  const [openFolders, setOpenFolders] = useState<Record<number, boolean>>({});
  const [newFile, setNewFile] = useState<File | null>(null);
  const [newFileUrl, setNewFileUrl] = useState<string>('');
  const [newFileTitle, setNewFileTitle] = useState<string>('');
  const [newFileDownloadable, setNewFileDownloadable] = useState<boolean>(true);
  const [showUpdateSection, setShowUpdateSection] = useState<boolean>(false);

  useEffect(() => {
    console.log('UseEffect triggered with courseId:', courseId); 
    async function loadFilesAndFolders() {
      if (courseId) {
        const data = await fetchFilesAndFolders(courseId);
        setFolders(data);
      } else {
        console.error('Invalid courseId:', courseId); 
      }
    }
    loadFilesAndFolders();
  }, [courseId]);  

  const handleFileUpload = async () => {
    console.log('handleFileUpload called');
    if (!selectedFolderId || (!newFile && !newFileUrl)) return;

    if (newFileUrl && !newFile) {
      setNewFileDownloadable(false);
    }

    const formData = new FormData();
    if (newFile) {
      formData.append('file', newFile);
    } else if (newFileUrl) {
      formData.append('url', newFileUrl);
    }

    const savedFile = await onSubmit(formData, selectedFolderId, newFileTitle, newFileDownloadable);

    if (!savedFile) return;

    // Construct the full URL using your S3 bucket base URL
    const baseUrl = `https://leadership-eastside-storage.s3.us-east-2.amazonaws.com/`;
    const fileUrl = `${baseUrl}${savedFile.filePath}`;

    const newFileItem: FileItem = {
      id: savedFile.id,
      fileName: savedFile.fileName,
      filePath: savedFile.filePath,
      createdAt: new Date(),
      type: savedFile.type,
      folderId: savedFile.folderId,
      downloadable: savedFile.downloadable,
      displayName: savedFile.displayName || newFileTitle,
      key: savedFile.filePath.split('/').slice(1).join('/'),
      url: fileUrl 
    };

    setFolders(prevFolders => {
      const updatedFolders = prevFolders.map(folder => {
        if (folder.id === selectedFolderId) {
          return {
            ...folder,
            files: folder.files ? [...folder.files, newFileItem] : [newFileItem]
          };
        }
        return folder;
      });
      return updatedFolders;
    });

    setNewFile(null);
    setNewFileUrl('');
    setNewFileTitle('');
    setNewFileDownloadable(true);
    setSelectedFolderId(null); 
  };  

  const handleDelete = async (fileId: number, key: string) => {
    try {
      if (!key) {
        console.error("Delete failed: Key is empty or undefined.");
        return;
      }
  
      console.log("Delete button clicked. File ID:", fileId, "Key:", key);
  
      await deleteObject(key, fileId);
  
      setFolders(prevFolders => {
        const updatedFolders = prevFolders.map(folder => ({
          ...folder,
          files: folder.files?.filter(file => file.id !== fileId) || []
        }));
        return updatedFolders;
      });
  
    } catch (error) {
      console.error('Error deleting object:', error);
    }
  };

  const createNewFolder = async () => {
    if (newFolderName.trim() === '') return;

    console.log('Creating new folder with courseId:', courseId);

    const newFolderId = await createFolder(newFolderName, courseId);

    if (newFolderId) {
      const newFolder: FolderItem = {
        id: newFolderId,
        courseId: Number(courseId),
        folderName: newFolderName,
        createdAt: new Date(),
        files: []
      };

      setFolders(prevFolders => [...prevFolders, newFolder]);
      setNewFolderName('');
    }
  };

  const toggleFolder = (folderId: number) => {
    setOpenFolders(prevState => ({
      ...prevState,
      [folderId]: !prevState[folderId]
    }));
  };

  const handleDownload = async (fileUrl: string) => {
    console.log("Downloading....");
    const downloadUrl = await getPresignedUrl(fileUrl);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = ''; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        {folders.map((folder) => (
          <div key={folder.id}>
            <div>
              <div 
                onClick={() => toggleFolder(folder.id)} 
                className="cursor-pointer flex items-center space-x-2"
              >
                <span>{openFolders[folder.id] ? '📂' : '📁'}</span>
                <span className="font-semibold text-lg my-1">{folder.folderName}</span>
              </div>
              {openFolders[folder.id] && (
                <div className="ml-4 space-y-2">
                  {folder.files?.map((file) => (
                    <div key={file.id} className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-4">
                        <span>📄</span>
                        <div className="flex-1">
                          <span className="text-[#2F4559]">{file.displayName || file.fileName}</span>
                        </div>
                      </div>
                      <div className="ml-8 flex items-center space-x-4 text-sm">
                        {file.downloadable && (
                        <button 
                        onClick={() => handleDownload(file.filePath)} 
                        className="text-[#90B8D6] underline"
                        >
                        Download
                        </button>)}
                        {/* <a 
                          href={file.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[#90B8D6] underline no-download"
                        >
                          View
                        </a> */}
                        <a 
                          href={file.type === 'url' ? file.fileName : file.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[#90B8D6] underline no-download"
                        >
                          View 
                        </a>
                        <button 
                          onClick={() => {
                            console.log("Full file object:", file);
                            console.log("Delete button clicked. File ID:", file.id, "Key:", file.filePath);
                            handleDelete(file.id, file.filePath || '');
                          }} 
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
                value={selectedFolderId?.toString() || ''} 
                onChange={(e) => {
                  const folderId = parseInt(e.target.value);
                  setSelectedFolderId(folderId); 

                  const folder = folders.find(folder => folder.id === folderId);
                  if (folder) {
                    console.log('Folder selected:', folder.folderName, 'with ID:', folderId);
                  }
                }}  
                className="border p-2 w-full"
              >
                <option value="" disabled>Select Folder to Upload</option>
                {folders.map((folder) => (
                  <option key={folder.id} value={folder.id.toString()}>{folder.folderName}</option>
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
                  setNewFileDownloadable(true);
                }} 
                className="border p-2 w-full"
              />
              <input 
                type="url" 
                placeholder="Or Add URL Link" 
                value={newFileUrl} 
                onChange={(e) => {
                  setNewFile(null);
                  setNewFileUrl(e.target.value);
                  setNewFileDownloadable(false);
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
                Downloadable (for files)
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