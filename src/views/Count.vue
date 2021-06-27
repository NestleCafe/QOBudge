<template>
  <layout class-prefix="layout">
    <number-pad :value.sync="record.amount"/>
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

import { Component } from 'vue-property-decorator';

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