<template>
    <button class="button">
        <slot/>
    </button>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
@Component
export default class DButton extends Vue{

}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
  .button {
    /* background: #2B82D8; */
    background: $color-highlight;
    border-radius: 4px;
    border: none;
    height: 40px;
    padding: 0 16px;
    opacity: 0.8;
  }

</style>