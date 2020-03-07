import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import store from 'store/store';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import Profile from 'components/profile/profile';
import Home from 'components/home/home';
import Editor from 'components/project/editor/editor';
import Post from 'components/home/post/post';
import Chat from 'components/project/chat/chat';
import Project from 'components/project/project';
import Svg from 'components/project/svg/svg';
import IndexedDB from 'components/project/indexed-db/indexed-db';
import { Layout, Menu } from 'antd';
import { TAB_ROUTER_MAP } from 'constants/index';
import './index.less';

const { Header, Content, Footer } = Layout;

function Index() {
  const { pathname } = useLocation();
  const [active, setActive] = useState(pathname);

  const handleClick = path => {
    setActive(path);
  };

  console.log(active);

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[active]}
          style={{ lineHeight: '64px' }}
        >
          {TAB_ROUTER_MAP.map(({ path, text }) => {
            return (
              <Menu.Item key={path} onClick={() => handleClick(path)}>
                <Link to={path}>{text}</Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/post/:id">
              <Post />
            </Route>
            <Route path="/project">
              <Project />
            </Route>
            <Route path="/editor">
              <Editor />
            </Route>
            <Route path="/chat">
              <Chat />
            </Route>
            <Route path="/svg">
              <Svg />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/indexeddb">
              <IndexedDB />
            </Route>
          </Switch>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Wyc Site ©2020 Created by Wyc
      </Footer>
    </Layout>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Index />
    </Router>
  </Provider>,
  document.getElementById('root')
);
