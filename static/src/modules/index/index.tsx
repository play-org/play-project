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

import { Layout, Menu } from 'antd';
import {
  TAB_ROUTER_LIST,
  EXTRA_ROUTER_LIST,
  PROJECT_ROUTER_LIST,
} from 'constants/index';
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
        <div className="logo">wyc</div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[active]}
          style={{ lineHeight: '64px' }}
        >
          {TAB_ROUTER_LIST.map(({ path, text }) => {
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
            {[
              ...TAB_ROUTER_LIST,
              ...EXTRA_ROUTER_LIST,
              ...PROJECT_ROUTER_LIST,
            ].map(({ path, cmp: Cmp, exact }) => {
              return (
                <Route key={path} path={path} exact={exact} component={Cmp} />
              );
            })}
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
