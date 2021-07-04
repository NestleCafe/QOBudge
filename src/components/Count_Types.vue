<template>

    <ul class="types">
      <li :class="{selected: value === '-'}" @click="selectType('-')">支出</li>
      <li :class="{selected: value === '+'}" @click="selectType('+')">收入</li>
    </ul>

</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Count_Types extends Vue {
  @Prop(String) readonly value!: string; // '-'表示支出， '+'表示收入
  selectType(type:string) {
    //type只能是'-' 和 '+'
    if (type !== "-" && type !== "+") {
      throw new Error("type is unknown");
    }
    this.$emit('update:value', type)
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.types {
 
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
      background: #E03917;
    }
  }
}
</style>