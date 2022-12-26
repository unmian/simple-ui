/*
 * @Author: Quarter
 * @Date: 2022-04-07 12:07:55
 * @LastEditTime: 2022-12-14 09:02:51
 * @LastEditors: Quarter
 * @Description: 标签组件入口
 * @FilePath: /simple-ui/packages/tag/index.ts
 */
import Tag from "./src/tag.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("STag", Tag);
  },
};

type TagInstance = InstanceType<typeof Tag>;

export default plugin;
export { Tag, TagInstance };
