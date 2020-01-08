import React, { useState, useEffect } from 'react';
import { getPostList } from 'apis/post';
import List, { IPostList } from './list/list';
import Test from './test/test';

export default function Home() {
  const [postList, setPostList] = useState<IPostList>({});
  useEffect(() => {
    async function fetchPost() {
      const data = await getPostList();
      setPostList(data);
    }
    fetchPost();
    return () => {
      setPostList({});
    };
  }, []);
  return (
    <section>
      <Test />
      <List listData={postList} />
    </section>
  );
}
