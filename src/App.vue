<template>
  <div id="app">
    <router-view />
  </div>

</template>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";
  #app{
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333;
    font-family: $font-hei;
    line-height: 1.5;
    font-size: 16px;
    background: #F5F5F5;

    
    margin: 0 auto;
  }
  body{
    min-width: 500px;
    overflow-x: hidden;
  }

</style>