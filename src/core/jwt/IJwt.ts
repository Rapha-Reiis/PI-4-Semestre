import { JwtPayload } from "jsonwebtoken";

export interface IJwt {
  generateToken(userId: string): string;
  verifyToken(token: string): JwtPayload;
}
