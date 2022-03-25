<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-10 06:26:15
 * @Description: 卡片文档
 * @FilePath: /simple-ui/documents/views/CardDocument.vue
-->
<template>
  <div class="card-document">
    <document-page title="卡片 SimpleCard" :code="code">
      <template v-slot:desc>
        <p>一个简单的卡片组件。</p>
      </template>
      <template v-slot:example>
        <div class="example-list">
          <simple-card>
            <div style="height: 300px; padding: 25px; box-sizing: border-box">卡片内容</div>
          </simple-card>
        </div>
      </template>
    </document-page>
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
      code: `
<simple-card>
  <div style="height: 300px;padding: 25px;box-sizing: border-box;">卡片内容</div>
</simple-card>
      `,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>