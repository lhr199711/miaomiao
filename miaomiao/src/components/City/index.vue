<template>
    <div class="bscroll">
        <Loading v-if="isLoading" />
        <Scroller v-else ref='scroller'>
            <div class="cityWraper" style='transform: translate(0px, 0px) scale(1) translateZ(0px);'>
                <div class="title" v-if='hots.length'>
                    <p>热门城市</p>
                    <div>
                        <p v-for='item in hots' :key='item.id' @tap='chooseNowCity(item.nm,item.id)'>{{item.nm}}</p>
                    </div>
                </div>
                <div class="content">
                    <div v-for='(item,i) in cities' :key='i'>
                        <p>{{item.index}}</p>
                        <p v-for='k in item.list' :key='k.id' @tap='chooseNowCity(k.nm,k.id)'>{{k.nm}}</p>
                    </div>
                </div>
            </div>
        </Scroller>
        <div class="slide">
            <p v-for='(item,index) in cities' :key='item.index' @touchstart='toTop(index)'>{{item.index}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name : 'City',
    data(){
        return {
            hots : [],
            cities : [],
            isLoading : true
        }
    },
    mounted(){
        var allh = window.screen.height;
        document.querySelector('.bscroll').style.height = allh-142+'px';

        var hotss=window.localStorage.getItem('hotCities');
        var allss=window.localStorage.getItem('allCities');
        if(hotss && allss){
           this.hots = JSON.parse(hotss);
           this.cities = JSON.parse(allss);
           this.isLoading = false;
        }else{
            this.axios.get('/ajax/dianying/cities.json').then(res=>{
                if(res.data.cts && res.data.cts.length){
                    var ajaxdata = res.data.cts;
                    this.format(ajaxdata);
                }
            })
        }
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
            this.isLoading = false;
            window.localStorage.setItem('hotCities',JSON.stringify(hotCities));
            window.localStorage.setItem('allCities',JSON.stringify(allCities));
            
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
        },
        toTop(index){
            var ps = document.querySelectorAll('.content>div>p:nth-of-type(1)');
            var y = -ps[index].offsetTop;
            this.$refs.scroller.scorllToTop(y)
        },
        chooseNowCity(nm,id){
            window.localStorage.setItem('nowNm',nm);
            window.localStorage.setItem('nowId',JSON.stringify(id));
            this.$store.commit('nowCity/CHANGE_NOWCITY',{nm,id});
            this.$router.push('/movie/nowplaying');
        }
    }
}
</script>

<style scoped>
    .bscroll{
        background: #ebebeb;
        height: 525px;
    }
    .cityWraper{
        background: #ebebeb;
    }
    .title>p:nth-of-type(1){
        font-size:14px;
        line-height: 30px;
        text-indent: 15px;
    }
    .title>div{
        display: flex;
        flex-wrap: wrap;
        background: #f5f5f5;
        padding: 15px 15px 0;
        margin-right: 30px;
        justify-content: space-between;
    }
    .title>div>p{
        background: #fff;
        width: 30%;
        text-align: center;
        margin-bottom: 15px;
        line-height: 30px;
        border: 1px solid #e6e6e6;
        border-radius: 3px;
    }
    .content>div>p{
        text-indent: 15px;
        line-height: 40px;
        font-size: 14px;
        background: #f5f5f5;
        margin-right: 30px;
        border-bottom:1px solid #ebebeb;
    }
    .content>div>p:nth-of-type(1){
        line-height: 30px;
        background: #ebebeb;
    }
    .slide{
        position: fixed;
        padding: 20px 0;
        z-index: 200;
        height: 485px;
        background: #ebebeb;
        width: 30px;
        top:91px;
        right: 0;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
</style>