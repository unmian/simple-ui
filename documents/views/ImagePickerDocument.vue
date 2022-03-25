<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-24 15:16:04
 * @Description: 图片选择文档
 * @FilePath: /simple-ui/documents/views/ImagePickerDocument.vue
-->
<template>
  <div class="image-picker-document">
    <document-page title="图片选择 SimpleImagePicker" :code="code">
      <template v-slot:desc>
        <p>这是一个简易的图片选择器组件。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>v-model/value</td>
            <td>否</td>
            <td>SimpleFileValue</td>
            <td>是</td>
            <td>[]</td>
            <td>-</td>
            <td>选择的文件内容</td>
          </tr>
          <tr>
            <td>multiple</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否复选</td>
          </tr>
          <tr>
            <td>tip</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>null</td>
            <td>-</td>
            <td>提示文字</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:method>
        <tbody>
          <tr>
            <td>clear</td>
            <td>-</td>
            <td>-</td>
            <td>清空当前选中的文件</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:event>
        <tbody>
          <tr>
            <td>change</td>
            <td>value: SimpleFileValue 选择的文件内容</td>
            <td>选择变化</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list">
          <simple-image-picker tip="请选择1M以下的图片"></simple-image-picker>
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
<simple-image-picker tip="请选择1M以下的图片"></simple-image-picker>
      `,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>