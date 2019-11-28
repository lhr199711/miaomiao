<template>
    <div class="city-wraper">
        <div class="hotCities">
            <h4>热门城市</h4>
            <div>
                <p v-for="item in hots" :key="item.id">{{item.nm}}</p>
            </div>
        </div>
        <div>
            <div v-for='item in cities' :key='item.id' class="allCities">
                <h4>{{item.index}}</h4>
                <div>
                    <p v-for='k in item.list' :key='k.id'>{{k.nm}}</p>
                </div>
            </div>
        </div>
        <div class="slideBar">
            <p v-for='(item,i) in cities' :key='item.id' @touchstart='handToTop(i)'>{{item.index}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name : 'City',
    data(){
        return {
            hots : [],
            cities : []
        }
    },
    mounted(){
        this.axios.get('/api/cityList').then(res=>{
            if(res.data.msg=='ok'){
                var ajaxdata = res.data.data.cities;
                this.format(ajaxdata);
            }
        })
    },
    methods : {
        format(ajaxdata){
            var hotCities = [];
            var allCities = [];
            for(var i=0;i<ajaxdata.length;i++){
                if(ajaxdata[i].isHot){
                    hotCities.push({nm:ajaxdata[i].nm,id:ajaxdata[i].id})
                }
                if(findSzm(ajaxdata[i])){
                    for(var k=0;k<allCities.length;k++){
                        if(allCities[k].index == ajaxdata[i].py[0].toUpperCase()){
                            allCities[k].list.push({nm:ajaxdata[i].nm,id:ajaxdata[i].id})
                        }
                    }
                }else{
                    allCities.push({index:ajaxdata[i].py[0].toUpperCase(),list:[{nm:ajaxdata[i].nm,id:ajaxdata[i].id}]})
                }
            }
            allCities.sort((a,b)=>{
                if(a.index > b.index){
                    return 1
                }else{
                    return -1
                }
            })
            this.hots = hotCities;
            this.cities = allCities;

            function findSzm(item){
                var itemSzm = item.py[0].toUpperCase();
                for(var j=0;j<allCities.length;j++){
                    if(itemSzm==allCities[j].index){
                        return true;
                    }
                }
                return false;
            }
        },  
        handToTop(i){    
            var h4s = document.querySelectorAll('.allCities>h4');
            var value = h4s[i].offsetTop;
            window.scrollTo({ 
                top: value-91,
                behavior: "instant"
            })
        }
    }
}
</script>

<style scoped>
    .city-wraper{
        background: #ebebeb;
        padding: 0 0 51px;
    }
    .allCities>h4,.hotCities>h4{
        line-height: 30px;
        padding: 0 0 0 15px;
        font-weight: 400;
        font-size: 14px;
    }
    .hotCities>div{
        background: #f5f5f5;
        display: flex;
        padding: 15px 45px 0 15px;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .hotCities>div>p{
        background: #fff;
        color: #333;
        line-height: 30px;
        font-size: 14px;
        width: 30%;
        text-align: center;
        margin-bottom: 15px;
        border: 1px solid #e6e6e6;
        border-radius: 3px;
    }
    .allCities p{
        line-height: 44px;
        font-size: 14px;
        color: #333;
        background: #f5f5f5;
        border-bottom: 1px solid #ebebeb;
        padding:0 0 0 15px;
    }
    .slideBar{
        padding: 20px 0;
        position: fixed;
        right: 0;
        top: 91px;
        z-index: 100;
        height: calc(100% - 182px);
        width: 30px;
        background: #ebebeb;
        text-align: center;
        display: flex;
        flex-direction:column;
        justify-content: space-between;
    }
</style>