"use client"

import React, { useState } from 'react';
import { createFolder, onSubmit } from './actions';

export default function Home() {
  const [newFolderName, setNewFolderName] = useState<string>('');
  const [selectedFolder, setSelectedFolder] = useState<string>('');
  const [newFile, setNewFile] = useState<File | null>(null);

  const handleCreateFolder = async () => {
    if (newFolderName.trim() === '') return;
    await createFolder(newFolderName);
    setNewFolderName('');
    alert('Folder created successfully');
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFile) return;

    const formData = new FormData();
    formData.append('file', newFile);

    await onSubmit(formData, selectedFolder);
    setNewFile(null);
    alert('File uploaded successfully');
  };

  return (
    <main className=''>
      <div>
        <input 
          type="text" 
          placeholder="New Folder Name" 
          value={newFolderName} 
          onChange={(e) => setNewFolderName(e.target.value)} 
          className="border p-2 mr-2"
        />
        <button onClick={handleCreateFolder} className="p-2 bg-blue-500 text-white rounded">Create Folder</button>
      </div>

      <form onSubmit={handleFileUpload}>
        <input 
          type='file' 
          name='file' 
          onChange={(e) => {
            if (e.target.files) {
              setNewFile(e.target.files[0]);
            }
          }} 
        />
        <input 
          type="text" 
          placeholder="Folder to upload to (optional)" 
          value={selectedFolder} 
          onChange={(e) => setSelectedFolder(e.target.value)} 
          className="border p-2 mr-2"
        />
        <input type='submit' value='Upload'/>
      </form>
    </main>
  );
}

// import React from 'react';
// import { onSubmit } from './actions';

// export default function Home() {
//   return (
//     <main className=''>
//       <form action={onSubmit}>
//         <input type='file' name='file'/>
//         <input type='submit' value='Upload'/>
//       </form>
//     </main>
//   );
// }