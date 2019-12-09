<template>
    <div class="header-wraper">
        <div @touchstart='clickfn'><slot></slot></div>{{title}}
    </div>
</template>

<script>
export default {
    name:'Header',
    props : {
        title : {
            type : String,
            default : '写着玩的'
        }
    },
    methods : {
        clickfn(){
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/movie/nowplaying');
        }
    }
}
</script>

<style scoped>
    .header-wraper{
        font-size:18px;
        line-height: 50px;
        text-align: center;
        color: #fff;
        background: red;
        position: sticky;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 999;
    }
    .header-wraper>div{
        position: absolute;
        left: 20px;
        top: 0;
        bottom: 0;
        margin: auto 0;
    }
    .header-wraper span{
        display: inline-block;
        width: 16px;
        height: 16px;
        border-bottom: 2px solid #fff;
        border-left: 2px solid #fff;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        
    }
</style>