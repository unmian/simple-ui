<!--
 * @Author: Quarter
 * @Date: 2020-07-13 15:52:55
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-10 05:25:33
 * @Description: 管理系统框架组件
--> 
<template>
  <div class="common-framework">
    <div class="framework-header">
      <common-header :mode="headerThemeMode"></common-header>
    </div>
    <div class="framework-content">
      <simple-scroll full>
        <div class="content-container">
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
                    :class="{ active: activeMenuIndex === `${group}-${item}` }"
                  >
                    <simple-button
                      type="normal"
                      @click="toDocument(component, group, item)"
                    >{{ component.name }}</simple-button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="component-docment">
            <router-view></router-view>
          </div>
        </div>
      </simple-scroll>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CommonHeader from "documents/components/CommonHeader.vue";
import { SimpleMenuItem, SimpleThemeMode } from "packages";

export default Vue.extend({
  name: "CommonFramework",
  components: {
    CommonHeader,
  },
  data() {
    return {
      headerThemeMode: "light" as SimpleThemeMode, // 头部主题
    };
  },
  computed: {
    /**
     * @description: 当前选中的文档
     * @author: Quarter
     * @return {string}
     */
    activeMenuIndex(): string {
      const activeMenu: number[] = this.$store.state.framework.activeMenuIndex;
      if (Array.isArray(activeMenu)) {
        return activeMenu.join("-");
      }
      return "";
    },
    /**
     * @description: 菜单
     * @author: Quarter
     * @return {Array<SimpleMenuItem>}
     */
    components(): SimpleMenuItem[] {
      return this.$store.state.framework.menus;
    }
  },
  created() {
    const path: string = this.$route.path;
    this.$store.commit("switchMenuByPath", path);
  },
  methods: {
    /**
     * @description: 前往文档界面
     * @author: Quarter
     * @return
     */
    toDocument(
      menu: SimpleMenuItem,
      groupIndex: number,
      itemIndex: number
    ): void {
      if (typeof groupIndex === "number" && typeof itemIndex === "number") {
        this.$store.commit("switchMenu", [groupIndex, itemIndex]);
      }
      if (menu && typeof menu.path === "string") {
        this.$router.push(menu.path);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.common-framework {
  width: 100%;
  height: 100%;
  position: relative;

  .framework-header {
    width: 100%;
    height: 65px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);
    position: relative;
    z-index: 30;
  }

  .framework-content {
    width: 100%;
    height: calc(100% - 65px);
    background-color: #f0f2f5;
    overflow: hidden;
    position: relative;

    .content-container {
      width: 100%;
      max-width: 1200px;
      padding: 50px;
      background-color: #ffffff;
      display: flex;
      margin: 30px auto 0;

      .component-list {
        width: 240px;

        .component-group {
          .group-name {
            font-size: 15px;
          }

          .group-list {
            margin-top: 12px;

            ul {
              padding: 0;
              list-style: none;
              margin: 0;

              li.active button {
                color: #549fff;
              }
            }
          }

          &:nth-of-type(n + 2) {
            margin-top: 25px;
          }
        }
      }

      .component-docment {
        width: calc(100% - 240px);
      }
    }
  }
}
</style>