import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Логин', required: false })
  login: string;

  @ApiProperty({ description: 'Пароль', required: false })
  password: string;
}
