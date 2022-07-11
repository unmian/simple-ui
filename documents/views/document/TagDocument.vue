<!--
 * @Author: Quarter
 * @Date: 2020-09-29 13:37:38
 * @LastEditors: Quarter
 * @LastEditTime: 2022-04-12 12:02:21
 * @Description: 标签文档
 * @FilePath: /simple-ui/documents/views/TagDocument.vue
-->
<template>
  <div class="tag-document">
    <document-page title="标签 Tag" :code="code">
      <template v-slot:desc>
        <p>这是一个简易的标签组件。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>mode</td>
            <td>否</td>
            <td>ThemeMode</td>
            <td>否</td>
            <td>dark</td>
            <td>dark/light</td>
            <td>主题类型</td>
          </tr>
          <tr>
            <td>size</td>
            <td>否</td>
            <td>CommonSize</td>
            <td>否</td>
            <td>small</td>
            <td>mini/small/medium/large</td>
            <td>组件大小</td>
          </tr>
          <tr>
            <td>show-close</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否显示关闭按钮</td>
          </tr>
          <tr>
            <td>external</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否外部控制关闭</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:style>
        <tbody>
          <tr>
            <td>--tag-color</td>
            <td>#f5f5f5/#44d3fc</td>
            <td>color</td>
            <td>指定标签的颜色，mode不生效</td>
          </tr>
          <tr>
            <td>--tag-close-color</td>
            <td>#f5f5f5/#44d3fc</td>
            <td>color</td>
            <td>指定标签的颜色，mode不生效</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:event>
        <tbody>
          <tr>
            <td>close</td>
            <td>-</td>
            <td>关闭标签</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list">
          <ul>
            <li>
              <s-tag mode="light">light标签</s-tag>
            </li>
            <li>
              <s-tag>dark标签</s-tag>
            </li>
            <li>
              <s-tag style="--tag-color: #f5a623">自定义标签</s-tag>
            </li>
            <li>
              <s-tag mode="light" show-close>light标签</s-tag>
            </li>
          </ul>
          <ul style="margin-top: 15px">
            <li>
              <s-tag mode="light" size="mini" show-close>light标签</s-tag>
            </li>
            <li>
              <s-tag mode="light" size="small" show-close>light标签</s-tag>
            </li>
            <li>
              <s-tag mode="light" size="medium" show-close>light标签</s-tag>
            </li>
            <li>
              <s-tag mode="light" size="large" show-close>light标签</s-tag>
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
  name: "TagDocument",
  components: {
    DocumentPage,
  },
})
export default class TagDocument extends Vue {
  code = `
<s-tag mode="light">light标签</s-tag>
<s-tag>dark标签</s-tag>
<s-tag style="--tag-color: #f5a623;">自定义标签</s-tag>
<s-tag mode="light" show-close>light标签</s-tag>
<s-tag mode="light" size="mini" show-close>light标签</s-tag>
<s-tag mode="light" size="small" show-close>light标签</s-tag>
<s-tag mode="light" size="medium" show-close>light标签</s-tag>
<s-tag mode="light" size="large" show-close>light标签</s-tag>
  `;
}
</script>

<style lang="scss" scoped>
.tag-document {
  .example-list {
    ul {
      padding: 0;
      list-style: none;
      display: flex;
      margin: 0;

      li:nth-of-type(n + 2) {
        margin-left: 20px;
      }
    }
  }
}
</style>