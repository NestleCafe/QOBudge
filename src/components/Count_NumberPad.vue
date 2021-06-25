<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove()" class="delete"><icon name="delete" /></button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button class="plus">+</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button class="mius">-</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent" class="dot">.</button>
      <button class="equal">=</button>
      <button class="ok">完成</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Count_NumberPad extends Vue {
  output = "0";

  inputContent(event: MouseEvent): void {
    const button = event.target as HTMLButtonElement;
    const input = button.textContent!;
    if (this.output.length === 16) {
      return;
    }
    if (this.output === "0") {
      if (input === "0") {
        return;
      } //防止出现'00'的情况
      if ("0123456789".indexOf(input) >= 0) {
        this.output = input;
        //第一个数字为0时，输入其他数字会替换0
      } else {
        this.output += input;
      }
    }
    if (this.output.indexOf(".") >= 0 && input === ".") {
      return;
    } //防止出现'..'的情况
    this.output += input;
  }
  remove(): void{
    if(this.output.length !== 1){
    this.output = this.output.substring(0, this.output.length-1)
    }else{
      this.output = '0';
    }
  }
  clear(){
    this.output = '0';
  }
  /* ok(): void{} */
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.numberPad {
  .output {
    @extend %clearFix;
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    height: 72px;
  }
  .buttons {
    @extend %clearFix;
    > button {
      font-family: $font-hei;
      font-size: 22px;
      width: 25%;
      height: 64px;
      float: left;
      background: rgb(240, 244, 247);
      border: none;
      @extend %outerShadow;
      &.delete {
        font-size: 32px;
      }
      &.ok {
        float: right;
        background: $color-highlight;
      }
      &.zero {
      }
      &.dot {
        font-weight: bold;
      }
    }
  }
}
</style>