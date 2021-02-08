<template>
  <div class="table-classic-wrapper">
    <el-card class="main-height" shadow="always">
      <!-- 操作栏 -->
      <!-- 操作栏 -->
      <SearchForm :searchOptions="searchOptions" :listQuery='listQuery' @onReset='onReset'>
        <template slot="confirmButton">
          <div style="float: right;margin-right:20px">
            <el-button type="primary" @click="handleCreate">新增</el-button>
            <el-button type="danger" @click="batchDelete()"
              >删除</el-button
            >
            <el-button class="exportBtn" @click="handleImport" type="primary">导入</el-button>
            <el-button class="importBtn" @click="download" type="primary">导出</el-button>
          </div>
        </template>
      </SearchForm>
      <SearchForm :listQuery='listQuery' @onReset='onReset'>
        <template slot="basicForm">
          <el-form-item style="margin-left:20px">
            <el-input v-model="listQuery.name" placeholder="请输入班级名称">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>
        </template>
        <template slot="confirmButton">
          <el-form-item style="float: right">
            <el-button type="primary" @click="handleCreate">新增</el-button>
            <el-button type="danger" @click="batchDelete()"
              >删除</el-button
            >
            <el-button @click="handleImport" type="primary">导入</el-button>
            <el-button type="primary" @click="download">下载导入模板</el-button>
          </el-form-item>
        </template>
        <template class="highForm" slot="highForm">
          <el-form-item style="width:30%" label="班级名称">
            <el-input v-model="listQuery.name" placeholder="请输入班级名称"/>
          </el-form-item>
          <el-form-item style="width:30%" label="学年">
            <el-input v-model="listQuery.year" placeholder="请输入学年" />
          </el-form-item>
          <el-form-item style="width:30%" label="所属院系">
            <el-select v-model="listQuery.type" placeholder="请选择所属院系">
              <el-option :value="0" label="单身" />
              <el-option :value="1" label="未婚" />
              <el-option :value="2" label="已婚" />
              <el-option :value="3" label="离异" />
            </el-select>
          </el-form-item>
          <el-form-item style="width:30%" label="专业分类">
            <el-select v-model="listQuery.type" placeholder="请选择专业分类">
              <el-option :value="0" label="单身" />
              <el-option :value="1" label="未婚" />
              <el-option :value="2" label="已婚" />
              <el-option :value="3" label="离异" />
            </el-select>
          </el-form-item>
           <el-form-item style="width:30%" label="辅导员">
            <el-input v-model="listQuery.name" placeholder="请输入辅导员" />
          </el-form-item>
        </template>
      </SearchForm>
      <!-- 表格栏 -->
      <el-table
        ref="multipleTable"
        v-loading="listLoading"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        height='500'
        size="medium"
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
          prop="name"
          label="班级名称"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="year"
          label="学年"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="ssyx"
          label="所属院系"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="type"
          label="专业分类"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="pycc"
          label="培养层次"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="xxxs"
          label="学习形式"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="fdy"
          label="辅导员"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          align="center"
          width="120"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete('1', scope.row)"
              >删除</el-button
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
       <!-- 新增/编辑 弹出栏 -->
      <DialogForm 
          :dialogFormTitle='dialogFormTitle' 
          @submitForm='submitForm' 
          @cancleForm="cancleForm" 
          :options='options' 
          :dialogForm='dialogForm' 
          :formVisible='formVisible'>
      </DialogForm>
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
  name: 'class',
  mixins: [formItemMixin],
  data() {
    const itemsTYPE=[
      {value:'计算机',label:'计算机'},
      {value:'法学',label:'法学'},
    ]
    const itemsXN=[
      {value:'2.5年',label:'2.5年'},
      {value:'3年',label:'3年'},
      {value:'4年',label:'4年'},
      {value:'5年',label:'5年'},
    ]
    const itemsSSYX=[
      {value:'计算机系',label:'计算机系'},
      {value:'法学',label:'法学'},
    ]
    const itemsPYCC=[
      {value:'本科',label:'本科'},
      {value:'专科',label:'专科'}
    ]
    const itemsPYXS=[
      {value:'全日制',label:'全日制'},
      {value:'非全日制',label:'非全日制'},
    ]
    const itemsXZ=[
      {value:'2021',label:'2021'},
      {value:'2020',label:'2020'},
    ]
    return {
      // 数据列表加载动画
      tableData,
      listLoading: false,
      // 查询列表参数对象
      listQuery: {
        id: '',
        type: '',
        name: '',
        currentPage: 1,
        pageSize: 10,
      },
      searchOptions:[
        {label:'班级名称',type:'input',key:'className'},
        {label:'学年',type:'select',key:'year',items:itemsXN},
        {label:'所属院系',type:'select',key:'ssyx',items:itemsSSYX},
        {label:'专业分类',type:'select',key:'type',items:itemsTYPE},
        {label:'辅导员',type:'input',key:'fdy'}
      ],
      dialogFormTitle: "",
      // 新增/编辑提交表单对象
      dialogForm: {
        type: '',
        className: '',
        xxxs:'',
        year:'',
        bjYear:'',
        ssyx:'',
        rxTime:'',
        byTime:'',
        pycc:'',
        xz:'',
        fdy:'',
        phone:''
      },
      options:[
        {label:'班级名称',type:'input',key:'className',required:true},
        {label:'班级学年',type:'select',key:'year',items:itemsXN,required:true},
        {label:'所属院系',type:'select',key:'ssyx',items:itemsSSYX,required:true},
        {label:'专业分类',type:'select',key:'type',items:itemsTYPE,required:true},
        {label:'培养层次',type:'select',key:'pycc',items:itemsPYCC,required:true},
        {label:'学习形式',type:'select',key:'xxxs',items:itemsPYXS,required:true},
        {label:'学制（年）',type:'select',key:'xz',items:itemsXZ,required:true},
        {label:'入学时间',type:'datePicker',key:'rxTime'},
        {label:'毕业时间',type:'datePicker',key:'byTime'},
        {label:'辅导员/班主任',type:'input',key:'fdy'},
        {label:'手机号码',type:'input',key:'phone'},

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
    };
  },
  created() {
    // this.fetchData()
  },
  methods: {
    onReset(formName){
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
      this.formVisible = false;
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
