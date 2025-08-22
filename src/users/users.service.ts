import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  async getUserProfile(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      if (decoded?.email) {
        const userData = await this.userModel
          .findOne({ email: decoded?.email })
          .select('-password')
          .lean();

        if (!userData) {
          throw new UnauthorizedException('User not found');
        }

        return {
          message: 'User profile fetched successfully',
          user: userData,
        };
      }
      throw new UnauthorizedException('Invalid or expired token');
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
