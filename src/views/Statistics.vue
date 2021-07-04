<template>
  <layout>
    <types :value.sync="type" />
    <tabs :dataSource="intervalList" :value.sync="interval" />
    type: {{type}}
    <br/>
    interval: {{interval}}
  </layout>
</template>

<script lang="ts">
import Layout from "@/components/Layout.vue";
import Types from "@/components/Count_Types.vue";
import Tabs from "@/components/Tabs.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  components: { Layout, Types, Tabs },
})
export default class Statistics extends Vue {
  type = "-";
  interval = "day";
  intervalList = [
    { text: "天", value: "day" },
    { text: "周", value: "week" },
    { text: "月", value: "month" },
  ];
}
</script>

<style lang="scss" scoped>
</style>