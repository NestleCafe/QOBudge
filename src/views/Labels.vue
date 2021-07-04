<template>
  <layout>
    <div class="tags">
      <router-link
        class="tag"
        v-for="tag in tags" :key="tag.id"
        :to="`/labels/edit/${tag.id}`"
      >
        <span>{{ tag.name }}</span>
        <icon name="next" />
      </router-link>
    </div>
    <div class="createTagWrapper">
      <d-button @click.native="createTag" class-prefix="DB">
        <icon name="addButton" />
      </d-button>
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import Layout from "@/components/Layout.vue";
import DButton from "@/components/DButton.vue";
import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component"
import { TagHelper } from '@/mixins/TagHelper'

@Component({
  components: { Layout, DButton },
})
export default class Lables extends mixins(TagHelper) {
  get tags(){
    return this.$store.state.tagList;
  }
  created(){
    this.$store.commit('fetchTags')
  }
}
</script>


<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tags {
  background: white;
  padding-left: 16px;
  > .tag {
    font-size: 16px;
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
/* .createTagWrapper {
  padding: 16px;
  text-align: center;
  margin-top: 44-16px;
} */

.createTagWrapper {
  position: fixed;
  padding: 16px;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 44px;
  .DB-button {
    border-radius: 50%;
    padding: 0;
    height: 64px;
    width: 64px;
    position: relative;
    .icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>