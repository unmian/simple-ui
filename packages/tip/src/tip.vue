<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-06-07 17:18:54
 * @LastEditors: Quarter
 * @Description: 简易的提示框
 * @FilePath: /simple-ui/packages/tip/src/tip.vue
-->
<template>
  <div class="s-tip">
    <div
      class="tip-reference"
      ref="reference"
      @mouseover="moveOverTip"
      @mouseleave="leaveTip"
      @mouseenter="enterTip"
      @click.stop="clickTip"
    >
      <slot></slot>
    </div>
    <div
      :id="randomIdStr"
      class="tip-content"
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
export default class STip extends Vue {
  @Prop({
    type: String,
    default: "bottom",
  })
  position?: CommonPosition; // 弹窗位置

  @Prop({
    type: String,
    default: "dark",
  })
  mode?: CommonThemeMode; // 主题模式

  @Prop({
    type: String,
    default: "hover",
  })
  trigger?: CommonAction; // 触发方式

  @Prop(String)
  tip?: string; // 提示消息

  @Prop([Number, String])
  delay?: string | number; // 延迟毫秒数

  @Prop({
    type: Boolean,
    default: false,
  })
  show?: boolean; // 是否显示

  @Prop(String)
  specialClass?: string; // 特殊类名

  @Prop({
    type: Boolean,
    default: false,
  })
  hideArrow?: boolean; // 是否显示

  @Prop({
    type: Boolean,
    default: false,
  })
  disabled?: boolean; // 禁用

  randomId = 0; // 随机id
  zIndex = variables.zIndex; // 层级
  hasSlot = false; // 是否存在插槽内容
  unsyncedShow = false; // 弹窗是否可见
  popElement: HTMLElement | null = null; // 弹窗DOM元素
  adjustPosition: CommonPosition = "bottom"; // 适应的位置
  customStyle: CustomStyle = {
    // 自定义样式
    "--tip-margin-left": 0,
    "--tip-margin-top": 0,
    "--tip-arrow-margin-left": 0,
    "--tip-arrow-margin-top": 0,
  };
  closeDelay: number | undefined = undefined; // 延迟关闭
  key = UUID(); // 帧计算下标

  /**
   * @description: 是否显示
   * @author: Quarter
   * @return {boolean}
   */
  get syncedShow(): boolean {
    return this.show || false;
  }

  /**
   * @description: 是否显示
   * @author: Quarter
   * @param {boolean} val 值
   * @return
   */
  set syncedShow(val: boolean) {
    this.$emit("update:show");
  }

  /**
   * @description: 弹窗元素的id字符串
   * @author: Quarter
   * @return {String}
   */
  get randomIdStr(): string {
    return `s-popove-${this.randomId}`;
  }

  /**
   * @description: 弹窗是否显示字符串
   * @author: Quarter
   * @return {String}
   */
  get tipHidden(): string {
    return (!this.unsyncedShow).toString();
  }

  /**
   * @description: 是否显示提示
   * @author: Quarter
   * @return {Boolean}
   */
  get tipVisible(): boolean {
    if (
      typeof this.tip === "string" &&
      this.tip.replace(/\s/g, "").length > 0
    ) {
      return true;
    }
    return false;
  }

  /**
   * @description: 过滤的定位方式
   * @author: Quarter
   * @return {CommonPosition}
   */
  get filterPosition(): CommonPosition {
    const positionList: CommonPosition[] = ["top", "bottom", "left", "right"];
    if (
      typeof this.position === "string" &&
      positionList.includes(this.position)
    ) {
      return this.position;
    }
    return "bottom";
  }

  /**
   * @description: 自定义类名
   * @author: Quarter
   * @return {CustomClass}
   */
  get customClass(): CustomClass {
    const classNames: CustomClass = {
      "position-top": this.adjustPosition === "top",
      "position-left": this.adjustPosition === "left",
      "position-bottom": this.adjustPosition === "bottom",
      "position-right": this.adjustPosition === "right",
      "theme-dark": this.mode === "dark",
      "theme-light": this.mode === "light",
      "hide-arrow": this.hideArrow === true,
    };
    if (typeof this.specialClass === "string" && this.specialClass.length > 0) {
      classNames[this.specialClass] = true;
    }
    return classNames;
  }

