<template>
  <layout>
    <types :value.sync="type" />
   <!--  <tabs :dataSource="intervalList" :value.sync="interval" />
   {{interval}} -->
    <div class="chartWrapper" ref="chartWrapper">
      <chart class="chart" :options="line"/>
     <!--  <chart v-else-if="interval === 'month'"
      class="chart" :options="line"/> -->
    </div>
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
import { Component, Watch } from "vue-property-decorator";
import intervalList from "@/constants/intervalList";
import dayjs from 'dayjs';
import deepClone from '@/lib/deepClone'
import Icon from "@/components/icon.vue";
import { mixins } from "vue-class-component";
import { JudgeDate }from "@/mixins/JudgeDate";
import _ from 'lodash'

/* import ECharts from "vue-echarts"
import 'echarts/lib/chart/bar'
import "echarts" */

import Chart from "@/components/Chart.vue"

@Component({
  components: { Layout, Types, Tabs, Icon, Chart },
})

export default class Statistics extends mixins(JudgeDate) {
  
  type = "-";
  interval = "day";
  intervalList = intervalList;
  
  mounted(){
    const div = (this.$refs.chartWrapper as HTMLDivElement)
    div.scrollLeft = div.scrollWidth;
  }

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

  get timeGroupData(){
    const today = new Date();
    const array = [];
    for(let i=0; i<=29; i++){
      //获取近30天日期
      const date = dayjs(today).subtract(i, 'day').format('YYYY-MM-DD');
      //找到当天的金额
      const found = _.find(this.recordList, {createdAt: date});
      array.push({
        date: date, 
        value: found ? found.amount : 0,  //有则统计无则0
        });
    }
    return array.reverse();
  }
  
  get line(){
    const keys = this.timeGroupData.map(item => item.date);
    const values = this.timeGroupData.map(item => item.value);
    return{
      grid:{
        left: 16,
        right: 16,
      },
      xAxis: {
        type: 'category',
        data: keys,
        axisTick: {
          alignWithLabel: true
        }
      },
      yAxis: {
        type: 'value',
        show: false,
      },
      series: [{
        symbolSize: 10,
        data: values,
        type: 'line',
        itemStyle: {
          normal: {
            label: {
              show: true, //开启显示
              position: 'top', //在上方显示
              textStyle: { //数值样式
              color: '#999',
              fontSize: 14,
              }
            }
          },
          showBackground: true,
          backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
          }
        },
      }],
     
    }
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
.chartWrapper{
  &::-webkit-scrollbar{
    display: none;
  }
  overflow: auto;
  .chart{
   width: 430%;
  }
}
</style>