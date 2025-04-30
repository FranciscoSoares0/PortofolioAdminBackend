import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ProjectsModule } from './projects/projects.module';
import { ExperiencesModule } from './experiences/experiences/experiences.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false, // Optional: Turn off autoIndex in production
        poolSize: 10, // Keep 10 connections in the pool
        serverSelectionTimeoutMS: 5000, // Fail fast on DB connection
        socketTimeoutMS: 45000, // Adjust socket timeout
        reconnectTries: Number.MAX_VALUE, // Retry indefinitely if MongoDB is temporarily unreachable
        reconnectInterval: 5000, // Retry every 5 seconds
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    ProjectsModule,
    ExperiencesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
