<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-06-07 16:46:37
 * @LastEditors: Quarter
 * @Description: 简易的弹出层
 * @FilePath: /simple-ui/packages/popover/src/popover.vue
-->
<template>
  <div class="s-popover">
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
} from "packages/types";
import variables from "packages/variables";

@Component({
  name: "SPopover",
})
export default class SPopover extends Vue {
  @Prop({
    type: String,
    default: "bottom",
  })
  position?: CommonPosition; // 弹窗位置

  @Prop(String)
  color?: string; // 弹出层背景色

  @Prop(String)
  borderRadius?: string; // 圆角

  @Prop({
    type: Boolean,
    default: false,
  })
  show?: boolean; // 是否显示

  @Prop({
    type: Boolean,
    default: false,
  })
  onceClick?: boolean; // 点击关闭

  @Prop(String)
  specialClass?: string; // 特殊类名

  @Prop({
    type: Boolean,
    default: false,
  })
  hideArrow?: boolean; // 隐藏箭头

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
    "--popover-margin-left": 0,
    "--popover-margin-top": 0,
    "--popover-arrow-margin-left": 0,
    "--popover-arrow-margin-top": 0,
  };
  animateKey = UUID(); // 帧计算下标

  /**
   * @description: 是否显示
   * @author: Quarter
   * @return {boolean}
   */
  get syncedShow(): boolean {
    return !!this.show;
  }

  /**
   * @description: 过滤的定位
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
   * @description: 是否显示
   * @author: Quarter
   * @param {boolean} val 值
   * @return
   */
  set syncedShow(val: boolean) {
    this.$emit("update:show", val);
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
  get popoverHidden(): string {
    return (!this.unsyncedShow).toString();
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
  get popoverStyle(): CustomStyle {
    const styles: CustomStyle = {
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
    const container: Vue | Element | (Vue | Element)[] | undefined =
      this.$refs.reference;
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
  }

  /**
   * @description: 点击弹窗关闭
   * @author: Quarter
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

    .s-popover__arrow {
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

    .s-popover__arrow {
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

    .s-popover__arrow {
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
