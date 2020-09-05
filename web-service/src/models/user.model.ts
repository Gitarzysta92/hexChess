import { Column, Model, Table, PrimaryKey } from 'sequelize-typescript';
import { DateDataTypeConstructor, DateDataType } from 'sequelize/types';

@Table
export class User extends Model<User> {
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
}