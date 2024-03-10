/*
 * @Author: wangqiaoling
 * @Date: 2024-01-02 10:20:38
 * @LastEditTime: 2024-02-29 20:42:19
 * @LastEditors: wangqiaoling
 * @Description: 用户列表菜单
 */
import { TeamOutlined } from "@ant-design/icons-vue";

export default {
  path: "/user",
  name: "User",
  component: () => import("@/views/user/Index.vue"),
  meta: {
    icon: () => h(TeamOutlined),
    title: "用户列表",
    rank: 1,
    keepAlive: true,
  },
} as RouteConfigsTable;
