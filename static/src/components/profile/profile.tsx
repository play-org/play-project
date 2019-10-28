import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, useStore, shallowEqual } from 'react-redux';
import { login as loginAction } from 'actions/user';
export default function Main() {
  const userInfo = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  return (
    <section className="">
      <div>{userInfo && userInfo.username}</div>
      <button
        onClick={() => {
          dispatch(loginAction('wyc', '123'));
        }}>
        登录
      </button>
    </section>
  );
}
