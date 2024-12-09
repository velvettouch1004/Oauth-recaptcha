import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  UnauthorizedException,
  BadRequestException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "../common/jwt-auth.guard";
import { OAuth2Client } from "google-auth-library";

const CLIENT_ID =
  "265214695919-psljrmhk4suorg6qmkll4asqfcmsq0op.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

async function verify(token: string) {
  try {
    const currentTime = Math.floor(Date.now() / 1000);
    
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (payload.exp && payload.exp < currentTime) {
      throw new Error('Token has expired');
    }
    
    return payload;
  } catch (error) {
    console.error('Token verification failed:', error.message);
    throw new Error('Invalid or expired token');
  }
}

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    return this.authService.login(user);
  }

  @Post("register")
  async register(
    @Body() body: { email: string; password: string; username: string }
  ) {
    return this.authService.register(body);
  }

  @Post("google")
  async googleLogin(@Body("token") token: string) {
    const payload = await verify(token);
    const user = await this.authService.saveUser(payload);
    return this.authService.login(user);
  }

  @Post("get-current-user")
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Req() req) {
    return req.user;
  }

  @Post("forgot-password")
  async forgotPassword(@Body("email") email: string) {
    if (!email) {
      throw new BadRequestException("Email is required");
    }
    return this.authService.handleForgotPassword(email);
  }
}