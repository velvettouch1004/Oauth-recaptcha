"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mailer_1 = require("@nestjs-modules/mailer");
let AuthService = class AuthService {
    constructor(usersService, jwtService, mailerService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.mailerService = mailerService;
    }
    async validateUser(email, pass) {
        const user = await this.usersService.findOneByEmail(email);
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(user) {
        const userInfo = user._id ? user : user._doc;
        const payload = { username: userInfo.username, sub: userInfo._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async register(userDto) {
        return this.usersService.create(userDto);
    }
    async handleForgotPassword(email) {
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
        }
        catch (error) {
            console.error("Error handling forgot password:", error);
            throw new Error("An error occurred while processing your request.");
        }
    }
    async saveUser(googleUser) {
        return this.usersService.saveUser(googleUser);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        mailer_1.MailerService])
], AuthService);
//# sourceMappingURL=auth.service.js.map