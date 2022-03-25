<!--
 * @Author: Quarter
 * @Date: 2020-07-21 10:17:41
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-25 08:14:36
 * @Description: 简易的弹出框
--> 
<template>
  <div class="simple-popover">
    <div class="popover-reference" ref="reference" @click="switchPopVisible">
      <slot name="reference"></slot>
    </div>
    <div
      :id="randomIdStr"
      class="popover-content"
      :class="customClass"
      role="popover"
      ref="content"
      :ele-hidden="popoverHidden"
      :style="popoverStyle"
      @click.stop.prevent
    >
      <div class="simple-popover__content" @click="clickPop">
        <slot></slot>
      </div>
      <div class="simple-popover__arrow" v-if="!hideArrow"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { ANIMATION_INDEX_DB } from "../constants";
import { generateUUID } from "../expand/tool";
import {
  AnimationIndex,
  SimpleCustomClass,
  SimpleCustomStyle,
  SimplePosition,
} from "../types";
import variables from "../variables";

export default Vue.extend({
  name: "SimplePopover",
  props: {
    position: { // 弹窗位置
      type: String,
      default: "bottom",
    } as PropOptions<SimplePosition>,
    color: String, // 弹出层背景色
    borderRadius: String, // 圆角
    show: { // 是否显示
      type: Boolean,
      default: false,
    },
    onceClick: { // 点击关闭
      type: Boolean,
      default: false,
    },
    specialClass: String, // 特殊类名
    hideArrow: { // 隐藏箭头
      type: Boolean,
      default: false,
    },
    disabled: { // 禁用
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      randomId: 0, // 随机id
      zIndex: variables.zIndex, // 层级
      hasSlot: false, // 是否存在插槽内容
      unsyncedShow: false, // 弹窗是否可见
      popElement: null as null | HTMLElement, // 弹窗DOM元素
      adjustPosition: "bottom" as SimplePosition, // 适应的位置
      customStyle: { // 自定义样式
        "--popover-margin-left": 0,
        "--popover-margin-top": 0,
        "--popover-arrow-margin-left": 0,
        "--popover-arrow-margin-top": 0,
      } as SimpleCustomStyle,
      animateKey: generateUUID(), // 帧计算下标
    };
  },
  computed: {
    /**
     * @description: 是否显示
     * @author: Quarter
     * @return {boolean}
     */
    syncedShow: {
      get(): boolean {
        return this.show;
      },
      set(val: boolean) {
        this.$emit("update:show", val);
      },
    },
    /**
     * @description: 弹窗元素的id字符串
     * @author: Quarter
     * @return {String}
     */
    randomIdStr(): string {
      return `simple-popove-${this.randomId}`;
    },
    /**
     * @description: 弹窗是否显示字符串
     * @author: Quarter
     * @return {String}
     */
    popoverHidden(): string {
      return (!this.unsyncedShow).toString();
    },
    /**
     * @description: 自定义类名
     * @author: Quarter
     * @return {SimpleCustomClass}
     */
    customClass(): SimpleCustomClass {
      const classNames: SimpleCustomClass = {
        "position-top": this.adjustPosition === "top",
        "position-left": this.adjustPosition === "left",
        "position-bottom": this.adjustPosition === "bottom",
        "position-right": this.adjustPosition === "right",
        "hide-arrow": this.hideArrow === true,
      };
      if (typeof this.specialClass === "string" && this.specialClass.length > 0) {
        classNames[this.specialClass] = true;
      }
      return classNames;
    },
    /**
     * @description: 弹窗样式
     * @author: Quarter
     * @return {SimpleCustomStyle}
     */
    popoverStyle(): SimpleCustomStyle {
      const styles: SimpleCustomStyle = {
        "z-index": this.zIndex.toString(),
      };
      if (typeof this.customStyle["--popover-margin-left"] === "string") {
        styles["--popover-margin-left"] =
          this.customStyle["--popover-margin-left"];
      }
      if (typeof this.customStyle["--popover-margin-top"] === "string") {
        styles["--popover-margin-top"] = this.customStyle["--popover-margin-top"];
      }
      if (typeof this.customStyle["--popover-arrow-margin-left"] === "string") {
        styles["--popover-arrow-margin-left"] =
          this.customStyle["--popover-arrow-margin-left"];
      }
      if (typeof this.customStyle["--popover-arrow-margin-top"] === "string") {
        styles["--popover-arrow-margin-top"] =
          this.customStyle["--popover-arrow-margin-top"];
      }
      if (typeof this.borderRadius === "string" && this.borderRadius) {
        styles["border-radius"] = this.borderRadius;
      }
      if (typeof this.color === "string" && this.color) {
        styles["--popover-background"] = this.color;
      }
      return styles;
    },
    /**
     * @description: 箭头大小
     * @author: number
     * @return {number}
     */
    arrowSize(): number {
      if (this.hideArrow) {
        return 0;
      } else {
        return 6;
      }
    },
  },
  created(): void {
    if (!Reflect.has(window, ANIMATION_INDEX_DB)) {
      Reflect.set(window, ANIMATION_INDEX_DB, {});
    }
    this.unsyncedShow = this.syncedShow;
    this.adjustPosition = this.position;
    this.generateRandomId();
    if (this.$slots.default) {
      this.hasSlot = true;
    } else {
      this.hasSlot = false;
    }
  },
  beforeUpdate(): void {
    if (this.$slots.default) {
      this.hasSlot = true;
    } else {
      this.hasSlot = false;
    }
  },
  beforeDestroy(): void {
    const db: AnimationIndex = Reflect.get(window, ANIMATION_INDEX_DB);
    const index: number | undefined = db[this.animateKey];
    if (typeof index === "number") {
      cancelAnimationFrame(index);
    }
    const ele: HTMLElement | null = document.querySelector(
      "#" + this.randomIdStr
    );
    if (ele) {
      ele.remove();
    }
  },
  methods: {
    /**
     * @description: 切换显隐
     * @author: Quarter
     * @param {Boolean} visible 显隐
     * @return
     */
    switch(visible: boolean = false): void {
      if (this.unsyncedShow !== visible) {
        this.switchPopVisible();
      }
    },
    /**
     * @description: 生成随意id
     * @author: Quarter
     * @return
     */
    generateRandomId(): void {
      let randomId: number = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
      while (document.querySelector(`simple-popove-${randomId}`)) {
        randomId = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
      }
      this.randomId = randomId;
    },
    /**
     * @description: 初始化弹窗DOM元素
     * @author: Quarter;
     * @return
     */
    initPopElement(): void {
      this.popElement = document.querySelector("#" + this.randomIdStr);
      if (this.popElement) {
        document.body.appendChild(this.popElement);
      }
    },
    /**
     * @description: 调整弹窗位置
     * @author: Quarter
     * @return
     */
    adjustPopPosition(): void {
      const container: Vue | Element | (Vue | Element)[] | undefined = this.$refs.reference;
      if (container instanceof HTMLDivElement) {
        const maxWidth: number = window.innerWidth;
        const maxHeight: number = window.innerHeight;
        const bounding: DOMRect = container.getBoundingClientRect();
        const styles: SimpleCustomStyle = {};
        this.adjustPosition = this.position;
        if (this.popElement) {
          if (this.popElement.style.visibility === "hidden") {
            this.popElement.style.visibility = "";
          }
          this.popElement.style.minWidth = bounding.width + "px";
          const eleBounding: DOMRect = this.popElement.getBoundingClientRect();
          let top: number | null = null;
          let left: number | null = null;
          let bottom: number | null = null;
          let right: number | null = null;
          switch (this.position) {
            case "top":
              top = bounding.y + bounding.height;
              bottom = document.body.clientHeight - bounding.y;
              left = (bounding.width - eleBounding.width) / 2 + bounding.x;
              if (
                bottom + eleBounding.height > document.body.clientHeight &&
                top + eleBounding.height < document.body.clientHeight
              ) {
                bottom = null;
                this.adjustPosition = "bottom";
              } else {
                top = null;
              }
              if (left + eleBounding.width > maxWidth) {
                const marginLeft =
                  left + eleBounding.width - maxWidth + (this.arrowSize + 4);
                const contentMarginLeft =
                  marginLeft + (this.arrowSize + 4) < eleBounding.width / 2
                    ? marginLeft
                    : eleBounding.width / 2 - (this.arrowSize + 4);
                styles["--popover-margin-left"] = `-${contentMarginLeft}px`;
                styles[
                  "--popover-arrow-margin-left"
                ] = `calc(50% - ${this.arrowSize}px + ${contentMarginLeft}px)`;
              }
              break;
            case "left":
              top = bounding.y + (bounding.height - eleBounding.height) / 2;
              left = bounding.width + bounding.x;
              right = document.body.clientWidth - bounding.x;
              if (
                right + eleBounding.width > document.body.clientWidth &&
                left + eleBounding.width < document.body.clientWidth
              ) {
                right = null;
                this.adjustPosition = "right";
              } else {
                left = null;
              }
              if (top + eleBounding.height > maxHeight) {
                const marginTop =
                  top + eleBounding.height - maxHeight + (this.arrowSize + 4);
                const contentMarginTop =
                  marginTop + (this.arrowSize + 4) < eleBounding.height / 2
                    ? marginTop
                    : eleBounding.height / 2 - (this.arrowSize + 4);
                styles["--popover-margin-top"] = `-${contentMarginTop}px`;
                styles[
                  "--popover-arrow-margin-top"
                ] = `calc(50% - ${this.arrowSize} + ${contentMarginTop}px)`;
              }
              break;
            case "bottom":
              top = bounding.y + bounding.height;
              bottom = document.body.clientHeight - bounding.y;
              left = (bounding.width - eleBounding.width) / 2 + bounding.x;
              if (
                top + eleBounding.height > document.body.clientHeight &&
                bottom + eleBounding.height < document.body.clientHeight
              ) {
                top = null;
                this.adjustPosition = "top";
              } else {
                bottom = null;
              }
              if (left + eleBounding.width > maxWidth) {
                const marginLeft =
                  left + eleBounding.width - maxWidth + (this.arrowSize + 4);
                const contentMarginLeft =
                  marginLeft + (this.arrowSize + 4) < eleBounding.width / 2
                    ? marginLeft
                    : eleBounding.width / 2 - (this.arrowSize + 4);
                styles["--popover-margin-left"] = `-${contentMarginLeft}px`;
                styles[
                  "--popover-arrow-margin-left"
                ] = `calc(50% - ${this.arrowSize}px + ${contentMarginLeft}px)`;
              }
              break;
            case "right":
              top = (bounding.height - eleBounding.height) / 2 + bounding.y;
              left = bounding.width + bounding.x;
              right = document.body.clientWidth - bounding.x;
              if (
                left + eleBounding.width > document.body.clientWidth &&
                right + eleBounding.width < document.body.clientWidth
              ) {
                left = null;
                this.adjustPosition = "left";
              } else {
                right = null;
              }
              if (top + eleBounding.height > maxHeight) {
                const marginTop =
                  top + eleBounding.height - maxHeight + (this.arrowSize + 4);
                const contentMarginTop =
                  marginTop + (this.arrowSize + 4) < eleBounding.height / 2
                    ? marginTop
                    : eleBounding.height / 2 - (this.arrowSize + 4);
                styles["--popover-margin-top"] = `-${contentMarginTop}px`;
                styles[
                  "--popover-arrow-margin-top"
                ] = `calc(50% - ${this.arrowSize} + ${contentMarginTop}px)`;
              }
              break;
          }
          this.popElement.style.top = top === null ? "initial" : top + "px";
          this.popElement.style.left = left === null ? "initial" : left + "px";
          this.popElement.style.bottom =
            bottom === null ? "initial" : bottom + "px";
          this.popElement.style.right = right === null ? "initial" : right + "px";
          this.customStyle = styles;
        }
        if (this.unsyncedShow) {
          const db: AnimationIndex = Reflect.get(window, ANIMATION_INDEX_DB);
          db[this.animateKey] = requestAnimationFrame(this.adjustPopPosition);
        }
      }
    },
    /**
     * @description: 切换显示状态
     * @author: Quarter
     * @return
     */
    switchPopVisible(): void {
      if (!this.disabled && this.hasSlot) {
        if (this.popElement === null) {
          this.initPopElement();
        }
        if (this.popElement !== null) {
          if (this.unsyncedShow === false) {
            this.popElement.style.visibility = "hidden";
            this.zIndex = ++variables.zIndex;
            this.unsyncedShow = !this.unsyncedShow;
            const db: AnimationIndex = Reflect.get(window, ANIMATION_INDEX_DB);
            db[this.animateKey] = requestAnimationFrame(this.adjustPopPosition);
            setTimeout(() => {
              document.body.addEventListener("click", this.switchPopVisible);
            }, 0);
          } else {
            this.unsyncedShow = !this.unsyncedShow;
            document.body.removeEventListener("click", this.switchPopVisible);
          }
          this.$emit("switch", this.unsyncedShow);
          this.syncedShow = this.unsyncedShow;
        }
      }
    },
    /**
     * @description: 点击弹窗关闭
     * @author: Quarter
     * @return
     */
    clickPop(): void {
      if (this.onceClick === true && this.unsyncedShow === true) {
        this.switchPopVisible();
      }
    },
  },
  watch: {
    /**
     * @description: 监听显示的变化
     * @author: Quarter
     * @param {Boolean} newValue 变化的值
     * @return
     */
    show(newValue: boolean) {
      if (typeof newValue === "boolean" && newValue !== this.unsyncedShow) {
        this.switchPopVisible();
      }
    },
  },
});
</script>

