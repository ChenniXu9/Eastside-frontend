"use client";

import React from 'react';
import { FileItem } from '../types';

interface FileListProps {
  files: FileItem[];
}

const FileList: React.FC<FileListProps> = ({ files }) => {
  return (
    <div>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            {file.type === 'directory' ? (
              <span>{file.name}</span>
            ) : (
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                {file.name}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
