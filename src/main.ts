import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Bật CORS
    app.enableCors({
        origin: 'http://127.0.0.1:5500', // URL của frontend
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true, // Nếu cần sử dụng cookie hoặc xác thực
    });

    await app.listen(3000);
}
bootstrap();
