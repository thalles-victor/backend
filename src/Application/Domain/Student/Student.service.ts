import { Injectable } from '@nestjs/common';

export type User = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class StudentService {
  private readonly users: User[] = [
    {
      userId: 0,
      username: 'jhon',
      password: 'minhasenha123',
    },
    {
      userId: 1,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((_user_) => _user_.username === username);
  }
}
