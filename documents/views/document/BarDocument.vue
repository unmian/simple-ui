<!--
 * @Author: Quarter
 * @Date: 2020-09-29 11:08:37
 * @LastEditors: Quarter
 * @LastEditTime: 2022-04-12 11:50:46
 * @Description: 进度条文档
 * @FilePath: /simple-ui/documents/views/BarDocument.vue
-->
<template>
  <div class="bar-document">
    <document-page title="进度条 Bar" :code="code">
      <template v-slot:desc>
        <p>这是一个简易的进度条组件。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>v-model/value</td>
            <td>否</td>
            <td>Number</td>
            <td>否</td>
            <td>0</td>
            <td>-</td>
            <td>进度条的值，0-100</td>
          </tr>
          <tr>
            <td>height</td>
            <td>否</td>
            <td>Number</td>
            <td>否</td>
            <td>4</td>
            <td>-</td>
            <td>进度条的高度</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:style>
        <tbody>
          <tr>
            <td>--background-color</td>
            <td>none</td>
            <td>background</td>
            <td>进度条的背景色</td>
          </tr>
          <tr>
            <td>--bar-color</td>
            <td>linear-gradient(to right, #e11864, #fe7c0a)</td>
            <td>background</td>
            <td>进度条的前景色</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list">
          <ul>
            <li>
              <s-bar :value="60" style="--background-color: #e9e9e9"></s-bar>
            </li>
            <li>
              <s-bar :value="40"></s-bar>
            </li>
            <li>
              <s-bar :value="30" :height="8"></s-bar>
            </li>
          </ul>
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { DocumentPage } from "documents/components";

@Component({
  name: "BarDocument",
  components: {
    DocumentPage,
  },
})
export default class BarDocument extends Vue {
  code = `
<s-bar :value="60" style="--background-color: #e9e9e9;"></s-bar>
<s-bar :value="40"></s-bar>
<s-bar :value="30" :height="8"></s-bar>
    `; // 示例代码
}
</script>

<style lang="scss" scoped>
.bar-document {
  .example-list {
    max-width: 280px;

    ul {
      padding: 0;
      list-style: none;
      margin: 0;

      li:nth-of-type(n + 2) {
        margin-top: 12px;
      }
    }
  }
}
</style>