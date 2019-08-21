// 弹窗
import React from 'react';

import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';

export default function Popup(props) {
  return ReactDOM.createPortal(props.children, document.body);
}
const overlap = document.createElement('div');
Popup.show = () => {
  ReactDOM.render(<Popup>123</Popup>, overlap);
};
Popup.hide = () => {
  ReactDOM.unmountComponentAtNode(overlap);
};
