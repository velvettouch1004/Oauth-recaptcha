import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailerService: MailerService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const userInfo = user._id ? user : user._doc;
    const payload = { username: userInfo.username, sub: userInfo._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userDto: {
    email: string;
    password: string;
    username: string;
  }) {
    return this.usersService.create(userDto);
  }

  async handleForgotPassword(email: string) {
    try {
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        return { message: "If the email exists, a reset link has been sent." };
      }

      const token = crypto.randomBytes(32).toString("hex");
      const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

      await this.usersService.setPasswordResetToken(user.id, hashedToken);
      
      const resetLink = `http://localhost:5173/reset-password?token=${token}`;
      await this.mailerService.sendMail({
        to: user.email,
        subject: "Password Reset Request",
        text: `Click here to reset your password: ${resetLink}`,
      });

      return { message: "If the email exists, a reset link has been sent." };
    } catch (error) {
      console.error("Error handling forgot password:", error);
      throw new Error("An error occurred while processing your request.");
    }
  }

  async saveUser(googleUser: any) {
    return this.usersService.saveUser(googleUser);
  }
}
