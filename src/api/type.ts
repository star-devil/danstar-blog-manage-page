/*
 * @Author: wangqiaoling
 * @Date: 2024-03-06 21:12:36
 * @LastEditTime: 2024-03-06 21:16:18
 * @LastEditors: wangqiaoling
 * @Description: 接口通用类型
 */
export type PageInfo = {
  /** 当前页码 */
  page: number;
  /** 每页显示条数 */
  size: number;
  /** 总条数 */
  totalElements: number;
};
export type User = {
  id: number;
  /** 用户名 */
  username: string;
  /** 昵称 */
  nickname: string;
  createTime: string;
  updateTime: string;
};
