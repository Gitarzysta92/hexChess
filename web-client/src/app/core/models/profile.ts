
export class Profile {
  public name: string;
  public avatar: string;

  constructor(data: Profile) {
    this.name = data.name;
    this.avatar = data.avatar;
  }
}


export class MyProfile extends Profile {
  public selectedArmies: number[];
  constructor(data: MyProfile) {
    super(data);
    this.selectedArmies = data.selectedArmies
  }
}
