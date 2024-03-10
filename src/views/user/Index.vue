<!--
 * @Author: wangqiaoling
 * @Date: 2024-01-02 10:20:08
 * @LastEditTime: 2024-03-06 21:27:04
 * @LastEditors: wangqiaoling
 * @Description: 用户列表页面
-->
<script setup lang="ts">
import { colorBgWrapper } from "@/layout/theme/getTokenStore";
import { useUserList } from "./useUserList";

const bgColor = ref<string>("");
watchEffect(() => {
  bgColor.value = colorBgWrapper();
});

const { getUserList, columns, data } = useUserList();

onMounted(() => {
  getUserList();
});
</script>

<template>
  <div class="content-wrap" :style="{ backgroundColor: bgColor }">
    <a-table
      :columns="columns"
      :data-source="data"
      :style="{ backgroundColor: 'unset' }"
      size="middle"
    >
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">
          <a>{{ text }}</a>
        </template>
      </template>
      <template #title>
        <span class="table-head-title">danstar注册用户</span>
      </template>
    </a-table>
  </div>
</template>

<style lang="scss" scoped></style>
