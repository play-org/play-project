import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cx from 'classnames';
import './header.less';

type Tag = '/' | '/editor' | '/profile' | '/chat';
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
    path: '/editor',
    text: '编辑器',
  },
  {
    path: '/chat',
    text: '聊天室',
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
            <li className={cx({ active: active === path })} key={path}>
              <Link
                to={path}
                onClick={() => {
                  handleClick(path);
                }}
              >
                {text}
              </Link>
            </li>
          );
        })}
      </ul>
    </header>
  );
}
