import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {
    const dbUrl = this.configService.get<string>("MONGODB_URL");
    console.log("MongoDB URL:", dbUrl);
  }

  getDatabaseUrl(): string {
    return this.configService.get<string>("MONGODB_URL");
  }
}
