<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-11 08:31:01
 * @Description: 日期选择器文档
 * @FilePath: /simple-ui/documents/views/DateTimePickerDocument.vue
-->
<template>
  <div class="date-picker-document">
    <document-page title="日期时间选择器 SimpleDateTimePicker" :code="dateTimePickerCode">
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
            <td>
              日期选择框的值，格式为
              <br />yyyy-MM-dd hh:mm:ss
            </td>
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
            <td>
              日期时间选择范围区间，格式为
              <br />yyyy-MM-dd hh:mm:ss
            </td>
          </tr>
          <tr>
            <td>formate</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>yyyy-MM-dd hh:mm:ss</td>
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
              <simple-date-time-picker></simple-date-time-picker>
            </li>
            <li>
              <simple-date-time-picker quick></simple-date-time-picker>
            </li>
            <li>
              <simple-date-time-picker
                value="2021-12-05 01:12:32"
                :interval="['2021-12-03 01:00:00', '2021-12-20 10:00:00']"
              ></simple-date-time-picker>
            </li>
            <li>
              <simple-date-time-picker formate="yyyy-MM-dd hh:mm"></simple-date-time-picker>
            </li>
            <li>
              <simple-date-time-picker formate="yyyy年MM月dd日 hh时"></simple-date-time-picker>
            </li>
            <li>
              <simple-date-time-picker value="2021-01-01 00:00:00" disabled></simple-date-time-picker>
            </li>
            <li>
              <simple-date-time-picker value="2021-01-01 00:00:00" readonly></simple-date-time-picker>
            </li>
          </ul>
        </div>
      </template>
    </document-page>
    <document-page title="日期时间围选择器 SimpleDateTimeRangerPicker" :code="dateTimeRangerPickerCode">
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
            <td>
              日期范围选择框的值，格式为
              <br />yyyy-MM-dd hh:mm:ss
              <br />-
              yyyy-MM-dd hh:mm:ss
            </td>
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
            <td>
              日期时间选择范围区间，格式为
              <br />yyyy-MM-dd hh:mm:ss
            </td>
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
            <td>yyyy-MM-dd hh:mm:ss</td>
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
              <simple-date-time-ranger-picker></simple-date-time-ranger-picker>
            </li>
            <li>
              <simple-date-time-ranger-picker
                value="2021-12-05 12:00:00 - 2021-12-10 13:45:00"
                :interval="['2021-12-03 01:00:00', '2021-12-20 10:00:00']"
              ></simple-date-time-ranger-picker>
            </li>
            <li>
              <simple-date-time-ranger-picker
                value="2021-01-01 00:00:00 - 2021-12-31 23:59:59"
                disabled
              ></simple-date-time-ranger-picker>
            </li>
            <li>
              <simple-date-time-ranger-picker
                value="2021-01-01 00:00:00 - 2021-12-31 23:59:59"
                readonly
              ></simple-date-time-ranger-picker>
            </li>
          </ul>
        </div>
      </template>
    </document-page>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DocumentPage from "documents/components/DocumentPage.vue";

export default Vue.extend({
  components: {
    DocumentPage,
  },
  data() {
    return {
      dateTimePickerCode: `
<simple-date-time-picker></simple-date-time-picker>
<simple-date-time-picker quick></simple-date-time-picker>
<simple-date-time-picker
  value="2021-12-05 01:12:32"
  :interval="['2021-12-03 01:00:00', '2021-12-20 10:00:00']"
></simple-date-time-picker>
<simple-date-time-picker formate="yyyy-MM-dd hh:mm"></simple-date-time-picker>
<simple-date-time-picker formate="formate="yyyy年MM月dd日 hh时""></simple-date-time-picker>
<simple-date-time-picker value="2021-01-01 00:00:00" disabled></simple-date-time-picker>
<simple-date-time-picker value="2021-01-01 00:00:00" readonly></simple-date-time-picker>
      `,
      dateTimeRangerPickerCode: `
<simple-date-time-ranger-picker></simple-date-time-ranger-picker>
<simple-date-time-ranger-picker
  value="2021-12-05 12:00:00 - 2021-12-10 13:45:00"
  :interval="['2021-12-03 01:00:00', '2021-12-20 10:00:00']"
></simple-date-time-ranger-picker>
<simple-date-time-ranger-picker value="2021-01-01 00:00:00 - 2021-12-31 23:59:59" disabled></simple-date-time-ranger-picker>
<simple-date-time-ranger-picker value="2021-01-01 00:00:00 - 2021-12-31 23:59:59" readonly></simple-date-time-ranger-picker>
      `,
    };
  },
});
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