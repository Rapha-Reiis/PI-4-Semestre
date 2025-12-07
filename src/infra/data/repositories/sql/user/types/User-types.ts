export interface UserRow {
  id: string;
  name: string;
  email: string;
  username: string;
  password_hash: string;
  avatar_url: string | null;
  bio: string | null;
  favorite_gameId: string | null;
  favorite_name: string | null;
  favorite_url: string | null;
  email_verified: boolean;
  email_verified_at: Date | null;
  premium: boolean;
  plan_expires_at: Date | null;
  role: string;
  created_at: Date;
}
