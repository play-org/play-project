import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  login as loginAction,
  checkLogin as checkLoginAction,
} from 'actions/user';

// import Modal from '../../../ui/components/Modal/Modal';
import Button from '../../../ui/components/Button/Button';

// import videoSrc from './introduce.mp4';
import './profile.less';

export default function Main() {
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
      {/* <video controls>
        <track kind="subtitles" src="foo.en.vtt" label="English" />
        <source src={videoSrc} />
      </video> */}
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
      <Button>按钮</Button>
      <Button type="primary">按钮</Button>
      <Button type="primary" size="large">
        按钮
      </Button>
      <Button type="primary" size="small">
        按钮
      </Button>
      <Button type="danger">按钮</Button>
      <Button type="success">按钮</Button>
      <Button type="text">按钮</Button>
      <Button type="link" href="http://www.baidu.com">
        按钮
      </Button>
      <Button type="success" shape="circle">
        1
      </Button>
      <Button type="success" shape="round">
        1
      </Button>

      {/* <Modal visible={visible}>
        <Modal.Body>body</Modal.Body>
        <Modal.Footer>footer</Modal.Footer>
      </Modal> */}
    </section>
  );
}
