<template>
    <div class="scroller-wraper" ref="scroller">
        <slot></slot>    
    </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
    name : 'Scroller',
    props : {
        handleToScroll : {
            type : Function,
            default : function(){}
        },
        handleTotouchEnd : {
            type : Function,
            default : function(){}
        }
    },
    mounted(){
        var scorll =new BScroll(this.$refs.scroller,{
            tap : true,
            probeType: 1
        });
        this.scroll = scorll;
        scorll.on('scroll',(pos)=>{
            this.handleToScroll(pos)
        })
        scorll.on('touchEnd',(pos)=>{
            this.handleTotouchEnd(pos)
        })
    },
    methods : {
        scorllToTop(y){
            this.scroll.scrollTo(0,y);
        }
    }
}
</script>

<style scoped>
    .scroller-wraper{
        height: 100%;
    }
</style>