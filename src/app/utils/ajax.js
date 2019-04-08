import axios from 'axios';
import Qs from 'qs';
const token =window.localStorage.getItem("access_token");
if(!token){
} else {
}
const axiosInstance = axios.create({
  // baseURL: 'http://47.96.246.101:8080',
  // baseURL: 'http://dun-web.yinmishe.cn',
  baseURL: 'http://60.191.15.146:7774',
  transformRequest:[function (data) {
    // data = Qs.stringify(data);
    data = JSON.stringify(data);
	//console.log(data);
    return data;

  }],
});


// Add a request interceptor
axiosInstance.interceptors.request.use(
  config => {
    config.headers = {
      'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest','token':window.localStorage.getItem("access_token"),'source':'pc'
    } 
    return config;
  },
  req =>
  // Do something before request is sent
    req
  , (error) => {
    // Do something with request error
    Promise.reject(error);
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(

  (response) => {
    if (response.data.code == '800'||response.data.code == '408'||response.data.code == '801'||response.data.code == '802'||response.data.code == '805'||response.data.code == '831') {
      window.localStorage.removeItem("access_token");
      setTimeout(function () {
        window.location.hash="/login";
      },1000)
      // window.location.reload();
    }
    return response.data;
  }
  , (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          window.location.href = error.response.data.url;
          break;
        case 404:
          error.message = '请求错误,未找到该资源';
          break;
        case 500:
          error.message = '服务器端出错';
          break;
        default:
          error.message = `连接错误${error.response.status}`;
      }
      alert(error.message);
    }
    return Promise.reject(error.data); // 返回接口返回的错误信息
  },
);

export default axiosInstance;
