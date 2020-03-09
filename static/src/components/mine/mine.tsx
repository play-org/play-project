import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import {
  login as loginAction,
  checkLogin as checkLoginAction,
} from 'actions/user';
import './mine.less';

export default function Mine() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState<boolean>(false);
  const userInfo = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(visible);
  useEffect(() => {
    dispatch(checkLoginAction());
  }, [dispatch]);

  const hanleInputUsername = e => {
    setUsername(e.currentTarget.value);
  };

  const handleInputPassword = e => {
    setPassword(e.currentTarget.value);
  };

  return (
    <section className="">
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        打开弹窗
      </Button>
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
        type="button"
        onClick={() => {
          dispatch(loginAction(username, password));
        }}
      >
        登录
      </button>
      <div />
      <button
        type="button"
        onClick={() => {
          history.push('/');
        }}
      >
        回到首页
      </button>
    </section>
  );
}
