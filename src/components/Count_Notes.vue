<template>
    <div>
        <label class="notes">
        <span class="name">
          <icon name="notes" class="icon" />备注
          </span>
        <input type="text" placeholder="在这里添加备注" />
      </label>
    </div>
</template>

<script lang="ts">
    export default {
        name:'Count_Notes',
    }
</script>

<style lang="scss" scoped>
.notes {
  font-size: 14px;
  background: #f5f5f5;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
    .icon{
      font-size: 16px;
    }
  }
  input {
    height: 2.5em;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>