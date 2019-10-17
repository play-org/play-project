import React, { useEffect, useState } from 'react';
import './main.less';
import TestSvg from '../../test-svg/test-svg';
import { useSelector, useDispatch, useStore, shallowEqual } from 'react-redux';
import { get, post } from 'utils/request';
export default function Main() {
  const [UserInfo, setUserInfo] = useState({});
  const counter = useSelector((state: any) => state.counter);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchUser() {
      const res = await get('/api/user', null, {});
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
            const userInfo = await post('/api/login', {
              username: 'wyc',
              password: '123',
            });
            console.log(userInfo);
          }
          login();
        }}>
        登录
      </button>
    </main>
  );
}
