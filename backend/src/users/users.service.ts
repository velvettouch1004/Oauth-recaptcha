import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.schema";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }
  async saveUser(googleUser: any): Promise<User> {

    const { email, name } = googleUser;
    let username = name || email.split('@')[0];
    const password = Math.random().toString(36).slice(-8);
    let user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      user = new this.userModel({
        email,
        username,
        password,
      });
      await user.save();
    }
    return user;
  }

  async create(userDto: { email: string; password: string; username: string }) {
    const existingUser = await this.userModel.findOne({ email: userDto.email });
    if (existingUser) {
      return { status: 404, success: false, message: "Email already exists" };
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const newUser = new this.userModel({
      ...userDto,
      password: hashedPassword,
    });
    await newUser.save();

    return {
      status: 201,
      success: true,
      message: "User created successfully",
      user: newUser,
    };
  }
  async setPasswordResetToken(userId: string, token: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, {
      resetPasswordToken: token,
      resetPasswordExpires: new Date(Date.now() + 3600000), // Optional 1-hour expiration
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
