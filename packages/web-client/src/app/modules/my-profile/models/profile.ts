

export class Profile {
  public id: string;
  public nickname: string;
  public avatar: string;
  public avatarUrl: string;

  constructor(data: Partial<Profile>) {
    this.id = data.id;
    this.nickname = data.nickname;
    this.avatar = data.avatar || data.avatarUrl;
  }
}

// export class MyAvatar {
//   filename
// }

export class MyProfile extends Profile {
  public selectedArmies: number[];
  public languageId: number;
  constructor(data: Partial<MyProfile> = {}) {
    super(data);
    this.selectedArmies = data.selectedArmies;
    this.languageId = data.languageId;
  }
}

