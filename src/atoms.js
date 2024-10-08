import { atom } from 'recoil';

const loginState = atom({
  key: 'isLoggedIn',
  default: false,
});

export { loginState };
