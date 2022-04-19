import { IProfile } from "hexchess-database";


export class ProfileDto implements IProfile {
  id: string;
  userId: number;
  nickname: string;
  avatarUrl: string;
  selectedArmies: any[];


  constructor(data: Partial<ProfileDto> & {assignedArmies?: any[]}) {
    this.id = data.id;
    this.nickname = data.nickname;
    this.avatarUrl = data.avatarUrl;
    this.selectedArmies = data.assignedArmies;
  }
}
