import React, { useEffect, useState } from 'react';
import './main.less';
import TestSvg from '../../test-svg/test-svg';
import { useSelector, useDispatch, useStore, shallowEqual } from 'react-redux';
import Profile from '../../profile/profile';
export default function Main() {
  return (
    <main className="main">
      <Profile />
      <TestSvg />
    </main>
  );
}
