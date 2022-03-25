<!--
 * @Author: Quarter
 * @Date: 2020-07-13 09:19:17
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-10 02:46:06
 * @Description: 主应用程序
--> 
<template>
  <div id="app">
    <router-view v-if="routerActive"></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  provide() {
    return {
      refresh: (): void => {
        this.routerActive = false;
        this.$nextTick(() => {
          this.routerActive = true;
        });
      },
    }
  },
  data() {
    return {
      fullScreen: false, // // 是否全屏
      fullScreenListening: false, // // 全屏键盘操作
      fullScreenTimeout: -1, // // 延迟取消
      routerActive: true, // 路由是否激活
    };
  },
  created() {
    // 在页面关闭前存储vuex数据
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem(
        "vuex-persistent-storage",
        JSON.stringify(this.$store.state)
      );
    });
    // 全屏显示
    this.refreshFullScreenState();
    window.document.addEventListener(
      "fullscreenchange",
      this.refreshFullScreenState
    );
    window.addEventListener("keypress", this.fullScreenSwitch);
  },
  beforeDestroy() {
    window.document.removeEventListener(
      "fullscreenchange",
      this.refreshFullScreenState
    );
    window.removeEventListener("keypress", this.fullScreenSwitch);
  },
  methods: {
    /**
     * @description: vuex状态合并
     * @aurtor: Quarter
     * @param {Object} targetState 目标对象
     * @param {Object} sourceState 来源对象
     * @return {Object}
     */
    stateMerge(targetState: any, sourceState: any): any {
      if (
        typeof targetState === "object" &&
        !Array.isArray(targetState) &&
        typeof sourceState === "object" &&
        !Array.isArray(sourceState)
      ) {
        Object.keys(sourceState).forEach((name: string) => {
          if (
            typeof sourceState[name] === "object" &&
            !Array.isArray(sourceState[name]) &&
            sourceState[name].__OBJECT_TYPE === "module"
          ) {
            if (typeof targetState[name] !== undefined) {
              if (
                typeof targetState[name] === "object" &&
                !Array.isArray(targetState[name])
              ) {
                targetState[name] = this.stateMerge(
                  targetState[name],
                  sourceState[name]
                );
              } else {
                targetState[name] = this.stateMerge({}, sourceState[name]);
              }
            }
          } else {
            targetState[name] = sourceState[name];
          }
        });
      }
      return targetState;
    },

    /**
     * @description: 全屏状态切换
     * @author: Quarter
     * @param {KeyboardEvent} event 键盘事件
     * @return
     */
    fullScreenSwitch(event: KeyboardEvent) {
      if (
        (event.code === "BracketLeft" || event.code === "BracketRight") &&
        event.ctrlKey === true
      ) {
        if (this.fullScreen === true) {
          window.document.exitFullscreen();
        } else {
          window.document.documentElement.requestFullscreen();
        }
      }
    },
    /**
     * @description: 刷新全屏状态
     * @author: Quarter
     * @return
     */
    refreshFullScreenState() {
      this.fullScreen = window.document.fullscreen;
    },
  },
});
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  color: #303133;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #fafbfc;
  overflow: hidden;
}
</style>
