<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-12-13 15:31:17
 * @Description: 返回顶部文档
 * @FilePath: /simple-ui/documents/views/document/backtop/index.vue
-->
<template>
  <div class="backtop-document">
    <document-page title="返回顶部 Backtop">
      <template v-slot:desc>
        <p>这是一个用以返回顶部的组件</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>target</td>
            <td>否</td>
            <td>Element|Number</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>滚动判定元素</td>
          </tr>
          <tr>
            <td>offset</td>
            <td>否</td>
            <td>Number|String|(Number|String)[]</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>距离底部或者底部/右侧的距离</td>
          </tr>
          <tr>
            <td>size</td>
            <td>否</td>
            <td>BacktopSize</td>
            <td>否</td>
            <td>medium</td>
            <td>small|medium|large</td>
            <td>显示大小</td>
          </tr>
          <tr>
            <td>icon</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>short-up</td>
            <td>-</td>
            <td>按钮图标</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <code-example url="/documents/views/document/backtop/demo.vue"></code-example>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import { CodeExample, DocumentPage } from "documents/components";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "BacktopDocument",
  components: {
    CodeExample,
    DocumentPage,
  },
})
export default class BacktopDocument extends Vue {}
</script>
