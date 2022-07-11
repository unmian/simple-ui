<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-07-07 19:10:50
 * @LastEditors: Quarter
 * @Description: 管理系统标题栏组件
 * @FilePath: /simple-ui/documents/views/framework/common-framework/common-header/index.vue
-->
<template>
  <div class="common-header">
    <div class="left-functions">
      <div class="system-title">Simple UI<span>一个简陋的 UI 组件库</span></div>
    </div>
    <div class="right-functions"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "CommonHeader",
})
export default class CommonHeader extends Vue {

  @Prop({
    type: Boolean,
    default: true,
  })
  asideActive?: boolean; // 侧边栏
}
</script>

<style lang="scss" scoped>
.common-header {
  width: 100%;
  height: 100%;
  padding: 0 25px;
  font-size: 14px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    padding: 8px 10px;
    // color: rgba($color: #000000, $alpha: 0.65);
    border: none;
    border-radius: 6px;
    cursor: pointer;
    background: none;

    i {
      font-size: 16px;
    }

    &:hover {
      background-color: rgba($color: #000000, $alpha: 0.05);
    }
  }

  .left-functions {
    width: 30%;
    display: flex;
    align-items: center;

    & > *:not(:first-child) {
      margin-left: 10px;
    }

    .system-title {
      font-size: 20px;

      span {
        font-size: 12px;
        margin-left: 12px;
      }
    }
  }

  .right-functions {
    width: 30%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    & > *:not(:last-child) {
      margin-right: 10px;
    }
  }

  &.mode-light {
    color: var(--s-text-1);
  }
}
</style>
