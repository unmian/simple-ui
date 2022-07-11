<!--
 * @Author: Quarter
 * @Date: 2022-06-10 10:16:26
 * @LastEditors: Quarter
 * @LastEditTime: 2022-07-05 11:21:16
 * @FilePath: /simple-ui/documents/views/document/message/theme-demo.vue
 * @Description: 主题示例
-->
<template>
  <div>
    <s-button @click="showMessage('info')">普通提示</s-button>
    <s-button @click="showMessage('success')">成功提示</s-button>
    <s-button @click="showMessage('warning')">警告提示</s-button>
    <s-button @click="showMessage('error')">错误提示</s-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ThemeDialog extends Vue {
  /**
   * @description: 显示全局提示
   * @author: Quarter
   * @param {string} theme 主题
   * @return
   */
  showMessage(theme = "info"): void {
    this.$message({
      theme,
      content: "提示信息",
    });
  }
}
</script>
