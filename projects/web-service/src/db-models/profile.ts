import {
  Column,
  Model,
  Table,
  PrimaryKey,
  BelongsTo,
  ForeignKey,
  BeforeCreate,
  HasMany,
} from 'sequelize-typescript';
import { User } from './user';
import { v4 as uuid } from 'uuid';
import { AssignedArmy } from './assigned-army';
import { IProfile } from 'hexchess-database';


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

  @Column
  avatarUrl: string;

  @BeforeCreate
  static setGuid(instance: Profile) {
    instance.id = uuid();
  }

  @BelongsTo(() => User)  
  user: User

  @HasMany(() => AssignedArmy, {
    foreignKey: 'profileId',
    onDelete: 'CASCADE',
  })
  assignedArmies: AssignedArmy[];
}

