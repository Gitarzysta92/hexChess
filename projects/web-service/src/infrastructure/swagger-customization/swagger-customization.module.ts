import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: "/swagger-assets",
      rootPath: join(__dirname, 'assets'),
    }),
  ],
  exports: [
    ServeStaticModule
  ],
})
export class SwaggerCustomizationModule {}
 