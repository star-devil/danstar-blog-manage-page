<!--
 * @Author: wangqiaoling
 * @Date: 2024-01-19 14:14:17
 * @LastEditTime: 2024-03-19 21:47:15
 * @LastEditors: wangqiaoling
 * @Description: 登录表单
-->
<script setup lang="ts">
import { useUserInfo } from "@store/modules/userInfo";
import type { FormInstance } from "ant-design-vue";
import {
  formState,
  loginLoading,
  onLogin,
  verifyCode,
  verifyCodeInfo,
} from "../utils/login";
import { loginRules } from "../utils/rule";

const emit = defineEmits<{
  changeForm: [type: string];
}>();

const goRegister = () => {
  emit("changeForm", "register");
};

const goResetPassword = () => {
  emit("changeForm", "reset");
};

const props = defineProps({
  textColor: {
    type: String,
    default: "",
  },
});

watchEffect(() => {
  if (!formState.username) {
    useUserInfo().removeUserInfo();
  } else {
    useUserInfo().setUserInfo({ name: "", count: formState.username });
  }
});

const loginFormRef = ref<FormInstance>();
onBeforeUnmount(() => {
  loginFormRef.value.resetFields();
});
onBeforeMount(() => {
  verifyCode();
});
</script>

<template>
  <div class="user-form">
    <a-form
      :model="formState"
      name="loginForm"
      :wrapper-col="{ span: 24 }"
      autocomplete="off"
      ref="loginFormRef"
      :rules="loginRules"
      @finish="onLogin"
    >
      <a-form-item name="username">
        <a-input
          placeholder="账号"
          v-model:value="formState.username"
          allow-clear
        >
          <template #prefix>
            <UserOutlined />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item name="password">
        <a-input-password
          placeholder="密码"
          v-model:value="formState.password"
          allow-clear
        >
          <template #prefix>
            <LockOutlined />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item name="verifyCode" :wrapper-col="{ span: 24 }">
        <a-input-group compact>
          <a-input
            v-model:value="formState.verifyCode"
            placeholder="验证码"
            style="width: calc(100% - 150px)"
            allow-clear
          >
            <template #prefix>
              <VerifiedOutlined />
            </template>
          </a-input>
          <a-image
            :width="150"
            :height="32"
            :src="verifyCodeInfo.img"
            :preview="false"
            @click="verifyCode"
            class="cursor-pointer"
          />
        </a-input-group>
      </a-form-item>

      <a-form-item name="rememberMe" :wrapper-col="{ span: 24 }">
        <a-form-item name="rememberMe" no-style>
          <a-checkbox v-model:checked="formState.rememberMe"
            >7天内免登录
            <a-tooltip placement="right">
              <template #title
                >勾选并登录后，规定天数内无需输入用户名和密码会自动登入系统</template
              >
              <a-typography-text type="secondary"
                ><QuestionCircleOutlined
              /></a-typography-text>
            </a-tooltip>
          </a-checkbox>
        </a-form-item>
        <a class="login-form-forgot" target="" @click="goResetPassword"
          >忘记密码？</a
        >
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 24 }">
        <a-button
          block
          type="primary"
          html-type="submit"
          :loading="loginLoading"
          >登录</a-button
        >
      </a-form-item>
    </a-form>
    <div class="register-guide-box">
      <span class="guide-text">还没有账号？</span>
      <a-typography-link class="guide-register" target="" @click="goRegister">
        去注册
      </a-typography-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-form {
  .login-form-forgot {
    float: right;
  }

  .register-guide-box {
    width: 100%;
    font-size: 12px;
    text-align: center;

    .guide-text {
      color: v-bind("props.textColor");
    }

    .guide-register {
      font-size: 12px;
    }
  }
}
</style>