  /**
   * @description: 弹窗样式
   * @author: Quarter
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
      styles["--tip-arrow-margin-left"] =
        this.customStyle["--tip-arrow-margin-left"];
    }
    if (typeof this.customStyle["--tip-arrow-margin-top"] === "string") {
      styles["--tip-arrow-margin-top"] =
        this.customStyle["--tip-arrow-margin-top"];
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
    } else {
      return 6;
    }
  }

  /**
   * @description: 过滤的延迟
   * @author: Quarter
   * @return
   */
  get filterDelay(): number {
    if (typeof this.delay === "number" && this.delay > 0) {
      return this.delay;
    }
    if (
      typeof this.delay === "string" &&
      new RegExp(/^[0-9]+(\.[0-9]+){0,1}$/).test(this.delay)
    ) {
      return parseInt(this.delay, 10);
    }
    return 0;
  }

  /**
   * @description: 生命周期函数
   * @author: Quarter
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
   * @author: Quarter
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
   * @author: Quarter
   * @return
   */
  beforeDestroy(): void {
    const db: AnimationIndex = Reflect.get(window, ANIMATION_INDEX_DB);
    const index: number | undefined = db[this.key];
    if (typeof index === "number") {
      cancelAnimationFrame(index);
    }
    const ele: HTMLElement | null = document.querySelector(
      "#" + this.randomIdStr
    );
    if (ele) {
      ele.remove();
    }
  }

  /**
   * @description: 监听显示的变化
   * @author: Quarter
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
   * @author: Quarter
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
   * @author: Quarter
   * @param {Boolean} visible 显隐
   * @return
   */
  switch(visible: boolean = false): void {
    if (this.unsyncedShow !== visible) {
      this.switchPopVisible();
    }
  }

  /**
   * @description: 鼠标进入提示
   * @author: Quarter
   * @return
   */
  enterTip(): void {
    if (typeof this.closeDelay === "number") {
      clearTimeout(this.closeDelay);
      this.closeDelay = undefined;
    }
    if (
      this.trigger === "hover" &&
      this.disabled === false &&
      this.unsyncedShow === false
    ) {
      this.switchPopVisible();
    }
  }

  /**
   * @description: 鼠标悬浮提示
   * @author: Quarter
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
   * @author: Quarter
   * @return
   */
  leaveTip(): void {
    if (
      this.trigger === "hover" &&
      this.unsyncedShow === true &&
      this.disabled === false
    ) {
      this.closeDelay = setTimeout(() => {
        this.switchPopVisible();
      }, this.filterDelay);
    }
  }

  /**
   * @description: 点击显示提示
   * @author: Quarter
   * @return
   */
  clickTip(): void {
    if (this.trigger === "click" && this.unsyncedShow === false) {
      this.switchPopVisible();
    }
  }

  /**
   * @description: 生成随意id
   * @author: Quarter
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
   * @author: Quarter;
   * @return
   */
  initPopElement(): void {
    this.popElement = document.querySelector("#" + this.randomIdStr);
    if (this.popElement) {
      document.body.appendChild(this.popElement);
    }
  }

  /**
   * @description: 调整弹窗位置
   * @author: Quarter
   * @return
   */
  adjustPopPosition(): void {
    const container: Element | Vue | (Element | Vue)[] | undefined =
      this.$refs.reference;
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
        this.popElement.style.minWidth = bounding.width + "px";
        const eleBounding: DOMRect = this.popElement.getBoundingClientRect();
        let top: number | null = null;
        let left: number | null = null;
        let bottom: number | null = null;
        let right: number | null = null;
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
              const marginLeft =
                left + eleBounding.width - maxWidth + (this.arrowSize + 4);
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
              const marginTop =
                top + eleBounding.height - maxHeight + (this.arrowSize + 4);
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
              const marginLeft =
                left + eleBounding.width - maxWidth + (this.arrowSize + 4);
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
              const marginTop =
                top + eleBounding.height - maxHeight + (this.arrowSize + 4);
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
        this.popElement.style.top = top === null ? "initial" : top + "px";
        this.popElement.style.left = left === null ? "initial" : left + "px";
        this.popElement.style.bottom =
          bottom === null ? "initial" : bottom + "px";
        this.popElement.style.right = right === null ? "initial" : right + "px";
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
          if (!this.unsyncedShow) {
            this.zIndex = ++variables.zIndex;
          }
          this.unsyncedShow = !this.unsyncedShow;
          const db: AnimationIndex = Reflect.get(window, ANIMATION_INDEX_DB);
          db[this.key] = requestAnimationFrame(this.adjustPopPosition);
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
  }
}
</script>

