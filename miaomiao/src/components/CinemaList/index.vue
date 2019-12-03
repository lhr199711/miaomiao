<template>
    <div class="bscroll">
        <Scroller>
            <div class='cinemaList-wraper'>
                <div v-for='item in cinemas' :key='item.id' class="item">
                    <div class="elipsis">{{item.nm}} <span style="font-size:12px;"><span style="font-size:18px;">{{item.sellPrice}}</span>元起</span></div>
                    <div>
                        <p class="elipsis">{{item.addr}}</p>
                        <span>{{item.distance}}</span>
                    </div>
                    <div>
                        <span v-for='(v,k,i) in item.tag' :key='i' :class="[(k=='snack' || k=='sell')? 'yellow':'blue']">{{k | formatTag}}</span>
                    </div>
                    <div v-if='item.promotion.cardPromotionTag' class="card">
                        <span>卡</span>{{item.promotion.cardPromotionTag}}
                    </div>
                </div>
            </div>
        </Scroller>
    </div>
</template>

<script>
export default {
    name : 'CinemaList',
    data(){
        return {
            cinemas : []
        }
    },
    mounted(){
        var allh = window.screen.height;
        document.querySelector('.bscroll').style.height = allh-100+'px';
        this.axios.get('/api/cinemaList?cityId=10').then(res=>{
            if(res.data.msg == 'ok'){
                var arr = res.data.data.cinemas;
                for(var i=0;i<arr.length;i++){
                    for(var k in arr[i].tag){
                        if(arr[i].tag[k] == 1){

                        }else if(arr[i].tag[k].length>0 && k == 'hallType'){
                            for(var j =0;j<arr[i].tag[k].length;j++){
                                arr[i].tag[arr[i].tag[k][j]] = arr[i].tag[arr[i].tag[k][j]];
                            } 
                            delete arr[i].tag[k]
                        }else{
                            delete arr[i].tag[k]
                        }
                    }
                }
                this.cinemas = arr;
            }
        })
    },
    filters : {
        formatTag(one){
            var obj = {
                allowRefund : '退',
                endorse : '改签',
                sell : '折扣卡',
                snack : '小吃'
            }
            for(var k in obj){
                if(k ==one){
                    return obj[k];
                }
            }
            return one;
        }
    }
}
</script>

<style scoped>
    .item{
        border-bottom: 1px solid #f5f5f5;
        padding: 13px 30px 13px 15px;
    }
    .item>div:nth-of-type(1){
        color: #333;
    }
    .item>div:nth-of-type(1) span{
        color: #F03D37;
    }
    .item>div:nth-of-type(2){
        display: flex;
        justify-content: space-between;
        color: #666;
        font-size: 14px;
        padding: 4px 0;
    }
    .item>div:nth-of-type(2) p{
        width: 78%;
        margin-right: 4px;
    }
    .item>div:nth-of-type(3){
        display: flex;
        padding: 0 0 4px;
    }
    .item>div:nth-of-type(3)>span{
        display: inline-block;
        font-size: 12px;
        margin-right: 4px;
        padding: 0 3px;
    }
    .item>.card{
        font-size: 12px;
        color: #999;
    }
    .item>.card>span{
        display: inline-block;
        background: skyblue;
        color: #fff;
        width: 16px;
        text-align: center;
        border-radius: 2px;
        margin-right: 5px;
    }
    .blue{
        color: #589DAF;
        border:1px solid #589DAF;
        border-radius: 2px;
    }
    .yellow{
        color: #F90;
        border:1px solid #F90;
        border-radius: 2px;
    }
</style>