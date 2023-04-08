
import { IAccount } from '@hexchess-database/index';
import { Column, Model, Table, PrimaryKey, HasOne, AutoIncrement } from 'sequelize-typescript';
import { Profile } from '../../profiles/models/profile.entity';

@Table
export class Account extends Model<Account> implements IAccount {

  @AutoIncrement
  @PrimaryKey
  @Column
  id: string;

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
    foreignKey: 'accountId',
    onDelete: 'CASCADE',
  })
  profile: Profile;
}
