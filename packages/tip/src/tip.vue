<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-12-15 14:46:19
 * @LastEditors: Quarter
 * @Description: 简易的提示框
 * @FilePath: /simple-ui/packages/tip/src/tip.vue
-->
<template>
  <div
    class="s-tip"
    ref="reference"
    @mouseover="moveOverTip"
    @mouseleave="leaveTip"
    @mouseenter="enterTip"
    @click.stop="clickTip"
  >
    <slot></slot>
    <div
      :id="randomIdStr"
      class="s-top__container"
      :class="customClass"
      role="tip"
      ref="content"
      :ele-hidden="tipHidden"
      :style="tipStyle"
      v-if="tipVisible"
      @mouseenter="moveOverTip"
      @mouseover="moveOverTip"
      @mouseleave="leaveTip"
      @click.stop.prevent
    >
      <div class="s-tip__content">{{ tip }}</div>
      <div class="s-tip__arrow" v-if="!hideArrow"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { ANIMATION_INDEX_DB } from "packages/constants";
import { UUID } from "packages/util";
import {
  AnimationIndex,
  CommonAction,
  CustomClass,
  CustomStyle,
  CommonPosition,
  CommonThemeMode,
} from "packages/types";
import variables from "packages/variables";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "STip",
})
export default class Tip extends Vue {
  // 弹窗位置
  @Prop({
    type: String,
    default: "bottom",
  })
  readonly position?: CommonPosition;

  // 主题模式
  @Prop({
    type: String,
    default: "dark",
  })
  readonly mode?: CommonThemeMode;

  // 触发方式
  @Prop({
    type: String,
    default: "hover",
  })
  readonly trigger?: CommonAction;

  // 提示消息
  @Prop(String)
  readonly tip?: string;

  // 延迟毫秒数
  @Prop([Number, String])
  readonly delay?: string | number;

  // 是否显示
  @Prop({
    type: Boolean,
    default: false,
  })
  readonly show?: boolean;

  // 特殊类名
  @Prop(String)
  readonly specialClass?: string;

  // 是否显示
  @Prop({
    type: Boolean,
    default: false,
  })
  readonly hideArrow?: boolean;

