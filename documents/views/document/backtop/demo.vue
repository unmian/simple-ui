<!--
 * @Author: Quarter
 * @Date: 2022-05-23 06:31:53
 * @LastEditTime: 2022-07-07 19:30:07
 * @LastEditors: Quarter
 * @Description: 示例代码
 * @FilePath: /simple-ui/documents/views/document/backtop/demo.vue
-->
<template>
  <div style="height: 500px">
    <s-scroll full show-bar>
      <s-backtop></s-backtop>
      <div style="height: 1000px; background-color: #f9f9f9">1000px高的内容</div>
    </s-scroll>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Demo extends Vue { }
</script>
