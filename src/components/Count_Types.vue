<template>
  <div class="typesWrapper">
    <ul class="types">
      <li :class="type === '-' && 'selected'" @click="selectType('-')">支出</li>
      <li :class="type === '+' && 'selected'" @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Count_Types extends Vue {
  type = "-"; // '-'表示支出， '+'表示收入
  selectType(type:string) {
    //type只能是'-' 和 '+'
    if (type !== "-" && type !== "+") {
      throw new Error("type is unknown");
    }
    this.type = type;
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.typesWrapper{
  flex-grow: 1;
}
.types {
  margin-top: 0;
  background: $color-highlight;
  display: flex;
  text-align: center;
  font-size: 20px;
  justify-content: center;
  align-items: center;

  > li {
    width: 25%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>