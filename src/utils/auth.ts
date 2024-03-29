/*
 * @Author: wangqiaoling
 * @Date: 2024-01-29 10:21:57
 * @LastEditTime: 2024-02-01 17:52:41
 * @LastEditors: wangqiaoling
 * @Description: 登入后信息存取操作
 */
import { useUserInfo } from "@store/modules/userInfo";
import { Cookies } from "./reCookies";
import { sessionStorage, storage } from "./reStorage";

export interface DataInfo<T> {
  /** token */
  accessToken: string;
  /** `accessToken`的过期时间（时间戳） */
  expires: T;
  /** 用于调用刷新accessToken的接口时所需的token */
  refreshToken: string;
  /** 用户名 */
  nickname?: string;
  /** 用户帐号 */
  username?: string;
  /** 当前登陆用户的角色 */
  roles?: Array<string>;
}

export const sessionKey = "user-info";
export const TokenKey = "authorized-token";

export function getToken(): DataInfo<number> {
  // 此处与`TokenKey`相同，此写法解决初始化时`Cookies`中不存在`TokenKey`报错
  return Cookies.get(TokenKey)
    ? JSON.parse(Cookies.get(TokenKey))
    : sessionStorage.get(sessionKey);
}

/**
 * @description 设置`token`以及一些必要信息并采用无感刷新`token`方案
 * 无感刷新：后端返回`accessToken`（访问接口使用的`token`）、`refreshToken`（用于调用刷新`accessToken`的接口时所需的`token`，`refreshToken`的过期时间（比如30天）应大于`accessToken`的过期时间（比如2小时））、`expires`（`accessToken`的过期时间）
 * 将`accessToken`、`expires`这两条信息放在key值为authorized-token的cookie里（过期自动销毁）
 * 将`refreshToken`、`expires`这两条信息放在key值为`user-info`的sessionStorage里（浏览器关闭自动销毁）
 */
export function setToken(data: DataInfo<Date>) {
  let expires = 0;
  const { accessToken, refreshToken } = data;
  expires = new Date(data.expires).getTime(); // 如果后端直接设置时间戳，将此处代码改为expires = data.expires，然后把上面的DataInfo<Date>改成DataInfo<number>即可
  const cookieString = JSON.stringify({ accessToken, expires });

  Cookies.set(TokenKey, cookieString, {
    expires: (expires - Date.now()) / 1000,
  });

  function setSessionKey(
    nickname: string,
    username: string,
    roles: Array<string>
  ) {
    useUserInfo().setUserInfo({ name: nickname, count: username });
    useUserInfo().setUserRoles(roles);
    sessionStorage.set(sessionKey, {
      refreshToken,
      expires,
    });
  }

  if (data.nickname && data.roles) {
    const { nickname, username, roles } = data;
    setSessionKey(nickname, username, roles);
  } else {
    const { nickname, username } = storage.get("userInfo");
    const { roles } = storage.get("userRoles");
    setSessionKey(nickname, username, roles);
  }
}

/** 删除`token`以及key值为`user-info`的session信息 */
export function removeToken() {
  Cookies.delete(TokenKey);
  sessionStorage.remove(sessionKey);
}

/** 格式化token（jwt格式） */
export const formatToken = (token: string): string => {
  return "Bearer " + token;
};
