/*
 * @Author: wangqiaoling
 * @Date: 2024-03-06 21:18:42
 * @LastEditTime: 2024-03-06 21:28:45
 * @LastEditors: wangqiaoling
 * @Description: 用户列表
 */

import { User } from "@api/type";
import { searchUserList } from "@api/user";

export function useUserList() {
  const columns = [
    {
      title: "账号",
      dataIndex: "username",
    },
    {
      title: "昵称",
      dataIndex: "nickname",
    },
    {
      title: "发布博客数",
      dataIndex: "id",
    },
  ];

  const data = ref<User[]>([]);
  const searchParam = reactive({
    page: 0,
    size: 10,
  });
  function getUserList() {
    searchUserList(searchParam).then((res: any) => {
      data.value = res.data.content;
    });
  }

  return {
    columns,
    data,
    getUserList,
  };
}
