import React, {
  useState,
  useRef,
  useReducer,
  useCallback,
  useEffect,
} from 'react';
import './header.less';

export default function Header() {
  return (
    <header className="g-header">
      <ul>
        <li>首页</li>
        <li>测试1</li>
        <li>测试2</li>
      </ul>
    </header>
  );
}
