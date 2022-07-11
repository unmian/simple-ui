<!--
 * @Author: Quarter
 * @Date: 2020-09-29 14:13:32
 * @LastEditors: Quarter
 * @LastEditTime: 2022-06-10 10:22:11
 * @Description: 提示信息文档
 * @FilePath: /simple-ui/documents/views/document/message/index.vue
-->
<template>
  <div class="message-document">
    <document-page title="全局提示 Message">
      <template v-slot:desc>
        <p>这是一个显示消息提示的简易组件。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>type</td>
            <td>否</td>
            <td>CommonType</td>
            <td>否</td>
            <td>info</td>
            <td>info/warning/success/error</td>
            <td>提示信息的类型</td>
          </tr>
          <tr>
            <td>show-icon</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>true</td>
            <td>true/false</td>
            <td>是否显示图标</td>
          </tr>
          <tr>
            <td>show-close</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>true</td>
            <td>true/false</td>
            <td>是否显示关闭按钮</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:event>
        <tbody>
          <tr>
            <td>close</td>
            <td>-</td>
            <td>关闭信息提示框</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <code-example
          name="尺寸大小"
          url="/documents/views/document/message/theme-demo.vue"
        ></code-example>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CodeExample, DocumentPage } from "documents/components";

@Component({
  name: "MessageDocument",
  components: {
    CodeExample,
    DocumentPage,
  },
})
export default class MessageDocument extends Vue {}
</script>

<style lang="scss" scoped>
.message-document {
  .example-list {
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
