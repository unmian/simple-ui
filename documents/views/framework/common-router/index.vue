<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-03-30 13:45:59
 * @LastEditors: Quarter
 * @Description: 路由组件
 * @FilePath: /simple-ui/documents/components/common-router/index.vue
-->
<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "CommonRouter",
})
export default class CommonRouter extends Vue {
}
</script>