export interface User {
    id: string;
    username: string;
    profile_image: string | null;
    cover_image: string | null;
    first_name: string | null;
    last_name: string | null;
    organization: string | null;
    title: string | null;
    phone: string | null;
    description: string | null;
    password: string | null;
    personal_email: string | null;
    graduation_year: string | null;
    work_email: string | null;
    createdAt: Date;
    admin: boolean | null;
}

export interface FileItem {
    id: number;
    fileName: string;
    filePath: string;
    createdAt: Date;
    authorId?: number;
    type: string;
    folderId: number;
    downloadable: boolean;
    displayName: string;
    key?: string;
    url?: string;
}

export interface FolderItem {
    id: number;
    courseId: number;
    folderName: string;
    createdAt: Date;
    files: FileItem[];
}

// Channel Types
export type Comment = {
    id: number;
    desc: string;
    userId: string;
    postId: number;
    user: User;
};

export type Post = {
    id: number;
    desc: string;
    img: string | null;
    video: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    channelId: number;
    user: User;
    comments: Comment[];
};

export type Channel = {
    id: number;
    channel_name: string;
    channel_image: string | null;
    channel_description: string | null;
    users: {
        user: User;
    }[];
    posts: Post[];
};
