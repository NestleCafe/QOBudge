<template>
  <div>
      
    <div class="tags">
      <ul class="currentTags">
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Count_Tags",
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tags {
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  > .currentTags {
    align-self: flex-start;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    > li {
      background: #d9d9d9;
      $height: 24px;
      line-height: $height;
      padding: 0 16px;
      border-radius: $height/2;
      margin-right: 14px;
      margin-top: 4px;
    }
  } 
}
</style>