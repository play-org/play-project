import React from 'react';
import { Link } from 'react-router-dom';
import './header.less';

export default function Header() {
  return (
    <header className="g-header">
      <ul>
        <li>
          <Link to="/">首页</Link>
        </li>
        <li>
          <Link to="/test">测试</Link>
        </li>
        <li>
          <Link to="/profile">个人中心</Link>
        </li>
      </ul>
    </header>
  );
}
