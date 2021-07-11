import Vue from 'vue'
import Component from 'vue-class-component'
import dayjs from "dayjs";
// You can declare mixins as the same style as components.
@Component
export class JudgeDate extends Vue {
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
}