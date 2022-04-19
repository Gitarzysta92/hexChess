import { IUser } from 'hexchess-database';
import {
  Column,
  Model,
  Table,
  PrimaryKey,
  HasMany,
  HasOne,
  AutoIncrement,
} from 'sequelize-typescript';

import { Profile } from './profile';

@Table
export class User extends Model<User> implements IUser {

  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  role: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @HasOne(() => Profile, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  })
  profile: Profile;
}
