<template>
<!-- app-container 全局样式 -->
  <div class="app-container list">
    <div class="filter-container">
      <el-button 
          type="primary"
          @click="onadd"
          class="filter-item"
          >
          立即新增
      </el-button>
    </div>
    <!-- 表格 -->
    <el-table
        :data="tableData"
        style="width: 100%"
    > <!-- 当选择项发生变化时会触发该事件 -->
     
       <!-- 序号 -->
       <el-table-column
        prop="star"
        label="序号"
        align="center"
      />
      <!-- 活动名称 -->
      <el-table-column
        prop="desc"
        label="活动名称"
        align="center"
      />
      <!-- Banner -->
       <el-table-column 
        prop="name"
        label="Banner"
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
       <!-- 活动名称 -->
      <el-table-column
        prop="link"
        label="Target链接"
        align="center"
      />
      <!-- 热销 -->
      <el-table-column
        prop="hot"
        label="状态"
        align="center"
      >
       <template  slot-scope="scope">
            <span v-text='scope.row.hot ? "是":"否"'></span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEorD(scope.row,'edit')">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleEorD(scope.row,'del')">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格end -->
  </div>
</template>

<script setup lang="ts">
import { Pagination } from '@/components'
export default {
  name: 'GoodsTabel',
  components: { Pagination }, // 导入封装组件
  data() {
    return {
      filter:{
        page:1,
        size:5,
        name:'',
        img:'',
        link:''
      },
      total:32,
      input: '',
      tableData: [],
    }
  },
  created(){
    this.getList()
  },
  methods:{
    onadd(){//商品新增
      this.$router.push('/adve/from')
    },
    getList(e){//调获取商品列表接口
      if(! ( e && !e.falg) ){//当不是点击分页时执行,page变为第一页
        this.filter.page=1
      }
      this.$api.findbanner(this.filter).then(res=>{
        console.log(res)
          var { list,total }=res.data//解构赋值
          this.tableData=list//获取商品列表
          this.total=total
        })
    },


  },

}
</script>

<style scoped lang='scss'>
.list{
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
