<template>
  <layout>
    <div>编辑标签</div>
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import Layout from "@/components/Layout.vue";
import { Component } from "vue-property-decorator";

@Component({
    components: { Layout },
})
export default class EditLabel extends Vue {}
</script>

<style lang="scss" scoped>
</style>