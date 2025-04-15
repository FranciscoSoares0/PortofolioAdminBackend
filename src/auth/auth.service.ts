import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './schemas/refresh-token.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshToken>,
        private jwtService: JwtService,
    ) {}
        
    async login(loginData: LoginDto){
        
        const { email, password } = loginData;

        //Check if the user exists
        const user = await this.userModel.findOne({ email });
        if(!user)
            throw new BadRequestException('Invalid credentials');

        //Check if the password is correct
        const passwordMatches = await bcrypt.compare(password, user.password);
        if(!passwordMatches)
            throw new BadRequestException('Invalid credentials');

        //Generate a JWT token
        const tokens = await this.generateUserToken(user._id);
        return{
            ...tokens,
            userId: user._id,
        }

    }

    async refreshToken(refreshToken: string) {
        //Check if the refresh token is valid
        const token = await this.refreshTokenModel.findOne({ 
            token: refreshToken,
            expiresAt: { $gte: new Date() }, // Check if the token is not expired
        });

        if(!token)
            throw new UnauthorizedException();

        //Check if the refresh token is expired
        const now = new Date();
        if(token.expiresAt < now)
            throw new BadRequestException('Refresh token expired');

        //Generate a new access token and refresh token
        return this.generateUserToken(token.userId);
    }

    async generateUserToken(userId){
        const accessToken = this.jwtService.sign({ userId });
        const refreshToken = uuidv4();
        await this.storeRefreshToken(refreshToken, userId);
        return{
            accessToken,
            refreshToken,
        };
    }

    async storeRefreshToken(token: string, userId) {
        //Calculate the expiry date for the refresh token
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // Set expiry date to 7 days from now
        await this.refreshTokenModel.updateOne({userId}, {$set: {expiresAt}},{
            upsert: true, // Create a new document if it doesn't exist
        })
    }
}
