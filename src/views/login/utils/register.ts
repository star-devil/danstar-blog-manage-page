/*
 * @Author: wangqiaoling
 * @Date: 2024-01-18 16:21:26
 * @LastEditTime: 2024-03-02 11:00:29
 * @LastEditors: wangqiaoling
 * @Description: 注册账号逻辑
 */
import { postRegister } from "@api/user";
import type { Rule } from "ant-design-vue/es/form";
import message from "ant-design-vue/es/message";
import { validateName, validatePass } from "./rule";

// 登录表单
interface FormState {
  /** 用户名 */
  username: string;
  /** 昵称 */
  nickname: string;
  /** 密码 */
  password: string;
  /** 确认密码 */
  repeatPassword: string;
}

// 注册信息
interface RegisterData {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
  /** 昵称 */
  nickname: string;
}

export const formState = reactive<FormState>({
  username: "",
  nickname: "",
  password: "",
  repeatPassword: "",
});

export const repeatPasswordRule = async (_rule: Rule, value: string) => {
  if (value.trim() === "") {
    return Promise.reject("请输入确认密码");
  } else if (formState.password !== value) {
    return Promise.reject("两次密码不一致");
  } else {
    return Promise.resolve();
  }
};

/** 注册校验 */
export const registerRules: Record<string, Rule[]> = {
  username: [{ validator: validateName, trigger: "blur" }],
  nickname: [{ validator: validateName, trigger: "blur" }],
  password: [{ validator: validatePass, trigger: "blur" }],
  repeatPassword: [
    {
      validator: repeatPasswordRule,
      trigger: "change",
    },
  ],
};
/** 注册按钮loading */
export const registerLoading = ref<boolean>(false);

/** 用户注册 */
export function userRegister(data: RegisterData) {
  return new Promise((resolve, reject) => {
    registerLoading.value = true;
    postRegister(data)
      .then((res) => {
        if (res.code === 200) {
          message.success("注册成功，请登录");
          resolve("success");
        } else {
          reject("error");
        }
      })
      .finally(() => {
        registerLoading.value = false;
      })
      .catch(() => {
        reject("error");
      });
  });
}
