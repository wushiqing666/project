<template>
  <div class="table-classic-wrapper">
    <el-card class="main-height" shadow="always">
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
            <el-button type="primary" @click="affiliatedCollege">关联学院</el-button>
          </div>
        </template>
      </SearchForm>
      <!-- 表格栏 -->
      <el-table
        ref="multipleTable"
        v-loading="listLoading"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        height='450'
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
          label="专业名称"
          width="450"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="type"
          label="专业分类"
          align="center"
          width="450"
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
      <!-- 关联学院 弹出栏 -->
      <el-dialog
        title="关联学院"
        :visible.sync="affiliatedCollegeVisible"
        width="30%"
        center
        :close-on-click-modal=false
        class="dialog-form"
        :before-close="handleClose2"
      >
        <el-form
          ref="acdialogForm"
          :model="acdialogForm"
          :rules="acformRules"
          label-width="110px"
        >
        <el-form-item label="机构选择：" prop="org">
            <el-input v-model="acdialogForm.name" placeholder="请选择机构"/>
          </el-form-item>
        <el-form-item label="专业分类：" prop="type">
            <el-select v-model="acdialogForm.type" placeholder="请选择专业分类">
              <el-option v-for="(item,index) in itemsTYPE" :key="index" :value="item.value" :label="item.label" />
            </el-select>
          </el-form-item>
          <el-form-item label="开设专业：" prop='major'>
            <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
                >全选</el-checkbox
              >
              <div style="margin: 15px 0"></div>
              <el-checkbox-group
                v-model="checkedCities"
                @change="handleCheckedCitiesChange"
              >
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{
                  city
                }}</el-checkbox>
              </el-checkbox-group>
          </el-form-item>
          <div class="footer-item">
            <el-button @click="affiliatedCollegeVisible=false;cancleForm('acdialogForm')">取 消</el-button>
            <el-button
              type="primary"
              :disabled="isSubmit"
              @click="submitForm('acdialogForm')"
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
const cityOptions = ["哲学", "历史学", "伦理学", "逻辑学"];

export default {
  name: 'user',
  mixins: [formItemMixin],
  data() {
    const itemsTYPE=[
      {value:'计算机',label:'计算机'},
      {value:'法学',label:'法学'},
    ]
    return {
      // 数据列表加载动画
      tableData,
      itemsTYPE:itemsTYPE,
      listLoading: false,
      // 查询列表参数对象
      listQuery: {
        type: '',
        majorName: '',
        currentPage: 1,
        pageSize: 10,
      },
      searchOptions:[
        {label:'专业名称',type:'input',key:'majorName'},
        {label:'专业分类',type:'select',key:'type',items:itemsTYPE},
      ],
      dialogFormTitle: "",
      affiliatedCollegeVisible:false,
      // 新增/编辑提交表单对象
      dialogForm: {
        type: '',
        majorName: '',
      },
      acdialogForm:{
        org:'',
        type:'',
        major:''
      },
      options:[
        {label:'专业名称',type:'input',key:'majorName',required:true},
        {label:'专业分类',type:'select',key:'type',items:itemsTYPE,required:true,placeholder:"请输入专业名称，若输入多个请用英文“,”号隔开，示例：软件工程,计算机科学与技术"},
      ],
      // 数据总条数
      total: 0,
      // 表格数据数组
      // tableData: [],
      // 多选数据暂存数组
      multipleSelection: [],
      // 新增/编辑 弹出框显示/隐藏
      formVisible: false,
      affiliatedCollegeVisible:false,
      acformRules: {
        org: [{ required: true, message: "请选择机构", trigger: "change" }],
        type: [{ required: true, message: "请选择专业分类", trigger: "change" }],
        major: [{ required: true, message: "请选择开设专业", trigger: "change" }],
      },
      // 防止多次连续提交表单
      isSubmit: false,
      // 导入数据 弹出框显示/隐藏
      importVisible: false,
      // 导出文件格式
      filesFormat: ".txt, .csv, .xls, .xlsx",
      // 导出数据 弹出框显示/隐藏
      exportVisible: false,
      checkAll: false,
      checkedCities: ["哲学", "历史学"],
      cities: cityOptions,
      isIndeterminate: true,
    };
  },
  created() {
    // this.fetchData()
  },
  methods: {
    onReset(formName){
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    affiliatedCollege(){
       this.affiliatedCollegeVisible = true;
    },
    // 删除数据
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("删除专业会同时解除与学院的关联关系，确定要删除吗？", "提示", {
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
    handleClose2() {
      this.affiliatedCollegeVisible = false;
      this.$refs.acdialogForm.resetFields();
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
