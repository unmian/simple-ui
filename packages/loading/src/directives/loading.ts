/*
 * @Author: Quarter
 * @Date: 2021-03-17 14:01:28
 * @LastEditTime: 2022-12-15 19:12:36
 * @LastEditors: Quarter
 * @Description: loading 指令
 * @FilePath: /simple-ui/packages/loading/src/directives/loading.ts
 */
import { DirectiveBinding } from "vue/types/options";
import Loading from "../loading.vue";

/**
 * @description: 插入DOM 元素
 * @param {HTMLElement} el 当前元素
 * @param {DirectiveBinding} binding 绑定
 * @return
 */
const toggleLoading = (el: HTMLElement, binding: DirectiveBinding) => {
  const instance = Reflect.get(el, "__s-loading-instance");
  if (!instance) {
    return;
  }
  if (binding.value) {
    instance.visible = true;
  } else {
    instance.visible = false;
  }
};

/**
 * @description: 插入DOM 元素
 * @param {HTMLElement} parent 父级元素
 * @param {HTMLElement} el 当前元素
 * @param {DirectiveBinding} binding 绑定
 * @return
 */
const insertDom = (parent: HTMLElement, el: HTMLElement) => {
  const instance = Reflect.get(el, "__s-loading-instance");
  if (!instance) {
    return;
  }
  if (parent.nodeName !== "body") {
    const { position } = getComputedStyle(el);
    if ([undefined, "", "static"].includes(position)) {
      Reflect.set(parent.style, "position", "relative");
    }
  }
  parent.appendChild(instance.$el);
};

// 注册 loading 指令
export default {
  bind: (el: HTMLElement, binding: DirectiveBinding) => {
    if (Reflect.has(el, "__s-loading-instance")) {
      return;
    }
    const theme: string | undefined = el.getAttribute("s-loading-theme") || undefined;
    const text: string | undefined = el.getAttribute("s-loading-text") || undefined;
    const size: string | undefined = el.getAttribute("s-loading-size") || undefined;
    const color: string | undefined = el.getAttribute("s-loading-color") || undefined;
    const loading = new Loading({
      el: document.createElement("div"),
      propsData: {
        fullscreen: binding.modifiers.fullscreen,
        theme,
        text,
        size,
        color,
      },
    });
    Reflect.set(el, "__s-loading-instance", loading);
    if (binding.modifiers.fullscreen) {
      insertDom(document.body, el);
    } else {
      insertDom(el, el);
    }
    toggleLoading(el, binding);
  },
  update: (el: HTMLElement, binding: DirectiveBinding) => {
    if (binding.oldValue !== binding.value) {
      toggleLoading(el, binding);
    }
  },
  unbind: (el: HTMLElement) => {
    const instance = Reflect.get(el, "__s-loading-instance");
    if (!instance) {
      return;
    }
    instance.visible = true;
    if (instance instanceof Loading) {
      if (instance.$el instanceof HTMLElement) {
        instance.$el.remove();
      }
      instance.$destroy();
    }
  },
};
