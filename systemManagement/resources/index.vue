<template>
  <div class="table-classic-wrapper">
    <el-card class="main-height" shadow="always">
      <!-- 操作栏 -->
      <SearchForm :searchOptions="searchOptions" :listQuery='listQuery' @onReset='onReset'>
        <template slot="confirmButton">
          <div style="float: right;margin-right:20px">
            <el-button type="primary" @click="handleCreate">新增</el-button>
            <el-button type="danger" @click="batchDelete()">删除</el-button>
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
          label="资源名称"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="code"
          label="资源编码"
          align="center"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="page"
          label="资源路径"
          width="350"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="type"
          label="资源类型"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="date"
          label="创建时间"
          width="250"
          align="center"
        ></el-table-column>
        <el-table-column min-width="150px" label="操作" align="center">
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
    </el-card>
  </div>
</template>

<script>
import { getTableList } from "../../../api";
import { tableData } from "./data";
import formItemMixin from '../../../components/mixins';
export default {
  name: 'resources',
  mixins: [formItemMixin],
  data() {
    const itemsTYPE=[
      {value:'菜单',value:'菜单'},
      {value:'链接',value:'链接'},
      {value:'方法',value:'方法'},
      {value:'按钮',value:'按钮'}
    ]
    return {
      // 数据列表加载动画
      tableData,
      listLoading: false,
      // 查询列表参数对象
      listQuery: {
        id: '',
        type: '',
        code:'',
        page:'',
        date:'',
        resourcesName: '',
        currentPage: 1,
        pageSize: 10,
      },
      searchOptions:[
        {label:'资源名称',type:'input',key:'resourcesName'},
        {label:'资源编码',type:'input',key:'code'},
        {label:'资源路径',type:'input',key:'page'},
        {label:'资源类型',type:'select',key:'type',items:itemsTYPE},
        {label:'创建时间',type:'datePicker',key:'date'},
      ],
      dialogFormTitle: "",
      // 新增/编辑提交表单对象
      dialogForm: {
        type: '',
        resourcesName: '',
        code:'',
        page:'',
        jj:'',
      },
      options:[
        {label:'资源名称',type:'input',key:'resourcesName',required: true},
        {label:'资源编码',type:'input',key:'code',required: true},
        {label:'资源路径',type:'input',key:'page',required: true},
        {label:'资源类型',type:'select',key:'type',required: true,items:itemsTYPE},
        {label:'资源简介',type:'input',key:'jj'},
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
    // 新增/编辑表单确认提交
    submitForm(formName) {
      this.formVisible=false
    },
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
