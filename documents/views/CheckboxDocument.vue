<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-10 08:48:55
 * @Description: 复选框文档
 * @FilePath: /simple-ui/documents/views/CheckboxDocument.vue
-->
<template>
  <div class="checkbox-document">
    <document-page title="复选框 SimpleCheckbox" :code="checkboxCode">
      <template v-slot:desc>
        <p>
          这是一个自定义的复选框组件，不推荐单独使用，搭配 SimpleCheckboxGroup
          使用效果更加。
        </p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>label</td>
            <td>否</td>
            <td>SimpleCheckboxValue</td>
            <td>否</td>
            <td>null</td>
            <td>-</td>
            <td>复选框代表的值</td>
          </tr>
          <tr>
            <td>checked</td>
            <td>否</td>
            <td>Boolean</td>
            <td>是</td>
            <td>false</td>
            <td>true/false</td>
            <td>单个使用的时候是否勾选</td>
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
          <tr>
            <td>alone</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否独立控制</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:event>
        <tbody>
          <tr>
            <td>check</td>
            <td>label: SimpleCheckboxValue 复选框的值</td>
            <td>勾选复选框</td>
          </tr>
          <tr>
            <td>change</td>
            <td>
              status: Boolean 勾选的状态
              <br />label: SimpleCheckboxValue
              复选框的值
            </td>
            <td>复选框状态改变</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list">
          <simple-checkbox checked label="篮球">篮球</simple-checkbox>
          <simple-checkbox label="足球">足球</simple-checkbox>
          <simple-checkbox label="羽毛球">羽毛球</simple-checkbox>
          <simple-checkbox checked label="网球">网球</simple-checkbox>
          <simple-checkbox label="排球">排球</simple-checkbox>
        </div>
        <div class="example-list" style="margin-top: 30px">
          <simple-checkbox checked label="篮球" readonly>篮球</simple-checkbox>
          <simple-checkbox label="足球" readonly>足球</simple-checkbox>
          <simple-checkbox label="羽毛球" readonly>羽毛球</simple-checkbox>
          <simple-checkbox checked label="网球" readonly>网球</simple-checkbox>
          <simple-checkbox label="排球" readonly>排球</simple-checkbox>
        </div>
        <div class="example-list" style="margin-top: 30px">
          <simple-checkbox checked label="篮球" disabled>篮球</simple-checkbox>
          <simple-checkbox label="足球" disabled>足球</simple-checkbox>
          <simple-checkbox label="羽毛球" disabled>羽毛球</simple-checkbox>
          <simple-checkbox checked label="网球" disabled>网球</simple-checkbox>
          <simple-checkbox label="排球" disabled>排球</simple-checkbox>
        </div>
      </template>
    </document-page>
    <document-page title="复选框按钮 SimpleCheckboxButton" :code="checkboxButtonCode">
      <template v-slot:desc>
        <p>
          这是一个自定义的复选框按钮组件，不推荐单独使用，搭配 SimpleCheckboxGroup
          使用效果更加。
        </p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>label</td>
            <td>否</td>
            <td>SimpleCheckboxValue</td>
            <td>否</td>
            <td>null</td>
            <td>-</td>
            <td>复选框代表的值</td>
          </tr>
          <tr>
            <td>checked</td>
            <td>否</td>
            <td>Boolean</td>
            <td>是</td>
            <td>false</td>
            <td>true/false</td>
            <td>单个使用的时候是否勾选</td>
          </tr>
          <tr>
            <td>size</td>
            <td>否</td>
            <td>SimpleSize</td>
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
            <td>是否禁用</td>
          </tr>
          <tr>
            <td>alone</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否独立控制</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:event>
        <tbody>
          <tr>
            <td>check</td>
            <td>label: SimpleCheckboxValue 复选框的值</td>
            <td>勾选复选框</td>
          </tr>
          <tr>
            <td>change</td>
            <td>
              status: Boolean 勾选的状态
              <br />label: SimpleCheckboxValue
              复选框的值
            </td>
            <td>复选框状态改变</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div>
          <simple-checkbox-button checked label="篮球" size="mini">篮球</simple-checkbox-button>
          <simple-checkbox-button label="足球" size="mini">足球</simple-checkbox-button>
          <simple-checkbox-button label="羽毛球" size="mini">羽毛球</simple-checkbox-button>
          <simple-checkbox-button checked label="网球" size="mini">网球</simple-checkbox-button>
          <simple-checkbox-button label="排球" size="mini">排球</simple-checkbox-button>
        </div>
        <div style="margin-top: 20px">
          <simple-checkbox-button checked label="篮球" size="small">篮球</simple-checkbox-button>
          <simple-checkbox-button label="足球" size="small">足球</simple-checkbox-button>
          <simple-checkbox-button label="羽毛球" size="small">羽毛球</simple-checkbox-button>
          <simple-checkbox-button checked label="网球" size="small">网球</simple-checkbox-button>
          <simple-checkbox-button label="排球" size="small">排球</simple-checkbox-button>
        </div>
        <div style="margin-top: 20px">
          <simple-checkbox-button checked label="篮球" size="medium">篮球</simple-checkbox-button>
          <simple-checkbox-button label="足球" size="medium">足球</simple-checkbox-button>
          <simple-checkbox-button label="羽毛球" size="medium">羽毛球</simple-checkbox-button>
          <simple-checkbox-button checked label="网球" size="medium">网球</simple-checkbox-button>
          <simple-checkbox-button label="排球" size="medium">排球</simple-checkbox-button>
        </div>
        <div style="margin-top: 20px">
          <simple-checkbox-button checked label="篮球" disabled>篮球</simple-checkbox-button>
          <simple-checkbox-button label="足球" disabled>足球</simple-checkbox-button>
          <simple-checkbox-button label="羽毛球" disabled>羽毛球</simple-checkbox-button>
          <simple-checkbox-button checked label="网球" disabled>网球</simple-checkbox-button>
          <simple-checkbox-button label="排球" disabled>排球</simple-checkbox-button>
        </div>
        <div style="margin-top: 20px">
          <simple-checkbox-button checked label="篮球" size="large">篮球</simple-checkbox-button>
          <simple-checkbox-button label="足球" size="large">足球</simple-checkbox-button>
          <simple-checkbox-button label="羽毛球" size="large">羽毛球</simple-checkbox-button>
          <simple-checkbox-button checked label="网球" size="large">网球</simple-checkbox-button>
          <simple-checkbox-button label="排球" size="large">排球</simple-checkbox-button>
        </div>
      </template>
    </document-page>
    <document-page title="复选框组 SimpleCheckboxGroup" :code="checkboxGroupCode">
      <template v-slot:desc>
        <p>这是包含 SimpleCheckbox 的外围组件，用于获取所有子复选框的选中值。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>v-model/value</td>
            <td>否</td>
            <td>SimpleCheckboxValue[]</td>
            <td>是</td>
            <td>[]</td>
            <td>-</td>
            <td>复选框组选中的值</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list">
          <div>我最喜欢的运动：{{ checkboxStr }}</div>
          <div style="margin-top: 20px">
            <simple-checkbox-group v-model="checkbox">
              <simple-checkbox label="篮球">篮球</simple-checkbox>
              <simple-checkbox label="足球">足球</simple-checkbox>
              <simple-checkbox label="羽毛球">羽毛球</simple-checkbox>
              <simple-checkbox label="网球">网球</simple-checkbox>
              <simple-checkbox label="排球">排球</simple-checkbox>
            </simple-checkbox-group>
          </div>
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DocumentPage from "documents/components/DocumentPage.vue";
import { SimpleCheckboxValue } from "packages";

