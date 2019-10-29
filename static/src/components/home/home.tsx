import React, { useState, useEffect } from 'react';
import { getPostList } from 'apis/post';
import { post } from 'utils/request';
export default function Home() {
  const [postList, setPostList] = useState<Record<string, any>>({});
  useEffect(() => {
    async function fetchPost() {
      const data = await getPostList();
      setPostList(data);
    }
    fetchPost();
    return () => {
      setPostList([]);
    };
  }, []);
  return (
    <section>
      <h2>共{postList.total}条记录</h2>
      <p>
        {postList.list &&
          postList.list.map(item => {
            return (
              <div key={item.id}>
                <h3>{item.title}</h3>
                <p>- {item.content}</p>
              </div>
            );
          })}
      </p>
    </section>
  );
}
