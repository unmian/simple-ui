<!--
 * @Author: Quarter
 * @Date: 2020-07-30 20:26:23
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-10 05:26:01
 * @Description: 路由组件
--> 
<template>
  <router-view></router-view>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "CommonRouter",
});
</script>