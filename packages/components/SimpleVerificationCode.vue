<!--
 * @Author: Quarter
 * @Date: 2020-08-21 09:06:59
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-10 08:32:16
 * @Description: 简易的验证码
-->
<template>
  <div class="simple-verification-code" :style="{ width: width, height: height }">
    <canvas ref="codeCanvas" :width="width" :height="height" @click="generate()"></canvas>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "SimpleVerificationCode",
  props: {
    width: { // 画布宽度
      type: String,
      default: "100px",
    },
    height: { // 画布高度
      type: String,
      default: "40px",
    },
    strict: { // 严格模式
      type: Boolean,
      default: false,
    },
    length: { // 字符长度
      type: Number,
      default: 4,
    },
    lines: { // 干扰线
      type: Number,
      default: 3,
    },
    points: { // 干扰点
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      characterArray: new Array() as string[], // 备选字符集
      randomCharacter: "", // 字符内容
    };
  },
  created(): void {
    this.createCharacterArray();
  },
  mounted(): void {
    this.generate();
  },
  methods: {
    /**
     * @description: 生成随机验证码
     * @author: Quarter
     * @return
     */
    generate(): void {
      let length: number = 4;
      if (
        typeof this.length === "number" &&
        this.length >= 2 &&
        this.length <= 20
      ) {
        length = this.length;
      }
      if (Array.isArray(this.characterArray) && this.characterArray.length > 0) {
        let randomCharacter = "";
        for (let i = 0; i < length; i++) {
          const char: string = this.characterArray[
            this.randomNumber(this.characterArray.length)
          ];
          randomCharacter += char;
        }
        this.randomCharacter = randomCharacter;
      }
      this.drawVerificationCode();
    },
    /**
     * @description: 验证字符串
     * @author: Quarter
     * @param {String} code 待验证的字符串
     * @return {Promise<void>}
     */
    validate(code: string): Promise<void> {
      return new Promise<void>((resolve, reject) => {
        if (this.strict) {
          if (this.randomCharacter === code) {
            resolve();
          }
        } else {
          if (this.randomCharacter.toUpperCase() === code.toUpperCase()) {
            resolve();
          }
        }
        reject();
      });
    },
    /**
     * @description: 生成字符集
     * @author: Quarter
     * @return
     */
    createCharacterArray(): void {
      const characterArray: string[] = new Array();
      for (let i = 0; i < 10; i++) {
        characterArray.push(i.toString());
      }
      for (let j = 0; j < 26; j++) {
        characterArray.push(String.fromCharCode(j + 65)); // 大写字母
        characterArray.push(String.fromCharCode(j + 97)); // 小写字母
      }
      this.characterArray = characterArray;
    },
    /**
     * @description: 生成随机数
     * @author: Quarter
     * @param {Number} max 最大数
     * @param {Number} min 最小数
     * @return {String}
     */
    randomNumber(max: number, min?: number): number {
      if (typeof max === "number") {
        if (typeof min === "number") {
          const distance: number = max - min;
          return Math.floor(Math.random() * distance) + min;
        } else {
          return Math.floor(Math.random() * max);
        }
      }
      return 0;
    },
    /**
     * @description: 生成一种颜色
     * @author: Quarter
     * @return {String}
     */
    generateColor(): string {
      const red: number = this.randomNumber(255);
      const green: number = this.randomNumber(255);
      const blue: number = this.randomNumber(255);
      return `rgba(${red}, ${green}, ${blue})`;
    },
    /**
     * @description: 绘制验证码
     * @author: Quarter
     * @return
     */
    drawVerificationCode(): void {
      if (
        typeof this.randomCharacter === "string" &&
        this.randomCharacter.length > 0
      ) {
        const canvas: Element | Vue | Array<Element | Vue> | undefined = this.$refs.codeCanvas;
        if (canvas instanceof Element) {
          const ctx: CanvasRenderingContext2D | null = (canvas as HTMLCanvasElement).getContext(
            "2d"
          );
          if (ctx) {
            const canvasWidth: number = canvas.scrollWidth;
            const canvasHeight: number = canvas.scrollHeight;
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            // 绘制干扰线
            let lines: number = 3;
            if (typeof this.lines === "number") {
              lines = this.lines;
            }
            for (let i = 0; i < lines; i++) {
              ctx.beginPath();
              ctx.moveTo(
                this.randomNumber(canvasWidth),
                this.randomNumber(canvasHeight)
              );
              ctx.lineTo(
                this.randomNumber(canvasWidth),
                this.randomNumber(canvasHeight)
              );
              ctx.strokeStyle = this.generateColor();
              ctx.closePath();
              ctx.stroke();
            }
            // 绘制干扰点
            let points: number = 20;
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
                2 * Math.PI
              );
              ctx.fillStyle = this.generateColor();
              ctx.closePath();
              ctx.fill();
            }
            // 绘制验证码
            const randomCharacter: string = this.randomCharacter;
            const itemDistance: number = Math.floor(
              canvasWidth / this.randomCharacter.length
            );
            for (let i = 0; i < this.randomCharacter.length; i++) {
              const character: string = randomCharacter[i];
              ctx.beginPath();
              const fontSize: number = this.randomNumber(30, 16);
              ctx.font = fontSize + "px 微软雅黑";
              ctx.fillStyle = this.generateColor();
              const xRandomDistance: number = this.randomNumber(
                Math.ceil(itemDistance / 2)
              );
              ctx.fillText(
                character,
                itemDistance * i + xRandomDistance,
                fontSize
              );
              ctx.closePath();
            }
          }
        }
      }
    },
  },
});
</script>