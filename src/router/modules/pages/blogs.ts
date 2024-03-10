/*
 * @Author: wangqiaoling
 * @Date: 2024-01-02 10:20:38
 * @LastEditTime: 2024-02-29 20:42:56
 * @LastEditors: wangqiaoling
 * @Description: 博客文章列表菜单
 */
import { ReadOutlined } from "@ant-design/icons-vue";

export default {
  path: "/blogs",
  name: "Blogs",
  component: () => import("@/views/blogs/Index.vue"),
  meta: {
    icon: () => h(ReadOutlined),
    title: "博客列表",
    rank: 2,
    keepAlive: true,
  },
} as RouteConfigsTable;
