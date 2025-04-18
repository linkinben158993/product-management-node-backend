import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    return await this.usersRepository.save(this.createUser(createUserDto));
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.save(createUserDto);
    console.log('Newly created user', user);
    return user;
  }

  async findAll() {
    const users = await this.usersRepository.find();
    console.log('Found users', users);
    return users;
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    console.log('Found user', user);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const foundUser = await this.findOne(id);
    if (!foundUser) {
      throw new NotFoundException();
    }

    Object.assign(foundUser, updateUserDto);
    console.log(
      'Update found user',
      foundUser,
      'with information',
      updateUserDto,
    );

    return this.usersRepository.save(foundUser);
  }

  async remove(id: string) {
    const foundUser = await this.findOne(id);
    if (!foundUser) {
      throw new NotFoundException();
    }

    console.log('Removing user with id', id);

    return await this.usersRepository.remove(foundUser);
  }

  private createUser(createUserDto: CreateUserDto) {
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password_hash = createUserDto.password_hash;
    user.role = createUserDto.role;

    return user;
  }
}
