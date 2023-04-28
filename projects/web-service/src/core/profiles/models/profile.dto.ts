import { IProfile } from "@hexchess-database/index";

export class ProfileDto implements IProfile {
  id: string;
  accountId: string;
  nickname: string;
  avatarFileName: string;
  selectedArmies: any[];
  languageId: number;

  constructor(data: Partial<ProfileDto> & {assignedArmies?: any[]}) {
    this.id = data.id;
    this.accountId = data.accountId;
    this.nickname = data.nickname;
    this.avatarFileName = data.avatarFileName;
    this.selectedArmies = data.selectedArmies;
    this.languageId = data.languageId;
  }
}