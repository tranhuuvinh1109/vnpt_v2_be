import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Public } from 'src/common/decorators/public.decorator';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  @Public()
  async signup(dto: SignupDto) {
    console.log(this.configService.get<string>('ACCESS_TOKEN_SECRET'));
    const { email, password, name } = dto;
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tạo user mới
    const newUser = await this.userModel.create({
      email,
      password: hashedPassword,
      name,
    });

    const payload = { sub: newUser._id, email: newUser.email };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('ACCESS_TOKEN_LIFE') || '1d',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('REFRESH_TOKEN_LIFE') || '30d',
    });

    return {
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }
}
