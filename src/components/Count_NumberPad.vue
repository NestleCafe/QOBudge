<template>
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
        <button class="dot">.</button>
      </div>
    </div>
</template>

<script lang="ts">
    export default {
        name:'Count_NumberPad',
    }
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
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
      font-family: $font-hei;
      font-size: 22px;
      width: 25%;
      height: 64px;
      float: left;
      background: rgb(240, 244, 247);
      border: none;
      @extend %outerShadow;
      &.delete {
        font-size: 32px;
      }
      &.ok {
        height: 64 * 2px;
        float: right;
        background: $color-highlight;
      }
      &.zero {
        width: 25 * 2%;
      }
      &.dot{
        font-weight: bold;
      }
    }
  }
}
</style>