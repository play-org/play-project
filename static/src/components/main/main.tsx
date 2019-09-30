import React, { useState, CSSProperties, useRef, useEffect, useReducer, useCallback } from 'react';
import './main.less';
import Test from '../test/test';

const throttle = (func, delay) => {
  var timer = null;
  var start = Date.now();

  return function(...args) {
    clearTimeout(timer);
    var cur = Date.now();
    if (cur > start + delay) {
      func.call(this, ...args);
      start = cur;
    } else {
      timer = setTimeout(() => {
        func.call(this, ...args);
      }, delay);
    }
  };
};

export default function Main() {
  const initialState = {
    left: 0,
    top: 0,
  };

  const [state, dispatch] = useReducer(function(state, action) {
    switch (action.type) {
      case 'initClick':
        return {
          left: action.data.left,
          top: action.data.top,
        };
    }
  }, initialState);

  const { left: initLeft, top: initTop } = state;

  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState({ left: 0, top: 0 });

  // 改变位置
  const changePos = useCallback(
    throttle((left, top) => {
      setPos({
        left: left - initLeft,
        top: top - initTop,
      });
    }, 20),
    [dragging]
  );
  const style: CSSProperties = {
    position: 'absolute',
    left: `${pos.left}px`,
    top: `${pos.top}px`,
  };

  // 鼠标按下，设置可拖拽，设置点击点到边界的距离
  const handleMouseDown = e => {
    dispatch({ type: 'initClick', data: { left: e.pageX - pos.left, top: e.pageY - pos.top } });
    setDragging(true);
  };

  // 鼠标移动，节流更新位置
  const handleMouseMove = e => {
    if (dragging) {
      const left = e.pageX;
      const top = e.pageY;
      changePos(left, top);
    }
  };

  // 鼠标抬起，设置不可拖拽
  const handleMouseUp = () => {
    setDragging(false);
  };

  // 鼠标移出也取消dragging标识
  const handleMouseLeave = () => {
    setDragging(false);
  };

  const handleCopy = () => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.setAttribute('value', '听说你想复制我');
    input.select();
    if (document.execCommand('copy')) {
      document.execCommand('copy');
      console.log('复制成功');
    }
    document.body.removeChild(input);
  };
  return (
    <main className="main">
      <div style={{ position: 'relative', marginTop: '50px' }}>
        <div
          style={style}
          className="block"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}>
          节流测试
        </div>
      </div>
      <p>1</p>
      <p>1</p>
      <button onClick={handleCopy}>复制</button>
      <Test />
    </main>
  );
}
