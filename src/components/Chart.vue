<template>
    <div class="wrapper" ref="wrapper">
        charts
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';

@Component
export default class Chart extends Vue {
    @Prop() options?: EChartsOption;
    mounted(){
        if(this.options === undefined){
            return console.error('options undefined')
        }
        const chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
        chart.setOption(this.options)
    }
}
</script>

<style lang="scss" scoped>
    .wrapper{
        height: 400px;
        background: white;
    }
</style>