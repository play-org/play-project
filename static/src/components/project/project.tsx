import React from 'react';

import { Link } from 'react-router-dom';
import { PROJECT_ROUTER_LIST } from 'constants/index';
import cx from 'classnames';
import './project.less';

export default function Project() {
  return (
    <div className="project-wrap">
      <ul className="project-list">
        {PROJECT_ROUTER_LIST.map(({ icon, path, text, since }) => {
          return (
            <Link to={path} key={path}>
              <li key={path} className="project-item">
                <div className={cx('icon', icon)} />
                <div className="project-name">{text}</div>
                <div className="project-date">{since}</div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
