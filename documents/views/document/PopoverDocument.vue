<!--
 * @Author: Quarter
 * @Date: 2020-09-29 14:58:39
 * @LastEditors: Quarter
 * @LastEditTime: 2022-12-15 13:53:37
 * @Description: 弹出层的说明文档
 * @FilePath: /simple-ui/documents/views/document/PopoverDocument.vue
-->
<template>
  <div class="popver-document">
    <document-page title="弹出层 Popover" :code="code">
      <template v-slot:desc>
        <p>这是一个弹窗组件，用来显示一个HTML元素的弹窗内容。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>position</td>
            <td>否</td>
            <td>CommonPosition</td>
            <td>否</td>
            <td>bottom</td>
            <td>top|bottom|left|right</td>
            <td>弹出层的默认位置，在弹出层大小超出显示区域之后将进行自动调整</td>
          </tr>
          <tr>
            <td>border-radius</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>弹出层的圆角</td>
          </tr>
          <tr>
            <td>show</td>
            <td>否</td>
            <td>Boolean</td>
            <td>是</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否显示弹窗内容</td>
          </tr>
          <tr>
            <td>hide-arrow</td>
            <td>否</td>
            <td>Boolean</td>
            <td>是</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否隐藏箭头</td>
          </tr>
          <tr>
            <td>once-click</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>点击弹窗内容是否关闭弹窗</td>
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
        </tbody>
      </template>
      <template v-slot:method>
        <tbody>
          <tr>
            <td>switch</td>
            <td>visible: Boolean 是否显示</td>
            <td>-</td>
            <td>切换弹窗是否显示</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:event>
        <tbody>
          <tr>
            <td>switch</td>
            <td>expand: Boolean 是否展开</td>
            <td>切换事件</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:slot>
        <tbody>
          <tr>
            <td>reference</td>
            <td>需要点击弹窗的HTML元素</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list">
          <div style="height: 800px"></div>
          <s-popover position="right-bottom">
            <s-button type="normal" slot="reference">点击我查看详情</s-button>
            <div style="padding: 20px 12px; color: #535353; font-size: 14px">
              这是弹窗的信息哦～～
            </div>
          </s-popover>
          <div style="height: 800px"></div>
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { DocumentPage } from "documents/components";

@Component({
  name: "PopoverDocument",
  components: {
    DocumentPage,
  },
})
export default class PopoverDocument extends Vue {
  code = `
<s-popover>
  <s-button type="normal" slot="reference">点击我查看详情</s-button>
  <div style="padding: 20px 12px;color: #535353;font-size: 14px;">这是弹窗的信息哦～～</div>
</s-popover>
  `; // 示例代码
}
</script>

<style lang="scss" scoped></style>
