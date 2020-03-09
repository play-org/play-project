import Home from 'components/home/home';
import Post from 'components/home/post/post';
import Project from 'components/project/project';
import Editor from 'components/project/editor/editor';
import Chat from 'components/project/chat/chat';
import Svg from 'components/project/svg/svg';
import IndexedDB from 'components/project/indexed-db/indexed-db';
import Mine from 'components/mine/mine';

interface RouterItem {
  path: string;
  cmp: React.ComponentClass | React.FunctionComponent;
  exact?: boolean;
  icon?: string;
  text?: string;
  since?: string;
}
// tab路由列表
export const TAB_ROUTER_LIST: Array<RouterItem> = [
  {
    path: '/',
    text: '首页',
    cmp: Home,
    exact: true,
  },
  {
    path: '/project',
    text: '项目',
    cmp: Project,
    exact: true,
  },
  {
    path: '/mine',
    text: '我的',
    cmp: Mine,
  },
];

// 其余路由列表
export const EXTRA_ROUTER_LIST: Array<RouterItem> = [
  {
    path: '/post/:id',
    cmp: Post,
  },
];

// project路由列表
export const PROJECT_ROUTER_LIST: Array<RouterItem> = [
  {
    icon: 'icon-db',
    path: '/project/indexed-db',
    text: 'IndexedDB',
    since: '2019-01-01',
    cmp: IndexedDB,
  },
  {
    icon: 'icon-bianji',
    path: '/project/editor',
    text: '编辑器',
    since: '2019-01-01',
    cmp: Editor,
  },
  {
    icon: 'icon-taolunqu',
    path: '/project/chat',
    text: '聊天室',
    since: '2019-01-01',
    cmp: Chat,
  },
  {
    icon: 'icon-ceshi',
    path: '/project/svg',
    text: 'svg测试',
    since: '2019-01-01',
    cmp: Svg,
  },
];
