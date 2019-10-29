import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cx from 'classnames';
import './header.less';

type Tag = '/' | '/test' | '/profile';
interface IRoutesMap {
  path: Tag;
  text: string;
}

const routesMap: IRoutesMap[] = [
  {
    path: '/',
    text: '首页',
  },
  {
    path: '/test',
    text: '测试',
  },
  {
    path: '/profile',
    text: '个人中心',
  },
];
export default function Header() {
  const { pathname } = useLocation();

  const [active, setActive] = useState(pathname);

  const handleClick = (tagName: Tag) => {
    setActive(tagName);
  };
  return (
    <header className="g-header">
      <ul>
        {routesMap.map(({ path, text }) => {
          return (
            <li
              className={cx({ active: active === path })}
              key={path}
              onClick={() => {
                handleClick(path);
              }}>
              <Link to={path}>{text}</Link>
            </li>
          );
        })}
      </ul>
    </header>
  );
}
