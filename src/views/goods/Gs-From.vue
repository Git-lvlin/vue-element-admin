<template>
    <div class="app-container">
            <el-form 
                ref="form"
                :model="form"
                label-width="80px"
                :rules="rules"
            >
            <!-- prop用于表单验证 -->
            <el-form-item label="商品名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
             <el-form-item label="商品描述" prop="desc">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="是否热销" prop="hot">
                <el-switch v-model="form.hot"></el-switch>
            </el-form-item>
             <el-form-item label="商品价格" prop="price">
                <el-input v-model="form.price"></el-input>
            </el-form-item>
            <el-form-item label="商品品类" prop="cate">
                <CateSelect v-model="form.cate" />
            </el-form-item>
            <el-form-item label="商品排行" prop="star">
                <el-input-number v-model="form.star" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
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
            <el-form-item>
                <el-button type="primary" @click="onSubmit" v-text="id?'立即修改':'立即新增'"></el-button>
                <el-button>取消</el-button>
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
                cate:'',
                create_time:Date.now(),
                img:'',
                price:1,
                star:1,
                hot:false,
                desc:''
            },
            rules:{//表单验证，搭配prop使用
                name:[
                        { required:true,message:'请输入商品名称',trigger:'blur' },
                        { min: 3, max: 5, message: '商品名称需要3~5个字', trigger: 'blur' }
                    ],
                cate:[{required:true,message:'请输入商品品类',trigger:'change'}],
                price:[{ required:true,message:'请输入价格',trigger:'blur' }],
                star:[{ required:true,message:'请输入商品排名',trigger:'blur' }],
                hot:[{ required:true,message:'请选择是否热销',trigger:'blur' }],
                desc:[{ required:true,message:'请输入商品描述',trigger:'change' }]
            },
            fileList:[]//存储多张图片的数组
        }
    },
    computed:{//用于判断是显示创建还是修改
        id(){
            return this.$route.params.id
        },
        list() {
        //判断存储图片的数组有没有图片数据对象，再判断对象里面有没有图片，有就给它一个初始值,可以在编辑时渲染
        return this.fileList.length>0 ? this.fileList : (this.form.img?[{name:'',url:this.$config.serBase+this.form.img}]:[])
        }
    },
    mounted(){
        var id=this.$route.params.id
        if(id){
            this.$api.editGoos({id}).then(res=>{
                this.form=res.data
                console.log(this.form)
            })
        }
    },
    methods:{
       onSubmit() {//立即创建
       if(this.id) this.form.id=this.id  //如果有id就是编辑,添加到入参中
        this.$api.addGoos(this.form).then(()=>{
            this.$router.push('/goods/list')//跳转到商品列表
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