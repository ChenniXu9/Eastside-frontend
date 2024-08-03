export interface FileItem {
    name: string;
    type: "file" | "directory";
    url?: string;
    uploadTime?: string;
}

export interface User {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    organization: string;
    title: string;
    phone: string;
    phone_is_visible: boolean;
    email_personal: string;
    email_work: string;
    graduation_year: string;
    desc: string;
    profile_image?: string;
    cover_image?: string;
    password: string;
}
