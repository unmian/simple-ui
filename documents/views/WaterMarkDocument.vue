<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-10 08:10:40
 * @Description: 媒体预览文档
 * @FilePath: /simple-ui/documents/views/WaterMarkDocument.vue
-->
<template>
  <div class="water-mark-document">
    <document-page title="图片水印 SimpleWaterMark" :code="code">
      <template v-slot:desc>
        <p>这是一个简单的显示图片水印的组件。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>src</td>
            <td>是</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>图片路径（不支持@）</td>
          </tr>
          <tr>
            <td>text</td>
            <td>是</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>水印文字</td>
          </tr>
          <tr>
            <td>alt</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>加载失败占位文字</td>
          </tr>
          <tr>
            <td>title</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>悬浮标题</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div>
          <simple-water-mark :src="require('documents/assets/demo.jpg')" text="Quarter"></simple-water-mark>
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
<div>
  <simple-water-mark
    :src="require('documents/assets/demo.jpg')"
    text="Quarter"
  ></simple-water-mark>
</div>
      `,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>