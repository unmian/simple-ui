<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-04-12 11:52:46
 * @Description: 日期选择器文档
 * @FilePath: /simple-ui/documents/views/DatePickerDocument.vue
-->
<template>
  <div class="date-picker-document">
    <document-page title="日期选择器 DatePicker" :code="datePickerCode">
      <template v-slot:desc>
        <p>这是一个选择日期的组件。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>v-model/value</td>
            <td>否</td>
            <td>String</td>
            <td>是</td>
            <td>-</td>
            <td>-</td>
            <td>日期选择框的值，格式为 yyyy-MM-dd</td>
          </tr>
          <tr>
            <td>width</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>日期选择框宽度</td>
          </tr>
          <tr>
            <td>height</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>日期选择框高度</td>
          </tr>
          <tr>
            <td>placeholder</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>选择日期时间</td>
            <td>-</td>
            <td>日期选择框的提示文字</td>
          </tr>
          <tr>
            <td>interval</td>
            <td>否</td>
            <td>String[]</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>日期范围选择框的区间数组，格式为 yyyy-MM-dd</td>
          </tr>
          <tr>
            <td>formate</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>yyyy-MM-dd</td>
            <td>-</td>
            <td>日期格式化规则</td>
          </tr>
          <tr>
            <td>quick</td>
            <td>否</td>
            <td>Boolean</td>
            <td>否</td>
            <td>false</td>
            <td>true/false</td>
            <td>是否显示快捷操作</td>
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
            <td>value: string 日期字符串</td>
            <td>选择变化</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list">
          <ul>
            <li>
              <s-date-picker></s-date-picker>
            </li>
            <li>
              <s-date-picker formate="yyyy-MM"></s-date-picker>
            </li>
            <li>
              <s-date-picker value="2021-12-05" :interval="['2021-12-01', '2021-12-20']"></s-date-picker>
            </li>
            <li>
              <s-date-picker quick></s-date-picker>
            </li>
            <li>
              <s-date-picker disabled></s-date-picker>
            </li>
            <li>
              <s-date-picker readonly></s-date-picker>
            </li>
          </ul>
        </div>
      </template>
    </document-page>
    <document-page title="日期范围选择器 DateRangerPicker" :code="dateRangerPickerCode">
      <template v-slot:desc>
        <p>这是一个选择日期范围的组件。</p>
      </template>
      <template v-slot:prop>
        <tbody>
          <tr>
            <td>v-model/value</td>
            <td>否</td>
            <td>String</td>
            <td>是</td>
            <td>-</td>
            <td>-</td>
            <td>日期范围选择框的值，格式为 yyyy-MM-dd - yyyy-MM-dd</td>
          </tr>
          <tr>
            <td>width</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>日期范围选择框宽度</td>
          </tr>
          <tr>
            <td>height</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>日期范围选择框高度</td>
          </tr>
          <tr>
            <td>start-placeholder</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>选择开始时间</td>
            <td>-</td>
            <td>日期范围选择框开始时间的提示文字</td>
          </tr>
          <tr>
            <td>end-placeholder</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>选择结束时间</td>
            <td>-</td>
            <td>日期范围选择框结束时间的提示文字</td>
          </tr>
          <tr>
            <td>interval</td>
            <td>否</td>
            <td>String[]</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>日期范围选择框的区间数组，格式为 yyyy-MM-dd</td>
          </tr>
          <tr>
            <td>split</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>"-"</td>
            <td>-</td>
            <td>日期范围选择框中的分割文字</td>
          </tr>
          <tr>
            <td>formate</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>yyyy-MM-dd</td>
            <td>-</td>
            <td>日期格式化规则</td>
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
            <td>value: string 日期字符串</td>
            <td>日期范围变化</td>
          </tr>
        </tbody>
      </template>
      <template v-slot:example>
        <div class="example-list">
          <ul>
            <li>
              <s-date-ranger-picker></s-date-ranger-picker>
            </li>
            <li>
              <s-date-ranger-picker
                value="2021-12-05 - 2021-12-15"
                :interval="['2021-12-03', '2021-12-20']"
              ></s-date-ranger-picker>
            </li>
            <li>
              <s-date-ranger-picker value="2021-01-01 - 2021-12-31" disabled></s-date-ranger-picker>
            </li>
            <li>
              <s-date-ranger-picker value="2021-01-01 - 2021-12-31" readonly></s-date-ranger-picker>
            </li>
          </ul>
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import { DocumentPage } from "documents/components";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "DatePickerDocument",
  components: {
    DocumentPage,
  },
})
export default class DatePickerDocument extends Vue {
  datePickerCode = `
<s-date-picker></s-date-picker>
<s-date-picker quick></s-date-picker>
<s-date-picker disabled></s-date-picker>
<s-date-picker readonly></s-date-picker>
  `; // 示例代码
  dateRangerPickerCode = `
<s-date-ranger-picker></s-date-ranger-picker>
<s-date-ranger-picker disabled></s-date-ranger-picker>
<s-date-ranger-picker readonly></s-date-ranger-picker>
  `; // 示例代码
}
</script>

<style lang="scss" scoped>
.date-picker-document {
  .example-list {
    ul {
      padding: 0;
      list-style: none;
      margin: 0;

      li:not(:first-of-type) {
        margin-top: 20px;
      }
    }
  }
}
</style>