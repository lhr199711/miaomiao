<template>
    <div class="msg-wraper">
        <h4>{{title}}</h4>
        <p>{{content}}</p>
        <div>
            <div v-if="cancel!='默认'" @touchstart='cancelfn'>{{cancel}}</div>
            <div @touchstart='okfn'>{{ok}}</div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .msg-wraper{
        width: 200px;
        height: 150px;
        background:#fff;
        position: absolute;
        top:30%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 9999;
        text-align: center;
        line-height: 40px;
        box-shadow: 0px 0px 4px 4px #ccc;
        border-radius: 4px;
        p{
            line-height: 70px;
            font-size: 17px;
            border-top:1px solid #ccc;
            border-bottom:1px solid #ccc;
        }
        >div{
            display: flex;
            >div{
                flex: 1;
            }
            >div:nth-of-type(1){
                border-right: 1px solid #ccc;
            }
        }
    }
</style>