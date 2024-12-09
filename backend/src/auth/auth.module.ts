import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./jwt.strategy";
import { UsersModule } from "../users/users.module";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: "secretKey",
      signOptions: { expiresIn: "1h" },
    }),
    UsersModule,
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: "mydalah1001@gmail.com",
          pass: "Ahsaikqk06!%",
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@example.com>',
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})

export class AuthModule {}
