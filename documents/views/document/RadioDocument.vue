<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-04-12 12:00:45
 * @Description: 单选框文档
 * @FilePath: /simple-ui/documents/views/RadioDocument.vue
-->
<template>
  <div class="radio-document">
    <document-page title="单选框 Radio" :code="radioCode">
      <template v-slot:desc>
        <p>这是一个单选框组件。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>v-model/value</td>
            <td>否</td>
            <td>RadioValue</td>
            <td>是</td>
            <td>null</td>
            <td>-</td>
            <td>单选框选中的值</td>
          </tr>
          <tr>
            <td>label</td>
            <td>否</td>
            <td>RadioValue</td>
            <td>否</td>
            <td>null</td>
            <td>-</td>
            <td>该单选框代表的值</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否禁用该单选框</td>
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
            <td>label: RadioValue 当前选中的值</td>
            <td>单选框选中</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list">
          <s-radio v-model="radio" label="足球">足球</s-radio>
          <s-radio v-model="radio" label="篮球">篮球</s-radio>
          <s-radio v-model="radio" label="网球">网球</s-radio>
          <s-radio v-model="radio" label="羽毛球">羽毛球</s-radio>
          <s-radio v-model="radio" label="排球">排球</s-radio>
        </div>
        <div style="margin-top: 30px">
          <s-radio v-model="radio" label="足球" readonly>足球</s-radio>
          <s-radio v-model="radio" label="篮球" readonly>篮球</s-radio>
          <s-radio v-model="radio" label="网球" readonly>网球</s-radio>
          <s-radio v-model="radio" label="羽毛球" readonly>羽毛球</s-radio>
          <s-radio v-model="radio" label="排球" readonly>排球</s-radio>
        </div>
        <div style="margin-top: 30px">
          <s-radio v-model="radio" label="足球" disabled>足球</s-radio>
          <s-radio v-model="radio" label="篮球" disabled>篮球</s-radio>
          <s-radio v-model="radio" label="网球" disabled>网球</s-radio>
          <s-radio v-model="radio" label="羽毛球" disabled>羽毛球</s-radio>
          <s-radio v-model="radio" label="排球" disabled>排球</s-radio>
        </div>
      </template>
    </document-page>
    <document-page title="单选框按钮 RadioButton" :code="radioButtonCode">
      <template v-slot:desc>
        <p>这是一个单选框按钮组件。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>v-model/value</td>
            <td>否</td>
            <td>RadioValue</td>
            <td>是</td>
            <td>null</td>
            <td>-</td>
            <td>单选框选中的值</td>
          </tr>
          <tr>
            <td>label</td>
            <td>否</td>
            <td>RadioValue</td>
            <td>否</td>
            <td>null</td>
            <td>-</td>
            <td>该单选框代表的值</td>
          </tr>
          <tr>
            <td>size</td>
            <td>否</td>
            <td>CommonSize</td>
            <td>否</td>
            <td>medium</td>
            <td>mini/small/medium/large</td>
            <td>组件尺寸</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否禁用该单选框</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:event>
        <tbody>
          <tr>
            <td>change</td>
            <td>label: RadioValue 当前选中的值</td>
            <td>单选框选中</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list">
          <s-radio-button v-model="radio" label="足球" size="mini">足球</s-radio-button>
          <s-radio-button v-model="radio" label="篮球" size="mini">篮球</s-radio-button>
          <s-radio-button v-model="radio" label="网球" size="mini">网球</s-radio-button>
          <s-radio-button v-model="radio" label="羽毛球" size="mini">羽毛球</s-radio-button>
          <s-radio-button v-model="radio" label="排球" size="mini">排球</s-radio-button>
        </div>
        <div style="margin-top: 30px">
          <s-radio-button v-model="radio" label="足球" size="small">足球</s-radio-button>
          <s-radio-button v-model="radio" label="篮球" size="small">篮球</s-radio-button>
          <s-radio-button v-model="radio" label="网球" size="small">网球</s-radio-button>
          <s-radio-button v-model="radio" label="羽毛球" size="small">羽毛球</s-radio-button>
          <s-radio-button v-model="radio" label="排球" size="small">排球</s-radio-button>
        </div>
        <div style="margin-top: 30px">
          <s-radio-button v-model="radio" label="足球" size="medium">足球</s-radio-button>
          <s-radio-button v-model="radio" label="篮球" size="medium">篮球</s-radio-button>
          <s-radio-button v-model="radio" label="网球" size="medium">网球</s-radio-button>
          <s-radio-button v-model="radio" label="羽毛球" size="medium">羽毛球</s-radio-button>
          <s-radio-button v-model="radio" label="排球" size="medium">排球</s-radio-button>
        </div>
        <div style="margin-top: 30px">
          <s-radio-button v-model="radio" label="足球" disabled>足球</s-radio-button>
          <s-radio-button v-model="radio" label="篮球">篮球</s-radio-button>
          <s-radio-button v-model="radio" label="网球" disabled>网球</s-radio-button>
          <s-radio-button v-model="radio" label="羽毛球">羽毛球</s-radio-button>
          <s-radio-button v-model="radio" label="排球" disabled>排球</s-radio-button>
        </div>
        <div style="margin-top: 30px">
          <s-radio-button v-model="radio" label="足球" size="large">足球</s-radio-button>
          <s-radio-button v-model="radio" label="篮球" size="large">篮球</s-radio-button>
          <s-radio-button v-model="radio" label="网球" size="large">网球</s-radio-button>
          <s-radio-button v-model="radio" label="羽毛球" size="large">羽毛球</s-radio-button>
          <s-radio-button v-model="radio" label="排球" size="large">排球</s-radio-button>
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import { RadioValue } from "@quarter/simple-ui";
import { DocumentPage } from "documents/components";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "RadioDocument",
  components: {
    DocumentPage,
  },
})
export default class RadioDocument extends Vue {
  radio: RadioValue = "足球"; // 单选框的值
  radioCode = `
<template>
  <div>
    <s-radio v-model="radio" label="足球">足球</s-radio>
    <s-radio v-model="radio" label="篮球">篮球</s-radio>
    <s-radio v-model="radio" label="网球">网球</s-radio>
    <s-radio v-model="radio" label="羽毛球">羽毛球</s-radio>
    <s-radio v-model="radio" label="排球">排球</s-radio>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

${"export default Vue.extend"}({
  data() {
    return {
      radio: "足球" as RadioValue,
    };
  },
});
</${"script"}>
  `; // 示例代码
  radioButtonCode = `
<template>
  <div>
    <s-radio-button v-model="radio" label="足球" size="mini">足球</s-radio-button>
    <s-radio-button v-model="radio" label="篮球" size="mini">篮球</s-radio-button>
    <s-radio-button v-model="radio" label="网球" size="mini">网球</s-radio-button>
    <s-radio-button v-model="radio" label="羽毛球" size="mini">羽毛球</s-radio-button>
    <s-radio-button v-model="radio" label="排球" size="mini">排球</s-radio-button>
  </div>
  <div style="margin-top: 30px">
    <s-radio-button v-model="radio" label="足球" size="small">足球</s-radio-button>
    <s-radio-button v-model="radio" label="篮球" size="small">篮球</s-radio-button>
    <s-radio-button v-model="radio" label="网球" size="small">网球</s-radio-button>
    <s-radio-button v-model="radio" label="羽毛球" size="small">羽毛球</s-radio-button>
    <s-radio-button v-model="radio" label="排球" size="small">排球</s-radio-button>
  </div>
  <div style="margin-top: 30px">
    <s-radio-button v-model="radio" label="足球" size="medium">足球</s-radio-button>
    <s-radio-button v-model="radio" label="篮球" size="medium">篮球</s-radio-button>
    <s-radio-button v-model="radio" label="网球" size="medium">网球</s-radio-button>
    <s-radio-button v-model="radio" label="羽毛球" size="medium">羽毛球</s-radio-button>
    <s-radio-button v-model="radio" label="排球" size="medium">排球</s-radio-button>
  </div>
  <div style="margin-top: 30px">
    <s-radio-button v-model="radio" label="足球" disabled>足球</s-radio-button>
    <s-radio-button v-model="radio" label="篮球" disabled>篮球</s-radio-button>
    <s-radio-button v-model="radio" label="网球" disabled>网球</s-radio-button>
    <s-radio-button v-model="radio" label="羽毛球" disabled>羽毛球</s-radio-button>
    <s-radio-button v-model="radio" label="排球" disabled>排球</s-radio-button>
  </div>
  <div style="margin-top: 30px">
    <s-radio-button v-model="radio" label="足球" readonly>足球</s-radio-button>
    <s-radio-button v-model="radio" label="篮球" readonly>篮球</s-radio-button>
    <s-radio-button v-model="radio" label="网球" readonly>网球</s-radio-button>
    <s-radio-button v-model="radio" label="羽毛球" readonly>羽毛球</s-radio-button>
    <s-radio-button v-model="radio" label="排球" readonly>排球</s-radio-button>
  </div>
  <div style="margin-top: 30px">
    <s-radio-button v-model="radio" label="足球" size="large">足球</s-radio-button>
    <s-radio-button v-model="radio" label="篮球" size="large">篮球</s-radio-button>
    <s-radio-button v-model="radio" label="网球" size="large">网球</s-radio-button>
    <s-radio-button v-model="radio" label="羽毛球" size="large">羽毛球</s-radio-button>
    <s-radio-button v-model="radio" label="排球" size="large">排球</s-radio-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

${"export default Vue.extend"}({
  data() {
    return {
      radio: "足球" as RadioValue, // 单选框的值
    };
  },
});
</${"script"}>
  `; // 示例代码
}
</script>

<style lang="scss" scoped>
</style>