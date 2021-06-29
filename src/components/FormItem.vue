<template>
  <div>
    <label class="formItem">
      <span class="name"> 
        <icon name="notes" class="icon" />
        {{this.fieldName}} 
      </span>
      <input type="text" :value="value" @input="onValueChanged($event.target.value)"
      :placeholder="'在这里添加'+ fieldName" />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop, Watch} from "vue-property-decorator";

@Component
export default class FormItem extends Vue {

  @Prop({default: ''}) readonly value!: string;

  @Prop({required:true}) fieldName!: string;

  @Watch('value')
  onValueChanged(value: string, oldValue: string){
    this.$emit('update:value', value)
  }
}
</script>

<style lang="scss" scoped>
.formItem {
  overflow-x: hidden;
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
    white-space: nowrap;
    .icon {
      font-size: 16px;
    }
  }
  input {
    height: 44px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}

</style>