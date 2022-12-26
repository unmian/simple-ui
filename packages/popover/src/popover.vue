<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-12-16 10:20:12
 * @LastEditors: Quarter
 * @Description: 简易的弹出层
 * @FilePath: /simple-ui/packages/popover/src/popover.vue
-->
<template>
  <div
    class="s-popover"
    ref="reference"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <slot name="reference"></slot>
    <div
      :id="randomIdStr"
      class="popover-content"
      :class="customClass"
      role="popover"
      ref="content"
      :ele-hidden="popoverHidden"
      :style="popoverStyle"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @click.stop.prevent
    >
      <div class="s-popover__content" @click="clickPop">
        <slot></slot>
      </div>
      <div class="s-popover__arrow" v-if="!hideArrow"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { ANIMATION_INDEX_DB } from "packages/constants";
import { UUID } from "packages/util";
import {
  AnimationIndex,
  CustomClass,
  CustomStyle,
  CommonPosition,
  CommonAction,
} from "packages/types";
import variables from "packages/variables";

@Component({
  name: "SPopover",
})
export default class Popover extends Vue {
  // 弹窗位置
  @Prop({
    type: String,
    default: "click",
  })
  readonly trigger!: CommonAction;

  // 弹窗位置
  @Prop({
    type: String,
    default: "bottom",
  })
  readonly position!: CommonPosition;

  // 延迟毫秒数
  @Prop([Number, String])
  delay?: string | number;

  // 弹出层背景色
  @Prop(String)
  readonly color?: string;

  // 圆角
  @Prop(String)
  readonly borderRadius?: string;

  // 是否显示
  @Prop({
    type: Boolean,
    default: false,
  })
  readonly show!: boolean;

  // 点击关闭
  @Prop({
    type: Boolean,
    default: false,
  })
  readonly onceClick!: boolean;

  // 特殊类名
  @Prop(String)
  readonly specialClass?: string;

  // 隐藏箭头
  @Prop({
    type: Boolean,
    default: false,
  })
  readonly hideArrow!: boolean;

  // 禁用
  @Prop({
    type: Boolean,
    default: false,
  })
  readonly disabled!: boolean;

  // 随机id
  randomId = 0;
  // 层级
  zIndex = variables.zIndex;
  // 是否存在插槽内容
  hasSlot = false;
  // 弹窗是否可见
  unsyncedShow = false;
  // 弹窗DOM元素
  popElement: HTMLElement | null = null;
  // 适应的位置
  adjustPosition: CommonPosition = "bottom";
  // 自定义样式
  customStyle: CustomStyle = {
    "--popover-margin-left": 0,
    "--popover-margin-top": 0,
    "--popover-arrow-margin-left": 0,
    "--popover-arrow-margin-top": 0,
  };
  // 延迟关闭
  closeDelay: number | undefined = undefined;
  // 帧计算下标
  animateKey = UUID();

  /**
   * @description: 过滤的触发方式
   * @return {CommonAction}
   */
  get filterTrigger(): CommonAction {
    const triggerList: CommonAction[] = ["click", "hover"];
    if (typeof this.trigger === "string" && triggerList.includes(this.trigger)) {
      return this.trigger;
    }
    return "click";
  }

  /**
   * @description: 过滤的定位
   * @return {CommonPosition}
   */
  get filterPosition(): CommonPosition {
    const positionList: CommonPosition[] = [
      "top",
      "bottom",
      "left",
      "left-top",
      "left-bottom",
      "right",
      "right-top",
      "right-bottom",
    ];
    if (typeof this.position === "string" && positionList.includes(this.position)) {
      return this.position;
    }
    return "bottom";
  }

  /**
   * @description: 过滤的延迟
   * @return
   */
  get filterDelay(): number {
    if (typeof this.delay === "number" && this.delay > 0) {
      return this.delay;
    }
    if (typeof this.delay === "string" && new RegExp(/^[0-9]+(\.[0-9]+){0,1}$/).test(this.delay)) {
      return parseInt(this.delay, 10);
    }
    return 50;
  }

  /**
   * @description: 是否显示
   * @param {boolean} val 值
   * @return
   */
  set syncedShow(val: boolean) {
    this.$emit("update:show", val);
  }

  /**
   * @description: 是否显示
   * @return {boolean}
   */
  get syncedShow(): boolean {
    return !!this.show;
  }

  /**
   * @description: 弹窗元素的id字符串
   * @return {String}
   */
  get randomIdStr(): string {
    return `s-popove-${this.randomId}`;
  }

