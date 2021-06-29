<template>
  <div class="newTag">
    <button @click="createTag">新增标签</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Count_NewTag extends Vue {
  @Prop() readonly dataSource: string[] | undefined;

  createTag() {
    const tagName = window.prompt("请输入新标签名");
    if (tagName === "") {
      window.alert("标签名不能为空！");
    } else if (this.dataSource) {
      this.$emit("update:dataSource", [...this.dataSource, tagName]);
    }
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