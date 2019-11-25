<template>
    <div class="header-wraper">
        {{title}}
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
</style>