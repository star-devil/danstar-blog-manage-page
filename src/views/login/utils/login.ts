/*
 * @Author: wangqiaoling
 * @Date: 2024-01-18 16:21:26
 * @LastEditTime: 2024-03-02 14:17:34
 * @LastEditors: wangqiaoling
 * @Description: 登入系统逻辑
 */
import router from "@router";
import { useUserInfo } from "@store/modules/userInfo";
import { getGreeting } from "@utils/greeting";
import { notification } from "ant-design-vue";

// 登录表单
interface FormState {
  /** 用户账号 */
  username: string;
  /** 密码 */
  password: string;
  /** 记住帐号 */
  rememberMe: boolean;
  /** 验证码 */
  verifyCode: string;
}

export const formState = reactive<FormState>({
  username: "",
  password: "",
  rememberMe: true,
  verifyCode: "",
});

export const loginLoading = ref<boolean>(false);

function showNotification(nickname: string) {
  notification.success({
    message: "欢迎登录",
    description: `${nickname}，${getGreeting()}`,
    placement: "topRight",
  });
}

export const onLogin = (values: any) => {
  loginLoading.value = true;
  if (!values) return;
  useUserInfo()
    .loginByUserName(values)
    .then((res) => {
      console.log(res);
      router.replace("/");
      useUserInfo().setUserInfo({
        nickname: res.data.nickname,
        username: res.data.username,
      });
      showNotification(res.data.nickname);
    })
    .catch(() => {
      useUserInfo().removeUserInfo();
    })
    .finally(() => {
      loginLoading.value = false;
    });
};
