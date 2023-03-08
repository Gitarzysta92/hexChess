import { IArmyBaseData } from "./army";

export interface IArmyAssignmentDto {
  army: IArmyBaseData;
  priority?: number;
  profileId?: string;
}