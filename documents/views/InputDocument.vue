<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-11 05:28:19
 * @Description: 输入框文档
 * @FilePath: /simple-ui/documents/views/InputDocument.vue
-->
<template>
  <div class="input-document">
    <document-page title="输入框 SimpleInput" :code="code">
      <template v-slot:desc>
        <p>这是一个自定义的输入框组件。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>v-model/value</td>
            <td>否</td>
            <td>SimpleInputValue</td>
            <td>是</td>
            <td>null</td>
            <td>-</td>
            <td>输入框输入的值</td>
          </tr>
          <tr>
            <td>width</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>输入框的宽度</td>
          </tr>
          <tr>
            <td>height</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>输入框的高度</td>
          </tr>
          <tr>
            <td>type</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>text</td>
            <td>text/password</td>
            <td>输入框的类型</td>
          </tr>
          <tr>
            <td>placeholder</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>输入框的提示文字</td>
          </tr>
          <tr>
            <td>maxlength</td>
            <td>否</td>
            <td>Number</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>输入框内容的最大长度</td>
          </tr>
          <tr>
            <td>show-counter</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>true</td>
            <td>true/false</td>
            <td>是否显示计数器</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>否</td>
            <td>boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否禁用</td>
          </tr>
          <tr>
            <td>readonly</td>
            <td>否</td>
            <td>boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否只读</td>
          </tr>
          <tr>
            <td>clearable</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否启用清除按钮</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:slot>
        <tbody>
          <tr>
            <td>prefix</td>
            <td>输入框前缀</td>
          </tr>
          <tr>
            <td>suffix</td>
            <td>输入框后缀</td>
          </tr>
          <tr>
            <td>icon</td>
            <td>输入框图标</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:event>
        <tbody>
          <tr>
            <td>change</td>
            <td>value: SimpleInputValue 输入框内容</td>
            <td>值变化的时候</td>
          </tr>
          <tr>
            <td>focus</td>
            <td>value: SimpleInputValue 输入框内容</td>
            <td>输入框获取焦点</td>
          </tr>
          <tr>
            <td>blur</td>
            <td>value: SimpleInputValue 输入框内容</td>
            <td>输入框失去焦点</td>
          </tr>
          <tr>
            <td>clear</td>
            <td>value: SimpleInputValue 输入框内容</td>
            <td>清除内容</td>
          </tr>
          <tr>
            <td>keyup</td>
            <td>
              event: KeyboardEvent 键盘事件<br />value: SimpleInputValue 输入框内容
            </td>
            <td>键盘弹起</td>
          </tr>
          <tr>
            <td>keydown</td>
            <td>
              event: KeyboardEvent 键盘事件<br />value: SimpleInputValue 输入框内容
            </td>
            <td>键盘按下</td>
          </tr>
          <tr>
            <td>keypress</td>
            <td>
              event: KeyboardEvent 键盘事件<br />value: SimpleInputValue 输入框内容
            </td>
            <td>键盘按下</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list">
          <ul>
            <li><simple-input width="240px"></simple-input></li>
            <li>
              <simple-input
                width="240px"
                placeholder="请输入内容"
              ></simple-input>
            </li>
            <li>
              <simple-input
                width="240px"
                placeholder="有长度限制的输入框"
                :maxlength="20"
              ></simple-input>
            </li>
            <li>
              <simple-input
                width="240px"
                value="可以直接清空的输入框"
                placeholder="请输入内容"
                clearable
              ></simple-input>
            </li>
            <li>
              <simple-input
                width="240px"
                placeholder="禁用的输入框"
                :maxlength="20"
                disabled
              ></simple-input>
            </li>
            <li>
              <simple-input
                width="240px"
                placeholder="只读的输入框"
                :maxlength="20"
                readonly
              ></simple-input>
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
<simple-input width="240px"></simple-input>
<simple-input width="240px" placeholder="请输入内容"></simple-input>
<simple-input width="240px" placeholder="有长度限制的输入框" :maxlength="20"></simple-input>
<simple-input width="240px" value="可以直接清空的输入框" placeholder="请输入内容" clearable></simple-input>
<simple-input width="240px" placeholder="禁用的输入框" :maxlength="20" disabled></simple-input>
<simple-input width="240px" placeholder="只读的输入框" :maxlength="20" readonly></simple-input>
      `,
    };
  },
});
</script>

<style lang="scss" scoped>
.input-document {
  .example-list {
    ul {
      padding: 0;
      list-style: none;
      margin: 0;

      li:nth-of-type(n + 2) {
        margin-top: 20px;
      }
    }
  }
}
</style>