import { ArmyType, AssignedArmyPriority, IAssignedArmy } from 'hexchess-database';
import {
  Column,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
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