/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-11-13 15:39:56
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-09-25 15:54:20
 */
import axios from "axios";
import type {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import Configuration from "../../../../configuration";

const http: AxiosInstance = axios.create({
  baseURL: Configuration.YUNDA_API_PATH,
  timeout: 30000,
});

http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    //给请求头设置token
    // let token = getToken();
    // if (token) {
    //   config.headers!.authorization = token;
    // }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/* 响应拦截器 */
http.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, message, data } = response.data; // 根据自定义错误码判断请求是否成功
    if (code === "00000") {
      // 将组件用的数据返回
      return response.data;
    } else {
      // 处理业务错误。
      return Promise.reject(new Error(message));
    }
  },
  (error: AxiosError) => {
    // 处理 HTTP 网络错误
    let message = "";
    // HTTP 状态码
    const status = error.response?.status;
    switch (status) {
      case 401:
        message = "token失效，请重新登录";
        // 这里可以触发退出的 action
        break;
      case 403:
        message = "没有权限,请获取权限后登录";
        break;
      case 404:
        message = "页面不存在";
        break;
      case 500:
        message = "服务器故障";
        break;
      case 502:
        message = "数据库查询错误";
        break;
      default:
        message = "网络连接错误";
    }
    return Promise.reject(error);
  }
);

export default http;
export { http };
