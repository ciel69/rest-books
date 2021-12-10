import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ required: false })
  userId: number;

  @ApiProperty({ description: 'Имя', required: true })
  username: string;

  @ApiProperty({ description: 'Логин', required: true })
  login?: string;

  @ApiProperty({ description: 'Пароль', required: true })
  password: string;
}
