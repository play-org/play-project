# build
FROM node:10.16.2-slim

# 工作目录
WORKDIR /usr/app

# 安装pm2，并设置monitor
RUN npm i -g pm2 --registry=https://registry.npm.taobao.org/
ENV PM2_PUBLIC_KEY qml451ofm4amx23
ENV PM2_SECRET_KEY h18qcwrelavfexy
# 安装依赖包
COPY package.json /usr/app/
COPY static/package.json /usr/app/static/
COPY server/package.json /usr/app/server/
RUN npm i --unsafe-perm --registry=https://registry.npm.taobao.org/

# 复制主代码块
COPY . /usr/app
RUN npm run build:static
RUN npm run build:server

# 镜像内的服务使用 3000 端口
EXPOSE 3000
# 传递环境变量
ENV NODE_ENV=production PORT=3000

# 使用pm2-docker启动程序
CMD ["pm2-runtime", "server/dist/bin/www.js"]
