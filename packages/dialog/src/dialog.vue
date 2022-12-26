<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-12-13 15:34:29
 * @LastEditors: Quarter
 * @Description: 简易的弹窗组件
 * @FilePath: /simple-ui/packages/dialog/src/dialog.vue
-->
<template>
  <div
    class="s-dialog"
    v-if="unsyncedVisible"
    :style="{ zIndex }"
    :class="{ 'global-mode': global }"
    @touchmove.stop.prevent
  >
    <div class="dialog-shadow" @click="closeDialog"></div>
    <scale-transition>
      <div class="dialog-container" :style="{ width, height }" v-if="delayVisible">
        <s-scroll>
          <slot></slot>
        </s-scroll>
      </div>
    </scale-transition>
  </div>
</template>

<script lang="ts">
import { Scroll } from "packages/scroll";
import variables from "packages/variables";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "SDialog",
  components: {
    SScroll: Scroll,
  },
})
export default class Dialog extends Vue {
  @Prop(String)
  width?: string; // 弹窗宽度

  @Prop(String)
  height?: string; // 弹窗宽度

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

  @Prop(Boolean)
  global?: boolean; // 是否全局

  zIndex = variables.zIndex; // 层级
  unsyncedVisible = false; // 内部的显示
  delayVisible = false; // 延迟显示

  /**
   * @description: 是否显示弹窗
   * @return {boolean}
   */
  get syncedVisible(): boolean {
    return this.visible;
  }

  /**
   * @description: 是否显示弹窗
   * @param {boolean} val 值
   * @return
   */
  set syncedVisible(val: boolean) {
    this.$emit("update:visible", val);
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  created(): void {
    if (typeof this.syncedVisible === "boolean") {
      this.unsyncedVisible = this.syncedVisible;
    }
  }

  /**
   * @description: 监听外部传入参数变化
   * @param {Boolean} newValue 变化后的值
   * @return
   */
  @Watch("visible")
  handleVisibleChange(newValue: boolean): void {
    if (newValue === true) {
      this.unsyncedVisible = newValue;
    } else {
      this.delayVisible = false;
      setTimeout(() => {
        this.unsyncedVisible = false;
      }, 200);
    }
  }

  /**
   * @description: 监听内部显隐的变化
   * @param {Boolean} newValue 变化后的值
   * @return
   */
  @Watch("unsyncedVisible")
  handleUnsyncedVisibleChange(newValue: boolean): void {
    if (newValue === true) {
      this.zIndex = ++variables.zIndex;
      this.$nextTick(() => {
        this.delayVisible = this.unsyncedVisible;
      });
    }
  }

  /**
   * @description: 关闭弹窗
   * @return
   */
  closeDialog(): void {
    if (this.shadowClose === true && this.unsyncedVisible !== false) {
      this.delayVisible = false;
      this.$emit("close");
      setTimeout(() => {
        this.unsyncedVisible = false;
        this.syncedVisible = false;
      }, 200);
    }
  }
}
</script>

<style lang="scss">
.s-dialog {
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
    background-color: var(--shadow-color, rgba(51, 64, 84, 0.5));
    backdrop-filter: blur(2px);
    position: absolute;
    top: 0;
    left: 0;
  }

  .dialog-container {
    max-width: 100%;
    max-height: 100%;
    padding: var(--dialog-padding, 20px);
    border-radius: var(--dialog-radius, 6px);
    box-sizing: border-box;
    box-shadow: 0px 3px 6px 0px rgba(20, 24, 27, 0.5);
    background-color: #ffffff;
    overflow: hidden;
    position: relative;
  }
}
</style>
