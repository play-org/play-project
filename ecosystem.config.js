module.exports = [
  {
    script: 'server/dist/bin/www.js',
    name: 'play=project',
    exec_mode: 'cluster',
    instances: 2,
    env: {
      RUNTIME_ENV: 'prod',
    },
  },
];
