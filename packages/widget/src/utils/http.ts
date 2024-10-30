/*
 * @Description: 全局请求封装
 * @Autor: WangYuan
 * @Date: 2022-01-24 09:29:01
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-09-25 16:50:49
 */
// import Configuration from "../../../../configuration.ts";
// console.log("Configuration", Configuration);

import Configuration from "../configuration/index";

const http = {
  post: (url, data, method = "POST") => {
    console.log("执行");
    return new Promise((resolve, reject) => {
      uni
        .request({
          url: Configuration.YUNDA_API_PATH + url,
          data,
          method: method,
          // header: {
          //   token: token
          // }
        })
        .then((response) => {
          console.log("response.data", response.data);
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default http;
