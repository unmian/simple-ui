<!--
 * @Author: Quarter
 * @Date: 2022-12-15 19:11:14
 * @LastEditors: Quarter
 * @LastEditTime: 2022-12-15 19:33:42
 * @FilePath: /simple-ui/packages/loading/src/components/dot-circle.vue
 * @Description: 环点型加载动画
-->
<template>
  <div class="s-loading__dot-circle"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "DotCircle",
})
export default class DotCircle extends Vue {}
</script>

<style lang="scss">
.s-loading__dot-circle {
  width: 1em;
  height: 1em;
  border-radius: 50%;
  border: 0.14em solid currentColor;
  box-sizing: border-box;
  animation: rotate 1s ease-in-out infinite;
  position: relative;

  &::after {
    content: "";
    width: 0.2em;
    height: 0.2em;
    border-radius: 50%;
    background-color: currentColor;
    display: block;
    position: absolute;
    top: 0.03em;
    left: 0.26em;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
