import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  login as loginAction,
  checkLogin as checkLoginAction,
} from 'actions/user';

export default function Main() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const userInfo = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(checkLoginAction());
  }, []);

  const hanleInputUsername = e => {
    setUsername(e.currentTarget.value);
  };

  const handleInputPassword = e => {
    setPassword(e.currentTarget.value);
  };

  return (
    <section className="">
      <div>{userInfo && userInfo.username}</div>

      <input
        placeholder="请输入用户名"
        value={username}
        onChange={hanleInputUsername}
      />
      <input
        placeholder="请输入密码"
        value={password}
        onChange={handleInputPassword}
      />
      <button
        onClick={() => {
          dispatch(loginAction(username, password));
        }}>
        登录
      </button>
      <div></div>
      <button
        onClick={() => {
          history.push('/');
        }}>
        回到首页
      </button>
    </section>
  );
}
