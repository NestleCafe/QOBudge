<template>
  <nav>
    <router-link to="/labels" class="item" active-class="selected">
      <icon name="Label" />
      标签</router-link
    >

    <router-link to="/count" class="item" active-class="selected">
      <icon name="add" />
      记一笔
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <icon name="data" />
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
nav {
  @extend %outerShadow;
  display: flex;
  flex-direction: row;
  font-size:12px ;
  > .item{
    width: 33.33%;
    padding: 2px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
   /*  border: solid rgb(231,231,231);
    border-width: 0 1px; */
    .icon{
      width: 32px;
      height: 32px;
    }
  }
  > .item.selected{
    background: $color-highlight;
  }
}

</style>