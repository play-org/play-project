import React from 'react';
import './indexed-db.less';

export default function IndexedDB() {
  return (
    <div className="indexed-db-wrap">
      <form action="">
        <p>
          <label htmlFor="projectName">
            项目名：
            <input id="projectName" type="text" placeholder="请输入项目名" />
          </label>
        </p>
        <p>
          <label htmlFor="projectType">
            项目类型：
            <select name="" id="projectType">
              <option value="spa">spa</option>
              <option value="ssr">ssr</option>
              <option value="static">static</option>
              <option value="server">server</option>
            </select>
          </label>
        </p>
      </form>
    </div>
  );
}
