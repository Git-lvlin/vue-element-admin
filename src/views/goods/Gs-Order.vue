<template>
<!-- app-container 全局样式 -->
  <div class="app-container order">
    <!-- 表格 -->
    <el-table
        :data="tableData"
        style="width: 100%"
    >
      <el-table-column 
        prop="name"
        label="商品订单"
        align="center"
      >
        <template  slot-scope="scope">
            <div class="surfaceImg">
              <!-- 访问服务器上的图片 -->
              <img :src="'http://localhost:4444'+scope.row.img" alt="">
              <div v-text="scope.row.name"></div>
            </div>
        </template>
      </el-table-column>
      <!-- 订单编号 -->
      <el-table-column
        prop="order_no"
        label="订单编号"
        align="center"
      >
      </el-table-column>
      <!-- 订单上传日期 -->
      <el-table-column
        prop="create_time"
        label="订单生成日期"
        sortable
        width="180">
        <template  slot-scope="scope">
            <!-- 将时间搓转换成日期格式 -->
            <span v-text="$time.timeRepalce(scope.row.create_time,'YYYY-MM-DD')"></span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import io from 'socket.io-client'
export default {
  name: 'GoodsOrder',
  data() {
    return {
      tableData:[],
    }
   },
  mounted(){
    // this.$api.acquireOrder().then(res=>{//获取提交的订单商品列表
    //        console.log(res)
    // })
    var socket=io(this.$config.socketURL,{})
    socket.on('server',oredr=>{//接收socket发来的服务器端发给它的订单信息
      this.$notify({
          title: '成功',
          message:'你有新生成的订单',
          type: 'success',
          duration: 2000,
          onClose: () => {
            this.tableData.push(oredr)
          }
        })
    })
  },
  created(){

  },
  methods:{
   
   
  },
}
</script>

<style scoped lang='scss'>
.order{
  .filter-item{
    margin-left: 10px;
  }
  .surfaceImg{
    display:flex;
     flex-direction: column;
    justify-content: center;
    align-items: center;
    &>img{
      display: block;
      width:80px;
      height:80px;
    }
  }
}
</style>
