<template>
    <div class="scroller-wraper" ref="scroller">
        <slot></slot>    
    </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
    name : 'Scroller',
    mounted(){
        var scorll =new BScroll(this.$refs.scroller,{
            tap : true,
            probeType: 1
        });
    }
}
</script>

<style scoped>
    .scroller-wraper{
        height: 100%;
    }
</style>