<template>
  <layout>
    <div class="navBar">
      <icon name="pre" @click="goback"/>
      <span class="title">编辑标签</span>
      <span class="right"></span>
    </div>
    <div class="formWrapper">
      <form-item fieldName="标签名"
      @update:value="update"
      :value="tag.name" />
    </div>
    <div class="buttonWrapper">
    <d-button @click.native="remove">删除标签</d-button>
    </div>
  </layout>
</template>

<script lang="ts">
import { tagListModel } from "@/models/tagListModel";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import FormItem from "@/components/FormItem.vue";
import DButton from "@/components/DButton.vue";
@Component({
  components: { FormItem, DButton },
})
export default class EditLabel extends Vue {
  tag:{id: string, name: string} = undefined!;

  created() {
    const id = this.$route.params.id;
    tagListModel.fetch();
    const tags = tagListModel.data;
    const tag = tags.filter((t) => t.id === id)[0]; //filter返回的是数组
    if (tag) {
      this.tag = tag;
    } else {
      this.$router.replace("/404");
    }
  }

  update(name: string){
    if(this.tag){
      tagListModel.update(this.tag.id, name);
    }
  }
  remove(){
    if(this.tag){
      tagListModel.remove(this.tag.id);
    }
  }
  goback(){
    this.$router.push('/labels');
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  display: flex;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  align-items: center;
  justify-content: space-between;
  .title {
  }
  .icon {
    width: 24px;
    height: 24px;
  }
  .right {
    width: 24px;
    height: 24px;
  }
}
.formWrapper{
  background: white;
  margin-top: 8px;
}
.buttonWrapper{
  text-align: center;
  padding: 16px;
  margin-top: 44-16px ;
}
</style>