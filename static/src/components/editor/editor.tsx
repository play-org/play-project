import React, { useState } from 'react';
import Draggable from './draggable';

import './editor.less';

export default function Editor() {
  const [posStyle, setPosStyle] = useState({
    left: 0,
    top: 0,
  });
  const handleDragging = data => {
    const { offsetX, offsetY } = data;
    setPosStyle({
      left: posStyle.left + offsetX,
      top: posStyle.top + offsetY,
    });
  };

  return (
    <main className="editor">
      <div style={{ position: 'relative', marginTop: '50px' }}>
        <Draggable
          onDragging={handleDragging}
          onDragEnd={data => {
            console.log('dragend', data);
          }}
        >
          <div style={posStyle} className="block">
            拖动测试
          </div>
        </Draggable>
      </div>
    </main>
  );
}
