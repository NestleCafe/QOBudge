<template>
  <div class="newTag">
    <button @click="createTag">新增标签</button>
    <input class="createdAt" type="date" 
      :value="displayDate(value)"
       @input="onValueChanged($event.target.value)"
      >
  </div>
</template>

<script lang="ts">

import { Component, Prop } from "vue-property-decorator";
import { mixins } from "vue-class-component"
import { TagHelper } from '@/mixins/TagHelper'
import dayjs from "dayjs"
@Component
export default class Count_NewTag extends mixins(TagHelper) {
  @Prop() value!:string;
  
  displayDate(isoString: string){
    return dayjs(isoString).format('YYYY-MM-DD')
  }
  onValueChanged(value: string){
    this.$emit('update:value', value)
  }
}
</script>

<style lang="scss" scoped>
.newTag {
  font-size: 14px;
  padding: 16px;
  background: white;
  display: flex;
  justify-content: space-between;
  button {
    border: none;
    background: white;
    border-bottom: 2px solid #999;
    color: #999;
    padding: 0 4px;
  }
  .createdAt{
    border: none;
  }
}
</style>