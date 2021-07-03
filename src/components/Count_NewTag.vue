<template>
  <div class="newTag">
    <button @click="createTag">新增标签</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component"
import { TagHelper } from '@/mixins/TagHelper'

@Component
export default class Count_NewTag extends mixins(TagHelper) {

}
</script>

<style lang="scss" scoped>
.newTag {
  font-size: 14px;
  padding: 16px;
  background: white;
  button {
    border: none;
    background: white;
    border-bottom: 2px solid #999;
    color: #999;
    padding: 0 4px;
  }
}
</style>