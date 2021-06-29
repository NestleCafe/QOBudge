<template>
  <layout class-prefix="layout">
    <number-pad :value.sync="record.amount" @submit="saveRecord" />
    <form-item fieldName="备注" @update:value="onUpdateNotes" />
    <new-tag :data-source.sync="tags" />
    <tags :data-source="tags" @update:value="onUpdatetTags" />
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

import { Component, Watch } from "vue-property-decorator";
import { recordListModel } from "@/models/recordList";
import { tagListModel } from "@/models/tagListModel";

const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();

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
  tags = tagList;
  recordList: RecordItem[] = recordList;
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };

  onUpdatetTags(value: string[]) {
    this.record.tags = value;
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    const deepCloneRecord: RecordItem = recordListModel.deepClone(this.record);
    deepCloneRecord.createdAt = new Date();
    this.recordList.push(deepCloneRecord);
  }
  @Watch("recordList")
  onRecordListChange() {
    recordListModel.save(this.recordList);
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