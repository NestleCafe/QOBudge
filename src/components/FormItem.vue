<template>
  <div>
    <label class="formItem">
      <span class="name"> 
        <icon name="notes" class="icon" />
        {{this.fieldName}} 
      </span>
      <input type="text" class="inputNotes" :value="value" @input="onValueChanged($event.target.value)"
      :placeholder="'在这里添加'+ fieldName" />
      

        <!-- <input class="createdAt" type="date" :value="x(createdAt)"> -->

    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";
@Component
export default class FormItem extends Vue {
  @Prop({default: ''}) readonly value!: string;

  @Prop({required:true}) fieldName!: string;

  onValueChanged(value: string){
    this.$emit('update:value', value)
  }
/*   x(isoString: string){
    return dayjs(isoString).format('YYYY-MM-DD')
  } */
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
      font-size: 22px;
    }
  }
  input {
    height: 44px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
  .inputNotes{
    width: 40%;
  }
  .createdAt{
   width: 10%;
  }
}

</style>