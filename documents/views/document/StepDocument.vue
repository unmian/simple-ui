<!--
 * @Author: Quarter
 * @Date: 2020-09-29 14:42:15
 * @LastEditors: Quarter
 * @LastEditTime: 2022-04-12 12:01:27
 * @Description: 步骤条说明文档
 * @FilePath: /simple-ui/documents/views/StepDocument.vue
-->
<template>
  <div class="step-document">
    <document-page title="步骤条 StepBar" :code="code">
      <template v-slot:desc>
        <p>这是一个简易的步骤显示组件。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>steps</td>
            <td>否</td>
            <td>StepItem[]</td>
            <td>否</td>
            <td>[]</td>
            <td>-</td>
            <td>步骤项配置</td>
          </tr>
          <tr>
            <td>active</td>
            <td>否</td>
            <td>Number</td>
            <td>否</td>
            <td>0</td>
            <td>-</td>
            <td>当前所在的步骤位置</td>
          </tr>
          <tr>
            <td>align</td>
            <td>否</td>
            <td>Align</td>
            <td>否</td>
            <td>center</td>
            <td>-</td>
            <td>排列方式</td>
          </tr>
          <tr>
            <td>can-change</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否可以切换步骤</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:style>
        <tbody>
          <tr>
            <td>--step-color</td>
            <td>#1890ff</td>
            <td>color</td>
            <td>步骤条激活的颜色</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:event>
        <tbody>
          <tr>
            <td>change</td>
            <td>step: Number 步骤索引</td>
            <td>切换步骤</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div>
          <s-step-bar :active="1" :steps="steps"></s-step-bar>
        </div>
        <div style="margin-top: 50px">
          <s-step-bar :active.sync="active" :steps="steps" can-change></s-step-bar>
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import { DocumentPage } from "documents/components";
import { StepItem } from "@quarter/simple-ui";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "StepDocument",
  components: {
    DocumentPage,
  },
})
export default class StepDocument extends Vue {
  active = 1; // 当前激活
  steps: StepItem[] = [ // 步骤
    {
      name: "步骤一",
      brief: "这是步骤一的说明",
    },
    {
      name: "步骤二",
    },
    {
      name: "步骤三",
    },
  ];
  code = `
<template>
  <div>
    <s-step-bar :active="1" :steps="steps"></s-step-bar>
  </div>
  <div style="margin-top: 50px">
    <s-step-bar
      :active.sync="active"
      :steps="steps"
      can-change
    ></s-step-bar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { StepItem } from "@quarter/simple-ui";

${"export default Vue.extends"}({
  data() {
    return {
      active: 1, // 当前激活
      steps: [ // 步骤
        {
          name: "步骤一",
          brief: "这是步骤一的说明",
        },
        {
          name: "步骤二",
        },
        {
          name: "步骤三",
        },
      ] as StepItem[],
    };
  },
});
</${"script"}>
  `;
}
</script>

<style lang="scss" scoped>
</style>