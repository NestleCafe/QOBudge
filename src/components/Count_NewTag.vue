<template>
  <div class="newTag">
    <button @click="createTag">新增标签</button>
  </div>
</template>

<script lang="ts">
import store from "@/store/CustomedIndex";
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Count_NewTag extends Vue {
  createTag() {
    const tagName = window.prompt("请输入新标签名");
    if (!tagName) {
      return window.alert("标签名不能为空！");
    }
    store.createTag(tagName);
  }
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