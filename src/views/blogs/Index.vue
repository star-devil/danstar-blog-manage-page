<!--
 * @Author: wangqiaoling
 * @Date: 2024-02-29 20:25:01
 * @LastEditTime: 2024-03-06 21:37:14
 * @LastEditors: wangqiaoling
 * @Description: 博客列表页面
-->
<script setup lang="ts">
import { colorBgWrapper } from "@/layout/theme/getTokenStore";
import { useBlogList } from "./useBlogList";

const bgColor = ref<string>("");
watchEffect(() => {
  bgColor.value = colorBgWrapper();
});

const { getBlogList, columns, data } = useBlogList();
onMounted(() => {
  getBlogList();
});
</script>

<template>
  <div class="content-wrap" :style="{ backgroundColor: bgColor }">
    <a-table
      :style="{ backgroundColor: 'unset' }"
      :columns="columns"
      :data-source="data"
      size="middle"
    >
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'id'">
          <a>{{ text }}</a>
        </template>
      </template>
      <template #title>
        <span class="table-head-title">danstar现有博文</span>
      </template>
    </a-table>
  </div>
</template>

<style lang="scss" scoped></style>
