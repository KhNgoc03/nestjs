import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }
    
    find(id: number): Promise<User> {
        return this.userRepository.findOneBy({ id });
    }

    create(userData: Partial<User>): Promise<User> {
        const user = this.userRepository.create(userData);
        return this.userRepository.save(user); 
    }

    async update(id: number, userData: Partial<User>): Promise<User> {
        await this.userRepository.update(id, userData);
        return this.userRepository.findOneBy({ id });
    }

    async delete(id: number) {
        const user = await this.userRepository.findOneBy({id});
        return this.userRepository.delete(id);
        return user;
    }
}
