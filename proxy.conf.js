const PROXY_CONFIG = [
  {
    context: '/api',
    target: 'http://localhost:8080/sysadmapi',
    secure: false,
    logLevel: 'debug',
    pathRewrite: { '^/api': '' }
  },
  {
    context: '/cep',
    target: 'https://viacep.com.br/ws',
    secure: false,
    changeOrigin:true,
    logLevel: 'debug',
    pathRewrite: { '^/cep': '' }
  }
];

module.exports = PROXY_CONFIG;
