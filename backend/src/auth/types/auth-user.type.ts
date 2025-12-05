export type AuthUser = {
    id: string;
    email: string;
    role: 'USER' | 'ADMIN';
};