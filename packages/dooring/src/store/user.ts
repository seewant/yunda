/*
 * @Description: 用户相关数据
 * @Autor: WangYuan1
 * @Date: 2022-10-08 15:57:45
 * @LastEditors: WangYuan
 * @LastEditTime: 2023-02-08 16:56:07
 */
import { http } from "@/utils/http";
import { ElMessage } from "element-plus";
import { defineStore } from "pinia";
import { useLogin } from "@/components/Login/useLogin";
import {
  setToken,
  getToken,
  removeToken,
  tokenIsExist,
  setUserInfo,
  getUserInfo,
  removeUserInfo,
} from "@design/utils";

interface UserState {
  isLogin: Boolean;
  token: String | null;
  userInfo: Object | null;
}

const { closeLogin } = useLogin();

export const useUserStore = defineStore({
  id: "user-widget",

  state: (): UserState => {
    return {
      isLogin: tokenIsExist(),
      token: getToken(),
      userInfo: getUserInfo(),
    };
  },

  actions: {
    // 登录
    login(form) {
      http.post("/user/login", form).then((res) => {
        if (res.code == "00000") {
          let { token, userInfo } = res.data;

          this.token = token;
          setToken(token);
          this.userInfo = userInfo;
          setUserInfo(userInfo);
          this.isLogin = true;

          ElMessage({
            message: "登录成功！",
            type: "success",
          });

          closeLogin();
        }
      });
    },

    // 注销
    logout() {
      this.token = null;
      this.userInfo = null;
      this.isLogin = false;
      removeToken();
      removeUserInfo();
    },
  },
  persist: true, // true 表示开启持久化保存
});
