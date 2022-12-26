<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-12-13 15:17:43
 * @Description: 图片选择文档
 * @FilePath: /simple-ui/documents/views/document/ImageDocument.vue
-->
<template>
  <div class="image-document">
    <document-page title="图片选择 Image" :code="code">
      <template v-slot:desc>
        <p>这是一个简易的图片容器组件。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>src</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>图片路径</td>
          </tr>
          <tr>
            <td>color</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>#535353</td>
            <td>-</td>
            <td>主题颜色</td>
          </tr>
          <tr>
            <td>ratio</td>
            <td>否</td>
            <td>String｜Number</td>
            <td>否</td>
            <td>16/9</td>
            <td>-</td>
            <td>长宽比例</td>
          </tr>
          <tr>
            <td>alt</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>占位文字</td>
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
          <tr>
            <td>fill</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否填充</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div style="width: 320px">
          <s-image></s-image>
        </div>
        <div style="width: 320px; margin-top: 20px">
          <s-image :src="demoUrl"></s-image>
        </div>
        <div style="width: 320px; margin-top: 20px">
          <s-image :src="demoUrl" fill></s-image>
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
  name: "ImageDocument",
  components: {
    DocumentPage,
  },
})
export default class ImageDocument extends Vue {
  demoUrl = demoUrl; // 图片地址
  code = "";
}
</script>

<style lang="scss" scoped></style>
