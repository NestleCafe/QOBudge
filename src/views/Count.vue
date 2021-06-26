<template>
  <layout class-prefix="layout">
    <number-pad />
    <notes />
    <new-tag />
    <tags :data-source="tags" />
    <types />
  </layout>
</template>

<script>
import Layout from "@/components/Layout.vue";
import NumberPad from "@/components/Count_NumberPad.vue";
import Types from "@/components/Count_Types.vue";
import Notes from "@/components/Count_Notes.vue";
import Tags from "@/components/Count_Tags.vue";
import NewTag from '@/components/Count_NewTag.vue';


export default {
  components: { Layout, NumberPad, Types, Notes, Tags, NewTag },
  name: "Count",
  data(){
    return{
      tags:['衣', '食', '住', '行', '医疗']
    }
  }
};
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
  position: relative;
}
</style>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
</style>