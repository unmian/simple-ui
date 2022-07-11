<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-06-07 16:41:15
 * @LastEditors: Quarter
 * @Description: 简易的弹窗组件
 * @FilePath: /simple-ui/packages/dialog/src/dialog-box.vue
-->
<template>
  <div
    class="s-dialog-box"
    v-if="unsyncedVisible"
    :style="{ zIndex }"
    :class="{ 'global-mode': global }"
    @touchmove.stop.prevent
  >
    <div class="dialog-shadow" @click="shadowCloseDialog"></div>
    <scale-transition>
      <div
        class="dialog-container"
        ref="dialogContainer"
        v-if="delayVisible"
        :style="{ width, height }"
      >
        <div class="dialog-header" ref="dialogHeader">
          <div class="dialog-title">{{ title }}</div>
          <div class="dialog-close">
            <s-button type="normal" @click="closeDialog">
              <i class="s-icon-close"></i>
            </s-button>
          </div>
        </div>
        <div class="dialog-content" ref="dialogContent" :style="{ maxHeight }">
          <s-scroll full>
            <slot></slot>
          </s-scroll>
        </div>
      </div>
    </scale-transition>
  </div>
</template>

<script lang="ts">
import { ANIMATION_INDEX_DB } from "packages/constants";
import { UUID } from "packages/util";
import { AnimationIndex } from "packages/types";
import variables from "packages/variables";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "SDialogBox",
})
export default class SDialogBox extends Vue {
  @Prop(String)
  width?: string; // 弹窗宽度

  @Prop(String)
  title?: string; // 标题

  @Prop(String)
  maxHeight?: string; // 弹窗最大高度

  @Prop({
    type: Boolean,
    default: false,
  })
  shadowClose!: boolean; // 点击遮罩关闭

  @Prop({
    type: Boolean,
    default: false,
  })
  visible!: boolean; // 是否显示弹窗

  @Prop({
    type: Boolean,
    default: false,
  })
  global!: boolean; // 是否全局

  dialogWidth = 0; // 容器宽度
  dialogHeight = 0; // 容器高度
  unsyncedVisible = false; // 内部的显示
  zIndex = variables.zIndex; // 层级
  delayVisible = false; // 延迟显示
  height = ""; // 容器高度
  key = UUID(); // 帧运算

  /**
   * @description: 是否显示弹窗
   * @author: Quarter
   * @return {boolean}
   */
  get syncedVisible(): boolean {
    return this.visible;
  }

  /**
   * @description: 是否显示弹窗
   * @author: Quarter
   * @param {boolean} val 值
   * @return
   */
  set syncedVisible(val: boolean) {
    this.$emit("update:visible", val);
  }

  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return
   */
  created(): void {
    if (typeof this.syncedVisible === "boolean") {
      this.unsyncedVisible = this.syncedVisible;
    }
    if (!Reflect.has(window, ANIMATION_INDEX_DB)) {
      Reflect.set(window, ANIMATION_INDEX_DB, {});
    }
    const db: AnimationIndex = Reflect.get(window, ANIMATION_INDEX_DB);
    db[this.key] = requestAnimationFrame(this.calcDialogSize);
  }

  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return
   */
  beforeDestroy() {
    const db: AnimationIndex = Reflect.get(window, ANIMATION_INDEX_DB);
    const index: number | undefined = db[this.key];
    if (typeof index === "number") {
      cancelAnimationFrame(index);
    }
  }

  /**
   * @description: 监听外部传入参数变化
   * @author: Quarter
   * @return
   */
  @Watch("visible")
  handleVisibleChange(): void {
    if (this.syncedVisible === true) {
      this.unsyncedVisible = true;
    } else {
      this.delayVisible = false;
      this.$emit("close");
      setTimeout(() => {
        this.unsyncedVisible = false;
      }, 200);
    }
  }

  /**
   * @description: 监听内部显隐的变化
   * @author: Quarter
   * @param {Boolean} newValue 变化后的值
   * @return
   */
  @Watch("unsyncedVisible")
  handleUnsyncedVisibleChange(newValue: boolean) {
    if (newValue === true) {
      this.zIndex = ++variables.zIndex;
      this.$nextTick(() => {
        this.delayVisible = this.unsyncedVisible;
      });
    }
  }

  /**
   * @description: 通过蒙版关闭弹窗
   * @author: Quarter
   * @return
   */
  shadowCloseDialog(): void {
    if (this.shadowClose === true) {
      this.closeDialog();
    }
  }

  /**
   * @description: 关闭弹窗
   * @author: Quarter
   * @return
   */
  closeDialog(): void {
    if (this.unsyncedVisible !== false) {
      this.delayVisible = false;
      this.$emit("click-close");
      this.$emit("close");
      setTimeout(() => {
        this.unsyncedVisible = false;
        this.syncedVisible = false;
      }, 200);
    }
  }

  /**
   * @description: 弹窗尺寸监控
   * @author: Quarter
   * @return
   */
  calcDialogSize(): void {
    if (
      this.$refs.dialogContainer instanceof HTMLElement &&
      this.$refs.dialogContent instanceof HTMLElement
    ) {
      const container: DOMRect =
        this.$refs.dialogContainer.getBoundingClientRect();
      let header: DOMRect | undefined;
      if (this.$refs.dialogHeader instanceof HTMLElement) {
        header = this.$refs.dialogHeader.getBoundingClientRect();
      }
      const content: DOMRect = this.$refs.dialogContent.getBoundingClientRect();
      this.dialogWidth = container.width;
      this.dialogHeight = container.height;
      if ((header ? header.height : 0) + content.height > container.height) {
        if (
          container.height ===
          window.document.documentElement.clientHeight * 0.8
        ) {
          this.height = "80%";
        }
      } else {
        this.height = "";
      }
    } else {
      this.dialogWidth = 0;
      this.dialogHeight = 0;
    }
    const db: AnimationIndex = Reflect.get(window, ANIMATION_INDEX_DB);
    db[this.key] = requestAnimationFrame(this.calcDialogSize);
  }
}
</script>

<style lang="scss">
.s-dialog-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;

  .dialog-shadow {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: var(--dialog-shadow, rgba(51, 64, 84, 0.5));
    backdrop-filter: blur(2px);
    position: absolute;
    top: 0;
    left: 0;
  }

  .dialog-container {
    max-width: 100%;
    max-height: 100%;
    border-radius: var(--dialog-radius, 6px);
    box-sizing: border-box;
    box-shadow: 0px 3px 6px 0px rgba(20, 24, 27, 0.5);
    background-color: #ffffff;
    overflow: hidden;
    position: relative;

    .dialog-header {
      width: 100%;
      height: 45px;
      padding: 0 10px 0 20px;
      background-color: #f9f9f9;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .dialog-title {
        min-width: 100px;
        color: #666666;
        font-size: 14px;
      }

      .dialog-close button {
        width: 24px;
        height: 24px;
        padding: 0;
        color: rgba($color: #999999, $alpha: 0.5);
        font-size: 20px;
        text-align: center;

        i {
          margin: 0;
        }

        &:hover {
          color: rgba($color: #000000, $alpha: 0.85);
        }
      }
    }

    .dialog-content {
      max-height: calc(100% - 45px);
      padding: var(--dialog-padding, 20px);
      box-sizing: border-box;
      overflow: hidden;
    }
  }

  .global-mode {
    position: fixed;
  }
}
</style>
