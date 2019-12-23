import WebSocket from 'ws';

export default function createWs() {
  const wss = new WebSocket.Server({ clientTracking: false, noServer: true });

  wss.on('open', function() {
    console.log(`[SERVER] connected`);
  });

  wss.on('closed', function() {
    console.log(`[SERVER] disconnected`);
  });

  wss.on('connection', async (ws, req) => {
    if ((req as any).session) {
      console.log((req as any).session.userInfo);
    }

    ws.on('message', function(message) {
      console.log(`[SERVER] Received: ${message}`);
      ws.send(`ECHO: ${message}`, err => {
        if (err) {
          console.log(`[SERVER] error: ${err}`);
        }
      });
    });
  });

  return wss;
}
