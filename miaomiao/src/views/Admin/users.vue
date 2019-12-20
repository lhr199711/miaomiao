<template>
    <div>
        <el-table :data="tableData" height="250" border style="width: 100%">
            <el-table-column prop="date" label="注册时间"></el-table-column>
            <el-table-column prop="name" label="用户名"></el-table-column>
            <el-table-column prop="name" label="邮箱"></el-table-column>
            <el-table-column label="操作"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>