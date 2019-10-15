import React, { useEffect, useState } from 'react';
import './main.less';
import TestSvg from '../../test-svg/test-svg';
import { useSelector, useDispatch, useStore, shallowEqual } from 'react-redux';
import { get, post } from 'utils/request';
export default function Main() {
  const [UserInfo, setUserInfo] = useState({});
  const counter = useSelector((state: any) => state.counter);
  console.log(useStore().getState());
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchUser() {
      const res = await get('http://local.wyc102989.top:3000/api/user', null, {});
      console.log(res.data[0]);
      setUserInfo(res);
    }
    fetchUser();
  }, []);
  return (
    <main className="main">
      main
      <p>{counter}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <TestSvg />
      <button
        onClick={() => {
          async function login() {
            post(
              'http://local.wyc102989.top:3000/api/login',
              { username: 'wyc', password: '123' },
              {}
            );
          }
          login();
        }}>
        登录
      </button>
    </main>
  );
}
