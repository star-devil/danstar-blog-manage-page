/*
 * @Author: wangqiaoling
 * @Date: 2024-03-02 10:39:43
 * @LastEditTime: 2024-03-11 22:32:17
 * @LastEditors: wangqiaoling
 * @Description: 用户相关接口
 */
import { http } from "@api/axios";
import { PageInfo, User } from "@api/type";

export interface UserList {
  message: string;
  data: {
    pageInfo: PageInfo;
    content: User[];
  };
  code: number;
}

/** 查询账户列表 */
export const searchUserList = (data?: object) => {
  return http.post<UserList>("/account/search", data);
};
