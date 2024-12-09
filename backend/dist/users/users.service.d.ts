import { Model } from "mongoose";
import { User } from "./user.schema";
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    findOneByEmail(email: string): Promise<User | undefined>;
    saveUser(googleUser: any): Promise<User>;
    create(userDto: {
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
        user: import("mongoose").Document<unknown, {}, User> & User & Required<{
            _id: unknown;
        }>;
    }>;
    setPasswordResetToken(userId: string, token: string): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
}
