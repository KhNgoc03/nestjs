import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string; 

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({default: true})
    isActive: boolean;
}