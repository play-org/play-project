import React, { useState, useEffect } from 'react';
import { getPostList } from 'apis/post';
import List, { IPostList } from './list/list';
import Cover from './cover/cover';

import './home.less';

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
      <Cover />
      <List listData={postList} />
    </section>
  );
}
