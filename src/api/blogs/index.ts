/*
 * @Author: wangqiaoling
 * @Date: 2024-03-06 21:32:29
 * @LastEditTime: 2024-03-06 21:34:24
 * @LastEditors: wangqiaoling
 * @Description:
 */
import { http } from "@api/axios";
import { PageInfo } from "@api/type";

export interface BlogList {
  message: string;
  data: {
    pageInfo: PageInfo;
    content: Blog[];
  };
  code: number;
}
export interface Blog {
  id: number;
  title: string;
  createTime: string;
  updateTime: string;
}

/** 查询博客文章列表 */
export const searchBlogList = (data?: object) => {
  return http.post<BlogList>("/blog-post/search", data);
};
