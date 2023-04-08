import { AssignedArmyPriority, IAssignedArmy } from '@hexchess-database/index';
import {
  Column,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Profile } from '../../profiles/models/profile.entity';

@Table
export class AssignedArmy extends Model<AssignedArmy> implements IAssignedArmy {

  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @ForeignKey(() => Profile)
  profileId: string;

  @Column
  armyId: string;

  @Column
  priority: AssignedArmyPriority;

  @BelongsTo(() => Profile)  
  profile: Profile
}