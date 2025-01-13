import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { authService } from './auth.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService, 
                private readonly authService: authService) {}
    @Get()
    index() {
        return this.userService.findAll();
    }

    @Get('/:id')
    find(@Param('id')id: string) {
        return this.userService.find(+id);
    }

    @Post()
    create(@Body() body: any) {
        return this.userService.create(body);
    }

    @Delete('/:id')
    delete(@Param('id') id: string) {
        return this.userService.delete(+id);
    }

    @Patch('/:id')
    update(@Param('id') id: string, @Body() body:any) {
        return this.userService.update(+id, body);
    }
}