  // 禁用
  @Prop({
    type: Boolean,
    default: false,
  })
  disabled?: boolean;

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
    "--tip-margin-left": 0,
    "--tip-margin-top": 0,
    "--tip-arrow-margin-left": 0,
    "--tip-arrow-margin-top": 0,
  };
  // 延迟关闭
  closeDelay: number | undefined = undefined;
  // 帧计算下标
  key = UUID();

  /**
   * @description: 是否显示
   * @return {boolean}
   */
  get syncedShow(): boolean {
    return this.show || false;
  }

  /**
   * @description: 是否显示
   * @param {boolean} val 值
   * @return
   */
  set syncedShow(val: boolean) {
    this.$emit("update:show");
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
  get tipHidden(): string {
    return (!this.unsyncedShow).toString();
  }

  /**
   * @description: 是否显示提示
   * @return {Boolean}
   */
  get tipVisible(): boolean {
    if (typeof this.tip === "string" && this.tip.replace(/\s/g, "").length > 0) {
      return true;
    }
    return false;
  }

  /**
   * @description: 过滤的定位方式
   * @return {CommonPosition}
   */
  get filterPosition(): CommonPosition {
    const positionList: CommonPosition[] = ["top", "bottom", "left", "right"];
    if (typeof this.position === "string" && positionList.includes(this.position)) {
      return this.position;
    }
    return "bottom";
  }

  /**
   * @description: 自定义类名
   * @return {CustomClass}
   */
  get customClass(): CustomClass {
    const classNames: CustomClass = {
      "s-tip--top": this.adjustPosition === "top",
      "s-tip--left": this.adjustPosition === "left",
      "s-tip--bottom": this.adjustPosition === "bottom",
      "s-tip--right": this.adjustPosition === "right",
      "theme-dark": this.mode === "dark",
      "theme-light": this.mode === "light",
      "s-tip--without-arrow": this.hideArrow === true,
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
  get tipStyle(): CustomStyle {
    const styles: CustomStyle = {
      "z-index": this.zIndex.toString(),
    };
    if (typeof this.customStyle["--tip-margin-left"] === "string") {
      styles["--tip-margin-left"] = this.customStyle["--tip-margin-left"];
    }
    if (typeof this.customStyle["--tip-margin-top"] === "string") {
      styles["--tip-margin-top"] = this.customStyle["--tip-margin-top"];
    }
    if (typeof this.customStyle["--tip-arrow-margin-left"] === "string") {
      styles["--tip-arrow-margin-left"] = this.customStyle["--tip-arrow-margin-left"];
    }
    if (typeof this.customStyle["--tip-arrow-margin-top"] === "string") {
      styles["--tip-arrow-margin-top"] = this.customStyle["--tip-arrow-margin-top"];
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
    return 0;
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
    const index: number | undefined = db[this.key];
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
   * @description: 监听禁用的变化
   * @return
   */
  @Watch("disabled")
  handleDisabledChange(): void {
    if (this.disabled && this.unsyncedShow === true) {
      this.unsyncedShow = false;
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
   * @description: 鼠标进入提示
   * @return
   */
  enterTip(): void {
    if (typeof this.closeDelay === "number") {
      clearTimeout(this.closeDelay);
      this.closeDelay = undefined;
    }
    if (this.trigger === "hover" && this.disabled === false && this.unsyncedShow === false) {
      this.switchPopVisible();
    }
  }

  /**
   * @description: 鼠标悬浮提示
   * @return
   */
  moveOverTip(): void {
    if (typeof this.closeDelay === "number") {
      clearTimeout(this.closeDelay);
      this.closeDelay = undefined;
    }
  }

  /**
   * @description: 鼠标离开提示
   * @return
   */
  leaveTip(): void {
    if (this.trigger === "hover" && this.unsyncedShow === true && this.disabled === false) {
      this.closeDelay = setTimeout(() => {
        this.switchPopVisible();
      }, this.filterDelay);
    }
  }

  /**
   * @description: 点击显示提示
   * @return
   */
  clickTip(): void {
    if (this.trigger === "click" && this.unsyncedShow === false) {
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
    const container: Element | Vue | Array<Element | Vue> | undefined = this.$refs.reference;
    const maxWidth: number = window.innerWidth;
    const maxHeight: number = window.innerHeight;
    if (container instanceof HTMLDivElement) {
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
              styles["--tip-margin-left"] = `-${contentMarginLeft}px`;
              styles[
                "--tip-arrow-margin-left"
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
              styles["--tip-margin-top"] = `-${contentMarginTop}px`;
              styles[
                "--tip-arrow-margin-top"
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
              const marginLeft = left + eleBounding.width - maxWidth + (this.arrowSize + 4);
              const contentMarginLeft =
                marginLeft + (this.arrowSize + 4) < eleBounding.width / 2
                  ? marginLeft
                  : eleBounding.width / 2 - (this.arrowSize + 4);
              styles["--tip-margin-left"] = `-${contentMarginLeft}px`;
              styles[
                "--tip-arrow-margin-left"
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
              styles["--tip-margin-top"] = `-${contentMarginTop}px`;
              styles[
                "--tip-arrow-margin-top"
              ] = `calc(50% - ${this.arrowSize} + ${contentMarginTop}px)`;
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
        db[this.key] = requestAnimationFrame(this.adjustPopPosition);
      }
    }
  }

  /**
   * @description: 切换显示状态
   * @return
   */
  switchPopVisible(): void {
    if (this.disabled || !this.hasSlot) {
      return;
    }
    if (this.popElement === null) {
      this.initPopElement();
    }
    if (this.popElement !== null) {
      if (this.unsyncedShow === false) {
        this.popElement.style.visibility = "hidden";
        if (!this.unsyncedShow) {
          this.zIndex = ++variables.zIndex;
        }
        this.unsyncedShow = !this.unsyncedShow;
        const db: AnimationIndex = Reflect.get(window, ANIMATION_INDEX_DB);
        db[this.key] = requestAnimationFrame(this.adjustPopPosition);
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
}
</script>

<style lang="scss">
.s-tip {
  position: relative;
  display: inline-block;
}

.s-top__container {
  color: var(--s-text-primary);
  font-size: 1.4rem;
  border-radius: var(--s-border-radius);
  border: 1px solid var(--s-border-color);
  box-shadow: var(--s-shadow-3);
  background-color: var(--s-background-primary);
  position: fixed;
  margin-top: var(--tip-margin-top, 0);
  margin-left: var(--tip-margin-left, 0);

  &[ele-hidden="true"] {
    display: none;
  }
}

.s-tip__content {
  padding: var(--s-spacing-8) var(--s-spacing-12);
}

.s-tip__arrow {
  width: 0;
  height: 0;
  border: 0.6rem solid transparent;
  position: absolute;

  &::after {
    content: "";
    width: 0;
    height: 0;
    border: 0.6rem solid transparent;
    display: block;
    position: absolute;
  }
}

.s-tip--top {
  margin-bottom: 1.2rem;

  &.s-tip--without-arrow {
    margin-bottom: 0;
  }

  .s-tip__arrow {
    border-bottom-width: 0;
    border-top-color: var(--s-border-color);
    filter: drop-shadow(0 2px -12px rgba(0, 0, 0, 0.2));
    bottom: -0.6rem;
    left: var(--tip-arrow-margin-left, calc(50% - 0.6rem));

    &::after {
      border-bottom-width: 0;
      border-top-color: var(--s-background-primary);
      bottom: 1px;
      left: 0;
      margin-left: -0.6rem;
    }
  }
}

.s-tip--left {
  margin-right: 1.2rem;

  &.s-tip--without-arrow {
    margin-right: 0;
  }

  .s-tip__arrow {
    border-right-width: 0;
    border-left-color: var(--s-border-color);
    filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.2));
    top: var(--tip-arrow-margin-top, calc(50% - 0.6rem));
    right: -0.6rem;

    &::after {
      border-right-width: 0;
      border-left-color: var(--s-background-primary);
      top: 0;
      right: 1px;
      margin-top: -0.6rem;
    }
  }
}

.s-tip--bottom {
  margin-top: 1.2rem;

  &.s-tip--without-arrow {
    margin-top: 0;
  }

  .s-tip__arrow {
    border-top-width: 0;
    border-bottom-color: var(--s-border-color);
    filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.2));
    top: -0.6rem;
    left: var(--tip-arrow-margin-left, calc(50% - 0.6rem));

    &::after {
      border-top-width: 0;
      border-bottom-color: var(--s-background-primary);
      top: 1px;
      left: 0;
      margin-left: -0.6rem;
    }
  }
}

.s-tip--right {
  margin-left: 1.2rem;

  &.s-tip--without-arrow {
    margin-left: 0;
  }

  .s-tip__arrow {
    border-left-width: 0;
    border-right-color: var(--s-border-color);
    filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.2));
    top: var(--tip-arrow-margin-top, calc(50% - 0.6rem));
    left: -0.6rem;

    &::after {
      border-left-width: 0;
      border-right-color: var(--s-background-primary);
      left: 0;
      left: 1px;
      margin-top: -0.6rem;
    }
  }
}
</style>
