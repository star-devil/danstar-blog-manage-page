<!--
 * @Author: wangqiaoling
 * @Date: 2024-01-19 14:14:17
 * @LastEditTime: 2024-03-02 11:04:27
 * @LastEditors: wangqiaoling
 * @Description: 注册表单
-->
<script setup lang="ts">
import PasswordMeter from "vue-simple-password-meter";
import {
  formState,
  registerLoading,
  registerRules,
  userRegister,
} from "../utils/register";
const emit = defineEmits<{
  changeForm: [type: string];
}>();

const goLogin = () => {
  emit("changeForm", "login");
};

const props = defineProps({
  textColor: {
    type: String,
    default: "",
  },
});

const onRegister = (values: any) => {
  userRegister(values).then((res) => {
    if (res === "success") goLogin();
  });
};
</script>

<template>
  <div class="register-form">
    <a-form
      :model="formState"
      name="basic"
      :wrapper-col="{ span: 24 }"
      autocomplete="off"
      :rules="registerRules"
      @finish="onRegister"
    >
      <a-form-item name="username">
        <a-input
          placeholder="请创建您的账号"
          v-model:value="formState.username"
          allow-clear
        >
          <template #prefix>
            <UserOutlined />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item name="nickname">
        <a-input
          placeholder="请设置您的昵称"
          v-model:value="formState.nickname"
          allow-clear
        >
          <template #prefix>
            <HeartOutlined />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item name="password">
        <a-input-password
          placeholder="请设置您的密码"
          v-model:value="formState.password"
          allow-clear
        >
          <template #prefix>
            <LockOutlined />
          </template>
        </a-input-password>
        <password-meter :password="formState.password" />
        <span class="block w-full text-center">
          <a-typography-text type="secondary"
            >密码格式应为8-18位数字、字母、符号中的任意两种组合</a-typography-text
          >
        </span>
      </a-form-item>

      <a-form-item name="repeatPassword" :wrapper-col="{ span: 24 }">
        <a-input-password
          placeholder="确认密码"
          v-model:value="formState.repeatPassword"
          allow-clear
        >
          <template #prefix>
            <LockOutlined />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 24 }">
        <a-button
          block
          type="primary"
          html-type="submit"
          :loading="registerLoading"
          >注册</a-button
        >
      </a-form-item>
    </a-form>
    <div class="register-guide-box">
      <span class="guide-text">已有账号？</span>
      <a-typography-link class="guide-register" target="" @click="goLogin">
        去登录
      </a-typography-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../utils/poPaswordStyle";

.register-form {
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