<style lang="scss">
.simple-popover {
  position: relative;
  display: inline-block;

  .popover-reference {
    width: fit-content;
  }
}

.popover-content {
  // border: 1px solid rgba($color: #000000, $alpha: 0.05);
  border: 1px solid rgba($color: #000000, $alpha: 0.05);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
  background-color: var(--popover-background, #ffffff);
  position: fixed;
  margin-top: var(--popover-margin-top, 0);
  margin-left: var(--popover-margin-left, 0);

  .simple-popover__arrow {
    width: 0;
    height: 0;
    border: 6px solid transparent;
    position: absolute;

    &::after {
      content: "";
      width: 0;
      height: 0;
      border: 6px solid transparent;
      display: block;
      position: absolute;
    }
  }

  &.position-bottom &[ele-hidden="true"] {
    display: none;
  }

  &.position-top {
    margin-bottom: 12px;

    &.hide-arrow {
      margin-bottom: 0;
    }

    .simple-popover__arrow {
      border-bottom-width: 0;
      border-top-color: rgba($color: #000000, $alpha: 0.05);
      filter: drop-shadow(0 2px -12px rgba(0, 0, 0, 0.1));
      bottom: -6px;
      left: var(--popover-arrow-margin-left, calc(50% - 6px));

      &::after {
        border-bottom-width: 0;
        border-top-color: var(--popover-background, #ffffff);
        bottom: 1px;
        left: 0;
        margin-left: -6px;
      }
    }
  }

  &.position-left {
    margin-right: 12px;

    &.hide-arrow {
      margin-right: 0;
    }

    .simple-popover__arrow {
      border-right-width: 0;
      border-left-color: rgba($color: #000000, $alpha: 0.05);
      filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.1));
      top: var(--popover-arrow-margin-top, calc(50% - 6px));
      right: -6px;

      &::after {
        border-right-width: 0;
        border-left-color: var(--popover-background, #ffffff);
        top: 0;
        right: 1px;
        margin-top: -6px;
      }
    }
  }

  &.position-bottom {
    margin-top: 12px;

    &.hide-arrow {
      margin-top: 0;
    }

    .simple-popover__arrow {
      border-top-width: 0;
      border-bottom-color: rgba($color: #000000, $alpha: 0.05);
      filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.1));
      top: -6px;
      left: var(--popover-arrow-margin-left, calc(50% - 6px));

      &::after {
        border-top-width: 0;
        border-bottom-color: var(--popover-background, #ffffff);
        top: 1px;
        left: 0;
        margin-left: -6px;
      }
    }
  }

  &.position-right {
    margin-left: 12px;

    &.hide-arrow {
      margin-left: 0;
    }

    .simple-popover__arrow {
      border-left-width: 0;
      border-right-color: rgba($color: #000000, $alpha: 0.05);
      filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.1));
      top: var(--popover-arrow-margin-top, calc(50% - 6px));
      left: -6px;

      &::after {
        border-left-width: 0;
        border-right-color: var(--popover-background, #ffffff);
        left: 0;
        left: 1px;
        margin-top: -6px;
      }
    }
  }

  &[ele-hidden="true"] {
    display: none;
  }
}
</style>