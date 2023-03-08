import { IProfileDto } from "../../profiles/api";

export interface IOponentProfileDto extends IProfileDto {
  isConfirmed: boolean
  armyId: string;
}