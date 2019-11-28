<template>
    <div>
        <Header title='我的'></Header>
        <Login/>   
        <TabBar></TabBar> 
    </div>
</template>

<script>
import Login from '@/components/Login';
export default {
    name:'Mine',
    components : {
        Login
    }
}
</script>

<style>

</style>