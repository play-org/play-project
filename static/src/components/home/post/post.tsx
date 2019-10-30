import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from 'apis/post';
import moment from 'utils/moment';
import './post.less';

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState<Record<string, any>>({});
  useEffect(() => {
    async function fetchPost() {
      const data = await getPost(parseInt(id));
      setPost(data);
    }
    fetchPost();
  }, []);

  //渲染作者信息
  const renderAuthor = () => (
    <div className="author-info">
      <img className="avatar" src={post.avatar} alt="" />
      <div className="info">
        <div className="author-name">{post.username}</div>
        <div className="extra-info">
          <span style={{ marginRight: '10px' }}>
            {post.create_time && moment(post.create_time)}
          </span>
          <span>阅读 {post.read_num}</span>
        </div>
      </div>
    </div>
  );

  // 渲染文章内容
  return <div className="post">{renderAuthor()}</div>;
}
