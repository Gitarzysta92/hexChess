import { IArmyBaseData } from "./army";

export interface IArmyAssignment {
  army: IArmyBaseData;
  priority?: number;
  profileId?: string;
}