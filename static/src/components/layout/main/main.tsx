import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import TestSvg from '../../test-svg/test-svg';
import Profile from '../../profile/profile';
import Home from '../../home/home';
import Post from '../../home/post/post';
import Chat from '../../chat/chat';
import './main.less';

export default function Main() {
  return (
    <main className="g-main">
      <Switch>
        <Route exact={true} path="/">
          <Home />
        </Route>
        <Route path="/test">
          <TestSvg />
        </Route>
        <Route path="/chat">
          <Chat />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/post/:id">
          <Post />
        </Route>
      </Switch>
    </main>
  );
}
