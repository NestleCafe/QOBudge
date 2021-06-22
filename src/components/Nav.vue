<template>
  <div class="nav">
    <router-link to="/labels">
      <icon name="Label"/>
      标签</router-link
    >
    |
    <router-link to="/count"> 
      <icon name="add"/>
      记一笔 
    </router-link>
    |
    <router-link to="/statistics">
    <icon name="data"/>
    统计
    </router-link>
  </div>
</template>

<script lang="ts">


export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
.nav {
  border: 1px solid red;
  display: flex;
  justify-content: center;
}
</style>