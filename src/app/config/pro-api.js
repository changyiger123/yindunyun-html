/**
 * 线上环境
 */
// const server_host = "http:192.168.10.224:81";
const server_host = "http://47.96.246.101:8080";
//const server_host = "http:192.168.10.224:81";

const API = {
  ENTRY: {
    // MESSAGE: "./../../../json/mock.json"
    MESSAGE: server_host + "/admin"
  },
  HOME: {
    // MESSAGE:
  }
};

export default API;