  /**
   * @description: 弹窗是否显示字符串
   * @return {String}
   */
  get popoverHidden(): string {
    return (!this.unsyncedShow).toString();
  }

  /**
   * @description: 自定义类名
   * @return {CustomClass}
   */
  get customClass(): CustomClass {
    const classNames: CustomClass = {
      "position-top": this.adjustPosition === "top",
      "position-left": ["left", "left-top", "left-bottom"].includes(this.adjustPosition),
      "position-bottom": this.adjustPosition === "bottom",
      "position-right": ["right", "right-top", "right-bottom"].includes(this.adjustPosition),
      "hide-arrow": this.hideArrow === true,
    };
    if (typeof this.specialClass === "string" && this.specialClass.length > 0) {
      classNames[this.specialClass] = true;
    }
    return classNames;
  }

  /**
   * @description: 弹窗样式
   * @return {CustomStyle}
   */
  get popoverStyle(): CustomStyle {
    const styles: CustomStyle = {
      "z-index": this.zIndex.toString(),
    };
    if (typeof this.customStyle["--popover-margin-left"] === "string") {
      styles["--popover-margin-left"] = this.customStyle["--popover-margin-left"];
    }
    if (typeof this.customStyle["--popover-margin-top"] === "string") {
      styles["--popover-margin-top"] = this.customStyle["--popover-margin-top"];
    }
    if (typeof this.customStyle["--popover-arrow-margin-left"] === "string") {
      styles["--popover-arrow-margin-left"] = this.customStyle["--popover-arrow-margin-left"];
    }
    if (typeof this.customStyle["--popover-arrow-margin-top"] === "string") {
      styles["--popover-arrow-margin-top"] = this.customStyle["--popover-arrow-margin-top"];
    }
    if (typeof this.borderRadius === "string" && this.borderRadius) {
      styles["border-radius"] = this.borderRadius;
    }
    if (typeof this.color === "string" && this.color) {
      styles["--popover-background"] = this.color;
    }
    return styles;
  }

