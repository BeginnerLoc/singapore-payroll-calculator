import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SendEmailDto } from 'src/email/dto/send-email.dto';
import { EmailService } from 'src/email/email.service';
import { User } from 'src/types';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {

    private uuids: string[] = [];

    constructor(private userService: UsersService, private jwtService: JwtService, private emailService: EmailService){}

    async validateUser(username: string, password: string): Promise<any>{
        const user = await this.userService.findOne(username);

        if(user && user.password === password) {
            const { password, username, ...rest } = user;
            return rest;
        }

        return null;
    }

    async login(user: any) {
        const payload = { name: user.name, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(createUserDto: CreateUserDto): Promise<User | null> {
        const user = this.userService.createUser(createUserDto);
        if (user){
            return user;
        }

        return null
    }

    async sendConfirmationEmail(createUserDto: CreateUserDto) {
        const uuid = uuidv4();
        const link = `http://localhost:3000/confirmEmail/${uuid}`
        this.uuids.push(uuid);
        const sendEmailDto: SendEmailDto = {
            from: 'study.tienloc@gmail.com',
            to: createUserDto.email,
            subject: 'Account Confirmation',
            text: 'What is this for?',
            html: `<a href="${link}">Confirm Email</a>`
        }
        this.emailService.sendEmail(sendEmailDto);
    }

    async confirmEmail(uuid: string) {
        const found = this.uuids.find(id => id == uuid);
        if (found){
            return true;
        }
        return false;
    }


}
