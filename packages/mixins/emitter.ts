/*
 * @Author: Quarter
 * @Date: 2020-09-25 14:21:23
 * @LastEditors: Quarter
 * @LastEditTime: 2022-06-07 16:46:07
 * @Description: 广播和派发组件
 * @FilePath: /simple-ui/packages/mixins/emitter.ts
 */
import { Component, Vue } from "vue-property-decorator";

/**
 * 递归使用 call 方式this指向
 * @param componentName // 需要找的组件的名称
 * @param eventName // 事件名称
 * @param params // 需要传递的参数
 */
function broadcast(
  this: Vue,
  componentName: string,
  eventName: string,
  params: any[]
) {
  // 循环子节点找到名称一样的子节点 否则 递归 当前子节点
  this.$children.forEach((child: Vue) => {
    if (componentName === child.$options.name) {
      child.$emit.apply(child, [eventName, ...params]);
    }
    broadcast.apply(child, [componentName, eventName, params]);
  });
}

@Component
export default class Emmiter extends Vue {
  /**
   * 派发 (向上查找) (一个)
   * @param componentName // 需要找的组件的名称
   * @param eventName // 事件名称
   * @param params // 需要传递的参数
   */
  dispatch(componentName: string, eventName: string, params: any[]) {
    let parent: Vue = this.$parent || this.$root; // $parent 找到最近的父节点 $root 根节点
    let name: string | undefined = parent.$options.name; // 获取当前组件实例的name
    // 如果当前有节点 && 当前没名称 且 当前名称等于需要传进来的名称的时候就去查找当前的节点
    // 循环出当前名称的一样的组件实例
    while (parent && (!name || name !== componentName)) {
      parent = parent.$parent;
      if (parent) {
        name = parent.$options.name;
      }
    }
    // 有节点表示当前找到了name一样的实例
    if (parent) {
      parent.$emit.apply(parent, [eventName, ...params]);
    }
  }

  /**
   * 广播 (向下查找) (广播多个)
   * @param componentName // 需要找的组件的名称
   * @param eventName // 事件名称
   * @param params // 需要传递的参数
   */
  broadcast(componentName: string, eventName: string, params: any[]) {
    // 循环子节点找到名称一样的子节点 否则 递归 当前子节点
    broadcast.call(this, componentName, eventName, params);
  }
}
