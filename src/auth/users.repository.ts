import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(username, passwordHash, email): Promise<User> {
    let user = this.create({
      username,
      passwordHash,
      email,
      emailVerified: false,
    });
    try {
      user = await this.save(user);
    } catch (err) {
        // TODO: handle database in a seperate folder that exposes database neutral interface
      if (err.errno === 1062){ // the dublicate key error in mysql
        throw new ConflictException('Username already exists!'); 
      }else{
          throw new InternalServerErrorException()
      }
        
    }

    return user;
  }
}
