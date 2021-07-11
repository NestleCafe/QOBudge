<template>
  <layout>
    <types :value.sync="type" />
    <!-- <tabs :dataSource="intervalList" :value.sync="interval" /> -->
    <ol v-if="timeGroupList.length > 0">
      <li v-for="(group, index) in timeGroupList" :key="index">
        <h3 class="title">{{judgeDate(group.title)}} 
          <span>总计: ¥ {{group.total}}</span>
          </h3>
        <ol>
          <li v-for="item in group.items" :key="item.id"
            class="record"
          >
            <span>{{toTagString(item.tags)}}</span> 
            <span class="notes">{{item.notes}}</span>
            <span>{{type}} ¥{{item.amount}}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult"> 
      <icon name="null"/>
      <div>暂时没有相关记录！</div>
    </div>
  </layout>
</template>

<script lang="ts">
import Layout from "@/components/Layout.vue";
import Types from "@/components/Count_Types.vue";
import Tabs from "@/components/Statistics_Tabs.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import intervalList from "@/constants/intervalList";
import dayjs from 'dayjs';
import deepClone from '@/lib/deepClone'
import Icon from "@/components/icon.vue";

import { mixins } from "vue-class-component"
import { JudgeDate }from "@/mixins/JudgeDate"

@Component({
  components: { Layout, Types, Tabs, Icon },
})

export default class Statistics extends mixins(JudgeDate) {
  type = "-";
  interval = "day";
  intervalList = intervalList;

  toTagString(tags: Tag[]){
    return tags.length === 0 ? '无' :tags.join(',')
  }
  beforeCreate(){
    this.$store.commit('fetchRecords')
  }
  get recordList(){
    return (this.$store.state as RootState).recordList;
  }
  get timeGroupList(){
    const {recordList} = this;
  
    const newList = deepClone(recordList).filter(record => record.type === this.type)
      .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
  
    if(newList.length===0){return [];}

    type Result = {
      title: string,
      total?: number, 
      items: RecordItem[]
    }[]
    //相同日期分成同一组 上面sort排序过了 第一个一定是最近的
    const result:Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items:[newList[0]]}];

    for(let i=1; i<newList.length; i++){
      const current = newList[i];
      const last = result[result.length - 1];
      if(dayjs(last.title).isSame(dayjs(current.createdAt), 'day')){
        last.items.push(current);
      }else{
        result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
      }
    }
    result.map(group =>{
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
    })
    return result;
  }


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
.noResult{
  padding: 16px;
  margin-top: 48px;
  text-align: center;
  color: #999;
  .icon{
    font-size: 200px;
  }
}
</style>