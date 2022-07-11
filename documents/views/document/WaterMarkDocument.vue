<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-04-12 12:04:35
 * @Description: 媒体预览文档
 * @FilePath: /simple-ui/documents/views/WaterMarkDocument.vue
-->
<template>
  <div class="water-mark-document">
    <document-page title="图片水印 WaterMark" :code="code">
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
          <s-water-mark :src="demoUrl" text="Quarter"></s-water-mark>
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { DocumentPage } from "documents/components";
import demoUrl from "documents/assets/demo.jpg";

@Component({
  name: "WaterMarkDocument",
  components: {
    DocumentPage,
  },
})
export default class WaterMarkDocument extends Vue {
  demoUrl = demoUrl; // 示例图片地址
  code = `
<div>
  <s-water-mark
    :src="require('documents/assets/demo.jpg')"
    text="Quarter"
  ></s-water-mark>
</div>
  `; // 示例代码
}
</script>

<style lang="scss" scoped>
</style>