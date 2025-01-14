import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/user.entity';
import { TodoModule } from './modules/todo/todo.module';
import { Todo } from './modules/todo/todo.entity';

@Module({
  imports: [
    UserModule,
    TodoModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestjs01',
      entities: [User, Todo], // Thêm cả User và Todo vào đây
      synchronize: true, // Tự động đồng bộ bảng (chỉ dùng trong môi trường phát triển)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
