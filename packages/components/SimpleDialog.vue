<!--
 * @Author: Quarter
 * @Date: 2020-07-20 14:11:19
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-23 07:15:17
 * @Description: 简易的弹窗组件
--> 
<template>
  <div
    class="simple-dialog"
    v-if="unsyncedVisible"
    :style="{ zIndex }"
    :class="{ 'global-mode': global }"
    @touchmove.stop.prevent
  >
    <div class="dialog-shadow" @click="closeDialog"></div>
    <scale-transition>
      <div class="dialog-container" :style="{ width, height }" v-if="delayVisible">
        <simple-scroll>
          <slot></slot>
        </simple-scroll>
      </div>
    </scale-transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import variables from "../variables";
import SimpleScroll from "./SimpleScroll.vue";

export default Vue.extend({
  name: "SimpleDialog",
  components: {
    SimpleScroll,
  },
  props: {
    width: String, // 弹窗宽度
    height: String, // 弹窗宽度
    shadowClose: { // 点击遮罩关闭
      type: Boolean,
      default: false,
    },
    visible: { // 是否显示弹窗
      type: Boolean,
      default: false,
    },
    global: Boolean, // 是否全局
  },
  data() {
    return {
      zIndex: variables.zIndex, // 层级
      unsyncedVisible: false, // 内部的显示
      delayVisible: false, // 延迟显示
    };
  },
  computed: {
    /**
     * @description: 是否显示弹窗
     * @author: Quarter
     * @return {boolean}
     */
    syncedVisible: {
      get(): boolean {
        return this.visible;
      },
      set(val: boolean): void {
        this.$emit("update:visible", val);
      },
    },
  },
  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return
   */
  created(): void {
    if (typeof this.syncedVisible === "boolean") {
      this.unsyncedVisible = this.syncedVisible;
    }
  },
  watch: {
    /**
     * @description: 监听外部传入参数变化
     * @author: Quarter
     * @param {Boolean} newValue 变化后的值
     * @param {Boolean} oldValue 原始值
     * @return
     */
    visible(newValue: boolean, oldValue: boolean): void {
      if (newValue === true) {
        this.unsyncedVisible = newValue;
      } else {
        this.delayVisible = false;
        setTimeout(() => {
          this.unsyncedVisible = false;
        }, 200);
      }
    },
    /**
     * @description: 监听内部显隐的变化
     * @author: Quarter
     * @param {Boolean} newValue 变化后的值
     * @return
     */
    unsyncedVisible(newValue: boolean): void {
      if (newValue === true) {
        this.zIndex = ++variables.zIndex;
        this.$nextTick(() => {
          this.delayVisible = this.unsyncedVisible;
        });
      }
    },
  },
  methods: {
    /**
     * @description: 关闭弹窗
     * @author: Quarter
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
    },
  },
});
</script>

<style lang="scss">
.simple-dialog {
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