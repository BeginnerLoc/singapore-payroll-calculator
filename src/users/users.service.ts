import { Injectable } from '@nestjs/common';
import { User } from 'src/types/Users';

@Injectable()
export class UsersService {

    private readonly users: User[] = [
        {
            id: 1,
            name: 'test',
            username: 'hello',
            password: 'hello'
        },
        {
            id: 2,
            name: 'yo',
            username: 'yo',
            password: 'hello'
        }
    ];

    async findOne(username: string): Promise<User | undefined>{
        return this.users.find(user => user.username == username);
    }
}