  /**
   * @description: 箭头大小
   * @author: number
   * @return {number}
   */
  get arrowSize(): number {
    if (this.hideArrow) {
      return 0;
    }
    return 6;
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  created(): void {
    if (!Reflect.has(window, ANIMATION_INDEX_DB)) {
      Reflect.set(window, ANIMATION_INDEX_DB, {});
    }
    this.unsyncedShow = this.syncedShow;
    this.adjustPosition = this.filterPosition;
    this.generateRandomId();
    if (this.$slots.default) {
      this.hasSlot = true;
    } else {
      this.hasSlot = false;
    }
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  mounted(): void {
    this.initPopElement();
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  beforeUpdate(): void {
    if (this.$slots.default) {
      this.hasSlot = true;
    } else {
      this.hasSlot = false;
    }
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  beforeDestroy(): void {
    const db: AnimationIndex = Reflect.get(window, ANIMATION_INDEX_DB);
    const index: number | undefined = db[this.animateKey];
    if (typeof index === "number") {
      cancelAnimationFrame(index);
    }
    const ele: HTMLElement | null = document.querySelector(`#${this.randomIdStr}`);
    if (ele) {
      ele.remove();
    }
  }

  /**
   * @description: 监听显示的变化
   * @param {Boolean} newValue 变化的值
   * @return
   */
  @Watch("show")
  handleShowChange(newValue: boolean): void {
    if (typeof newValue === "boolean" && newValue !== this.unsyncedShow) {
      this.switchPopVisible();
    }
  }

  /**
   * @description: 切换显隐
   * @param {Boolean} visible 显隐
   * @return
   */
  switch(visible = false): void {
    if (this.unsyncedShow !== visible) {
      this.switchPopVisible();
    }
  }

  /**
   * @description: 生成随意id
   * @return
   */
  generateRandomId(): void {
    let randomId: number = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
    while (document.querySelector(`s-popove-${randomId}`)) {
      randomId = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
    }
    this.randomId = randomId;
  }

  /**
   * @description: 初始化弹窗DOM元素
;
   * @return
   */
  initPopElement(): void {
    this.popElement = document.querySelector(`#${this.randomIdStr}`);
    if (this.popElement) {
      document.body.appendChild(this.popElement);
    }
  }

  /**
   * @description: 调整弹窗位置
   * @return
   */
  adjustPopPosition(): void {
    const container: Vue | Element | Array<Vue | Element> | undefined = this.$refs.reference;
    if (container instanceof HTMLDivElement) {
      const maxWidth: number = window.innerWidth;
      const maxHeight: number = window.innerHeight;
      const bounding: DOMRect = container.getBoundingClientRect();
      const styles: CustomStyle = {};
      this.adjustPosition = this.filterPosition;
      if (this.popElement) {
        if (this.popElement.style.visibility === "hidden") {
          this.popElement.style.visibility = "";
        }
        this.popElement.style.minWidth = `${bounding.width}px`;
        const eleBounding: DOMRect = this.popElement.getBoundingClientRect();
        let top: number | null = null;
        let left: number | null = null;
        let bottom: number | null = null;
        let right: number | null = null;
        // eslint-disable-next-line default-case
        switch (this.filterPosition) {
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
              const marginLeft = left + eleBounding.width - maxWidth + (this.arrowSize + 4);
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
              const marginTop = top + eleBounding.height - maxHeight + (this.arrowSize + 4);
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
          case "left-top":
            top = bounding.y;
            left = bounding.width + bounding.x;
            right = document.body.clientWidth - bounding.x;
            if (
              right + eleBounding.width > document.body.clientWidth &&
              left + eleBounding.width < document.body.clientWidth
            ) {
              right = null;
              this.adjustPosition = "right-top";
            } else {
              left = null;
            }
            if (top + eleBounding.height > maxHeight) {
              const marginTop = top + eleBounding.height - maxHeight;
              const contentMarginTop =
                marginTop < eleBounding.height - bounding.height
                  ? marginTop
                  : eleBounding.height - bounding.height;
              styles["--popover-margin-top"] = `-${contentMarginTop}px`;
              styles["--popover-arrow-margin-top"] = `${
                contentMarginTop + bounding.height / 2 - this.arrowSize
              }px`;
            } else {
              styles["--popover-arrow-margin-top"] = `${bounding.height / 2 - this.arrowSize}px`;
            }
            break;
          case "left-bottom":
            top = bounding.y - eleBounding.height + bounding.height;
            left = bounding.width + bounding.x;
            right = document.body.clientWidth - bounding.x;
            if (
              right + eleBounding.width > document.body.clientWidth &&
              left + eleBounding.width < document.body.clientWidth
            ) {
              right = null;
              this.adjustPosition = "right-bottom";
            } else {
              left = null;
            }
            if (top < 0) {
              const marginTop = Math.abs(top);
              const contentMarginTop =
                marginTop < eleBounding.height - bounding.height
                  ? marginTop
                  : eleBounding.height - bounding.height;
              styles["--popover-margin-top"] = `${contentMarginTop}px`;
              styles["--popover-arrow-margin-top"] = `${
                eleBounding.height - bounding.height / 2 - this.arrowSize - marginTop
              }px`;
            } else {
              styles["--popover-arrow-margin-top"] = `${
                eleBounding.height - bounding.height / 2 - this.arrowSize
              }px`;
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
              const marginLeft = left + eleBounding.width - maxWidth + (this.arrowSize + 4);
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
              const marginTop = top + eleBounding.height - maxHeight + (this.arrowSize + 4);
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
          case "right-top":
            top = bounding.y;
            left = bounding.width + bounding.x;
            right = document.body.clientWidth - bounding.x;
            if (
              left + eleBounding.width > document.body.clientWidth &&
              right + eleBounding.width < document.body.clientWidth
            ) {
              left = null;
              this.adjustPosition = "left-top";
            } else {
              right = null;
            }
            if (top + eleBounding.height > maxHeight) {
              const marginTop = top + eleBounding.height - maxHeight;
              const contentMarginTop =
                marginTop < eleBounding.height - bounding.height
                  ? marginTop
                  : eleBounding.height - bounding.height;
              styles["--popover-margin-top"] = `-${contentMarginTop}px`;
              styles["--popover-arrow-margin-top"] = `${
                contentMarginTop + bounding.height / 2 - this.arrowSize
              }px`;
            } else {
              styles["--popover-arrow-margin-top"] = `${bounding.height / 2 - this.arrowSize}px`;
            }
            break;
          case "right-bottom":
            top = bounding.y - eleBounding.height + bounding.height;
            left = bounding.width + bounding.x;
            right = document.body.clientWidth - bounding.x;
            if (
              left + eleBounding.width > document.body.clientWidth &&
              right + eleBounding.width < document.body.clientWidth
            ) {
              left = null;
              this.adjustPosition = "left-bottom";
            } else {
              right = null;
            }
            if (top < 0) {
              const marginTop = Math.abs(top);
              const contentMarginTop =
                marginTop < eleBounding.height - bounding.height
                  ? marginTop
                  : eleBounding.height - bounding.height;
              styles["--popover-margin-top"] = `${contentMarginTop}px`;
              styles["--popover-arrow-margin-top"] = `${
                eleBounding.height - bounding.height / 2 - this.arrowSize - marginTop
              }px`;
            } else {
              styles["--popover-arrow-margin-top"] = `${
                eleBounding.height - bounding.height / 2 - this.arrowSize
              }px`;
            }
            break;
        }
        this.popElement.style.top = top === null ? "initial" : `${top}px`;
        this.popElement.style.left = left === null ? "initial" : `${left}px`;
        this.popElement.style.bottom = bottom === null ? "initial" : `${bottom}px`;
        this.popElement.style.right = right === null ? "initial" : `${right}px`;
        this.customStyle = styles;
      }
      if (this.unsyncedShow) {
        const db: AnimationIndex = Reflect.get(window, ANIMATION_INDEX_DB);
        db[this.animateKey] = requestAnimationFrame(this.adjustPopPosition);
      }
    }
  }

  /**
   * @description: 切换显示状态
   * @return
   */
  switchPopVisible(e?: MouseEvent): void {
    if (e) {
      if (this.filterTrigger === "click" && ["mouseenter", "mouseleave"].includes(e.type)) {
        return;
      }
      if (this.filterTrigger === "hover" && ["click"].includes(e.type)) {
        return;
      }
    }
    if (this.disabled || !this.hasSlot) {
      return;
    }
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
          window.addEventListener("click", this.switchPopVisible);
        }, 0);
      } else {
        this.unsyncedShow = !this.unsyncedShow;
        window.removeEventListener("click", this.switchPopVisible);
      }
      this.$emit("switch", this.unsyncedShow);
      this.syncedShow = this.unsyncedShow;
    }
  }

  /**
   * @description: 处理鼠标点击
   * @return
   */
  handleClick(): void {
    if (this.trigger === "click" && this.unsyncedShow === false) {
      this.switchPopVisible();
    }
  }

  /**
   * @description: 处理鼠标进入
   * @return
   */
  handleMouseEnter(): void {
    if (typeof this.closeDelay === "number") {
      clearTimeout(this.closeDelay);
      this.closeDelay = undefined;
    }
    if (this.trigger === "hover" && this.disabled === false && this.unsyncedShow === false) {
      this.switchPopVisible();
    }
  }

  /**
   * @description: 处理鼠标离开
   * @return
   */
  handleMouseLeave(): void {
    if (this.trigger === "hover" && this.unsyncedShow === true && this.disabled === false) {
      this.closeDelay = setTimeout(() => {
        this.switchPopVisible();
      }, this.filterDelay);
    }
  }

  /**
   * @description: 点击弹窗关闭
   * @return
   */
  clickPop(): void {
    if (this.onceClick === true && this.unsyncedShow === true) {
      this.switchPopVisible();
    }
  }
}
</script>

<style lang="scss">
.s-popover {
  position: relative;
  display: inline-block;
}

.popover-content {
  border: 1px solid var(--s-border-color);
  border-radius: var(--s-border-radius);
  box-shadow: var(--s-shadow-3);
  background-color: var(--popover-background, var(--s-background-primary));
  position: fixed;
  margin-top: var(--popover-margin-top, 0);
  margin-left: var(--popover-margin-left, 0);

  .s-popover__arrow {
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

    .s-popover__arrow {
      border-bottom-width: 0;
      border-top-color: var(--s-border-color);
      filter: drop-shadow(0 2px -12px rgba(0, 0, 0, 0.1));
      bottom: -6px;
      left: var(--popover-arrow-margin-left, calc(50% - 6px));

      &::after {
        border-bottom-width: 0;
        border-top-color: var(--popover-background, var(--s-background-primary));
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

    .s-popover__arrow {
      border-right-width: 0;
      border-left-color: var(--s-border-color);
      filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.1));
      top: var(--popover-arrow-margin-top, calc(50% - 6px));
      right: -6px;

      &::after {
        border-right-width: 0;
        border-left-color: var(--popover-background, var(--s-background-primary));
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

    .s-popover__arrow {
      border-top-width: 0;
      border-bottom-color: var(--s-border-color);
      filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.1));
      top: -6px;
      left: var(--popover-arrow-margin-left, calc(50% - 6px));

      &::after {
        border-top-width: 0;
        border-bottom-color: var(--popover-background, var(--s-background-primary));
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

    .s-popover__arrow {
      border-left-width: 0;
      border-right-color: var(--s-border-color);
      filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.1));
      top: var(--popover-arrow-margin-top, calc(50% - 6px));
      left: -6px;

      &::after {
        border-left-width: 0;
        border-right-color: var(--popover-background, var(--s-background-primary));
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
