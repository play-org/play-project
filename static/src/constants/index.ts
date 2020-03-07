// 选中态锚点
const ALL_ANCHORS = 'nw n ne e se s sw w';
// 路由列表
const ROUTER_PATH = {
  HOME: '/',
  PROJECT: '/project',
  PROFILE: '/profile',
  POST: '/post',
  EDITOR: '/editor',
  INDEXEDDB: '/indexeddb',
  SVG: '/svg',
  CHAT: '/chat',
};

// tab路由列表
const TAB_ROUTER_MAP = [
  {
    path: ROUTER_PATH.HOME,
    text: '首页',
  },
  {
    path: ROUTER_PATH.PROJECT,
    text: '项目',
  },
  {
    path: ROUTER_PATH.PROFILE,
    text: '个人中心',
  },
];
// 项目路由列表
const PROJECT_ROUTER_MAP = [
  {
    icon: 'icon-db',
    path: ROUTER_PATH.INDEXEDDB,
    text: 'IndexedDB',
    since: '2019-01-01',
  },
  {
    icon: 'icon-bianji',
    path: ROUTER_PATH.EDITOR,
    text: '编辑器',
    since: '2019-01-01',
  },
  {
    icon: 'icon-taolunqu',
    path: ROUTER_PATH.CHAT,
    text: '聊天室',
    since: '2019-01-01',
  },
  {
    icon: 'icon-ceshi',
    path: ROUTER_PATH.SVG,
    text: 'svg测试',
    since: '2019-01-01',
  },
];

export { ALL_ANCHORS, ROUTER_PATH, TAB_ROUTER_MAP, PROJECT_ROUTER_MAP };
