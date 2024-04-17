import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { BaseService } from 'src/base/base.service';
import { SendEmailDto } from 'src/email/dto/send-email.dto';
import { EmailService } from 'src/email/email.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {

    private uuids: string[] = [];

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly emailService: EmailService,
        private readonly configService: ConfigService,
        private readonly baseService: BaseService,
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username);

        if (user && this.baseService.comparePasswords(password, user.password)) {
            const { password, username, ...rest } = user;
            return rest;
        }
        return null;
    }

    async login(user: any) {
        const payload = { name: user.name, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(createUserDto: CreateUserDto): Promise<any> {
        const user = await this.userService.createUser(createUserDto);
        const { username, password, ...rest } = user;

        if (rest) {
            return rest;
        }
        return null
    }

    async sendConfirmationEmail(createUserDto: CreateUserDto): Promise<boolean> {
        const uuid = uuidv4();
        const DOMAIN_NAME = this.configService.get('DOMAIN_NAME')
        const link = `${DOMAIN_NAME}/auth/confirmEmail/${uuid}`

        this.uuids.push(uuid);

        const sendEmailDto: SendEmailDto = {
            from: 'study.tienloc@gmail.com',
            to: createUserDto.email,
            subject: 'Account Confirmation',
            template: './confirmation',
            context: {url: link},
        }
        return this.emailService.sendEmail(sendEmailDto);
    }

    async confirmEmail(uuid: string) {
        const found = this.uuids.find(id => id == uuid);
        if (found) {
            return true;
        }
        return false; //Link expired
    }


}
