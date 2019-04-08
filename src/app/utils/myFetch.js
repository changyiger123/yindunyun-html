import 'whatwg-fetch';
import { message } from "antd";
import server_host from "../config/apiUrl";//apiUrl地址

export function ajaxApi(url,methodStr,dataStr,callback){
    url = server_host +url;
    let params = {},
    method = methodStr || 'get',
    dataCont = dataStr || {};
    switch (method){
        case 'get':
            url = url + (dataCont ? '?' +formDataCode(dataCont) : '');
            params.method ="GET";
            break;
        case 'post':
            params.method ="POST";
            // params.headers= {};
            params.body = JSON.stringify(dataCont);
            params.headers= {'Content-Type' : "application/json; " +"charset=UTF-8","token":window.localStorage.getItem("access_token")};
            params.mode = 'cors';
            params.credentials = 'include';
    }
    // return fetch(url,params).then(callback).catch(errHandle);
    return fetch(url,params).then(response => response.json())
        .then(responseJSON =>{
            callback(responseJSON)
        })
        .catch(error => message.error('myFetchError:', error)
        );
}

//创建修改参数格式的方法，改成提交的Form Data格式
function formDataCode(data){
    let str = '';
    for(let i in data){
        if(data.hasOwnProperty(i)){
            str = str + i +"=" +data[i] + '&';
        }
    }
    return str ? str.substring(0,str.length - 1) : '';
}

//创建fetch中then方法的回调
//
// function callback(res){
//     return res.json().then( response =>{
//         if(!response){
//             message.error("服务器返回参数错误");
//         }else if(response.errcode == 40001){
//             message.error("token失效，请刷新页面");
//         }else if(response.errcode == -1){
//             return response
//         }
//         return response;
//     })
// }

