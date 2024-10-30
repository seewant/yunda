/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2023-01-06 16:33:29
 * @LastEditors: WangYuan
 * @LastEditTime: 2023-01-06 17:33:26
 */
import { ref, watch } from "vue";

let onLogin = ref(false);

function openLogin() {
  onLogin.value = true;
}

function closeLogin() {
  onLogin.value = false;
}

export const useLogin = () => ({
  onLogin,
  openLogin,
  closeLogin,
});