export default Vue.extend({
  components: {
    DocumentPage,
  },
  data() {
    return {
      checkbox: ["足球", "羽毛球"] as SimpleCheckboxValue[], // 复选框的值
      checkboxCode: `
<simple-checkbox checked label="篮球">篮球</simple-checkbox>
<simple-checkbox label="足球">足球</simple-checkbox>
<simple-checkbox label="羽毛球">羽毛球</simple-checkbox>
<simple-checkbox checked label="网球">网球</simple-checkbox>
<simple-checkbox label="排球">排球</simple-checkbox>
      `,
      checkboxButtonCode: `
<div>
  <simple-checkbox-button checked label="篮球" size="mini">篮球</simple-checkbox-button>
  <simple-checkbox-button label="足球" size="mini">足球</simple-checkbox-button>
  <simple-checkbox-button label="羽毛球" size="mini">羽毛球</simple-checkbox-button>
  <simple-checkbox-button checked label="网球" size="mini">网球</simple-checkbox-button>
  <simple-checkbox-button label="排球" size="mini">排球</simple-checkbox-button>
</div>
<div style="margin-top: 20px">
  <simple-checkbox-button checked label="篮球" size="small">篮球</simple-checkbox-button>
  <simple-checkbox-button label="足球" size="small">足球</simple-checkbox-button>
  <simple-checkbox-button label="羽毛球" size="small">羽毛球</simple-checkbox-button>
  <simple-checkbox-button checked label="网球" size="small">网球</simple-checkbox-button>
  <simple-checkbox-button label="排球" size="small">排球</simple-checkbox-button>
</div>
<div style="margin-top: 20px">
  <simple-checkbox-button checked label="篮球" size="medium">篮球</simple-checkbox-button>
  <simple-checkbox-button label="足球" size="medium">足球</simple-checkbox-button>
  <simple-checkbox-button label="羽毛球" size="medium">羽毛球</simple-checkbox-button>
  <simple-checkbox-button checked label="网球" size="medium">网球</simple-checkbox-button>
  <simple-checkbox-button label="排球" size="medium">排球</simple-checkbox-button>
</div>
<div style="margin-top: 20px">
  <simple-checkbox-button checked label="篮球" disabled>篮球</simple-checkbox-button>
  <simple-checkbox-button label="足球" disabled>足球</simple-checkbox-button>
  <simple-checkbox-button label="羽毛球" disabled>羽毛球</simple-checkbox-button>
  <simple-checkbox-button checked label="网球" disabled>网球</simple-checkbox-button>
  <simple-checkbox-button label="排球" disabled>排球</simple-checkbox-button>
</div>
<div style="margin-top: 20px">
  <simple-checkbox-button checked label="篮球" readonly>篮球</simple-checkbox-button>
  <simple-checkbox-button label="足球" readonly>足球</simple-checkbox-button>
  <simple-checkbox-button label="羽毛球" readonly>羽毛球</simple-checkbox-button>
  <simple-checkbox-button checked label="网球" readonly>网球</simple-checkbox-button>
  <simple-checkbox-button label="排球" readonly>排球</simple-checkbox-button>
</div>
<div style="margin-top: 20px">
  <simple-checkbox-button checked label="篮球" size="large">篮球</simple-checkbox-button>
  <simple-checkbox-button label="足球" size="large">足球</simple-checkbox-button>
  <simple-checkbox-button label="羽毛球" size="large">羽毛球</simple-checkbox-button>
  <simple-checkbox-button checked label="网球" size="large">网球</simple-checkbox-button>
  <simple-checkbox-button label="排球" size="large">排球</simple-checkbox-button>
</div>
      `,
      checkboxGroupCode: `
<template>
  <div>
    <div>我最喜欢的运动：{{ checkboxStr }}</div>
    <div style="margin-top: 20px;">
    <simple-checkbox-group v-model="checkbox">
      <simple-checkbox label="篮球">篮球</simple-checkbox>
      <simple-checkbox label="足球">足球</simple-checkbox>
      <simple-checkbox label="羽毛球">羽毛球</simple-checkbox>
      <simple-checkbox label="网球">网球</simple-checkbox>
      <simple-checkbox label="排球">排球</simple-checkbox>
    </simple-checkbox-group>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { SimpleCheckboxValue } from "simple-ui";

${"export default Vue.extend"}({
  data() {
    return {
      checkbox: ["足球", "羽毛球"] as SimpleCheckboxValue[], // 复选框的值
    };
  },
  computed: {
    /**
     * @description: 获取复选框组成的字符串
     * @author: Quarter
     * @return {String}
     */
    checkboxStr(): string {
      if (Array.isArray(this.checkbox)) {
        return this.checkbox.join(",");
      }
      return "";
    },
  },
});
</${"script"}>
      `,
    };
  },
  computed: {
    /**
     * @description: 获取复选框组成的字符串
     * @author: Quarter
     * @return {String}
     */
    checkboxStr(): string {
      if (Array.isArray(this.checkbox)) {
        return this.checkbox.join(",");
      }
      return "";
    },
  },
});
</script>

<style lang="scss" scoped>
</style>