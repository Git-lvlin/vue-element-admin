<template>
<!-- 封装下拉选框 -->
  <div class="cate-select">
    <!-- 根据品类进行搜索下拉菜单 -->
      <el-select
          v-model="fom"
          placeholder="品类筛选"
          clearable
          style="width: 140px"
          class="filter-item"
      >
      <el-option
          v-for="item in cateArr"
          :key="item._id"
          :label="item.cate_zh"
          :value="item.cate"
      />
    </el-select>
  </div>
</template>
<script>

import { mapGetters } from 'vuex'
export default {
    props:{
        value:{
            type:String,
            default:'',
        }
    },
    data(){
        return {
            cate:''
        }
    },
    created(){
        this.$store.dispatch('good/getFindmenu').then(()=>{
            this.cate=this.value
        })
    },
    computed:{
        ...mapGetters(['cateArr']),
        //解决表单初始值没显示的问题
        fom:{
            get(){
                return this.cate=this.value
            },
            set(val){
                this.cate=val
            }
        }
    },
    watch:{
        cate(){
            this.$emit('input',this.cate)
            this.$emit('change')//子组件触发的事件，一定要添加，不然传不过去
        }
    }
}
</script>

<style scoped lang='scss'>
.cate-select{
     display: inline-block;
     .filter-item{
         margin-left:15px;
     }
}
</style>
