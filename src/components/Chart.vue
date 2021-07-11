<template>
    <div class="wrapper" ref="wrapper">
        charts
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import * as echarts from 'echarts';
import { EChartsOption, ECharts } from 'echarts';

@Component
export default class Chart extends Vue {
    @Prop() options?: EChartsOption;
    chart?: ECharts;

    mounted(){
        if(this.options === undefined){
            return console.error('options undefined')
        }
        this.chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
        this.chart.setOption(this.options) 
        //echarts宽度响应式
        window.addEventListener('resize',()=>{
            this.chart!.resize();
        })
    }
    @Watch('options')
    onOptionsChange(newValue: EChartsOption){
        this.chart!.setOption(newValue)
    }

}

</script>

<style lang="scss" scoped>
    .wrapper{
        height: 400px;
        background: white;
    }
</style>