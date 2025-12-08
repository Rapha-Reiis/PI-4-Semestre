import { IJwt } from "@core/jwt/IJwt";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import "dotenv/config";

export class JwtImpl implements IJwt {
  private JwtSecret: string;
  constructor() {
    this.JwtSecret = process.env.JWT_SECRET!;
    if (!this.JwtSecret)
      throw new Error("JWT_SECRET não foi passada corretamente");
  }

  generateToken(userId: string): string {
    return jwt.sign({ userId }, this.JwtSecret, {
      expiresIn: "5d",
    });
  }

  verifyToken(token: string): JwtPayload {
    return jwt.verify(token, this.JwtSecret) as JwtPayload;
  }
}
