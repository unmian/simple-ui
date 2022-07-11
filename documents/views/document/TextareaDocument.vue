<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-04-12 12:02:32
 * @Description: 文本域文档
 * @FilePath: /simple-ui/documents/views/TextareaDocument.vue
-->
<template>
  <div class="textarea-document">
    <document-page title="文本域 Textarea" :code="code">
      <template v-slot:desc>
        <p>这是一个自定义的文本域组件。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>v-model/value</td>
            <td>否</td>
            <td>InputValue</td>
            <td>是</td>
            <td>null</td>
            <td>-</td>
            <td>文本域输入的值</td>
          </tr>
          <tr>
            <td>width</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>文本域的宽度</td>
          </tr>
          <tr>
            <td>cols</td>
            <td>否</td>
            <td>Number</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>文本域的列数</td>
          </tr>
          <tr>
            <td>rows</td>
            <td>否</td>
            <td>Number</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>文本域的行数</td>
          </tr>
          <tr>
            <td>placeholder</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>文本域的提示文字</td>
          </tr>
          <tr>
            <td>maxlength</td>
            <td>否</td>
            <td>Number</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>文本域内容的最大长度</td>
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
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否禁用</td>
          </tr>
          <tr>
            <td>readonly</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否只读</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:event>
        <tbody>
          <tr>
            <td>change</td>
            <td>value: InputValue 文本域内容</td>
            <td>值变化的时候</td>
          </tr>
          <tr>
            <td>focus</td>
            <td>value: InputValue 文本域内容</td>
            <td>文本域获取焦点</td>
          </tr>
          <tr>
            <td>blur</td>
            <td>value: InputValue 文本域内容</td>
            <td>文本域失去焦点</td>
          </tr>
          <tr>
            <td>keyup</td>
            <td>
              event: KeyboardEvent 键盘事件
              <br />value: InputValue
              文本域内容
            </td>
            <td>键盘弹起</td>
          </tr>
          <tr>
            <td>keydown</td>
            <td>
              event: KeyboardEvent 键盘事件
              <br />value: InputValue
              文本域内容
            </td>
            <td>键盘按下</td>
          </tr>
          <tr>
            <td>keypress</td>
            <td>
              event: KeyboardEvent 键盘事件
              <br />value: InputValue
              文本域内容
            </td>
            <td>键盘按下</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list">
          <ul>
            <li>
              <s-textarea :cols="40" :rows="4"></s-textarea>
            </li>
            <li>
              <s-textarea :cols="40" :rows="4" placeholder="请输入内容"></s-textarea>
            </li>
            <li>
              <s-textarea :cols="40" :rows="4" placeholder="有长度限制的文本域" :maxlength="100"></s-textarea>
            </li>
            <li>
              <s-textarea
                :cols="40"
                :rows="4"
                placeholder="禁用的文本域\n还可以换行"
                :maxlength="100"
                disabled
              ></s-textarea>
            </li>
            <li>
              <s-textarea
                :cols="40"
                :rows="4"
                placeholder="只读的文本域\n还可以换行"
                :maxlength="100"
                readonly
              ></s-textarea>
            </li>
          </ul>
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import { DocumentPage } from "documents/components";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "TextareaDocument",
  components: {
    DocumentPage,
  },
})
export default class TextareaDocument extends Vue {
  code = `
<s-textarea :cols="40" :rows="4"></s-textarea>
<s-textarea :cols="40" :rows="4" placeholder="请输入内容"></s-textarea>
<s-textarea :cols="40" :rows="4" placeholder="有长度限制的文本域" :maxlength="100"></s-textarea>
<s-textarea :cols="40" :rows="4" placeholder="禁用的文本域\\n还可以换行" :maxlength="100" disabled></s-textarea>
<s-textarea :cols="40" :rows="4" placeholder="只读的文本域\\n还可以换行" :maxlength="100" readonly></s-textarea>
  `;
}
</script>

<style lang="scss" scoped>
.textarea-document {
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