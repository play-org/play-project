import React, { useState, useRef, useReducer, useCallback, useEffect } from 'react';
import './header.less';
const throttle = (func, delay) => {
  var timer = null;
  var start = Date.now();

  return function(...args) {
    clearTimeout(timer);
    var cur = Date.now();
    if (cur >= start + delay) {
      func.call(this, ...args);
      start = cur;
    } else {
      timer = setTimeout(() => {
        func.call(this, ...args);
      }, delay);
    }
  };
};
const initialState = {
  count: 0,
};

function reducer(state, action) {
  const { count } = state;
  if (action.type === 'tick') {
    return { count: count + 1 };
  } else {
    throw new Error();
  }
}

export default function Header() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const ref = useRef<Function>();
  useEffect(() => {
    ref.current = throttle(() => {
      dispatch({
        type: 'tick',
      });
    }, 2000);
  }, [dispatch]);

  const { count } = state;
  return (
    <header>
      <div>{count}</div>
      <button
        onClick={() => {
          ref.current();
        }}>
        +1
      </button>
    </header>
  );
}