<style lang="scss">
.s-tip {
  position: relative;
  display: inline-block;

  .tip-reference {
    width: fit-content;
  }
}

.tip-content {
  border-radius: var(--tip-radius, 3px);
  border: 1px solid #e3e3e3;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: white;
  position: fixed;
  margin-top: var(--tip-margin-top, 0);
  margin-left: var(--tip-margin-left, 0);

  .s-tip__content {
    padding: 6px 12px;
    color: #535353;
    font-size: 14px;
  }

  .s-tip__arrow {
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

    .s-tip__arrow {
      border-bottom-width: 0;
      border-top-color: #e3e3e3;
      filter: drop-shadow(0 2px -12px rgba(0, 0, 0, 0.2));
      bottom: -6px;
      left: var(--tip-arrow-margin-left, calc(50% - 6px));

      &::after {
        border-bottom-width: 0;
        border-top-color: white;
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

    .s-tip__arrow {
      border-right-width: 0;
      border-left-color: #e3e3e3;
      filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.2));
      top: var(--tip-arrow-margin-top, calc(50% - 6px));
      right: -6px;

      &::after {
        border-right-width: 0;
        border-left-color: white;
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

    .s-tip__arrow {
      border-top-width: 0;
      border-bottom-color: #e3e3e3;
      filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.2));
      top: -6px;
      left: var(--tip-arrow-margin-left, calc(50% - 6px));

      &::after {
        border-top-width: 0;
        border-bottom-color: white;
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

    .s-tip__arrow {
      border-left-width: 0;
      border-right-color: #e3e3e3;
      filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.2));
      top: var(--tip-arrow-margin-top, calc(50% - 6px));
      left: -6px;

      &::after {
        border-left-width: 0;
        border-right-color: white;
        left: 0;
        left: 1px;
        margin-top: -6px;
      }
    }
  }

  &.theme-dark {
    border: 1px solid #292929;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
    background-color: #303133;

    .s-tip__content {
      padding: 6px 12px;
      color: #ffffff;
      font-size: 14px;
    }

    &.position-top .s-tip__arrow {
      border-top-color: #292929;

      &::after {
        border-top-color: #303133;
      }
    }

    &.position-left .s-tip__arrow {
      border-left-color: #292929;

      &::after {
        border-left-color: #303133;
      }
    }

    &.position-bottom .s-tip__arrow {
      border-bottom-color: #292929;

      &::after {
        border-bottom-color: #303133;
      }
    }

    &.position-right .s-tip__arrow {
      border-right-color: #292929;

      &::after {
        border-right-color: #303133;
      }
    }
  }

  &.theme-light {
    border: 1px solid #e3e3e3;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
    background-color: white;

    .s-tip__content {
      padding: 6px 12px;
      color: #535353;
      font-size: 14px;
    }

    &.position-top .s-tip__arrow {
      border-top-color: #e3e3e3;

      &::after {
        border-top-color: white;
      }
    }

    &.position-left .s-tip__arrow {
      border-left-color: #e3e3e3;

      &::after {
        border-left-color: white;
      }
    }

    &.position-bottom .s-tip__arrow {
      border-bottom-color: #e3e3e3;

      &::after {
        border-bottom-color: white;
      }
    }

    &.position-right .s-tip__arrow {
      border-right-color: #e3e3e3;

      &::after {
        border-right-color: white;
      }
    }
  }

  &[ele-hidden="true"] {
    display: none;
  }
}
</style>
