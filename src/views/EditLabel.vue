<template>
  <layout>
    <div class="navBar">
      <icon name="pre" @click.native="goback"/>
      <span class="title">编辑标签</span>
      <span class="right"></span>
    </div>
    <div class="formWrapper">
      <form-item fieldName="标签名"
      @update:value="update"
      :value="currentTag.name" />
    </div>
    <div class="buttonWrapper">
    <d-button @click.native="remove">删除标签</d-button>
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import FormItem from "@/components/FormItem.vue";
import DButton from "@/components/DButton.vue";

@Component({
  components: { FormItem, DButton },
})
export default class EditLabel extends Vue {
  get currentTag(){
    return this.$store.state.currentTag;
  }
  created() {
    const id = this.$route.params.id;
    this.$store.commit('fetchTags');
    this.$store.commit('setCurrentTag', id);
    if(!this.currentTag) {
      this.$router.replace("/404");
    }
  }

  update(name: string){
    if(this.currentTag){
      this.$store.commit('updateTag',{id: this.currentTag.id, name});
    }
  }
  remove(){
    if(this.currentTag){
      this.$store.commit('removeTag', this.currentTag.id)
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