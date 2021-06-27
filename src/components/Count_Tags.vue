<template>
  <div class="tags">
    <ul class="currentTags">
      <li 
        v-for="tag in dataSource"
        :key="tag"
        @click="toggle(tag)"
        :class="{selected: selectedTags.indexOf(tag) >= 0}"
      >
        {{ tag }} 
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Count_Tags extends Vue {
  @Prop(Array) dataSource!: string[];
  selectedTags: string[] = [];
  
  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit('update:value', this.selectedTags)
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tags {
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  > .currentTags {
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    > li {
      background: #f5f5f5;
      $height: 24px;
      line-height: $height;
      padding: 0 16px;
      border-radius: $height/2;
      margin-right: 14px;
      margin-top: 4px;
      &.selected {
        background: darken($color-highlight, 10%);
      }
    }
  }
}
</style>