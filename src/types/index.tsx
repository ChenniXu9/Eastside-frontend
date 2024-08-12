export interface FileItem {
    name: string;
    type: "file" | "directory";
    url?: string;
    uploadTime?: string;
}

export interface User {
    id: string;
    username: string;
    profile_image: string | null; // Updated to allow null
    cover_image: string | null; // Updated to allow null
    first_name: string | null; // Updated to allow null
    last_name: string | null; // Updated to allow null
    organization: string | null; // Updated to allow null
    title: string | null; // Updated to allow null
    phone: string | null; // Updated to allow null
    description: string | null; // Updated to allow null
    password: string | null; // Updated to allow null
    personal_email: string | null; // Updated to allow null
    graduation_year: string | null; // Updated to allow null
    work_email: string | null; // Updated to allow null
    admin: number;
}
