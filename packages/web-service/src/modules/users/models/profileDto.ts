import { IProfile } from 'src/database/models/profile.model';

export class ProfileDto implements IProfile {
  id: string;
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
