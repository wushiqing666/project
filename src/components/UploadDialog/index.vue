<template>
    <el-dialog
        title="导入数据"
        :visible.sync="visabled"
        width="24%"
        :close-on-click-modal=false
        @close="cancleImport"
    >
       <div class="uploadDialog">
         <div class="template">
          <span>导入学生信息模板：</span>
          <a @click="download" style="font-weight:600;color:#409eff;border-bottom:1px solid #409eff">下载模板</a>
        </div>
        <div class="upload-box">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip"><span style="color:red">* </span>只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        </div>
        <div class="warn">TIP：请选择要导出数据的格式。</div>
        <div class="footer">
        <el-button @click="cancleImport">取 消</el-button>
        <el-button type="primary" @click="confirmImport">确 定</el-button>
        </div>
       </div>
        
    </el-dialog>
</template>

<script>
import Upload from '../../components/Upload'
export default {
  name: 'UploadDialog',
  components:{Upload},
  props: {
    importVisible: {
      type: Boolean,
      default: false
    },
    filesFormat: {
      type: String,
      default: '.txt, .csv, .xls, .xlsx'
    },
  },
  data(){
      return{
        visabled:false
      }
  },
  watch:{
    importVisible(){
        this.visabled = this.importVisible
    }
  },
  methods: {
    confirmImport(){
        this.visabled=false
      this.$emit('cancleImport',false)
    },
    cancleImport(){
        this.visabled=false
        this.$emit('cancleImport',false)
    //   this.$emit('confirmImport',false)
    },
    download() {
      const loading = this.$loading({
        lock: true,
        text: '正在下载导入模板，请稍等...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        loading.close();
      }, 2000);
    }
  }
}
</script>

<style lang="less">
.uploadDialog{
  width: 90%;
  height: 350px;
  margin: auto;
  .template{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    >span{
      display: inline-block;
      width: 50%;
    }
  }
  .upload-box{
    width: 100% !important;
    margin-left: 0 !important;
    .el-upload{
      width: 100% !important;
    }
    .upload-demo{
      width: 100% !important;
      .el-upload-dragger{
        width: 100% !important;
      }
    }
  }
  .warn{
    color: red;
  }
  .footer{
    width: 100%;
    height: 50px;
    margin-top: 30px;
    text-align: center;
  }
}

</style>
