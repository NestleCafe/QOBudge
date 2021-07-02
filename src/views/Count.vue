<template>
  <layout class-prefix="layout">
    <number-pad :value.sync="record.amount" @submit="saveRecord" />
    <form-item 
      fieldName="备注" 
      @update:value="onUpdateNotes" 
    />
    <new-tag/>
    <tags />
    {{ record }}
    <types :value.sync="record.type" />
  </layout>
</template>

<script lang="ts">
import Vue from "vue";

import Layout from "@/components/Layout.vue";
import NumberPad from "@/components/Count_NumberPad.vue";
import Types from "@/components/Count_Types.vue";
import FormItem from "@/components/FormItem.vue";
import Tags from "@/components/Count_Tags.vue";
import NewTag from "@/components/Count_NewTag.vue";

import { Component } from "vue-property-decorator";
import store from "@/store/CustomedIndex";



type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: Date;
};

@Component({
  components: { Layout, NumberPad, Types, FormItem, Tags, NewTag },
})
export default class Count extends Vue {
  recordList = store.recordList;
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    store.createRecord(this.record)
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