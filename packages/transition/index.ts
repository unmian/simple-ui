/*
 * @Author: Quarter
 * @Date: 2020-07-16 09:35:29
 * @LastEditors: Quarter
 * @LastEditTime: 2022-04-07 11:34:51
 * @Description: 全局注册自定义UI组件
 */
import CollapseTransition from "./src/collapse-transition.vue";
import CollapseTransitionGroup from "./src/collapse-transition-group.vue";
import FadeTransition from "./src/fade-transition.vue";
import FadeTransitionGroup from "./src/fade-transition-group.vue";
import ScaleTransition from "./src/scale-transition.vue";
import ScaleTransitionGroup from "./src/scale-transition-group.vue";
import Vue, { PluginObject, VueConstructor } from "vue";

export default {
  install: (vue: VueConstructor<Vue>): void => {
    vue.component("CollapseTransition", CollapseTransition);
    vue.component("CollapseTransitionGroup", CollapseTransitionGroup);
    vue.component("FadeTransition", FadeTransition);
    vue.component("FadeTransitionGroup", FadeTransitionGroup);
    vue.component("ScaleTransition", ScaleTransition);
    vue.component("ScaleTransitionGroup", ScaleTransitionGroup);
  },
} as PluginObject<any>;

export {
  CollapseTransition,
  CollapseTransitionGroup,
  FadeTransition,
  FadeTransitionGroup,
  ScaleTransition,
  ScaleTransitionGroup,
};