import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(login);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const isValidUser = await this.validateUser(user.login, user.password);
    if (!isValidUser) {
      throw new HttpException(
        'Неверный логин или пароль',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const payload = { login: user.login, password: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
