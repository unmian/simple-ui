<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-12-13 15:32:31
 * @LastEditors: Quarter
 * @Description: 管理系统框架组件
 * @FilePath: /simple-ui/documents/views/framework/common-framework/index.vue
-->
<template>
  <s-scroll ref="documentScroll" full>
    <div class="common-framework">
      <!-- 顶栏 -->
      <common-header class="framework-header" :mode="headerThemeMode"></common-header>
      <!-- 侧边栏 -->
      <aside class="common-aside">
        <s-scroll full>
          <div class="component-list">
            <div
              class="component-group"
              v-for="(componentGroup, group) in components"
              :key="`component-group-${group}`"
            >
              <div class="group-name">{{ componentGroup.name }}</div>
              <div class="group-list">
                <ul>
                  <li
                    v-for="(component, item) in componentGroup.children"
                    :key="`component-item-${group}-${item}`"
                  >
                    <router-link :to="component.path">{{ component.name }}</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </s-scroll>
      </aside>
      <!-- 主体内容 -->
      <div class="framework-content">
        <!-- 组件文档 -->
        <div class="component-document">
          <router-view></router-view>
        </div>
        <!-- 页脚 -->
        <div class="framework-footer">
          A Simple UI Kit &copy; 2022
          <a href="https://github.com/unmian" target="_blank">Quarter</a>
        </div>
      </div>
    </div>
    <!-- 返回顶部 -->
    <s-backtop></s-backtop>
  </s-scroll>
</template>

<script lang="ts">
import { CommonThemeMode, MenuItem, Scroll } from "@unmian/simple-ui";
import { Component, Vue } from "vue-property-decorator";
import { NavigationGuardNext, RouteConfig } from "vue-router";
import CommonHeader from "./common-header/index.vue";

@Component({
  name: "CommonFramework",
  components: {
    CommonHeader,
  },
})
export default class CommonFramework extends Vue {
  headerThemeMode: CommonThemeMode = "light"; // 头部主题

  /**
   * @description: 菜单
   * @return {Array<MenuItem>}
   */
  get components(): MenuItem[] {
    return this.$store.state.framework.menus;
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  created(): void {
    const {path} = this.$route;
    this.$store.commit("switchMenuByPath", path);
  }

  /**
   * @description: 路由更新之前
   * @return
   */
  beforeRouteUpdate(to: RouteConfig, from: RouteConfig, next: NavigationGuardNext): void {
    if (this.$refs.documentScroll instanceof Scroll) {
      this.$refs.documentScroll.scroll(0);
    }
    next();
  }
}
</script>

<style lang="scss" scoped>
.common-framework {
  width: 100%;
  min-height: 100%;
  background-color: var(--s-background-secondary);
  position: relative;
}

.framework-header {
  width: 100%;
  height: 65px;
  background-color: var(--s-background-primary);
  box-shadow: var(--s-shadow-1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.common-aside {
  width: 280px;
  height: 100%;
  padding: 65px 0 0;
  box-sizing: border-box;
  background-color: var(--s-background-primary);
  box-shadow: var(--s-shadow-1);
  position: fixed;
  top: 0;
  left: 0;
}

.component-list {
  padding: 25px 0 60px;
}

.component-group {
  .group-name {
    padding: 0 16px;
    font-size: 15px;
    box-sizing: border-box;
  }

  .group-list {
    margin-top: 12px;

    ul {
      padding: 0 16px 0 32px;
      list-style: none;
      margin: 12px 0 0;
    }

    li {
      padding: 8px 0;
    }

    a {
      color: var(--s-text-secondary);
      font-size: 14px;
      text-decoration: none;

      &:not(.router-link-active):hover {
        color: var(--s-brand-hover);
      }

      &.router-link-active {
        color: var(--s-brand-normal);
        cursor: default;
      }
    }
  }

  &:nth-of-type(n + 2) {
    margin-top: 25px;
  }
}

.framework-content {
  width: 100%;
  padding: 90px 25px 24px 305px;
  box-sizing: border-box;
  overflow: hidden;

  .component-document {
    width: 100%;
    padding-bottom: 50px;
    margin: 0 auto;
  }

  .framework-footer {
    color: var(--s-text-placeholder);
    text-align: center;
    user-select: none;
    margin-top: 32px;

    a {
      color: var(--s-text-placeholder);

      &:hover {
        color: var(--s-brand-hover);
      }
    }
  }
}
</style>
