<!--
 * @Author: Quarter
 * @Date: 2022-06-10 10:16:26
 * @LastEditors: Quarter
 * @LastEditTime: 2022-12-13 15:32:19
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
import { CommonType, MessageCommand } from "@unmian/simple-ui";

@Component
export default class MessageThemeDemo extends Vue {
  /**
   * @description: 显示全局提示
   * @param {string} theme 主题
   * @return
   */
  showMessage(theme: CommonType = "info"): void {
    MessageCommand({
      theme,
      message: "提示信息",
    });
  }
}
</script>
