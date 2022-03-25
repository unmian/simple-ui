<!--
 * @Author: Quarter
 * @Date: 2020-07-15 15:50:28
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-10 06:06:11
 * @Description: 简易标签
--> 
<template>
  <div class="simple-desc">
    <div class="desc-name">{{ name }}</div>
    <div class="desc-value">{{ value }}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "SimpleDesc",
  props: {
    name: { // 描述的名称
      type: String,
      default: "",
    },
    value: [String, Number], // 描述的内容
  },
});
</script>

<style lang="scss">
.simple-desc {
  font-size: 12px;
  line-height: 20px;
  display: inline-flex;
  align-items: center;

  .desc-name {
    color: #999999;
  }

  .desc-value {
    color: var(--desc-color, #29cb97);
    margin-left: 10px;
  }

  &:not(:first-child) {
    margin-left: 20px;
  }
}
</style>