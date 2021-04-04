<template>
    <div class="app-container">
            <el-form 
                ref="form"
                :model="form"
                label-width="80px"
                :rules="rules"
            >
            <!-- prop用于表单验证 -->
            <el-form-item label="广告名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <!-- 图片上传 -->
            <el-form-item label="商品图片">
                <el-upload
                    class="upload-demo"
                    :action="this.$config.beseImg"
                    name="xxx"
                    :on-remove="FileRemove"
                    :on-success="FileSuccess"
                    :on-change="FileChange"
                    :file-list="list"
                    :before-upload="beforeUp"
                    list-type="picture"
                    >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
             <el-form-item label="Target链接" prop="link">
                <el-input v-model="form.link"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addsub">立即创建</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { CateSelect } from '@/components'
  export default{
    name:'Gs-From',
    components: { CateSelect }, // 导入封装组件
    data(){
        return {
            form: {
                name:'',
                create_time:Date.now(),
                img:'',
                link:''
            },
            rules:{//表单验证，搭配prop使用
                name:[
                        { required:true,message:'请输入商品名称',trigger:'blur' },
                        { min: 3, max: 5, message: '商品名称需要3~5个字', trigger: 'blur' }
                    ]
            },
            fileList:[]//存储多张图片的数组
        }
    },
    computed:{//用于判断是显示创建还是修改
        list() {
        //判断存储图片的数组有没有图片数据对象，再判断对象里面有没有图片，有就给它一个初始值,可以在编辑时渲染
        return this.fileList.length>0 ? this.fileList : (this.form.img?[{name:'',url:this.$config.serBase+this.form.img}]:[])
        }
    },
    mounted(){
            // this.$api.editGoos({}).then(res=>{
            //     this.form=res.data
            //     console.log(this.form)
            // })
    },
    methods:{
       addsub() {//立即创建
        this.$api.addbanner(this.form).then(()=>{
            this.$router.push('/adve/list')//跳转到商品列表
        })
      },
      handleChange(){//商品排行

      },
      FileRemove(file, fileList){//取消上传
         this.$emit('input','')
      },
      FileChange(file,fileList){//添加文件、上传成功和上传失败时都会被调用
          this.fileList=[file]//只能选择一张，选择多张时会发送覆盖
      },
      FileSuccess(res,file,fileList){//文件上传成功时触发
         this.form.img=res.data.img
        //   console.log('Success',res)
      },
      beforeUp(file){
        //   console.log('file',file)
      }
    }
  }
</script>

<style scoped lang="scss">

</style>