/*
 * @Author: Quarter
 * @Date: 2021-03-17 14:01:28
 * @LastEditTime: 2021-06-30 18:00:22
 * @LastEditors: Quarter
 * @Description: loading 指令
 * @FilePath: /simple-ui/src/simple-ui/directives/loading.ts
 */
import Vue, { VNode } from "vue";
import { DirectiveBinding } from "vue/types/options";
import SimpleLoading from "../components/SimpleLoading.vue";
const Loading = Vue.extend(SimpleLoading);

/**
 * @description: 插入DOM 元素
 * @author: Quarter
 * @param {HTMLElement} el 当前元素
 * @param {DirectiveBinding} binding 绑定
 * @return
 */
const toggleLoading = (el: HTMLElement, binding: DirectiveBinding) => {
  // @ts-ignore
  const { instance } = el;
  if (binding.value) {
    instance.visible = true;
  } else {
    instance.visible = false;
  }
};

/**
 * @description: 插入DOM 元素
 * @author: Quarter
 * @param {HTMLElement} parent 父级元素
 * @param {HTMLElement} el 当前元素
 * @param {DirectiveBinding} binding 绑定
 * @return
 */
const insertDom = (parent: HTMLElement, el: HTMLElement, binding: DirectiveBinding) => {
  // @ts-ignore
  const { instance } = el;
  if (parent.nodeName !== "body") {
    const styles: CSSStyleDeclaration = getComputedStyle(el);
    if (styles.position === "" || styles.position === "static") {
      parent.style.position = "relative";
    }
  }
  parent.appendChild(instance.$el);
};

// 注册 loading 指令
Vue.directive("loading", {
  bind: (el: HTMLElement, binding: DirectiveBinding, vnode: VNode) => {
    // @ts-ignore
    const { instance } = el;
    if (!!instance) {
      return;
    }
    const spinner: string | null = el.getAttribute("simple-loading-spinner");
    const text: string | null = el.getAttribute("simple-loading-text");
    let mode: string = "dark";
    if (!!binding.modifiers.dark) {
      mode = "dark";
    }
    if (!!binding.modifiers.light) {
      mode = "light";
    }
    const color: string | null = el.getAttribute("simple-loading-color");
    const maskInstance = new Loading({
      el: document.createElement("div"),
      props: {
        fullscreen: {
          default: !!binding.modifiers.fullscreen,
        },
        spinner: {
          default: spinner || undefined,
        },
        text: {
          default: text || undefined,
        },
        mode: {
          default: mode || undefined,
        },
        color: {
          default: color || undefined,
        },
      },
    });
    // @ts-ignore
    el.instance = maskInstance;
    if (binding.modifiers.fullscreen) {
      insertDom(document.body, el, binding);
    } else {
      insertDom(el, el, binding);
    }
    toggleLoading(el, binding);
  },
  update: (el: HTMLElement, binding: DirectiveBinding) => {
    if (binding.oldValue !== binding.value) {
      toggleLoading(el, binding);
    }
  },
  unbind: (el: HTMLElement, binding: DirectiveBinding) => {
    // @ts-ignore
    const { instance } = el;
    instance.visible = true;
    if (instance instanceof Loading) {
      if (instance.$el instanceof HTMLElement) {
        instance.$el.remove();
      }
      instance.$destroy();
    }
  },
});