<template>
  <div class="table-classic-wrapper">
    <el-card class="main-height" shadow="always">
      <!-- 操作栏 -->
      <SearchForm :searchOptions="searchOptions" :listQuery='listQuery' @onReset='onReset'>
        <template slot="confirmButton">
          <div style="float: right;margin-right:20px">
            <el-button type="primary" @click="handleCheck">审核</el-button>
            <el-button type="danger" @click="batchDelete()">公示</el-button>
            <el-button class="exportBtn" @click="handleImport" type="primary">导入</el-button>
            <el-button class="importBtn" @click="download" type="primary">导出</el-button>
          </div>
        </template>
      </SearchForm>
      <Buttons>
        <el-badge class="buttons-item">
          <el-button>全部</el-button>
          </el-badge>
          <el-badge :value="3" class="buttons-item">
          <el-button >待学校审批</el-button>
          </el-badge>
          <el-badge :value="1" class="buttons-item" type="primary">
          <el-button >待辅导员审批</el-button>
          </el-badge>
          <el-badge :value="2" class="buttons-item" type="warning">
          <el-button>公示</el-button>
      </el-badge>
      </Buttons>
      <!-- 表格栏 -->
      <el-table
        ref="multipleTable"
        v-loading="listLoading"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        height='450'
        size="medium"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="60" />
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="80"
          sortable
        />
        <el-table-column
          prop="studentName"
          label="学生姓名"
          width="100"
          align="center"
        >
        <template slot-scope="scope">
          <span @click="showDetails(scope.row)" style="color:#409EFF;cursor: pointer;">{{scope.row.studentName}}</span>
        </template></el-table-column>
        <el-table-column
          prop="code"
          label="学号"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="code"
          label="性别"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="ssbj"
          label="所属班级"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="sxzy"
          label="所学专业"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="ssyx"
          label="所属院系"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="sxzy"
          label="压力指数"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="sqly"
          label="申请理由"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="knrddj"
          label="困难认定等级"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="sqjd"
          label="申请进度"
          align="center"
          width="120"
        >
        <template slot-scope="scope">
              <span v-if="scope.row.status==='已认定'" style="color:green">• {{scope.row.status}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)"
              >审核</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页栏 -->
      <Pagination
        :total="total"
        :page.sync="listQuery.currentPage"
        :limit.sync="listQuery.pageSize"
        @pagination="fetchData"
      />
      <!-- 导入数据 弹出栏 -->
      <UploadDialog 
          @cancleImport="cancleImport" 
          :importVisible='importVisible'>
      </UploadDialog>
      <!-- 导出数据 弹出栏 -->
      <ExportDialog 
         :importVisible='exportVisible'>
      </ExportDialog>
      <!-- 关联学院 弹出栏 -->
      <el-dialog
        title="学校审核"
        :visible.sync="checkFormVisible"
        width="30%"
        center
        :close-on-click-modal=false
        class="dialog-form"
        :before-close="handleClose2"
      >
        <el-form
          ref="checkDialogForm"
          :model="checkDialogForm"
          :rules="checkFormRules"
          label-width="110px"
        >
        <el-form-item label="受理结果：" prop="type">
            <el-select v-model="checkDialogForm.type" placeholder="请选择">
              <el-option value="同意申请" label="同意申请" />
              <el-option value="拒绝申请" label="拒绝申请" />
            </el-select>
          </el-form-item>
          <el-form-item label="受理意见：" prop="org">
            <el-input type="textarea" :rows="2" v-model="checkDialogForm.name" placeholder="请输入受理意见"/>
          </el-form-item>
          <div class="footer-item">
            <el-button @click="checkFormVisible=false;cancleCheckForm('checkDialogForm')">取 消</el-button>
            <el-button
              type="primary"
              :disabled="isSubmit"
              @click="submitCheckForm('checkDialogForm')"
              >确 定</el-button
            >
          </div>
        </el-form>
      </el-dialog>
           <!-- 导入数据 弹出栏 -->
      <UploadDialog @cancleImport="cancleImport" :importVisible='importVisible'></UploadDialog>
      <!-- 导出数据 弹出栏 -->
      <ExportDialog :importVisible='exportVisible'></ExportDialog> 
    </el-card>
  </div>
