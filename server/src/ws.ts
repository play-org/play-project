import WebSocket from 'ws';

export default function createWs() {
  const wss = new WebSocket.Server({ clientTracking: true, noServer: true });

  wss.on('open', function() {
    console.log('[SERVER] connected');
  });

  wss.on('closed', function() {
    console.log('[SERVER] disconnected');
  });

  wss.on('connection', async (ws, req) => {
    if ((req as any).session) {
      const { username, id } = (req as any).session.userInfo;
      // 建立连接发送欢迎
      ws.send(
        JSON.stringify({
          username: '系统',
          message: `welcome ${username}`,
        })
      );
      // 群发消息
      ws.on('message', function(message) {
        wss.clients &&
          wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
              const msg = JSON.stringify({
                message,
                username,
                id,
              });
              client.send(msg, err => {
                if (err) {
                  console.log(`[SERVER] error: ${err}`);
                }
              });
            }
          });
      });
    }
  });

  return wss;
}
