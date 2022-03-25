<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-24 15:15:16
 * @Description: 冷却按钮文档
 * @FilePath: /simple-ui/documents/views/Document.vue
-->
<template>
  <div class="cool-button-document">
    <document-page title="冷却按钮 SimpleCoolButton" :code="code"></document-page>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DocumentPage from "documents/components/DocumentPage.vue";

export default Vue.extend({
  components: {
    DocumentPage,
  },
  data() {
    return {
      code: ``, // 示例代码
    };
  },
});
</script>

<style lang="scss" scoped>
</style>