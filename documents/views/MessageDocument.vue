<!--
 * @Author: Quarter
 * @Date: 2020-09-29 14:13:32
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-10 06:46:00
 * @Description: 提示信息文档
 * @FilePath: /simple-ui/documents/views/MessageDocument.vue
-->
<template>
  <div class="message-document">
    <document-page title="信息提示 SimpleMessage" :code="code">
      <template v-slot:desc>
        <p>这是一个显示消息提示的简易组件。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>type</td>
            <td>否</td>
            <td>SimpleType</td>
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
        <div class="example-list">
          <ul>
            <li>
              <simple-message>这是一个 info 的提示信息</simple-message>
            </li>
            <li>
              <simple-message type="warning">这是一个 warning 的提示信息</simple-message>
            </li>
            <li>
              <simple-message type="success">这是一个 success 的提示信息</simple-message>
            </li>
            <li>
              <simple-message type="error">这是一个 error 的提示信息</simple-message>
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
<simple-message>这是一个 info 的提示信息</simple-message>
<simple-message type="warning">这是一个 warning 的提示信息</simple-message>
<simple-message type="success">这是一个 success 的提示信息</simple-message>
<simple-message type="error">这是一个 error 的提示信息</simple-message>
      `,
    };
  },
});
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