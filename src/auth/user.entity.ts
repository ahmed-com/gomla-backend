import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ unique: true })
  username: string;

  @Index({ unique: true })
  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  emailVerified: boolean;

  @Column({ nullable: true })
  avatar: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  oldPasswordHash: string;

  @Column({ nullable: true })
  passwordChangeTime: Date;

  @Column({ type: 'double', default: Date.now() })
  revocationDeadline: number;

  @CreateDateColumn()
  createDate: Date;
}
