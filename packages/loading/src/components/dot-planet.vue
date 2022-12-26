<!--
 * @Author: Quarter
 * @Date: 2022-12-15 19:11:14
 * @LastEditors: Quarter
 * @LastEditTime: 2022-12-15 19:53:51
 * @FilePath: /simple-ui/packages/loading/src/components/dot-planet.vue
 * @Description: 环点型加载动画
-->
<template>
  <div class="s-loading__dot-planet">
    <div class="s-loading__dot-planet-circle"></div>
    <div class="s-loading__dot-planet-line"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "DotPlanet",
})
export default class DotPlanet extends Vue {}
</script>

<style lang="scss">
.s-loading__dot-planet {
  width: 1em;
  height: 1em;
  // animation: rotate 1s ease-in-out infinite;
  position: relative;

  &::after {
    content: "";
  }
}

.s-loading__dot-planet-circle {
  width: 60%;
  height: 60%;
  border-radius: 50%;
  background-color: currentColor;
  box-sizing: border-box;
  position: absolute;
  top: 20%;
  left: 20%;
}

.s-loading__dot-planet-line {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 0.06em solid currentColor;
  animation: rotate 1s linear infinite;
  box-sizing: border-box;
  display: block;
  position: absolute;
  top: 0;
  left: 0;

  &::after {
    content: "";
    width: 0.16em;
    height: 0.16em;
    border-radius: 50%;
    background-color: currentColor;
    display: block;
    position: absolute;
    top: -0.11em;
    left: 0.37em;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
