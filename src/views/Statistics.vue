<template>
  <layout>
    <types :value.sync="type" />
    <tabs :dataSource="intervalList" :value.sync="interval" />
    <ol>
      <li v-for="(group, index) in result" :key="index">
        <h3 class="title">{{group.title}}</h3>
        <ol>
          <li v-for="item in group.items" :key="item"
            class="record"
          >
            <span>{{toTagString(item.tags)}}</span> 
            <span class="notes">{{item.notes}}</span>
            <span>¥{{item.amount}}</span>
          </li>
        </ol>
      </li>
    </ol>
    
  </layout>
</template>

<script lang="ts">
import Layout from "@/components/Layout.vue";
import Types from "@/components/Count_Types.vue";
import Tabs from "@/components/Statistics_Tabs.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import intervalList from "@/constants/intervalList";

@Component({
  components: { Layout, Types, Tabs },
})
export default class Statistics extends Vue {
  toTagString(tags: string[]){
    return tags.length === 0? '无' :tags.join(',')
  }
  beforeCreate(){
    this.$store.commit('fetchRecords')
  }
  get recordList(){
    return (this.$store.state as RootState).recordList;
  }

  get result(){
    const {recordList} = this;
    type HashTableValue = { title: string, items: RecordItem[] };

    const hashTable:{ [key: string]: HashTableValue } = {};
    for(let i=0; i<this.recordList.length; i++){
      const [date, time] = recordList[i].createdAt!.split('T');
      hashTable[date] = hashTable[date] || {title: date, items:[]};
      hashTable[date].items.push(recordList[i]);
    }
    return hashTable;
  }

  type = "-";
  interval = "day";
  intervalList = intervalList;
}
</script>

<style lang="scss" scoped>
%item{
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title{
  /* margin-top: 4px; */
/*   background: #B7F2D4; */
  @extend %item;
}
.record{
  background: white;
  @extend %item;
}
.notes{
  margin-right: auto;
  margin-left: 16px;
  color: #999; 
  font-size: 14px;
}
</style>