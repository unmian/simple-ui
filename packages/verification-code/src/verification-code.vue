<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-12-13 15:43:30
 * @LastEditors: Quarter
 * @Description: 简易的验证码组件
 * @FilePath: /simple-ui/packages/verification-code/src/verification-code.vue
-->
<template>
  <div class="s-verification-code" :style="{ width: width, height: height }">
    <canvas ref="codeCanvas" :width="width" :height="height" @click="generate()"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "SVerificationCode",
})
export default class VerificationCode extends Vue {
  @Prop({
    type: String,
    default: "100px",
  })
  width?: string; // 画布宽度

  @Prop({
    type: String,
    default: "40px",
  })
  height?: string; // 画布高度

  @Prop({
    type: Boolean,
    default: false,
  })
  strict?: boolean; // 严格模式

  @Prop({
    type: Number,
    default: 4,
  })
  length?: number; // 字符长度

  @Prop({
    type: Number,
    default: 3,
  })
  lines?: number; // 干扰线

  @Prop({
    type: Number,
    default: 20,
  })
  points?: number; // 干扰点

  characterArray: string[] = []; // 备选字符集
  randomCharacter = ""; // 字符内容

  /**
   * @description: 生命周期函数
   * @return
   */
  created(): void {
    this.createCharacterArray();
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  mounted(): void {
    this.generate();
  }

  /**
   * @description: 生成随机验证码
   * @return
   */
  generate(): void {
    let length = 4;
    if (typeof this.length === "number" && this.length >= 2 && this.length <= 20) {
      length = this.length;
    }
    if (Array.isArray(this.characterArray) && this.characterArray.length > 0) {
      let randomCharacter = "";
      for (let i = 0; i < length; i++) {
        const char: string = this.characterArray[this.randomNumber(this.characterArray.length)];
        randomCharacter += char;
      }
      this.randomCharacter = randomCharacter;
    }
    this.drawVerificationCode();
  }

  /**
   * @description: 验证字符串
   * @param {String} code 待验证的字符串
   * @return {Promise<void>}
   */
  validate(code: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.strict) {
        if (this.randomCharacter === code) {
          resolve();
        }
      } else if (this.randomCharacter.toUpperCase() === code.toUpperCase()) {
          resolve();
        }
      reject();
    });
  }

  /**
   * @description: 生成字符集
   * @return
   */
  createCharacterArray(): void {
    const characterArray: string[] = [];
    for (let i = 0; i < 10; i++) {
      characterArray.push(i.toString());
    }
    for (let j = 0; j < 26; j++) {
      characterArray.push(String.fromCharCode(j + 65)); // 大写字母
      characterArray.push(String.fromCharCode(j + 97)); // 小写字母
    }
    this.characterArray = characterArray;
  }

  /**
   * @description: 生成随机数
   * @param {Number} max 最大数
   * @param {Number} min 最小数
   * @return {String}
   */
  randomNumber(max: number, min?: number): number {
    if (typeof max === "number") {
      if (typeof min === "number") {
        const distance: number = max - min;
        return Math.floor(Math.random() * distance) + min;
      } 
        return Math.floor(Math.random() * max);
      
    }
    return 0;
  }

  /**
   * @description: 生成一种颜色
   * @return {String}
   */
  generateColor(): string {
    const red: number = this.randomNumber(255);
    const green: number = this.randomNumber(255);
    const blue: number = this.randomNumber(255);
    return `rgba(${red}, ${green}, ${blue})`;
  }

  /**
   * @description: 绘制验证码
   * @return
   */
  drawVerificationCode(): void {
    if (typeof this.randomCharacter === "string" && this.randomCharacter.length > 0) {
      const canvas: Element | Vue | Array<Element | Vue> | undefined = this.$refs.codeCanvas;
      if (canvas instanceof Element) {
        const ctx: CanvasRenderingContext2D | null = (canvas as HTMLCanvasElement).getContext("2d");
        if (ctx) {
          const canvasWidth: number = canvas.scrollWidth;
          const canvasHeight: number = canvas.scrollHeight;
          ctx.clearRect(0, 0, canvasWidth, canvasHeight);
          // 绘制干扰线
          let lines = 3;
          if (typeof this.lines === "number") {
            lines = this.lines;
          }
          for (let i = 0; i < lines; i++) {
            ctx.beginPath();
            ctx.moveTo(this.randomNumber(canvasWidth), this.randomNumber(canvasHeight));
            ctx.lineTo(this.randomNumber(canvasWidth), this.randomNumber(canvasHeight));
            ctx.strokeStyle = this.generateColor();
            ctx.closePath();
            ctx.stroke();
          }
          // 绘制干扰点
          let points = 20;
          if (typeof this.points === "number") {
            points = this.points;
          }
          for (let i = 0; i < points; i++) {
            ctx.beginPath();
            ctx.arc(
              this.randomNumber(canvasWidth),
              this.randomNumber(canvasHeight),
              1,
              0,
              2 * Math.PI,
            );
            ctx.fillStyle = this.generateColor();
            ctx.closePath();
            ctx.fill();
          }
          // 绘制验证码
          const {randomCharacter} = this;
          const itemDistance: number = Math.floor(canvasWidth / this.randomCharacter.length);
          for (let i = 0; i < this.randomCharacter.length; i++) {
            const character: string = randomCharacter[i];
            ctx.beginPath();
            const fontSize: number = this.randomNumber(30, 16);
            ctx.font = `${fontSize  }px 微软雅黑`;
            ctx.fillStyle = this.generateColor();
            const xRandomDistance: number = this.randomNumber(Math.ceil(itemDistance / 2));
            ctx.fillText(character, itemDistance * i + xRandomDistance, fontSize);
            ctx.closePath();
          }
        }
      }
    }
  }
}
</script>
