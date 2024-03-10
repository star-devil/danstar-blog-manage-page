/*
 * @Author: wangqiaoling
 * @Date: 2024-03-06 21:18:42
 * @LastEditTime: 2024-03-06 21:36:38
 * @LastEditors: wangqiaoling
 * @Description: 用户列表
 */

import { searchBlogList } from "@api/blogs";
import { User } from "@api/type";

export function useBlogList() {
  const columns = [
    {
      title: "标题",
      dataIndex: "title",
    },
    {
      title: "摘要",
      dataIndex: "title",
    },
    {
      title: "作者",
      dataIndex: "id",
    },
  ];

  const data = ref<User[]>([]);
  const searchParam = reactive({
    page: 0,
    size: 10,
  });
  function getBlogList() {
    searchBlogList(searchParam).then((res: any) => {
      data.value = res.data.content;
    });
  }

  return {
    columns,
    data,
    getBlogList,
  };
}
