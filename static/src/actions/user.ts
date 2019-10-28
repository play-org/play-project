import { Dispatch } from 'react';
import { login as loginApi } from 'apis/user';
import ACTIONS from 'constants/actions';

export function login(username, password) {
  return async (dispatch: Dispatch<any>) => {
    const { data } = await loginApi(username, password);
    dispatch(setUserInfo(data));
  };
}

export function setUserInfo(userInfo) {
  return {
    type: ACTIONS.SET_USER_INFO,
    payload: userInfo,
  };
}
