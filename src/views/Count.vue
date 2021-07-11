<template>
  <layout  class="layout" class-prefix="layout">
    <number-pad :value.sync="record.amount" @submit="saveRecord" />
    <form-item 
      fieldName="备注" 
      :value.sync="record.notes"
    />
    <new-tag :value.sync="record.createdAt"/>
    <tags :value.sync="record.tags"/>
    <!-- {{ record }} -->
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


@Component({
  components: { Layout, NumberPad, Types, FormItem, Tags, NewTag },
})
export default class Count extends Vue {
  get recordList(){
    return this.$store.state.recordList;
  }

  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
    createdAt: new Date().toISOString(),
  };

  created(){
    this.$store.commit('fetchRecords');
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    if(this.record.amount === 0){
      return window.alert('金额不能为0！');
    }
    if(this.record.tags.length ===0 || !this.record.tags){
      return window.alert('请至少选择一个标签!');
    }

    if(this.$store.state.createRecordError === null){
     this.$store.commit('createRecord', this.record);
     window.alert('增加成功');
     this.record.notes = '';
     location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.layout ::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
  position: relative;
}
</style>