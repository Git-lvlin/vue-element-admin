<template>
    <div class="app-container">
        <!-- 新增按钮 -->
        <el-button 
            type="primary"
            @click="addUser"
            class="filter-item"
        >
          立即新增
      </el-button>
        <!-- 用户管理表格 -->
        <!-- 表格 -->
        <el-table
            :data="tableData"
            style="width: 100%"
        > 
       <el-table-column
            prop="username"
            label="用户名"
            align="center"
        />
       <el-table-column
            prop="role_name"
            label="用户名称"
            align="center"
      />
       <el-table-column
            prop="status"
            label="用户状态"
            align="center"
      />
       </el-table>
    <!-- 表格end -->

    <!-- 弹框 -->
    <el-dialog title="添加用户" 
        :visible.sync="show"
        close="close"
    >
    <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input 
                v-model="form.username"
                autocomplete="off"
            >
            </el-input>
        </el-form-item>
        <el-form-item label="用户名称" :label-width="formLabelWidth">
            <el-select v-model="form.role" placeholder="请选择用户">
                <el-option 
                v-for="item in roleArr"
                :key="item._id"
                :label="item.roleName"
                :value="item.role"
                />
            </el-select>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button @click="commit">确 定</el-button>
    </div>
</el-dialog>
</div>
</template>

<script setup lang="ts">
export default{
    data(){
        return {
            tableData:[],//用户信息列表
            show:false,
            form: {
                username: '',
                role: '',
            },
            roleArr:[],//用户角色列表
        formLabelWidth: '120px'
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){//获取用户信息
            this.$api.AcquireUser().then(res=>{
                this.tableData=res.data.list
            })
        },
        addUser(){//获取角色信息
            this.show=true//显示弹窗
            this.$api.AcquireAdmin().then(res=>{
                this.roleArr=res.data.list
            })
        },
        //取消按钮
        cancel(){
            this.show=false//关闭弹窗
        },
        //确认按钮
        commit(){//添加用户信息
        console.log('form',this.form)
            this.show=false
            this.$api.userAdd(this.form).then(res=>{
                console.log(res)
            })
            this.init()
        },
        close(e){
            console.log(e)
        }
    }
}
</script>

<style scoped>

</style>