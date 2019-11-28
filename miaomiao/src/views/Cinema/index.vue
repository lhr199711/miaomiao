<template>
    <div>
        <Header title="影院"></Header>
        <CinemaList/>  
        <TabBar></TabBar>  
    </div>
</template>

<script>
import CinemaList from '@/components/CinemaList'
export default {
    name:'Cinema',
    components : {
        CinemaList
    }
}
</script>

<style>

</style>