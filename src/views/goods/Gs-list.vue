<template>
<!-- app-container 全局样式 -->
  <div class="app-container tabel">
    <div class="filter-container">
      <!-- 搜索框 -->
      <el-input 
          v-model="filter.name"
          placeholder="商品名称"
          style="width: 200px;"
          class="filter-item"
          clearable
          @clear="clearValue"
          @keyup.enter.native="handleFilter"
       />
      <!-- 根据品类进行搜索下拉菜单 -->
       <CateSelect 
          v-model='filter.cate'
          @change="handleFilter"
       />
      <!-- 日期选择器 -->
      <el-date-picker
          v-model="filter.data"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="filter-item"
      >
      </el-date-picker>
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
        @selection-change="selectCheckbox"
    > <!-- 当选择项发生变化时会触发该事件 -->
   
    <!-- 复选框 -->
      <el-table-column
        type="selection"
        width="55"
        align="center"
      />
      <el-table-column 
        prop="name"
        label="商品"
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
      <!-- 品类 -->
      <el-table-column
        prop="cate"
        label="品类"
        align="center"
      >
      <template  slot-scope="scope">
            <span v-text="replCate(scope.row.cate)"></span>
      </template>
      </el-table-column>
      <!-- 上传日期 -->
      <el-table-column
        prop="create_time"
        label="上传日期"
        sortable
        width="180">
        <template  slot-scope="scope">
            <!-- 将时间搓转换成日期格式 -->
            <span v-text="$time.timeRepalce(scope.row.create_time,'YYYY-MM-DD')"></span>
        </template>
      </el-table-column>
      <!-- 商品描述 -->
      <el-table-column
        prop="desc"
        label="商品描述"
        align="center"
      />
      <!-- 价格 -->
      <el-table-column
        prop="price"
        label="价格"
        align="center"
      >
        <template  slot-scope="scope">
            <span v-text='"￥"+scope.row.price'></span>
        </template>
      </el-table-column>
      <!-- 商品排名 -->
       <el-table-column
        prop="star"
        label="商品排名"
        align="center"
      />
      <!-- 热销 -->
      <el-table-column
        prop="hot"
        label="是否热销"
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
    <div style="margin-top: 20px">
      <el-button
        size="mini"
        type="danger"
        @click="removeAll"
      >
        删除所选行
      </el-button>
     </div>

    <!-- 分页 -->
    <pagination
      v-show="total>0" 
      :total="total" 
      :page.sync="filter.page" 
      :limit.sync="filter.size"
      @pagination="getList" 
      />
  </div>
</template>

<script setup lang="ts">
import { Pagination,CateSelect } from '@/components'
import { mapGetters } from 'vuex'
export default {
  name: 'GoodsTabel',
  components: { Pagination ,CateSelect }, // 导入封装组件
  data() {
    return {
      filter:{
        page:1,
        size:5,
        name:'',
        cate:'',
        date:'',
        img:'',
        price:1,
        star:1,
        hot:true,
        desc:''
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
      this.$router.push('/goods/from')
    },
    getList(e){//调获取商品列表接口
      if(! ( e && !e.falg) ){//当不是点击分页时执行,page变为第一页
        this.filter.page=1
      }
      this.$api.homeList(this.filter).then(res=>{
        
          var { list,total }=res.data//解构赋值
          this.tableData=list//获取商品列表
          this.total=total
        })
    },
    clearValue(){//搜索完成清除触发
      this.getList()
    },
    handleFilter(){//触发搜索   按enter建触发
        this.getList()
    },
    //品类替换成中文
    replCate(cate){
      //cate  所有英文品类
      const ele=this.cateArr.find(ele=>ele.cate==cate)
      return ele? ele.cate_zh :''
    },
    //编辑 or  删除
    handleEorD(row,type){
      if(type=='edit'){
        //编辑
        // console.log(row._id)  会打印出所点的id
        this.$router.push('/goods/from/'+row._id)
      }else{
        //删除  入参：ids
        this.$api.deleGoos({ ids:row._id }).then(res=>{
          this.getList()
        })
      }
    },
    selectCheckbox(e){
      this.box=e//返回复选框所对应的商品信息
    },
    // 批量删除
    removeAll(){
      if(this.box.length>0){
      var ids=''
      this.box.map(ele=>{//遍历所有要删除的_id
        ids+=';'+ele._id
      })
      this.$api.deleGoos({ ids }).then(res=>{
          this.getList()
      })
    }
    }
  },
  computed: {//导入所有缓存的品类
    ...mapGetters(['cateArr'])
  },
}
</script>

<style scoped lang='scss'>
.tabel{
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
