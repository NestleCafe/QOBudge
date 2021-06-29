<template>
  <div>
    <layout>
      <ol class="tags">
        <li v-for="tag in tags" :key="tag.id">
          <span>{{ tag.name }}</span>
          <icon name="next" />
        </li>
      </ol>
      <div class="createTagWrapper">
        <button @click="createTag" class="createTag">新增标签</button>
      </div>
    </layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import Layout from "@/components/Layout.vue";
import { Component } from "vue-property-decorator";
import { tagListModel } from "@/models/tagListModel";

tagListModel.fetch();
@Component({
  components: { Layout },
})
export default class Lables extends Vue {
  tags = tagListModel.data;

  createTag() {
    const name = window.prompt("请输入标签名");
    if (name === "") {
      window.alert("标签名不能为空！");
      return;
    } else if (name) {
        const message = tagListModel.create(name);
        if(message === 'duplicated'){
            window.alert('标签名重复！')
        }else if(message === 'success'){
            window.alert('添加成功')
        }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tags {
  background: white;
  padding-left: 16px;
  font-size: 16px;
  > li {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    color: #666;
    .icon {
      margin-right: 16px;
      color: #666;
      height: 24px;
      width: 18px;
    }
  }
}
.createTagWrapper {
  padding: 16px;
  text-align: center;
  margin-top: 44-16px;
  .createTag {
    /* background: #2B82D8; */
    background: $color-highlight;
    border-radius: 4px;
    border: none;
    height: 40px;
    padding: 0 16px;
    opacity: 0.8;
  }
}
</style>