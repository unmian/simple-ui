<!--
 * @Author: Quarter
 * @Date: 2020-09-29 14:13:32
 * @LastEditors: Quarter
 * @LastEditTime: 2022-04-12 12:03:09
 * @Description: 提示信息文档
 * @FilePath: /simple-ui/documents/views/TipDocument.vue
-->
<template>
  <div class="tip-document">
    <document-page title="信息提示 Tip" :code="code">
      <template v-slot:desc>
        <p>这是一个显示提示信息的组件。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>tip</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>提示内容</td>
          </tr>
          <tr>
            <td>trigger</td>
            <td>否</td>
            <td>CommonAction</td>
            <td>否</td>
            <td>hover</td>
            <td>hover/click</td>
            <td>触发方式</td>
          </tr>
          <tr>
            <td>delay</td>
            <td>否</td>
            <td>Number/String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>悬浮关闭延迟毫秒数</td>
          </tr>
          <tr>
            <td>mode</td>
            <td>否</td>
            <td>ThemeMode</td>
            <td>否</td>
            <td>dark</td>
            <td>light/dark</td>
            <td>主题模式</td>
          </tr>
          <tr>
            <td>position</td>
            <td>否</td>
            <td>CommonPosition</td>
            <td>否</td>
            <td>bottom</td>
            <td>top|bottom|left|right</td>
            <td>弹窗框的默认位置，在弹窗框大小超出显示区域之后将进行自动调整</td>
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
      <template v-slot:style>
        <tbody>
          <tr>
            <td>--tip-radius</td>
            <td>3px</td>
            <td>border-radius</td>
            <td>弹窗的圆角</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list">
          <ul>
            <li>
              <s-tip tip="这是一个提示信息" mode="light">
                <s-button type="confirm" outline>亮色主题</s-button>
              </s-tip>
            </li>
            <li>
              <s-tip tip="这是一个提示信息">
                <s-button type="cancel" outline>暗色主题</s-button>
              </s-tip>
            </li>
            <li>
              <s-tip tip="这是一个提示信息" trigger="click">
                <s-button type="confirm" outline>点击显示</s-button>
              </s-tip>
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
  name: "TipDocument",
  components: {
    DocumentPage,
  },
})
export default class TipDocument extends Vue {
  code = `
<s-tip tip="这是一个提示信息" mode="light">
  <s-button type="normal" outline>亮色主题</s-button>
</s-tip>
<s-tip tip="这是一个提示信息">
  <s-button type="cancel" outline>暗色主题</s-button>
</s-tip>
<s-tip tip="这是一个提示信息" trigger="click">
  <s-button type="normal" outline>点击显示</s-button>
</s-tip>
  `;
}
</script>

<style lang="scss" scoped>
.tip-document {
  .example-list {
    ul {
      padding: 0;
      list-style: none;
      display: flex;
      align-items: center;
      margin: 0;

      li:not(:first-of-type) {
        margin-left: 15px;
      }
    }
  }
}
</style>