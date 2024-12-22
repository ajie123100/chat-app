export interface SignupProps {
    fullName: string;
    email: string;
    password: string;
}

export interface LoginProps {
    email: string;
    password: string;
}

export interface UpdateProfileProps {
    profilePic: string | ArrayBuffer | null
}

export interface UserProps {
    _id: string;
    fullName: string;
    email: string;
    profilePic: string;
    createdAt: string;
    updatedAt: string;
}
