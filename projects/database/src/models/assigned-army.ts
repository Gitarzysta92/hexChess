import {
  Column,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { ArmyType } from '../consts/army-type';
import { AssignedArmyPriority } from '../consts/assigned-army-priority';
import { IAssignedArmy } from '../interfaces/i-assigned-army';
import { Profile } from './profile';



@Table
export class AssignedArmy extends Model<AssignedArmy> implements IAssignedArmy {

  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @ForeignKey(() => Profile)
  profileId: string;

  @Column
  armyId: ArmyType;

  @Column
  priority: AssignedArmyPriority;

  @BelongsTo(() => Profile)  
  profile: Profile
}
