# build
FROM node:10.16.2-slim

WORKDIR /usr/app
COPY . /usr/app/
RUN npm i --unsafe-perm
RUN npm run build:static
RUN npm run build:server

# 全局安装pm2模块
RUN npm i -g pm2
# 镜像内的服务使用 3000 端口
EXPOSE 3000
# 传递环境变量
ENV NODE_ENV=production PORT=3000

# 使用pm2-docker启动程序
CMD ["pm2-runtime", "server/dist/bin/www.js"]
