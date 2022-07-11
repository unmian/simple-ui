/*
 * @Author: Quarter
 * @Date: 2022-04-07 12:07:55
 * @LastEditTime: 2022-06-10 11:13:25
 * @LastEditors: Quarter
 * @Description: 时间选择器组件入口
 * @FilePath: /simple-ui/packages/date-time-picker/index.ts
 */
import DateTimePicker from "./src/date-time-picker.vue";
import DateTimeRangerPicker from "./src/date-time-ranger-picker.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SDateTimePicker", DateTimePicker);
    vue.component("SDateTimeRangerPicker", DateTimeRangerPicker);
  },
} as PluginObject<any>;

export * from "./src/types";
export { DateTimePicker, DateTimeRangerPicker };
