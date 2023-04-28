import { Column, Model, Table, PrimaryKey, BelongsTo, ForeignKey, BeforeCreate, HasMany } from 'sequelize-typescript';
import { Account } from '../../identity/models/account.entity';
import { v4 as uuid } from 'uuid';
import { AssignedArmy } from '../../armies/models/assigned-army.entity';
import { IProfile } from '@hexchess-database/interfaces/profile';

@Table
export class Profile extends Model<Profile> implements IProfile {
  @PrimaryKey
  @Column
  id: string;

  @Column
  @ForeignKey(() => Account)
  accountId: string;

  @Column
  nickname: string;

  @Column
  avatarFileName: string;

  @Column
  languageId: number;

  @BeforeCreate
  static setGuid(instance: Profile) {
    instance.id = uuid();
  }

  @BelongsTo(() => Account)
  account: Account;

  @HasMany(() => AssignedArmy, {
    foreignKey: 'profileId',
    onDelete: 'CASCADE',
  })
  assignedArmies: AssignedArmy[];
}