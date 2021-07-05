<template>
  <div class="numberPad">
    <div class="output">
      <span class="dollar"
        >¥
        <span v-if="output !== '0'" class="clear" @click="clear()">清空 </span>
      </span>

      {{ output }}
    </div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove()" class="delete"><icon name="delete" /></button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="add()">+</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="subtract()">-</button>
      <button @click="inputContent" class="dot">.</button>
      <button @click="inputContent">0</button>
      <button @click="equal()">=</button>
      <button class="ok" @click="ok">完成</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Count_NumberPad extends Vue {
  @Prop(Number) readonly value!: number;
  output = this.value.toString();

  counting = 0;
  countingType: string | undefined;

  inputContent(event: MouseEvent): void {
    const button = event.target as HTMLButtonElement;
    const input = button.textContent!;
    if (this.output.length === 12) {
      return;
    }
    if (this.output.indexOf(".") >= 0) {
      const index = this.output.indexOf(".");
      if (this.output[index + 2]) {
        return; //最多两位小数！
      }
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
      return;
    }
    if (this.output.indexOf(".") >= 0 && input === ".") {
      return;
    } //防止出现'..'的情况
    this.output += input;
  }
  remove() {
    if (this.output.length !== 1) {
      this.output = this.output.substring(0, this.output.length - 1);
    } else {
      this.output = "0";
    }
  }
  clear() {
    this.output = "0";
  }
  ok() {
    this.equal();
    const number = parseFloat(this.output);
    this.$emit("update:value", number);
    this.$emit("submit", number);
    this.output = "0";
    window.alert("增加成功！");
  }
  add() {
    this.counting += parseFloat(this.output);
    this.countingType = "+";
    this.output = "0";
  }
  subtract() {
    this.counting += parseFloat(this.output);
    this.countingType = "-";
    this.output = "0";
  }
  equal() {
    if (this.countingType === "+") {
      this.counting += parseFloat(this.output);
    } else if (this.countingType === "-") {
      this.counting -= parseFloat(this.output);
    } else {
      return;
    }
    this.output = this.counting.toString();
    this.countingType = undefined;
    this.counting = 0;
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.numberPad {
  .output {
    @extend %clearFix;
    @extend %innerShadow;
    background: white;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    height: 72px;
    position: relative;
    .dollar {
      position: absolute;
      display: flex;
      align-items: center;
      left: 16px;
      .clear {
        position: absolute;
        font-size: 14px;
        padding: 2px;
        left: 20px;
        border: 1px solid #757575;
        white-space: nowrap;
        font-family: $font-hei;
        color: #757575;
        opacity: 0.5;
        margin-left: 4px;
        font-weight: 500;
      }
    }
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
        /* float: right; */
        background: $color-highlight;
      }

      &.dot {
        font-weight: bold;
      }
    }
  }
}
</style>