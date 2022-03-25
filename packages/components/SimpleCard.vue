<!--
 * @Author: Quarter
 * @Date: 2020-07-16 08:56:46
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-10 06:27:21
 * @Description: 带阴影的卡片容器
--> 
<template>
  <div class="simple-card">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "SimpleCard",
});
</script>

<style lang="scss">
.simple-card {
  width: 100%;
  box-shadow: 0px 4px 15px 0px rgba(214, 220, 234, 1);
  background-color: #ffffff;
  overflow: hidden;
}
</style>