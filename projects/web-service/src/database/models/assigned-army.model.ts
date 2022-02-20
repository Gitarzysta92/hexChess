import {
  Column,
  Model,
  Table,
  PrimaryKey,
  HasMany,
  HasOne,
  AutoIncrement,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { IProfile, Profile } from './profile.model';

export enum ArmyType {
  Borgo = 1,
  Hegemony,
  Outpost
}

export enum AssignedArmyPriority {
  Primary = 1,
  Secondary,
  Tertiary
}

export interface IAssignedArmy {
  id: number;
  profileId: IProfile['id'];
  armyId: ArmyType,
  priority: AssignedArmyPriority
}

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
