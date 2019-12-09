<template>
    <div class="detail-wraper">
        <Header title="影片详情">
            <span></span>
        </Header> 
        <div>
            {{detailMovie.nm}}
        </div> 
    </div>
</template>

<script>
export default {
    data(){
        return {
            detailMovie : {}
        }
    },
    props : ['movieId'],
    mounted(){
        this.axios.get('/ajax/ajax/detailmovie?movieId='+this.movieId).then(res=>{
            if(res.data.detailMovie.star){
                this.detailMovie = res.data.detailMovie;
            }
        })
    }
}
</script>

<style scoped>
    .detail-wraper{
        min-height: 100%;
        position: fixed;
        top: 0;
        left:0;
        width: 100%;
        z-index: 10000;
        background: #fff;
        animation: moveLeft .3s;
    }
    @keyframes moveLeft {
        0%{transform: translateX(100%)}
        100%{transform: translateX(0%)}
    }
</style>