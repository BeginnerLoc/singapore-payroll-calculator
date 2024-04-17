import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor() {
        super({
            secretOrKey: 'HELLO',
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate(payload: any) {
        return {
            id: payload.sub,
            name: payload.name
        }
    }
}