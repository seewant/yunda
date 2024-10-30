<!--
 * @Description: 登录
 * @Autor: WangYuan1
 * @Date: 2022-11-15 15:18:15
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-23 15:52:50
-->
<template>
  <el-dialog v-model="onLogin" width="40%">
    <div class="flex">
      <div class="flex-1 p36 pl42 pr42">
        <!-- 登录 -->
        <template v-if="operation == 'login'">
          <h2 class="mb-16 text-24 font-600 c-#252525">账号登录</h2>
          <div class="mb-36 c-#cdcdcd">登录开启新世界</div>
          <el-form
            ref="ruleFormRef"
            :model="loginForm"
            label-width="120px"
            label-position="top"
            status-icon
          >
            <el-form-item
              label="账户"
              prop="account"
              :rules="{
                required: true,
                message: '请输入账户',
              }"
            >
              <input v-model="loginForm.account" placeholder="请输入账户" />
            </el-form-item>
            <el-form-item
              label="密码"
              prop="password"
              :rules="{
                required: true,
                message: '请输入密码',
              }"
            >
              <input
                v-model="loginForm.password"
                placeholder="请输入密码"
                type="password"
              />
            </el-form-item>
          </el-form>
          <div class="flex-center mt-100">
            <button class="submit-btn important-w-full" @click="loginHandle">
              登录
            </button>
          </div>
          <div class="mt-20">
            <span class="mr-6px">还没有账号?</span>
            <span class="c-theme font-600 cursor-pointer" @click="toRegister"
              >前往注册</span
            >
          </div>
        </template>
        <!-- 注册 -->
        <template v-if="operation == 'register'">
          <h2 class="mb-16 text-24 font-600 c-#252525">注册新账号</h2>
          <div class="mb-36 c-#cdcdcd">快来注册新账号体验吧！</div>
          <el-form
            ref="registerFormRef"
            :model="registerForm"
            label-width="120px"
            label-position="top"
            status-icon
          >
            <el-form-item
              label="账户"
              prop="account"
              :rules="{
                required: true,
                message: '请输入账户',
              }"
            >
              <input v-model="registerForm.account" placeholder="请输入账户" />
            </el-form-item>
            <el-form-item
              label="密码"
              prop="password"
              :rules="{
                required: true,
                message: '请输入密码',
              }"
            >
              <input
                v-model="registerForm.password"
                placeholder="请输入密码"
                type="password"
              />
            </el-form-item>
            <el-form-item
              label="验证码"
              prop="code"
              :rules="{
                required: true,
                message: '请输入验证码',
              }"
            >
              <input
                v-model="registerForm.code"
                placeholder="关注公众号获取验证码"
              />
            </el-form-item>
            <el-form-item
              label="用户名"
              prop="userName"
              :rules="{
                required: true,
                message: '请输入用户名',
              }"
            >
              <input
                v-model="registerForm.userName"
                placeholder="请输入用户名"
              />
            </el-form-item>
            <el-form-item
              label="头像"
              prop="avatar"
              :rules="{
                required: true,
                message: '请选择头像',
              }"
            >
              <AvatarCenter v-model="registerForm.avatar" />
            </el-form-item>
          </el-form>
          <div class="flex-center mt-30">
            <button
              class="submit-btn important-w-full"
              @click="register(registerFormRef)"
            >
              注册
            </button>
          </div>
          <div class="mt-20">
            <span class="mr-6px">已有账号?</span>
            <span class="c-theme font-600 cursor-pointer" @click="toLogin"
              >去登陆</span
            >
          </div>
        </template>

        <!-- <div class="anel-right-agreement p10 text-12 c-#9da3ac bg-#f8fafb">
          登录即视为同意 用户服务协议、 隐私政策和
          授权许可协议。如果您成为稿定设计会员，成为会员即视为同意 会员服务协议
        </div> -->
      </div>
      <div class="w-50%">
        <img
          v-if="operation == 'login'"
          class="w-full h-full"
          src="https://static.mastergo.com/static/img/teamInfo-light.968aae84.jpeg"
        />
        <div
          v-else
          class="flex flex-col items-center w-full h-full pt-40 pr-60"
        >
          <div class="mt-150 text-20 font-600">云搭公众号</div>
          <div class="mt-20 c-#bfbfbf">未注册的用户扫码获取验证码</div>
          <img class="mt-25 w-230" src="../../assets/yunda-qr.jpg" />
          <!-- <div class="register"></div> -->
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { http } from "@/utils/http";
import { ref, toRefs, reactive, watch } from "vue";
import { useUserStore } from "@/store/user";
import { ElMessage } from "element-plus";
import { useLogin } from "./useLogin.ts";
import AvatarCenter from "./AvatarCenter.vue";

class loginFormState {
  account = "";
  password = "";
}

class registerFormState {
  account = "";
  password = "";
  userName = "";
  code = "";
  avatar = "";
}

const registerFormRef = ref<FormInstance>();

const { onLogin } = toRefs(useLogin());
const { login } = useUserStore();

let operation = ref("login");
let loginForm = ref(new loginFormState());
let registerForm = ref(new registerFormState());

function toRegister() {
  operation.value = "register";
  reset();
}

function toLogin() {
  operation.value = "login";
  reset();
}

// 登录
function loginHandle() {
  if (!verify(loginForm.value)) return;

  login(loginForm.value);
}

// 注册
async function register(formEl: FormInstance | undefined) {
  if (!verify(registerForm.value)) return;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      http.post("/user/register", registerForm.value).then((res) => {
        if (res.code == "00000") {
          ElMessage({
            message: "用户注册成功！",
            type: "success",
          });
          toLogin();
        }
      });
    } else {
      console.log("error submit!", fields);
    }
  });
}

// 校验表单
function verify(form) {
  // 必输
  // if (!form.account || !form.password) {
  //   ElMessage({
  //     message: "账户或密码不能为空！",
  //     type: "warning",
  //   });
  //   return false;
  // }

  // 特殊字符
  const specialReg = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
  );
  if (specialReg.test(form.account) || specialReg.test(form.password)) {
    ElMessage({
      message: "账户或密码不允许包含特殊字符！",
      type: "warning",
    });
    return false;
  }

  // 密码长度
  if (form.password.length < 6 || form.password.length > 30) {
    ElMessage({
      message: "密码长度必须在6-30位！",
      type: "warning",
    });
    return false;
  }

  return true;
}

// 注册表单单独校验
function verifyRegister(form) {
  // 必输
  if (!form.userName) {
    ElMessage({
      message: "用户名称不能为空！",
      type: "warning",
    });
    return false;
  }

  return true;
}

// 重置表单
function reset() {
  loginForm.value = new loginFormState();
  registerForm.value = new registerFormState();
}
</script>

<style scoped lang="scss">
.register {
  width: 100%;
  height: 100%;
  margin: 10px;
  border-radius: 10px;
  background: linear-gradient(358.31deg, #fff -24.13%, #fff0 338.58%),
    linear-gradient(
      89.84deg,
      #e624ae26 0.34%,
      #5e3aff26 16.96%,
      #0a88ff26 34.66%,
      #4bbf5026 50.12%,
      #89ce0026 66.22%,
      #efb70026 82%,
      #f6490026 99.9%
    );
}
</style>
