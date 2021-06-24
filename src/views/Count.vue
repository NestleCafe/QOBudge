<template>
  <layout class-prefix="layout">
    <div class="numberPad">
      <div class="output">100</div>
      <div class="buttons">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button class="delete"><icon name="delete" /></button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>清空</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button class="ok">完成</button>
        <button class="zero">0</button>
        <button>.</button>
      </div>
    </div>

    <div>
      <ul class="types">
        <li class="selected">支出</li>
        <li>收入</li>
      </ul>
    </div>

    <div>
      <label class="notes">
        <span class="name">备注</span>
        <input type="text" placeholder="在这里添加备注" />
      </label>
    </div>

    <div class="newTag">
        <button>新增标签</button>
    </div>

    <div class="tags">
      <ul class="currentTags">
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
      </ul>
    </div>
  </layout>
</template>

<script lang="ts">
import Layout from "@/components/Layout.vue";
export default {
  components: { Layout },
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
.notes {
  font-size: 14px;
  background: #f5f5f5;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    height: 64px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
.types {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;
  > li {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
.numberPad {
  .output {
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    box-shadow: inset 0 -5px 5px -5px fade_out(black, 0.7),
      inset 0 5px 5px -5px fade_out(black, 0.7);
  }
  .buttons {
    @extend %clearFix;
    > button {
      width: 25%;
      height: 64px;
      float: left;
      background: rgb(240, 244, 247);
      border: none;
      @extend %outerShadow;
      &.delete {
        font-size: 36px;
      }
      &.ok {
        height: 64 * 2px;
        float: right;
        background: $color-highlight;
      }
      &.zero {
        width: 25 * 2%;
      }
    }
  }
}
</style>