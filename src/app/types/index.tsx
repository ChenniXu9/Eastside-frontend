export interface FileItem {
    name: string;
    type: 'file' | 'directory';
    url?: string;
    uploadTime?: string;
}