<template>
  <div>
    <div class="tags">
      <ul class="currentTags" :class="classPrefix && `${classPrefix}-currentTags`">
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
      </ul>
    </div>

    <div class="newTag">
      <button>新增标签</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Count_Tags",
  props:['classPrefix'],
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
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    > li {
      background: #F5F5F5;
      $height: 24px;
      line-height: $height;
      padding: 0 16px;
      border-radius: $height/2;
      margin-right: 14px;
      margin-top: 4px;
    }
  }
}
.newTag {
  font-size: 14px;
  padding: 16px;
  button {
    background: transparent;
    border: none;
    border-bottom: 2px solid #999;
    color: #999;
    padding: 0 4px;
  }
}
</style>