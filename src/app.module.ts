import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig, databaseConfig } from './config/database.config';
import { validate } from './config/env.validation';
import { serverConfig } from './config/server.config';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';

import { Post } from './posts/posts.model';
import { PostsModule } from './posts/posts.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { jwtConfig } from './config/jwt.config';
import { EnvironmentVariables } from './config/env.model';
import * as assert from 'assert';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      envFilePath: [
        '.env.local',
        '.env',
        `.env.${process.env.NODE_ENV}.local`,
        `.env.${process.env.NODE_ENV}`,
      ],
      load: [serverConfig, databaseConfig, jwtConfig],
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => {
        const dbConfig = configService.get<DatabaseConfig>('database');
        assert(!!dbConfig);
        const { host, port, username, password, database } = dbConfig;
        return {
          dialect: 'postgres',
          host,
          port,
          username,
          password,
          database,
          models: [User, Role, UserRoles, Post],
          autoLoadModels: true,
        };
      },
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule,
    FilesModule,
  ],
})
export class AppModule {}
