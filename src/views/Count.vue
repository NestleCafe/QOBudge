<template>
  <layout class-prefix="layout">
    <number-pad />
    <types />
    <notes />
    <tags />
  </layout>
</template>

<script lang="ts">
import Layout from "@/components/Layout.vue";
import NumberPad from "@/components/Count_NumberPad.vue";
import Types from "@/components/Count_Types.vue";
import Notes from "@/components/Count_Notes.vue";
import Tags from "@/components/Count_Tags.vue";


export default {
  components: { Layout, NumberPad, Types, Notes, Tags, },
  name: "Count",
};
</script>

<style lang="scss">
.layout-content {
  border: 3px solid red;
  display: flex;
  flex-direction: column-reverse;
}
</style>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
</style>