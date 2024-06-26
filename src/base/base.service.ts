import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BaseService {
    private readonly saltRounds = 10;

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    async comparePasswords(password: string, storedHash: string): Promise<boolean> {
        return bcrypt.compare(password, storedHash);
    }
}
