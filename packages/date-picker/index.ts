/*
 * @Author: Quarter
 * @Date: 2022-04-07 12:07:55
 * @LastEditTime: 2022-12-14 08:49:08
 * @LastEditors: Quarter
 * @Description: 日期选择器组件入口
 * @FilePath: /simple-ui/packages/date-picker/index.ts
 */
import DatePicker from "./src/date-picker.vue";
import DateRangerPicker from "./src/date-ranger-picker.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SDatePicker", DatePicker);
    vue.component("SDateRangerPicker", DateRangerPicker);
  },
};

type DatePickerInstance = InstanceType<typeof DatePicker>;
type DateRangerPickerInstance = InstanceType<typeof DateRangerPicker>;

export default plugin;
export * from "./src/types";
export { DatePicker, DatePickerInstance, DateRangerPicker, DateRangerPickerInstance };
