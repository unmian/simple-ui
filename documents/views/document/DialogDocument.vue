<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-04-12 11:56:57
 * @Description: 弹窗文档
 * @FilePath: /simple-ui/documents/views/DialogDocument.vue
-->
<template>
  <div class="dialog-document">
    <document-page title="弹窗 Dialog" :code="dialogCode">
      <template v-slot:desc>
        <p>一个简单的弹窗组件。</p>
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
            <td>弹窗的宽度</td>
          </tr>
          <tr>
            <td>height</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>弹窗的高度</td>
          </tr>
          <tr>
            <td>shadow-close</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否可以通过点击遮罩关闭弹窗</td>
          </tr>
          <tr>
            <td>visible</td>
            <td>否</td>
            <td>Boolean</td>
            <td>是</td>
            <td>false</td>
            <td>true/false</td>
            <td>弹窗是否显示</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:style>
        <tbody>
          <tr>
            <td>--shadow-color</td>
            <td>rgba(51, 64, 84, 0.5)</td>
            <td>background-color</td>
            <td>遮罩颜色</td>
          </tr>
          <tr>
            <td>--dialog-padding</td>
            <td>20px</td>
            <td>padding</td>
            <td>弹窗的编辑</td>
          </tr>
          <tr>
            <td>--dialog-radius</td>
            <td>6px</td>
            <td>border-radius</td>
            <td>弹窗的圆角</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list">
          <s-button outline type="normal" @click="dialogVisible = true">点击显示弹窗</s-button>
          <s-dialog :visible.sync="dialogVisible" shadow-close>
            <div style="padding: 30px">我是弹窗的内容。</div>
          </s-dialog>
        </div>
      </template>
    </document-page>
    <document-page title="自定义弹窗 DialogBox" :code="dialogBoxCode">
      <template v-slot:desc>
        <p>这是一个添加更多内置内容的，更加偏向规范性的弹窗组件。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>width</td>
            <td>否</td>
            <td>string</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>弹窗的宽度</td>
          </tr>
          <tr>
            <td>height</td>
            <td>否</td>
            <td>string</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>弹窗的高度</td>
          </tr>
          <tr>
            <td>title</td>
            <td>否</td>
            <td>string</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>弹窗的标题</td>
          </tr>
          <tr>
            <td>shadow-close</td>
            <td>否</td>
            <td>boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否可以通过点击遮罩关闭弹窗</td>
          </tr>
          <tr>
            <td>visible</td>
            <td>否</td>
            <td>boolean</td>
            <td>是</td>
            <td>false</td>
            <td>true/false</td>
            <td>弹窗是否显示</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:style>
        <tbody>
          <tr>
            <td>--shadow-color</td>
            <td>rgba(51, 64, 84, 0.5)</td>
            <td>background-color</td>
            <td>遮罩颜色</td>
          </tr>
          <tr>
            <td>--dialog-padding</td>
            <td>20px</td>
            <td>padding</td>
            <td>弹窗的编辑</td>
          </tr>
          <tr>
            <td>--dialog-radius</td>
            <td>6px</td>
            <td>border-radius</td>
            <td>弹窗的圆角</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:event>
        <tbody>
          <tr>
            <td>close</td>
            <td>-</td>
            <td>关闭弹窗</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list">
          <s-button outline type="normal" @click="dialogBoxVisible = true">点击显示弹窗</s-button>
          <s-dialog-box title="自定义弹框" :visible.sync="dialogBoxVisible">
            <div>我是弹窗的内容。</div>
          </s-dialog-box>
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import { DocumentPage } from "documents/components";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "DialogDocument",
  components: {
    DocumentPage,
  },
})
export default class DialogDocument extends Vue {
  dialogVisible = false; // 弹窗显示
  dialogBoxVisible = false; // 弹窗显示
  dialogCode = `
<template>
  <div>
    <s-button type="normal" @click="dialogVisible = true" outline>点击显示弹窗</s-button>
    <s-dialog :visible.sync="dialogVisible" shadow-close>
      <div style="padding: 30px;">我是弹窗的内容。</div>
    </s-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class DialogDocument extends Vue {
  // 弹窗显示
  private readonly dialogVisible: boolean = false;
}
</${"script"}>
  `; // 示例代码
  dialogBoxCode = `
<template>
  <div>
    <s-button type="normal" @click="dialogBoxVisible = true" outline>点击显示弹窗</s-button>
    <s-dialog title="自定义弹框" :visible.sync="dialogBoxVisible">
      <div>我是弹窗的内容。</div>
    </s-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class DialogDocument extends Vue {
  // 弹窗显示
  private readonly dialogBoxVisible: boolean = false;
}
</${"script"}>
  `; // 示例代码
}
</script>

<style lang="scss" scoped>
</style>