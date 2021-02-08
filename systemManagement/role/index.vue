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
          label="角色名称"
          width="250"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="code"
          label="角色编码"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="page"
          label="主页地址"
          width="250"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="rolejj"
          label="角色简介"
          align="center"
          width="250"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete('1', scope.row)">删除</el-button>
            <el-button size="mini"  type="primary" @click="allocationResources(scope.$index, scope.row)">分配资源</el-button>
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
      <el-dialog title="分配资源" :close-on-click-modal=false :visible.sync="dialogTableVisible" :before-close="handleClose2">
        <el-input style="width:400px" v-model="resourcesQuery.name" placeholder="请输入资源名称">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-table v-loading="resourcesLoading" height='400' size="medium" :data="gridData" @selection-change="handleSelectionChangeResources">
          <el-table-column type="selection" width="60" />
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column property="name" label="资源名称" width="150"></el-table-column>
          <el-table-column property="path" label="资源路径" width="250"></el-table-column>
          <el-table-column sortable property="status" label="授权状态" width="100">
            <template slot-scope="scope">
              <span :style="scope.row.status==='已授权'?'color:green':'color:red'">• {{scope.row.status}}</span>
          </template>
          </el-table-column>
          <el-table-column property="jj" label="资源简介"></el-table-column>
        </el-table>
        <Pagination
        :total="resourcesTotal"
        :page.sync="resourcesQuery.currentPage"
        :limit.sync="resourcesQuery.pageSize"
        @pagination="fetchResourcesData"
      />
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getTableList } from "../../../api";
import { tableData } from "./data";
import formItemMixin from '../../../components/mixins';
export default {
  name: 'role',
  mixins: [formItemMixin],
  data() {
    return {
      // 数据列表加载动画
      tableData,
      listLoading: false,
      resourcesLoading:false,
      // 查询列表参数对象
      listQuery: {
        id: '',
        code: '',
        roleName: '',
        currentPage: 1,
        pageSize: 10,
      },
      searchOptions:[
        {label:'角色名称',type:'input',key:'roleName'},
        {label:'角色编码',type:'input',key:'code'}
      ],
      resourcesQuery:{
        name:'',
        currentPage: 1,
        pageSize: 10,
      },
      dialogFormTitle: "",
      // 新增/编辑提交表单对象
      dialogForm: {
        code: '',
        roleName: '',
        rolejj:'',
        page:''
      },
      options:[
        {label:'角色名称',type:'input',key:'roleName',required:true},
        {label:'角色编码',type:'input',key:'code',required:true},
        {label:'主页地址',type:'input',key:'page',required:true},
        {label:'角色简介',type:'input',key:'rolejj'}
      ],
      // 数据总条数
      total: 0,
      resourcesTotal:0,//分配资源总数
      // 表格数据数组
      // tableData: [],
      // 多选数据暂存数组
      multipleSelection: [],
      multipleSelectionResources:[],
      // 新增/编辑 弹出框显示/隐藏
      formVisible: false,
      // 防止多次连续提交表单
      isSubmit: false,
      gridData: [{
          name: '年度审核',
          path: '#views/financeNeeds',
          status: '已授权',
          jj:'年度审核需求菜单描述'
        },
        {
          name: '年度审核',
          path: '#views/financeNeeds',
          status: '未授权',
          jj:'年度审核需求菜单描述'
        }],
        dialogTableVisible: false,
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
    // 分配资源-多选操作
    handleSelectionChangeResources(val) {
      this.multipleSelectionResources = val;
    },
    // 删除数据
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("确定要删除选择的内容吗？", "提示", {
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
    //分配资源
    allocationResources(index, row){
      this.dialogTableVisible=true
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
    // 分配资源弹出框 关闭时操作
    handleClose2() {
      this.dialogTableVisible = false;
      this.resourcesQuery.name=''
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
    //获取分配资源的列表
    fetchResourcesData(){
      this.resourcesLoading=true
    },
    // 查询数据
    onSubmit() {
      this.listQuery.currentPage = 1;
      this.fetchData();
    },
    // 新增/编辑表单确认提交
    submitForm(formName) {
     this.formVisible=false
    }
  },
};
</script>

<style lang="less">
.table-classic-wrapper {
  .el-card {
    //min-height: 656px;
  }
  .el-dialog__body{
    padding: 40px 20px!important;
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
