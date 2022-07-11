<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-04-12 12:01:49
 * @Description: 切换按钮文档
 * @FilePath: /simple-ui/documents/views/SwitchDocument.vue
-->
<template>
  <div class="switch-document">
    <document-page title="切换按钮 Switch" :code="code">
      <template v-slot:desc>
        <p>这是一个简单的切换按钮。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>v-model/value</td>
            <td>否</td>
            <td>String/Number/Boolean</td>
            <td>是</td>
            <td>false</td>
            <td>-</td>
            <td>切换开关的值</td>
          </tr>
          <tr>
            <td>width</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>是否填充</td>
          </tr>
          <tr>
            <td>scale</td>
            <td>否</td>
            <td>String/Number</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>开关按钮的比例</td>
          </tr>
          <tr>
            <td>active-label</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>激活的文本</td>
          </tr>
          <tr>
            <td>inactive-label</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>未激活的文本</td>
          </tr>
          <tr>
            <td>active-color</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>激活的文本底色</td>
          </tr>
          <tr>
            <td>inactive-color</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>未激活的文本底色</td>
          </tr>
          <tr>
            <td>active-value</td>
            <td>否</td>
            <td>String/Number/Boolean</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>激活的值</td>
          </tr>
          <tr>
            <td>inactive-value</td>
            <td>否</td>
            <td>String/Number/Boolean</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>未激活的值</td>
          </tr>
          <tr>
            <td>size</td>
            <td>否</td>
            <td>CommonSize</td>
            <td>否</td>
            <td>medium</td>
            <td>mini/small/medium/large</td>
            <td>开关大小</td>
          </tr>
          <tr>
            <td>square</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否方形</td>
          </tr>
          <tr>
            <td>control</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否通过外部控制</td>
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
            <td>value: Boolean</td>
            <td>按钮切换</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list">
          <div>
            <s-switch></s-switch>
            <s-switch v-model="switchValue"></s-switch>
          </div>
          <div>
            <s-switch disabled></s-switch>
            <s-switch v-model="switchValue" disabled></s-switch>
          </div>
          <div>
            <s-switch readonly></s-switch>
            <s-switch v-model="switchValue" readonly></s-switch>
          </div>
          <div>
            <s-switch size="mini"></s-switch>
            <s-switch size="small"></s-switch>
            <s-switch size="medium"></s-switch>
            <s-switch size="large"></s-switch>
          </div>
          <div>
            <s-switch size="mini" square></s-switch>
            <s-switch size="small" square></s-switch>
            <s-switch size="medium" square></s-switch>
            <s-switch size="large" square></s-switch>
          </div>
          <div>
            <s-switch width="70px" scale="70" active-label="开启" inactive-label="关闭"></s-switch>
            <s-switch
              width="70px"
              scale="70"
              active-label="开启"
              inactive-label="关闭"
              v-model="switchValue"
            ></s-switch>
            <s-switch
              width="70px"
              scale="70"
              active-label="开启"
              active-color="#11c986"
              inactive-label="关闭"
              v-model="switchValue"
            ></s-switch>
          </div>
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import { DocumentPage } from "documents/components";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "SwitchDocument",
  components: {
    DocumentPage,
  },
})
export default class SwitchDocument extends Vue {
  switchValue = true; // 开关的值
  code = `
<template>
  <div class="example-list">
    <div>
      <s-switch></s-switch>
      <s-switch v-model="switchValue"></s-switch>
    </div>
    <div>
      <s-switch disabled></s-switch>
      <s-switch v-model="switchValue" disabled></s-switch>
    </div>
    <div>
      <s-switch readonly></s-switch>
      <s-switch v-model="switchValue" readonly></s-switch>
    </div>
    <div>
      <s-switch size="mini"></s-switch>
      <s-switch size="small"></s-switch>
      <s-switch size="medium"></s-switch>
      <s-switch size="large"></s-switch>
    </div>
    <div>
      <s-switch size="mini" square></s-switch>
      <s-switch size="small" square></s-switch>
      <s-switch size="medium" square></s-switch>
      <s-switch size="large" square></s-switch>
    </div>
    <div>
      <s-switch
        width="70px"
        scale="70"
        active-label="开启"
        inactive-label="关闭"
      ></s-switch>
      <s-switch
        width="70px"
        scale="70"
        active-label="开启"
        inactive-label="关闭"
        v-model="switchValue"
      ></s-switch>
      <s-switch
        width="70px"
        scale="70"
        active-label="开启"
        active-color="#11c986"
        inactive-label="关闭"
        v-model="switchValue"
      ></s-switch>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class SwitchDocument extends Vue {
  // 开关的值
  private switchValue: boolean = true;
}
</${"script"}>
  `; // 示例代码
}
</script>

<style lang="scss" scoped>
.switch-document {
  .example-list {
    > div {
      display: flex;
      align-items: flex-end;

      &:not(:first-child) {
        margin-top: 20px;
      }
    }
  }
}
</style>