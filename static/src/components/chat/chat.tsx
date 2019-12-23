import React from 'react';

export default function Chat() {
  let ws;
  const createWebsocket = () => {
    ws = new WebSocket('ws://local.wyc102989.top:3000/chat');
    ws.onopen = function(evt) {
      console.log('Connection open ...');
      ws.send('Hello Websockets!');
    };

    ws.onmessage = function(evt) {
      console.log(evt.data);
    };

    ws.onclose = function(evt) {
      console.log('Connection closed.');
    };
  };
  const sendMessage = () => {
    ws.send('你好');
  };
  return (
    <div className="chat-wrap">
      <div className="chat-msg-list">chat msg list</div>
      <button onClick={createWebsocket}>建立websocket连接</button>
      <button onClick={sendMessage}>发送消息</button>
    </div>
  );
}
