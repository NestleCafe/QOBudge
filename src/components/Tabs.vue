<template>
  <div class="tabs-wrapper">
    <ul class="tabs">
      <li
        v-for="item in dataSource"
        :key="item.value"
        :class="{ selected: item.value === value }"
        @click="select(item)"
      >
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

type DataSourceItem = { text: string; value: string };

@Component
export default class Tabs extends Vue {
  @Prop({ required: true, type: Array })
  readonly dataSource!: DataSourceItem[];
  @Prop(String)
  readonly value!: string; // '-'表示支出， '+'表示收入
  @Prop(String)
  classPrefix?: string;

  select(item: DataSourceItem) {
    this.$emit("update:value", item.value);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.tabs-wrapper {
  background: $color-highlight;
  display: flex;
  justify-content: center;
    padding: 5px 0;
  > .tabs {
    display: flex;
    text-align: center;
    font-size: 18px;
    justify-content: center;
    align-items: center;
    border: 1px solid #333;
    border-radius: 10px;
    overflow: hidden;
    width: 80%;
    > li {
      width: 33.33%;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      &:not(:last-child){
          border-right: 1px solid #333;
      }
      &.selected {
        background: #333;
        color: white;
      }
      
    }
    /*   &.selected::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: #2B82D8;
    } */
  }
}
</style>