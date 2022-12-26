<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-12-13 15:17:17
 * @Description: 文件选择按钮文档
 * @FilePath: /simple-ui/documents/views/document/FileButtonDocument.vue
-->
<template>
  <div class="file-button-document">
    <document-page title="文件选择 FileButton" :code="code">
      <template v-slot:desc>
        <p>这是一个简易的文件选择按钮。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>v-model/value</td>
            <td>否</td>
            <td>FileValue</td>
            <td>是</td>
            <td>[]</td>
            <td>-</td>
            <td>选择的文件内容</td>
          </tr>
          <tr>
            <td>multiple</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否复选</td>
          </tr>

          <tr>
            <td>fill</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否填充</td>
          </tr>
          <tr>
            <td>outline</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否框线</td>
          </tr>
          <tr>
            <td>round</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否圆角</td>
          </tr>
          <tr>
            <td>size</td>
            <td>否</td>
            <td>CommonSize</td>
            <td>否</td>
            <td>medium</td>
            <td>mini/small/medium/large</td>
            <td>按钮大小</td>
          </tr>
          <tr>
            <td>type</td>
            <td>否</td>
            <td>ButtonType</td>
            <td>否</td>
            <td>空字符串</td>
            <td>cancel/normal/confirm/danger/linear</td>
            <td>按钮类型</td>
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
            <td>tip</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>null</td>
            <td>-</td>
            <td>提示文字</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:slot>
        <tbody>
          <tr>
            <td>operation</td>
            <td>其他操作功能</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:method>
        <tbody>
          <tr>
            <td>clear</td>
            <td>-</td>
            <td>-</td>
            <td>清空当前选中的文件</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:event>
        <tbody>
          <tr>
            <td>change</td>
            <td>value: FileValue 选择的文件内容</td>
            <td>选择变化</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div>
          <s-file-button type="confirm" outline tip="文件大小不得超过10M"></s-file-button>
        </div>
        <div style="margin-top: 30px">
          <s-file-button type="confirm" outline tip="文件大小不得超过10M">
            <template v-slot:operation>
              <s-button type="confirm" fill>上传文件</s-button>
            </template>
          </s-file-button>
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import { DocumentPage } from "documents/components";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "FileButtonDocument",
  components: {
    DocumentPage,
  },
})
export default class FileButtonDocument extends Vue {
  code = `
<div>
  <s-file-button
    type="confirm"
    outline
    tip="文件大小不得超过10M"
  ></s-file-button>
</div>
<div style="margin-top: 30px">
  <s-file-button type="confirm" outline tip="文件大小不得超过10M">
    <template v-slot:operation>
      <s-button type="confirm" fill>上传文件</s-button>
    </template>
  </s-file-button>
</div>
  `; // 示例代码
}
</script>

<style lang="scss" scoped></style>
