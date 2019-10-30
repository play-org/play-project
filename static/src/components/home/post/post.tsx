import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from 'apis/post';
import moment from 'utils/moment';
import './post.less';
import { spawn } from 'child_process';

interface IPost {
  id: number;
  // 标题
  title: string;
  // 内容
  content: string;
  // 封面
  cover: string;
  // 标签
  tags: Record<string, any>[];
  // 分类
  categories: Record<string, any>[];
  // 索引
  [key: string]: any;
}

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState<IPost>({
    id: 0,
    title: '',
    content: '',
    cover: '',
    tags: [],
    categories: [],
  });
  // 请求帖子数据
  useEffect(() => {
    async function fetchPost() {
      const data = await getPost(parseInt(id));
      setPost(data);
    }
    fetchPost();
  }, []);

  //渲染作者信息
  const renderAuthor = () => (
    <div className="author-wrapper">
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

  // 渲染文章
  const renderPost = () => (
    <article className="post-wrapper">
      <head className="cover-wrapper">
        <img className="cover" src={post.cover} alt="" />
      </head>
      <h1>{post.title}</h1>
      <section>{post.content}</section>
    </article>
  );

  const renderTags = () => (
    <div className="tag-wrapper">
      {post.tags.map(item => (
        <span className="tag" key={item.id}>
          {item.tag_name}
        </span>
      ))}
    </div>
  );

  // 渲染文章内容
  return (
    <div className="post">
      {renderAuthor()}
      {renderPost()}
      {renderTags()}
    </div>
  );
}
