import { IProfile } from "src/database/models/profile.model";

export class ProfileDto implements IProfile {
  id: string;
  nickname: string;

  constructor(data) {
    this.id = data.id;
    this.nickname = data.nickname;
  }
}