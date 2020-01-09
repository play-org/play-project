import React from 'react';

import './cover.less';

export default function Cover() {
  return (
    <div className="cover">
      <div>
        <img alt="" src={require('./1.jpeg')} />
      </div>
      <div>
        <img alt="" src={require('./2.jpeg')} />
      </div>
      <div>
        <img alt="" src={require('./3.jpeg')} />
      </div>
      <div>
        <img src={require('./4.jpeg')} alt="" />
      </div>
    </div>
  );
}
