/*
 * @Author: wangqiaoling
 * @Date: 2024-03-02 10:39:43
 * @LastEditTime: 2024-03-06 21:16:41
 * @LastEditors: wangqiaoling
 * @Description: 用户相关接口
 */
import { http } from "@api/axios";
import { PageInfo, User } from "@api/type";

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
export interface UserList {
  message: string;
  data: {
    pageInfo: PageInfo;
    content: User[];
  };
  code: number;
}

/** 登录 */
export const postLogin = (data?: object) => {
  return http.post<UserResult>("/account/login", data);
};

/** 注册/新增用户 */
export const postRegister = (data?: object) => {
  return http.post<RegisterResult>("/account", data);
};

/** 查询账户列表 */
export const searchUserList = (data?: object) => {
  return http.post<UserList>("/account/search", data);
};
