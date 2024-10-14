import {atom} from 'recoil';

const loginState = atom({
    key: 'isLoggedIn',
    default: false,
});

const toastsState = atom({
    key: 'toasts',
    default: [],
})

export {loginState, toastsState};
