<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-12-13 15:27:34
 * @Description: 滚动条文档
 * @FilePath: /simple-ui/documents/views/document/ScrollDocument.vue
-->
<template>
  <div class="scroll-document">
    <document-page title="滚动条 Scroll" :code="code">
      <template v-slot:desc>
        <p>为了实现各浏览器和操作系统的页面滚动条看起来更加的统一，我们封装了一个滚动条组件。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>full</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否撑开到父容器大小</td>
          </tr>
          <tr>
            <td>show-bar</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>滚动条是否常显</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:method>
        <tbody>
          <tr>
            <td>scroll</td>
            <td>
              top: number 垂直滚动距离
              <br />left: number 水平滚动距离
            </td>
            <td>-</td>
            <td>滚动</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:event>
        <tbody>
          <tr>
            <td>scroll</td>
            <td>event: WheelEvent 滚动事件</td>
            <td>滚动事件</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list" style="height: 100px">
          <s-scroll full>
            <div style="height: 500px; background-color: #f3f3f3">我有500px的高度</div>
          </s-scroll>
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import { DocumentPage } from "documents/components";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "ScrollDocument",
  components: {
    DocumentPage,
  },
})
export default class ScrollDocument extends Vue {
  code = `
<div style="height: 100px;">
  <s-scroll full>
    <div style="height: 500px;background-color: #f3f3f3;">我有500px的高度</div>
  </s-scroll>
</div>
      `; // 示例代码
}
</script>

<style lang="scss" scoped></style>
