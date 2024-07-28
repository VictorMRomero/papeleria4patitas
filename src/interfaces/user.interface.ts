//todo actualizar la interfaz

export interface User {
    id: string;
    fullName: string;
    email: string;
    emailVerified?: string | null;
    password: string;
    roles: string;
    createAt: string;
    isActive: boolean;
    image?: string | null;

}

