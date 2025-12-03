export interface User {
  id?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  profile_image_url?: string | null;
  bio?: string | null;
  favorite_gameId?: string | null;
  favorite_name?: string | null;
  favorite_url?: string | null;
  email_verified: boolean;
  email_verified_at?: Date | null;
  premium: boolean;
  plan_expires_at?: Date | null;
  role: RoleUser;
  created_at?: Date | null;
}

export type RoleUser = "USER" | "ADM";

