<template>
  <layout>
    <types :value.sync="type" />
    <!-- <tabs :dataSource="intervalList" :value.sync="interval" /> -->
    <ol>
      <li v-for="(group, index) in timeGroupList" :key="index">
        <h3 class="title">{{judgeDate(group.title)}} 
          <span>总计:{{group.total}}</span>
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

@Component({
  components: { Layout, Types, Tabs },
})
export default class Statistics extends Vue {
  type = "-";
  interval = "day";
  intervalList = intervalList;

  judgeDate(date: string){
    const now = dayjs();
    const day = dayjs(date);

    if(day.isSame(now, 'day')){
      return '今天';
    }else if(day.isSame(now.subtract(1, 'day'), 'day')){
      return '昨天';
    }else if(day.isSame(now.subtract(2, 'day'), 'day')){
      return '前天';
    }else if(day.isSame(now, 'year')){
      return day.format('M月D日');
    }else{
      return day.format('YYYY年MM月DD日');
    }
  }

  toTagString(tags: Tag[]){
    return tags.length === 0? '无' :tags.join(',')
  }
  beforeCreate(){
    this.$store.commit('fetchRecords')
  }
  get recordList(){
    return (this.$store.state as RootState).recordList;
  }
  get timeGroupList(){
    const {recordList} = this;
    if(recordList.length===0){return [];}
    const newList = deepClone(recordList).filter(record => record.type === this.type)
      .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
  
    type Result = {title: string, total?: number, items: RecordItem[]}[]
    //相同日期分成同一组 上面sort排序过了 第一个一定是最近的
    const result:Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items:[newList[0]]}];

    for(let i=1; i<newList.length; i++){
      const current = newList[i]
      const last = result[result.length - 1]
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
</style>