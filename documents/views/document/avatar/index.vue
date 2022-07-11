<!--
 * @Author: Quarter
 * @Date: 2020-09-29 08:58:56
 * @LastEditors: Quarter
 * @LastEditTime: 2022-06-08 11:17:52
 * @Description: 头像文档
 * @FilePath: /simple-ui/documents/views/document/avatar/index.vue
-->
<template>
  <div class="avatar-document">
    <document-page title="头像 Avatar">
      <template v-slot:desc>
        <p>这是一个头像组件，用以显示用户头像。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>size</td>
            <td>否</td>
            <td>AvatarSize</td>
            <td>否</td>
            <td>small</td>
            <td>mini/small/medium/large</td>
            <td>头像的尺寸</td>
          </tr>
          <tr>
            <td>url</td>
            <td>是</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>头像图片地址</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:slot>
        <tbody>
          <tr>
            <td>default</td>
            <td>头像文本内容</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <code-example
          name="尺寸大小"
          url="/documents/views/document/avatar/size-demo.vue"
        ></code-example>
        <code-example
          name="文本头像"
          url="/documents/views/document/avatar/letter-demo.vue"
        ></code-example>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CodeExample, DocumentPage } from "documents/components";

@Component({
  components: {
    CodeExample,
    DocumentPage,
  },
})
export default class AvatarDocument extends Vue {}
</script>
