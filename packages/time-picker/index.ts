/*
 * @Author: Quarter
 * @Date: 2022-04-07 12:07:55
 * @LastEditTime: 2022-12-14 09:07:17
 * @LastEditors: Quarter
 * @Description: 时间选择器组件入口
 * @FilePath: /simple-ui/packages/time-picker/index.ts
 */
import TimePicker from "./src/time-picker.vue";
import TimeRangerPicker from "./src/time-ranger-picker.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("STimePicker", TimePicker);
    vue.component("STimeRangerPicker", TimeRangerPicker);
  },
};

type TimePickerInstance = InstanceType<typeof TimePicker>;
type TimeRangerPickerInstance = InstanceType<typeof TimeRangerPicker>;

export default plugin;
export * from "./src/types";
export { TimePicker, TimePickerInstance, TimeRangerPicker, TimeRangerPickerInstance };
