import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { MailerService } from "@nestjs-modules/mailer";
export declare class AuthService {
    private usersService;
    private jwtService;
    private mailerService;
    constructor(usersService: UsersService, jwtService: JwtService, mailerService: MailerService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    register(userDto: {
        email: string;
        password: string;
        username: string;
    }): Promise<{
        status: number;
        success: boolean;
        message: string;
        user?: undefined;
    } | {
        status: number;
        success: boolean;
        message: string;
        user: import("mongoose").Document<unknown, {}, import("../users/user.schema").User> & import("../users/user.schema").User & Required<{
            _id: unknown;
        }>;
    }>;
    handleForgotPassword(email: string): Promise<{
        message: string;
    }>;
    saveUser(googleUser: any): Promise<import("../users/user.schema").User>;
}
