import { Column, Model, Table, PrimaryKey, HasMany, HasOne } from 'sequelize-typescript';
import { Profile } from './profile.model';

export interface IUser {
  id: number;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}


@Table
export class User extends Model<User> implements IUser {
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
    onDelete: 'CASCADE' 
  })
  profile: Profile;

}

