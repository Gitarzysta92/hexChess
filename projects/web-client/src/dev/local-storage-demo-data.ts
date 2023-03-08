import { v4 as uuid } from 'uuid';

export const loadDemoDataToLocalStorage = () => {

  const myProfileKey = 'my-profile';
  const isMyProfileExists = localStorage.getItem(myProfileKey);

  const myProfile = {
    id: uuid(),
    nickname: 'DemoDataAccount',
    avatar: './src/demo-data-account.jpg',
    avatarUrl: './src/demo-data-account.jpg'
  }

  if (!isMyProfileExists) {
    localStorage.setItem(myProfileKey, JSON.stringify(myProfile));
  }
}