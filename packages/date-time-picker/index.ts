/*
 * @Author: Quarter
 * @Date: 2022-04-07 12:07:55
 * @LastEditTime: 2022-12-14 08:50:02
 * @LastEditors: Quarter
 * @Description: 时间选择器组件入口
 * @FilePath: /simple-ui/packages/date-time-picker/index.ts
 */
import DateTimePicker from "./src/date-time-picker.vue";
import DateTimeRangerPicker from "./src/date-time-ranger-picker.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SDateTimePicker", DateTimePicker);
    vue.component("SDateTimeRangerPicker", DateTimeRangerPicker);
  },
};

type DateTimePickerInstance = InstanceType<typeof DateTimePicker>;
type DateTimeRangerPickerInstance = InstanceType<typeof DateTimeRangerPicker>;

export default plugin;
export * from "./src/types";
export {
  DateTimePicker,
  DateTimePickerInstance,
  DateTimeRangerPicker,
  DateTimeRangerPickerInstance,
};
