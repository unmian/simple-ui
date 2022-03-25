<!--
 * @Author: Quarter
 * @Date: 2020-09-29 16:31:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-18 05:21:43
 * @Description: 日期选择器文档
 * @FilePath: /simple-ui/documents/views/TimePickerDocument.vue
-->
<template>
  <div class="time-picker-document">
    <document-page title="日期选择器 SimpleTimePicker" :code="timePickerCode">
      <template v-slot:desc>
        <p>这是一个选择时间的组件。</p>
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
            <td>时间选择框的值，格式为 hh:mm:ss</td>
          </tr>
          <tr>
            <td>width</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>时间选择框宽度</td>
          </tr>
          <tr>
            <td>height</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>时间选择框高度</td>
          </tr>
          <tr>
            <td>placeholder</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>请选择时间</td>
            <td>-</td>
            <td>时间选择框的提示文字</td>
          </tr>
          <tr>
            <td>interval</td>
            <td>否</td>
            <td>String[]</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>时间选择框的区间数组，格式为 hh:mm:ss</td>
          </tr>
          <tr>
            <td>formate</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>hh:mm:ss</td>
            <td>-</td>
            <td>时间格式字符串</td>
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
            <li><simple-time-picker></simple-time-picker></li>
            <li><simple-time-picker quick></simple-time-picker></li>
            <li><simple-time-picker value="12:40:00"></simple-time-picker></li>
            <li>
              <simple-time-picker
                :interval="['10:30:00', '14:50:00']"
              ></simple-time-picker>
            </li>
            <li><simple-time-picker formate="hh:mm"></simple-time-picker></li>
            <li><simple-time-picker disabled></simple-time-picker></li>
            <li><simple-time-picker readonly></simple-time-picker></li>
          </ul>
        </div>
      </template>
    </document-page>
    <document-page
      title="日期范围选择器 SimpleTimeRangerPicker"
      :code="timeRangerPickerCode"
    >
      <template v-slot:desc>
        <p>这是一个选择时间范围的组件。</p>
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
            <td>时间选择框的值，格式为 hh:mm:ss - hh:mm:ss</td>
          </tr>
          <tr>
            <td>width</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>时间选择框宽度</td>
          </tr>
          <tr>
            <td>height</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>时间选择框高度</td>
          </tr>
          <tr>
            <td>start-placeholder</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>请选择开始时间</td>
            <td>-</td>
            <td>开始时间选择框的提示文字</td>
          </tr>
          <tr>
            <td>end-placeholder</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>请选择结束时间</td>
            <td>-</td>
            <td>结束时间选择框的提示文字</td>
          </tr>
          <tr>
            <td>interval</td>
            <td>否</td>
            <td>String[]</td>
            <td>否</td>
            <td>-</td>
            <td>-</td>
            <td>时间选择框的区间，格式为 hh:mm:ss</td>
          </tr>
          <tr>
            <td>split</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>"-"</td>
            <td>-</td>
            <td>分割字符串</td>
          </tr>
          <tr>
            <td>formate</td>
            <td>否</td>
            <td>String</td>
            <td>否</td>
            <td>hh:mm:ss</td>
            <td>-</td>
            <td>时间格式字符串</td>
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
            <li><simple-time-ranger-picker></simple-time-ranger-picker></li>
            <li>
              <simple-time-ranger-picker
                value="12:40:00 - 15:30:00"
              ></simple-time-ranger-picker>
            </li>
            <li>
              <simple-time-ranger-picker
                :interval="['10:30:00', '14:50:00']"
              ></simple-time-ranger-picker>
            </li>
            <li>
              <simple-time-ranger-picker
                formate="hh:mm"
              ></simple-time-ranger-picker>
            </li>
            <li>
              <simple-time-ranger-picker
                value="12:40:00 - 15:30:00"
                disabled
              ></simple-time-ranger-picker>
            </li>
            <li>
              <simple-time-ranger-picker
                value="12:40:00 - 15:30:00"
                readonly
              ></simple-time-ranger-picker>
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
      timePickerCode: `
<div class="example-list">
  <ul>
    <li><simple-time-picker></simple-time-picker></li>
    <li><simple-time-picker quick></simple-time-picker></li>
    <li><simple-time-picker value="12:40:00"></simple-time-picker></li>
    <li><simple-time-picker min="10:30:00" max="14:50:00"></simple-time-picker></li>
    <li><simple-time-picker formate="hh:mm"></simple-time-picker></li>
    <li><simple-time-picker disabled></simple-time-picker></li>
    <li><simple-time-picker readonly></simple-time-picker></li>
  </ul>
</div>
      `,
      timeRangerPickerCode: `
<div class="example-list">
  <ul>
    <li><simple-time-picker></simple-time-picker></li>
    <li><simple-time-picker value="12:40:00 - 15:30:00"></simple-time-picker></li>
    <li><simple-time-picker :interval="['10:30:00', '14:50:00']"></simple-time-picker></li>
    <li><simple-time-picker formate="hh:mm"></simple-time-picker></li>
    <li><simple-time-picker value="12:40:00 - 15:30:00" disabled></simple-time-picker></li>
    <li><simple-time-picker value="12:40:00 - 15:30:00" readonly></simple-time-picker></li>
  </ul>
</div>
      `,
    };
  },
});
</script>

<style lang="scss" scoped>
.time-picker-document {
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