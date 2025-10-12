enum Role {
    USER,
    ADMIN,
}

export type UserEntity = {
    id: string;
    username: string;
    name: string;
    email: string;
    password: string;
    profile_image_url?: string | undefined;
    bio?: string | undefined;
    premium: boolean;
    role: Role;
    created_at: Date;
};

export type UserCreateDTO = {
    username: string;
    name: string;
    email: string;
    password: string;
    profile_image_url?: string | null;
    premium?: boolean;
};

export type UserUpdateDTO = {
    username?: string;
    name?: string;
    email?: string;
    password?: string;
    bio?: string;
    profile_image_url?: string;
    premium?: boolean;
};

export type UserResponseDTO = {
    id: string;
    name: string;
    email: string;
    username: string;
    profile_image_url: string | null;
    bio: string | null;
    premium: boolean;
    role: 'USER' | 'ADMIN';
};

export type UserResponseWhitPasswordDTO = {
    id: string;
    name: string;
    email?: string;
    username?: string;
    premium: boolean;
    password: string;
};
