<template>
  <div>
    <label class="notes">
      <span class="name"> <icon name="notes" class="icon" />备注 </span>
      <input type="text" v-model="value"
      placeholder="在这里添加备注" />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Watch} from "vue-property-decorator";

@Component
export default class Count_Notes extends Vue {
  value = '';

  @Watch('value')
  onValueChanged(value: string, oldValue: string){
    this.$emit('update:value', value)
  }
}
</script>

<style lang="scss" scoped>
.notes {
  overflow-x: hidden;
  font-size: 14px;
  background: #f5f5f5;
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
    height: 2.5em;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}

</style>