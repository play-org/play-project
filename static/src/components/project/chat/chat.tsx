import React, { useState, useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';

import './chat.less';

// 存储消息列表
const initialState = [];
const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return state.concat(action.payload);
    default:
      return state;
  }
};

// page chat
export default function Chat() {
  const [ws, setWs] = useState();
  const [msg, setMsg] = useState('');
  const userInfo = useSelector((state: any) => state.user);
  const { id } = userInfo;
  const [msgList, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (ws) {
      // 打开websocket连接
      ws.onopen = function() {
        console.log('[STATIC] Connection opened.');
      };
      // 接收消息
      ws.onmessage = function(evt) {
        const msg = evt.data;
        dispatch({
          type: 'add',
          payload: JSON.parse(msg),
        });
      };
      // 关闭连接
      ws.onclose = function() {
        console.log('[STATIC] Connection closed.');
      };
    }
    return () => {
      if (ws) {
        ws.close();
        setWs(null);
      }
    };
  }, [ws]);

  // 创建websocket连接
  const createWebsocket = () => {
    const ws = new WebSocket('ws://local.wyc102989.top:3000/chat');
    setWs(ws);
  };

  const handleInput = e => {
    const msg = e.currentTarget.value;
    setMsg(msg);
  };

  // 发送消息
  const sendMessage = () => {
    ws.send(msg);
    setMsg('');
  };
  return (
    <div className="chat-wrap">
      <div />
      <div className="chat-msg-area">
        {msgList.length > 0 &&
          msgList.map(item => {
            return id === item.id ? (
              <div key={item.id} className="text-right">
                {item.message}:{item.username}
              </div>
            ) : (
              <div key={item.id} className="text-left">
                {item.username}:{item.message}
              </div>
            );
          })}
      </div>
      <button type="button" onClick={createWebsocket}>
        建立websocket连接
      </button>
      <div className="send-msg-area">
        <input type="text" onChange={handleInput} value={msg} />
        <button type="button" onClick={sendMessage}>
          发送消息
        </button>
      </div>
    </div>
  );
}
