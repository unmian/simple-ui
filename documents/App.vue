<!--
 * @Author: Quarter
 * @Date: 2020-07-13 09:19:17
 * @LastEditors: Quarter
 * @LastEditTime: 2022-12-15 19:54:35
 * @Description: 主应用程序
-->
<template>
  <div id="app">
    <router-view v-if="routerActive"></router-view>
  </div>
</template>

<script lang="ts">
import { LoadingDrective } from "@unmian/simple-ui";
import { Component, Provide, Vue } from "vue-property-decorator";

@Component({
  directives: {
    Loading: LoadingDrective,
  },
})
export default class App extends Vue {
  fullScreen = false; // // 是否全屏
  fullScreenListening = false; // // 全屏键盘操作
  fullScreenTimeout = -1; // // 延迟取消
  routerActive = true; // 路由是否激活

  /**
   * @description: 刷新
   * @return
   */
  @Provide("refresh")
  refresh(): void {
    this.routerActive = false;
    this.$nextTick(() => {
      this.routerActive = true;
    });
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  created() {
    // 在页面关闭前存储vuex数据
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("vuex-persistent-storage", JSON.stringify(this.$store.state));
    });
  }

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
          // eslint-disable-next-line valid-typeof
          if (typeof targetState[name] !== undefined) {
            if (typeof targetState[name] === "object" && !Array.isArray(targetState[name])) {
              // eslint-disable-next-line no-param-reassign
              targetState[name] = this.stateMerge(targetState[name], sourceState[name]);
            } else {
              // eslint-disable-next-line no-param-reassign
              targetState[name] = this.stateMerge({}, sourceState[name]);
            }
          }
        } else {
          // eslint-disable-next-line no-param-reassign
          targetState[name] = sourceState[name];
        }
      });
    }
    return targetState;
  }
}
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
  background-color: #fafbfc;
  overflow: hidden;
}
</style>
