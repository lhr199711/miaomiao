<template>
    <div>
        <el-table :data="tenItems" border style="width: 100%">
            <el-table-column prop="date" label="注册时间"></el-table-column>
            <el-table-column prop="username" label="用户名"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column label="操作">
                 <template slot-scope="scope">
                    <el-button class="button" slot="reference" size="mini" @click="updateFreeze(scope.$index, scope.row)">{{scope.row.isFreeze ? '已冻结' : '未冻结'}}</el-button>
                    <el-button class="button" slot="reference" size="mini" type="danger" @click="deleteOne(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="navBottom">
            <el-pagination :page-size="pageSize" :current-page.sync="nowpage" background layout="prev, pager, next" :total="tableData.length"></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            tableData : [],
            nowpage : 1,
            pageSize : 12
        }
    },
    mounted(){
        this.axios.get('/api2/api2/admin/usersList').then(res=>{
            if(res.data.status == 0){
                this.tableData = res.data.data;
            }
        })
    },
    computed : {
        tenItems(){
            return this.tableData.slice((this.nowpage-1)*this.pageSize,this.nowpage*this.pageSize)
        }
    },
    methods : {
        updateFreeze(i,item) {
            this.$confirm('确定执行此操作吗, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.axios.post('/api2/api2/admin/updateFreeze',{email:item.email,isFreeze:!item.isFreeze}).then(res=>{
                    if(res.data.status == 0){
                        this.tableData[i].isFreeze = !item.isFreeze;
                    }
                })
            }).catch(() => {
            
            });
        },
        deleteOne(i,item){
            this.$confirm('确定执行此操作吗, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.axios.post('/api2/api2/admin/deleteOneUser',{email:item.email}).then(res=>{
                    if(res.data.status == 0){
                        this.tableData.splice(i,1);
                    }
                })
            }).catch(() => {
            
            });
        }
    }
}
</script>

<style scoped>
    .button{
        margin:0 10px 0 0;
    }
    .navBottom{
        text-align: center;
        padding: 40px 0 0;
    }
    .el-pagination{
        display: inline-block;
    }
</style>