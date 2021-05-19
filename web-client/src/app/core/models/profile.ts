import { AssignedArmy } from "./army";

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

export class MyProfile extends Profile {
  public selectedArmies: number[];
  public languageId: number;
  constructor(data: Partial<MyProfile> = {}) {
    super(data);
    this.selectedArmies = data.selectedArmies;
    this.languageId = data.languageId;
  }

  static forClient(p: MyProfileFromDb): MyProfile {
    const sa = p.selectedArmies.sort((a, b) => a.priority - b.priority).map(sa => sa.armyId);
    return new MyProfile(Object.assign(p, { selectedArmies: sa, languageId: 1 }));
  }

}





export class MyProfileFromDb extends Profile {
  public selectedArmies: AssignedArmy[];
}


