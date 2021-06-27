<template>
  <layout class-prefix="layout">
    <number-pad :value.sync="record.amount" @submit="saveRecord" />
    <notes @update:value="onUpdateNotes" />
    <new-tag :data-source.sync="tags" />
    <tags :data-source="tags" @update:value="onUpdatetTags" />
    {{ recordList }}
    <types :value.sync="record.type" />
  </layout>
</template>

<script lang="ts">
import Vue from "vue";

import Layout from "@/components/Layout.vue";
import NumberPad from "@/components/Count_NumberPad.vue";
import Types from "@/components/Count_Types.vue";
import Notes from "@/components/Count_Notes.vue";
import Tags from "@/components/Count_Tags.vue";
import NewTag from "@/components/Count_NewTag.vue";

import { Component, Watch } from "vue-property-decorator";
const recordList: Record[] = JSON.parse(
  window.localStorage.getItem("recordList") || "[]"
);

/* const version = window.localStorage.getItem("DateVersion") || "0";

//做数据迁移 数据库升级
if (version === "0.0.1") {
  recordList.forEach((record) => {
    record.createdAt = new Date(2021, 1, 1);
  });//保存数据
  window.localStorage.setItem("recordList", JSON.stringify(recordList));
}
window.localStorage.setItem("DateVersion", "0.0.2"); */

type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: Date;
};

@Component({
  components: { Layout, NumberPad, Types, Notes, Tags, NewTag },
})
export default class Count extends Vue {
  tags = ["衣", "食", "住", "行", "医疗"];
  recordList: Record[] = JSON.parse(
    window.localStorage.getItem("recordList") || "[]"
  );
  record: Record = {
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
    const deepCloneRecord: Record = JSON.parse(JSON.stringify(this.record));
    deepCloneRecord.createdAt = new Date();
    this.recordList.push(deepCloneRecord);
  }
  @Watch("recordList")
  onRecordListChange() {
    window.localStorage.setItem("recordList", JSON.stringify(this.record));
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