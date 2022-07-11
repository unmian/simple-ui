<!--
 * @Author: Quarter
 * @Date: 2020-09-29 15:32:26
 * @LastEditors: Quarter
 * @LastEditTime: 2022-07-08 14:32:51
 * @Description: 按钮的文档
 * @FilePath: /simple-ui/documents/views/document/button/index.vue
-->
<template>
  <div class="button-document">
    <document-page title="按钮 Button">
      <template v-slot:desc>
        <p>这是一个简单的按钮组件</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>theme</td>
            <td>否</td>
            <td>ButtonTheme</td>
            <td>否</td>
            <td>default</td>
            <td>cancel | default | primary | success | warning | danger</td>
            <td>按钮主题</td>
          </tr>
          <tr>
            <td>variant</td>
            <td>否</td>
            <td>ButtonVariant</td>
            <td>否</td>
            <td>fill</td>
            <td>plain | fill | outline | outline-dashed</td>
            <td>按钮变体</td>
          </tr>
          <tr>
            <td>size</td>
            <td>否</td>
            <td>ButtonSize</td>
            <td>否</td>
            <td>medium</td>
            <td>small | medium | large</td>
            <td>按钮尺寸</td>
          </tr>
          <tr>
            <td>shape</td>
            <td>否</td>
            <td>ButtonShape</td>
            <td>否</td>
            <td>rectangle</td>
            <td>rectangle | square | round | circle</td>
            <td>按钮形状</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true | false</td>
            <td>是否禁用</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:event>
        <tbody>
          <tr>
            <td>click</td>
            <td>event: MouseEvent</td>
            <td>点击事件</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <code-example name="按钮示例" url="/documents/views/document/button/demo.vue"></code-example>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CodeExample, DocumentPage } from "documents/components";

@Component({
  name: "ButtonDocument",
  components: {
    CodeExample,
    DocumentPage,
  },
})
export default class ButtonDocument extends Vue { }
</script>
