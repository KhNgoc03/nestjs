import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { databaseService } from 'src/db/database.service';
import { authService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  controllers: [UserController],
  providers: [UserService,authService, databaseService], 
  imports: [TypeOrmModule.forFeature([User])]
})
export class UserModule {}
