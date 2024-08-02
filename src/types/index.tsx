export interface FileItem {
    name: string;
    type: "file" | "directory";
    url?: string;
    uploadTime?: string;
}

export interface User {
    id: number;
    name?: string;
    lastname?: string;
    username: string;
    description?: string;
    city?: string;
    school?: string;
    work?: string;
    website?: string;
    profile_image?: string;
    cover_image?: string;
    password: string;
}
