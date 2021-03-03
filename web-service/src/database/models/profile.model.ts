import {
  Column,
  Model,
  Table,
  PrimaryKey,
  BelongsTo,
  ForeignKey,
  BeforeCreate,
  HasOne,
} from 'sequelize-typescript';
import { User } from './user.model';
import { UUIDV4 } from 'sequelize';
import { v4 as uuid } from 'uuid';

export interface IProfile {
  id: string;
  nickname: string;
}

@Table
export class Profile extends Model<Profile> implements IProfile {
  @PrimaryKey
  @Column
  id: string;

  @Column
  @ForeignKey(() => User)
  userId: number;

  @Column
  nickname: string;

  @BeforeCreate
  static setGuid(instance: Profile) {
    instance.id = uuid();
  }

  @BelongsTo(() => User)  
  user: User
}

