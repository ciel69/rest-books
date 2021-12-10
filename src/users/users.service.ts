import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      login: 'john',
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      login: 'maria',
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(login: string): Promise<User | undefined> {
    return this.users.find((user) => user.login === login);
  }
}
