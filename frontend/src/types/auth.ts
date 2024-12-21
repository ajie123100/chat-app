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