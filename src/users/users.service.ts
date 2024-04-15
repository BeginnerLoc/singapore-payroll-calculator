import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/types';

@Injectable()
export class UsersService {

    private readonly users: User[] = [
        {
            id: '1',
            name: 'test',
            username: 'hello',
            password: 'hello',
            email: "123",
            phoneNo: "123",
            isValidated: true,
        },
        {
            id: '2',
            name: 'yo',
            username: 'yo',
            password: 'hello',
            email: "123",
            phoneNo: "123",
            isValidated: true
        }
    ];

    async findOne(username: string): Promise<User | undefined>{
        return this.users.find(user => user.username == username);
    }

    async createUser(createUserDto: CreateUserDto) {
        const {username, password, name, email, phoneNo} = createUserDto;

        const user: User = {
            id: uuidv4(),
            name: name,
            username: username,
            password: password, //TODO: Use Bcrypt to hash
            email: email,
            phoneNo: phoneNo,
            isValidated: false
        }

        this.users.push(user);

        return user;
    }


}
