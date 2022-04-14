import { MyProfile } from "src/app/modules/my-profile/models/profile";
import { v4 as uuid } from 'uuid';

export const loadDemoDataToLocalStorage = () => {

  const myProfileKey = 'my-profile';
  const isMyProfileExists = localStorage.getItem(myProfileKey);

  if (!isMyProfileExists) {
    localStorage.setItem(myProfileKey, JSON.stringify(new MyProfile({
      id: uuid(),
      nickname: 'DemoDataAccount',
      avatar: './src/demo-data-account.jpg',
      avatarUrl: './src/demo-data-account.jpg'
    })));
  }
}