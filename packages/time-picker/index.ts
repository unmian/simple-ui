/*
 * @Author: Quarter
 * @Date: 2022-04-07 12:07:55
 * @LastEditTime: 2022-06-10 11:14:00
 * @LastEditors: Quarter
 * @Description: 时间选择器组件入口
 * @FilePath: /simple-ui/packages/time-picker/index.ts
 */
import TimePicker from "./src/time-picker.vue";
import TimeRangerPicker from "./src/time-ranger-picker.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("STimePicker", TimePicker);
    vue.component("STimeRangerPicker", TimeRangerPicker);
  },
} as PluginObject<any>;

export * from "./src/types";
export { TimePicker, TimeRangerPicker };
