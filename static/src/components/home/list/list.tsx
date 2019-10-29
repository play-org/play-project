import React from 'react';
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
    <div>
      {list &&
        list.map(item => {
          return (
            <div key={item.id}>
              <h2>{item.title}</h2>
              <p>> {item.content}</p>
            </div>
          );
        })}
    </div>
  );
}
