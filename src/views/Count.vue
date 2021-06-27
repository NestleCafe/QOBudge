<template>
  <layout class-prefix="layout">
    <number-pad :value.sync="record.amount" @submit="saveRecord"/>
    <notes @update:value="onUpdateNotes"/>
    <new-tag :data-source.sync="tags"/>
    <tags :data-source="tags" @update:value="onUpdatetTags" />
    {{record}}
    <types :value.sync="record.type"/>
  </layout>
</template>

<script lang="ts">
import Vue from 'vue';

import Layout from "@/components/Layout.vue";
import NumberPad from "@/components/Count_NumberPad.vue";
import Types from "@/components/Count_Types.vue";
import Notes from "@/components/Count_Notes.vue";
import Tags from "@/components/Count_Tags.vue";
import NewTag from '@/components/Count_NewTag.vue';

import { Component, Watch } from 'vue-property-decorator';

type Record = {
  tags: string[],
  notes: string,
  type: string,
  amount: number
};

@Component({
  components: { Layout, NumberPad, Types, Notes, Tags, NewTag }
})
export default class Count extends Vue{
  tags = ['衣', '食', '住', '行', '医疗'];
  recordList: Record[] = [];
  record: Record = {
    tags:[],
    notes: '',
    type: '-',
    amount: 0
  };

  onUpdatetTags(value: string[]){
    this.record.tags = value;
  }
  onUpdateNotes(value: string){
    this.record.notes = value;
  }

  saveRecord(){
    const deepCloneRecord = JSON.parse(JSON.stringify(this.record))
    this.recordList.push(deepCloneRecord);
    console.log(this.recordList);
  }
  @Watch('recordList')
  onRecordListChange(){
    window.localStorage.setItem('recordList', JSON.stringify(this.record));
  }
}

</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
  position: relative;
}
</style>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
</style>