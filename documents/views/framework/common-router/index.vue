<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-12-13 15:32:38
 * @LastEditors: Quarter
 * @Description: 路由组件
 * @FilePath: /simple-ui/documents/views/framework/common-router/index.vue
-->
<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "CommonRouter",
})
export default class CommonRouter extends Vue {}
</script>
