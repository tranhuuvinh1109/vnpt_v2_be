import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { SigninDto } from './dto/signin.dto';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    schema: {
      example: {
        email: 'test@example.com',
        password: '123456',
        phone_number: '0123456789',
        name: 'test',
        date_of_birth: '1990-01-01',
        role: 1,
        user_address: '123 Main St',
        parse_id: 'abc123',
        user_type_id: '64d1f2c4e4b0e5f9a1234567',
        station: '64d1f2c4e4b0e5f9a7654321',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
  })
  async signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Public()
  @Post('signin')
  @ApiOperation({ summary: 'Sign in an existing user' })
  @ApiBody({
    schema: {
      example: {
        email: 'test@example.com',
        password: '123456',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully signed in, returns access and refresh tokens',
  })
  async signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto);
  }
}
