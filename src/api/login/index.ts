/*
 * @Author: wangqiaoling
 * @Date: 2024-03-11 22:29:51
 * @LastEditTime: 2024-03-11 22:33:57
 * @LastEditors: wangqiaoling
 * @Description:
 */
import { http } from "@api/axios";

/** 登录 */
export const postLogin = (data?: object) => {
  return http.post<UserResult>("/account/login", data);
};

/** 注册/新增用户 */
export const postRegister = (data?: object) => {
  return http.post<RegisterResult>("/account", data);
};

/** 退出登录 */
export const postLogout = () => {
  return http.post<RegisterResult>("/account/logout");
};

export type UserResult = {
  message: string;
  data: {
    /** 用户名 */
    nickname: string;
    /** 用户帐号 */
    username: string;
    /** 当前登陆用户的角色 */
    roles: Array<string>;
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
    /** `refreshToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    refreshExpireTime: Date;
  };
  code: number;
};
export interface RegisterResult {
  message: string;
  data: object;
  code: number;
}
