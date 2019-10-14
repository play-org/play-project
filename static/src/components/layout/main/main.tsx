import React from 'react';
import './main.less';
import TestSvg from '../../test-svg/test-svg';
import { useSelector, useDispatch, useStore, shallowEqual } from 'react-redux';
export default function Main() {
  const counter = useSelector((state: any) => state.counter);
  console.log(counter.counter);
  console.log(useStore().getState());
  const dispatch = useDispatch();

  return (
    <main className="main">
      main
      <p>{counter}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <TestSvg />
    </main>
  );
}
