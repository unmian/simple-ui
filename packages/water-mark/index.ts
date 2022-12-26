/*
 * @Author: Quarter
 * @Date: 2022-04-08 02:20:53
 * @LastEditTime: 2022-12-14 09:11:20
 * @LastEditors: Quarter
 * @Description: 水印组件入口
 * @FilePath: /simple-ui/packages/water-mark/index.ts
 */
import WaterMark from "./src/water-mark.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("SWaterMark", WaterMark);
  },
};

type WaterMarkInstance = InstanceType<typeof WaterMark>;

export default plugin;
export { WaterMark, WaterMarkInstance };
