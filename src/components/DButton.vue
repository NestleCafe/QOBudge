<template>
    <button class="button" :class="{[classPrefix + '-button']: classPrefix}">
        <slot/>
    </button>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";
@Component
export default class DButton extends Vue{

@Prop(String) 
readonly classPrefix: string | undefined;

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