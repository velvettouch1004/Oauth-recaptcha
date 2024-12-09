import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
    register(body: {
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
    googleLogin(token: string): Promise<{
        access_token: string;
    }>;
    getCurrentUser(req: any): Promise<any>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
}
