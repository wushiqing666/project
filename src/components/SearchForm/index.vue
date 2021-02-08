<template>
  <div class="searchFormHints">
    <!-- 操作栏 -->
      <div style="margin-bottom:10px">{{modelName}}</div>
      <div>
        <el-form
        :inline="true"
        :model="form"
        label-width="100px"
        class="search-form"
      > 
      <el-row class="basicSearch">
        <el-col :span="24">
          <el-form-item style="margin-left:20px">
            <el-input v-model="form.name" :placeholder="formData[0].label!=='学生姓名'?'请输入'+formData[0].label:'请输入'+formData[0].label+'或学号'">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="highBtton" v-if="!show && basicSearchBtnShow" @click="show=true">高级查询</div>
            <div v-if="show && basicSearchBtnShow" class="highBtton" @click="show=false">基本查询</div>
          </el-form-item>
          <slot name="confirmButton" />
        </el-col>
      </el-row >
        <el-row class="highSearch" v-if="show">
          <el-col :span="24">
          <el-form-item style="width:30%" v-for="(item,index) in formData" :key="index" :label="item.label+' :'" :prop="item.key">
           <component
              @input="onInput"
              :is="item.component"
              :props="item.key"
              :value="form[item.key]"
              :items="item.items"
              :label="item.label!=='学生姓名'?item.label:item.label+'或学号'"
            ></component>
         </el-form-item>
          
          </el-col>
        </el-row>
        <el-row class="footerSearch" v-if="show">
          <el-form-item style="float:right;margin-right:20px">
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="" @click="onReset('searchForm')">重置</el-button>
            <div @click="show=false" class="packUpbtton"><i class="el-icon-arrow-up"></i>收起</div>
          </el-form-item>          
        </el-row>
        </el-form>
      </div>
  </div>
</template>

<script>
import {getComponents} from '../form/index'
export default {
  name: 'Hints',
  props:{
    basicSearchBtnShow:{
      type:Boolean,
      default:true
    },
    listQuery:{
      type:Object,
      default:()=>{return {}}
    },
    searchOptions:{
      type:Array,
      default:()=>{return []}
    },
    modelName:{
      type:String,
      default:''
    },
    label:{
      type:String,
      default:''
    }
  },
  data(){
    return{
      show:false,
    }
  },
  created(){
    this.formData.forEach(v=>{
      this.$set(v,'component',getComponents(v.type))   
    })
  },
  computed: {
    formData: {
      get() {
        return this.searchOptions
      },
      set(val) {
        this.$emit('update:searchOptions', val)
      }
    },
    form(){
      return this.listQuery
    }
  },
  methods:{
    onInput(value) {
      Object.keys(this.form).forEach(v=>{
        if(v===value.props){
           this.$set(this.form,value.props,value.value)
        }
      })
      console.log(this.form)
    },
    onSubmit(){
      this.$emit('onSubmit')
    },
    onReset(){
      Object.keys(this.listQuery).forEach(v=>{
        if(v!=='currentPage' && v!=='pageSize'){
          this.$set(this.listQuery,v,'')
        }
      })
    },
  }
}
</script>

<style lang="less">
.searchFormHints{
  width: 100%;
  .search-form{
     padding-top: 18px;
    // margin-bottom: 15px;
    background-color: #f7f8fb;
    .basicSearch{
      height: 50px;
    }
    .highSearch{
      // margin-top: 15px;
      padding-top: 15px;
      border-top: 1px solid #EBEEF5;
    }
    .footerSearch{

    }
    .el-form-item__content{
      width: 215px;;
    }
    .highBtton{
      color: #409EFF;
      cursor: pointer;
    }
    .packUpbtton{
      float: right;
      cursor: pointer;
    }
  }
}
</style>
