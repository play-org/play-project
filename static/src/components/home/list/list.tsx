import React from 'react';
import { Link } from 'react-router-dom';
import './list.less';

export interface IPostList {
  list?: Record<string, any>[];
  total?: number;
}

interface ListProps {
  listData: IPostList;
}

export default function List(props: ListProps) {
  const { list, total } = props.listData;
  return (
    <div className="post-list">
      {list &&
        list.map(item => {
          return (
            <div className="post-item" key={item.id}>
              <Link to={`/post/${item.id}`}>
                <h2>{item.title}</h2>
                <div className="opt-bar">
                  <span className="opt-item">
                    <i className="iconfont icon-dianzan" />
                    {item.like_num}
                  </span>
                  <span className="opt-item">
                    <i className="iconfont icon-pinglun" />
                    {item.comment_num}
                  </span>
                </div>
              </Link>
            </div>
          );
        })}
    </div>
  );
}
