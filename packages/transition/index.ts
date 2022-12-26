/*
 * @Author: Quarter
 * @Date: 2020-07-16 09:35:29
 * @LastEditors: Quarter
 * @LastEditTime: 2022-12-14 09:09:15
 * @Description: 全局注册自定义UI组件
 */
import CollapseTransition from "./src/collapse-transition.vue";
import CollapseTransitionGroup from "./src/collapse-transition-group.vue";
import FadeTransition from "./src/fade-transition.vue";
import FadeTransitionGroup from "./src/fade-transition-group.vue";
import ScaleTransition from "./src/scale-transition.vue";
import ScaleTransitionGroup from "./src/scale-transition-group.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

const plugin: PluginObject<any> = {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("CollapseTransition", CollapseTransition);
    vue.component("CollapseTransitionGroup", CollapseTransitionGroup);
    vue.component("FadeTransition", FadeTransition);
    vue.component("FadeTransitionGroup", FadeTransitionGroup);
    vue.component("ScaleTransition", ScaleTransition);
    vue.component("ScaleTransitionGroup", ScaleTransitionGroup);
  },
};

type CollapseTransitionInstance = InstanceType<typeof CollapseTransition>;
type CollapseTransitionGroupInstance = InstanceType<typeof CollapseTransitionGroup>;
type FadeTransitionInstance = InstanceType<typeof FadeTransition>;
type FadeTransitionGroupInstance = InstanceType<typeof FadeTransitionGroup>;
type ScaleTransitionInstance = InstanceType<typeof ScaleTransition>;
type ScaleTransitionGroupInstance = InstanceType<typeof ScaleTransitionGroup>;

export default plugin;
export {
  CollapseTransition,
  CollapseTransitionInstance,
  CollapseTransitionGroup,
  CollapseTransitionGroupInstance,
  FadeTransition,
  FadeTransitionInstance,
  FadeTransitionGroup,
  FadeTransitionGroupInstance,
  ScaleTransition,
  ScaleTransitionInstance,
  ScaleTransitionGroup,
  ScaleTransitionGroupInstance,
};
