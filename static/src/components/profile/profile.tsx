import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login as loginAction } from 'actions/user';
import { Component } from 'react';

export default function Main() {
  const userInfo = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <section className="">
      <div>{userInfo && userInfo.username}</div>

      <button
        onClick={() => {
          dispatch(loginAction('wyc', '123'));
        }}>
        登录
      </button>
      <button
        onClick={() => {
          history.push('/');
        }}>
        回到首页
      </button>
    </section>
  );
}
