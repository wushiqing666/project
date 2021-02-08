<template>
  <el-dialog
      :close-on-click-modal=false
        :title="dialogFormTitle"
        :visible.sync="show"
        center
        width="32%"
        class="dialog-form"
        :before-close="close"
      >
        <el-form
          ref="dialogForm"
          :model="dialogForm"
          :rules="formRules"
          class="dialogForm"
          label-width="140px"
        >
         <el-form-item v-for="(item,index) in formData" :key="index" :label="item.label" :prop="item.key">
           <component
              @input="onInput"
              :is="item.component"
              :props="item.key"
              :value="dialogForm[item.key]"
              :items="item.items"
              :label="item.label"
            ></component>
         </el-form-item>
          <div class="footer-item">
            <el-button @click="cancleForm('dialogForm')">取 消</el-button>
            <el-button
              type="primary"
              :disabled="isSubmit"
              @click="submitForm('dialogForm')"
              >确 定</el-button
            >
          </div>
        </el-form>
      </el-dialog>
</template>

<script>
import {getComponents} from '../form/index'
import {validataID,isEmail,validataPassword,checkTel,checkPhone} from '../../utils/validate'
const validIdCard=(rule, value,callback)=>{
      if (!value){
          callback(new Error('请输入身份证号码'))
      }else if (!validataID(value)){
        callback(new Error('请输入正确的身份证号码'))
      }else {
          callback()
      }
  }
  const validEmail=(rule, value,callback)=>{
      if (!value){
          callback()
      }else if (!isEmail(value)){
        callback(new Error('请输入正确的邮箱'))
      }else {
          callback()
      }
  }
  const validataPs=(rule, value,callback)=>{
      if (!value){
          callback('请输入新密码')
      }else if (!validataPassword(value)){
        callback(new Error('密码长度6位，密码至少包含大写字母，小写字母，数字，且不少于6位'))
      }else {
          callback()
      }
  }
  const validPhone=(rule, value,callback)=>{
      if (!value){
          callback()
      }else if (!checkTel(value)){
        callback(new Error('请输入正确的11位手机号码或者固定电话'))
      }else {
          callback()
      }
  }
  const validPhone1=(rule, value,callback)=>{
      if (!value){
          callback('请输入手机号码')
      }else if (!checkPhone(value)){
        callback(new Error('请输入正确的11位手机号码'))
      }else {
          callback()
      }
  }
export default {
  name: 'Hints',
  props:{
    dialogFormTitle:{
      type:String,
      default:""
    },
    formVisible:{
      type:Boolean,
      default:false
    },
    label:{
      type:String,
      default:''
    },
    dialogForm:{
      type:Object,
       default:()=>({})
    },
    options:{
      type:Array,
       default:()=>([])
    }
  },
  data(){
    return{
      isSubmit:false,
      show:false,
      formRules: {},
    }
  },
  watch:{
    formVisible(){
        this.show = this.formVisible
    },
    options(){
      this.formData=this.options
    }
  },
  computed:{
     formData: {
      get() {
        return this.options
      },
      set(val) {
        this.$emit('update:options', val)
      }
    },
     form(){
       return this.dialogForm
     }
  },
  created(){
    this.formData.forEach(v=>{
      this.$set(v,'component',getComponents(v.type))
      if(v.required){
        if(v.type==='input'){
        if(v.label==='身份证号码'){
          this.formRules[v.key]=[{ required: true,validator:validIdCard, trigger: "change" }]
        }else if(v.label==='手机号码'){
          this.formRules[v.key]=[{required: true,validator:validPhone1, trigger: "change" }]
        }else if(v.label==='联系电话'){
          this.formRules[v.key]=[{required: true,validator:validPhone, trigger: "change" }]
        }else{
          this.formRules[v.key]=[{ required: true, message: `请输入${v.label}`, trigger: "change" }]
        }
      }else if(v.type==='select'){
        this.formRules[v.key]=[{ required: true, message: `请选择${v.label}`, trigger: "change" }]
      }   
      }
         
    })
  },
  methods:{
    onInput(value) {
      Object.keys(this.form).forEach(v=>{
        if(v===value.props){
          console.log(value)
           this.$set(this.form,value.props,value.value)
        }
      })
    },
    cancleForm(){
      this.show=false
      this.$emit('cancleForm')
      this.$refs.dialogForm.resetFields();
      Object.keys(this.dialogForm).forEach(v=>{
        this.$set(this.dialogForm,v,'')
      })
    },
    close(){
      this.show=false
      this.$emit('cancleForm')
      this.$refs.dialogForm.resetFields();
      Object.keys(this.dialogForm).forEach(v=>{
        this.$set(this.dialogForm,v,'')
      })
    },
    // 新增/编辑表单确认提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 此处添加 新增/编辑数据的接口 新增成功后调用fetchData方法更新列表
          this.$emit('submitForm')
           this.$message({
            message: "提交成功",
            type: "success",
          });
          this.show=false
          this.$refs.dialogForm.resetFields();
          Object.keys(this.dialogForm).forEach(v=>{
            this.$set(this.dialogForm,v,'')
          })
        } else {
          this.isSubmit = false;
          return false;
        }
      });
    },
  }
}
</script>

<style lang="less">
.dialogForm{
  margin-top:20px!important;
  .el-dialog__body{
    margin-top:10px !important
  }
   .footer-item{
    text-align: center !important;
  }
}

</style>
