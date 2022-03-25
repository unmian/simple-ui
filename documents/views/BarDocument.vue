<!--
 * @Author: Quarter
 * @Date: 2020-09-29 11:08:37
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-10 05:58:33
 * @Description: 柱状图
 * @FilePath: /simple-ui/documents/views/BarDocument.vue
-->
<template>
  <div class="bar-document">
    <document-page title="进度条 SimpleBar" :code="code">
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
              <simple-bar :value="60" style="--background-color: #e9e9e9"></simple-bar>
            </li>
            <li>
              <simple-bar :value="40"></simple-bar>
            </li>
            <li>
              <simple-bar :value="30" :height="8"></simple-bar>
            </li>
          </ul>
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
<simple-bar :value="60" style="--background-color: #e9e9e9;"></simple-bar>
<simple-bar :value="40"></simple-bar>
<simple-bar :value="30" :height="8"></simple-bar>
      `,
    };
  },
});
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