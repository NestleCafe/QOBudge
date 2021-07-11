<template>
    <div class="layout-wrapper" :class="{[classPrefix + '-wrapper']: classPrefix }">
        <div class="content" :class="{[classPrefix + '-content']: classPrefix }">
            <slot />
        </div>
        <Nav />
    </div>
</template>

<script lang="ts">
    export default {
        props:['classPrefix'],
        name:'Layout',
    }
</script>

<style lang="scss" scoped>
.layout-wrapper{
    display: flex;
    flex-direction: column;
    max-height: 100vh;
    overflow: auto;
}
.content{
    flex-grow: 1;
    overflow: auto;
}
</style>