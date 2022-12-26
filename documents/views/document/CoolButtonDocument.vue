<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-12-13 15:16:38
 * @Description: 冷却按钮文档
 * @FilePath: /simple-ui/documents/views/document/CoolButtonDocument.vue
-->
<template>
  <div class="cool-button-document">
    <document-page title="冷却按钮 CoolButton" :code="code">
      <template v-slot:desc>
        <p>这是一个冷却按钮组件，一般用在如发送验证码等需要冷却时间的状况下。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>width</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>按钮的宽度限制</td>
          </tr>
          <tr>
            <td>delay</td>
            <td>否</td>
            <td>Number</td>
            <td>否</td>
            <td>60</td>
            <td>-</td>
            <td>按钮的冷却时间，单位为秒</td>
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
            <td>是否描边</td>
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
            <td>type</td>
            <td>否</td>
            <td>ButtonType</td>
            <td>否</td>
            <td>normal</td>
            <td>cancel|normal|confirm|warning|danger|linear</td>
            <td>按钮类型</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:event>
        <tbody>
          <tr>
            <td>click</td>
            <td>event: MouseEvent</td>
            <td>点击</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list">
          <s-cool-button>默认冷却按钮</s-cool-button>
          <s-cool-button :delay="10">10s冷却按钮</s-cool-button>
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { DocumentPage } from "documents/components";

@Component({
  name: "CoolButtonDocument",
  components: {
    DocumentPage,
  },
})
export default class CoolButtonDocument extends Vue {
  code = `
<s-cool-button>冷却按钮</s-cool-button>
<s-cool-button :delay="10">10s冷却按钮</s-cool-button>
  `; // 示例代码
}
</script>

<style lang="scss" scoped></style>