</template>

<script>
import { getTableList } from "../../../api";
import { tableData } from "./data";
import formItemMixin from '../../../components/mixins';
export default {
  name: 'studentsInfoManagement',
  mixins: [formItemMixin],
  data() {
    const itemsXN=[
      {value:'2.5年',label:'2.5年'},
      {value:'3年',label:'3年'},
      {value:'4年',label:'4年'},
      {value:'5年',label:'5年'},
    ]
    const itemsStatus=[
      {value:'在校中',label:'在校中'},
      {value:'已毕业',label:'已毕业'},
      {value:'已辍学',label:'已辍学'},
    ]
    const itemsSQJD=[
      {value:'辅导员审批',label:'辅导员审批'},
    ]
    const itemsKNRDDJ=[
      {value:'特别困难',label:'特别困难'},
      {value:'困难',label:'困难'},
      {value:'一般困难',label:'一般困难'},
      {value:'不困难',label:'不困难'},
    ]
    return {
      // 数据列表加载动画
      tableData,
      listLoading: false,
      // 查询列表参数对象
      listQuery: {
        studentName: '',
        ssyx: '',
        ssbj: '',
        sxzy:'',
        ssxn:'',
        fdy:'',
        currentPage: 1,
        pageSize: 10,
      },
      searchOptions:[
        {label:'学生姓名',type:'input',key:'studentName'},
        {label:'所属院系',type:'select',key:'ssyx'},
        {label:'所学专业',type:'select',key:'sxzy'},
        {label:'所属学年',type:'select',key:'ssxn',items:itemsXN},
        {label:'所属班级',type:'select',key:'ssbj',items:[]},
        {label:'辅导员',type:'input',key:'fdy'},
        {label:'申请进度',type:'select',key:'jd',items:itemsSQJD},
        {label:'困难认定等级',type:'select',key:'knrddj',items:itemsKNRDDJ}
      ],
      dialogFormTitle: "",
      // 新增/编辑提交表单对象
      dialogForm: {
        studentName: '',
        code: '',
        idCard:'',
        phone:'',
        ssxn:'',
        ssbj:'',
        sxzy:'',
        ssyx:'',
        status:''
      },
      itemsSSBJ:[],
      options:[
        {label:'学生姓名',type:'input',key:'studentName',required: true},
        {label:'学生学号',type:'input',key:'code',required: true},
        {label:'身份证号码',type:'input',key:'idCard',required: true},
        {label:'手机号码',type:'input',key:'phone',required: true},
        {label:'所属学年',type:'select',key:'ssxn',required: true,items:itemsXN},
        {label:'所属班级',type:'select',key:'ssbj',required: true,items:[]},
        {label:'所学专业',type:'select',key:'sxzy',required: true},
        {label:'所属院系',type:'select',key:'ssyx',required: true},
        {label:'学生状态',type:'select',key:'status',required: true,items:itemsStatus}
      ],
      
      // 数据总条数
      total: 0,
      // 表格数据数组
      // tableData: [],
      // 多选数据暂存数组
      multipleSelection: [],
      // 新增/编辑 弹出框显示/隐藏
      formVisible: false,
      // 防止多次连续提交表单
      isSubmit: false,
      // 导入数据 弹出框显示/隐藏
      importVisible: false,
      // 导出文件格式
      filesFormat: ".txt, .csv, .xls, .xlsx",
      // 导出数据 弹出框显示/隐藏
      exportVisible: false,
      checkDialogForm:{},
      checkFormRules:[],
      checkFormVisible:false
    };
  },
  async created() {
    this.getSSBJ()
    this.getSXZY()
    this.getSSYX()
  },
  methods: {
    onReset(formName){
    },
    showDetails(){
      this.$router.push({path:'/studentInfo/studentsInfoDetails'})
    },
    handleCheck(){
       this.checkFormVisible=true
    },
    //所属班级
    async getSSBJ(){
     var res= await getTableList(this.listQuery)
     var items=[
       {value:'2020年电子一班',label:'2020年电子一班'},
       {value:'2020年电子二班',label:'2020年电子二班'},
       {value:'2020年电子三班',label:'2020年电子三班'}
     ]
     this.options.forEach(item => {
       if(item.label === '所属班级'){
         this.$set(item,'items',items)
       }
     })     
     this.searchOptions.forEach(item => {
       if(item.label === '所属班级'){
         this.$set(item,'items',items)
       }
     })   
    },
    //所学专业
    async getSXZY(){
     var res= await getTableList(this.listQuery)
     var items=[
       {value:'软件工程',label:'软件工程'},
       {value:'通信工程',label:'通信工程'},
     ]
     this.options.forEach(item => {
       if(item.label === '所学专业'){
         this.$set(item,'items',items)
       }
     })    
     this.searchOptions.forEach(item => {
       if(item.label === '所学专业'){
         this.$set(item,'items',items)
       }
     })  
    },
    //所属院系
    async getSSYX(){
     var res= await getTableList(this.listQuery)
     var items=[
       {value:'软件系',label:'软件系'},
       {value:'电子系',label:'电子系'},
     ]
     this.options.forEach(item => {
       if(item.label === '所属院系'){
         this.$set(item,'items',items)
       }
     }) 
     this.searchOptions.forEach(item => {
       if(item.label === '所属院系'){
         this.$set(item,'items',items)
       }
     })     
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    
    // 删除数据
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("确定删除选择的班级吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 此处可添加--删除接口
          // 删除成功调用fetchData方法更新列表
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 批量删除
    batchDelete() {
      if (this.multipleSelection.length < 1) {
        this.$message({
          message: "请先选择要删除的数据！",
          type: "warning",
        });
      } else {
        this.handleDelete();
      }
    },
    // 获取数据列表
    fetchData() {
      this.listLoading = true;
      // 获取数据列表接口
      getTableList(this.listQuery)
        .then((res) => {
          const data = res.data;
          if (data.code === 0) {
            this.total = data.data.total;
            this.tableData = data.data.list;
            this.listLoading = false;
          }
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
    // 查询数据
    onSubmit() {
      this.listQuery.currentPage = 1;
      this.fetchData();
    },
    cancleImport(){
       this.importVisible = false;
    },
    // 导入数据
    handleImport() {
      this.importVisible = true;
    },
    // 新增/编辑表单确认提交
    submitForm(formName) {
       this.formVisible=false     
    },
    submitCheckForm(formName) {
       this.checkFormVisible=false     
    },
    // // 新增/编辑表单取消提交
    cancleCheckForm(formName) {
      this.checkFormVisible = false;
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
    
  },
};
</script>

<style lang="less">
.table-classic-wrapper {
  .el-card {
    //min-height: 656px;
  }
  .control-btns {
    float: right;
    // margin-bottom: 20px;
  }
  .search-form {
    padding-top: 18px;
    // margin-bottom: 15px;
    background-color: #f7f8fb;
  }
  .el-textarea{
    width: 90%;
  }
  .el-table {
    margin-top: 15px;
  }
  .el-table thead {
    font-weight: 600;
    th {
      background-color: #f2f3f7;
    }
  }
  .dialog-form {
    .el-input {
      width: 380px;
    }
    .footer-item {
      margin-top: 50px;
      text-align: center;
    }
  }
  .upload-box,
  .export-data {
    width: 300px;
    margin: 0 auto 30px;
  }
  .upload-box {
    width: 156px;
    .files-upload {
      color: #20a0ff;
    }
  }
  .hints {
    font-size: 12px;
    color: #aaa;
    text-align: center;
  }
}
</style>
