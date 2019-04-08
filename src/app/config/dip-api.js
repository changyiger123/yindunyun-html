/**
 * 本地开发环境的mock数据
 */
//const server_host = "http://47.96.246.101:8080"; // script/server.js 中配置，代理到http://www.mockhttp.cn
const server_host = "http://10.253.43.106:8080"; // script/server.js 中配置，代理到http://www.mockhttp.cn

const API = {
  ENTRY: {
    MESSAGE: server_host + "/admin"
  },
  HOME: {
    // MESSAGE:
  }
};

export default API;
