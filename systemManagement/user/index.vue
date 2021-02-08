<template>
  <div class="table-classic-wrapper">
    <el-card class="main-height" shadow="always">
      <!-- 操作栏 -->
      <SearchForm :searchOptions="searchOptions" :listQuery='listQuery' @onReset='onReset'>
        <template slot="confirmButton">
          <div style="float: right;margin-right:20px">
            <el-button type="primary" @click="handleCreate">新增</el-button>
            <el-button type="success" @click="handleActivation('0')">激活</el-button>
            <el-button type="danger" @click="handleCancellation('0')">注销</el-button>
            <el-button type="warning" @click="handleUnlocking('0')">解锁</el-button>
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
          prop="userName"
          label="用户名称"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="userAccount"
          label="登录账号"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="userCode"
          label="用户编号"
          align="center"
          width="150"
        />
        <el-table-column
          prop="userDer"
          label="所属机构"
          show-overflow-tooltip
          align="center"
          width="150"
        />
        <el-table-column
          prop="userRole"
          label="所属角色"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="phone"
          label="手机号码"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="用户状态"
          align="center"
          width="100"
        />
        <el-table-column fixed="right" min-width="400px" label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="warning"
              @click="handleUnlocking('1', scope.row)"
              >解锁</el-button
            >
            <el-button
              size="mini"
              type="primary"
              @click="allocationRole(scope.$index, scope.row)"
              >分配角色</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="resetPassword(scope.row)"
              >重置密码</el-button
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
      <!-- 重置密码 弹出栏 -->
      <el-dialog
        title="重置密码"
        :visible.sync="resetPsVisable"
        width="30%"
        class="dialog-form"
        :before-close="handleClose"
      >
        <!-- <el-form
          ref="dialogResetPsForm"
          :model="resetPsForm"
          :rules="resetPsFormRules"
          label-width="110px"
        >
          <el-form-item label="新密码：" prop="newPassword">
            <el-input type="password" v-model="resetPsForm.newPassword" />
          </el-form-item>
          <el-form-item label="确认新密码：" prop="qrPassword">
            <el-input type="password" v-model="resetPsForm.qrPassword" />
          </el-form-item>
          <div class="footer-item">
            <el-button @click="cancleResetPsForm">取 消</el-button>
            <el-button
              type="primary"
              :disabled="isSubmit"
              @click="submitResetPsForm('dialogResetPsForm')"
              >确 定</el-button
            >
          </div>
        </el-form> -->
      </el-dialog>
      <el-dialog title="分配角色" :visible.sync="dialogTableVisible" :before-close="handleClose2">
        <el-input style="width:400px" v-model="roleQuery.name" placeholder="请输入角色名称">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-table v-loading="roleLoading" height='400' size="medium" :data="gridData" @selection-change="handleSelectionChangeResources">
          <el-table-column type="selection" width="60" />
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column property="name" label="角色名称" width="250"></el-table-column>
          <el-table-column sortable property="status" label="角色状态" width="200">
            <template slot-scope="scope">
              <span :style="scope.row.status==='已授权'?'color:green':'color:red'">• {{scope.row.status}}</span>
          </template>
          </el-table-column>
          <el-table-column property="jj" label="角色简介"></el-table-column>
        </el-table>
        <Pagination
        :total="roleTotal"
        :page.sync="roleQuery.currentPage"
        :limit.sync="roleQuery.pageSize"
        @pagination="fetchRoleData"
      />
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getTableList } from "../../../api";
import { tableData } from "./data";
import formItemMixin from '../../../components/mixins';
const itemsORG=[
  {value:'机构1',label:'机构1'}
]
const itemsDER=[
  {value:'部门1',label:'部门1'}
]
const itemsROLE=[
  {value:'角色1',label:'部门1'}
]
const itemsSTATUS=[
  {value:'正常',label:'正常'},
  {value:'锁定',label:'锁定'},
  {value:'注销',label:'注销'}
]
export default {
  name: 'user',
  mixins: [formItemMixin],
  data() {
    return {
      // 数据列表加载动画
      tableData,
      listLoading: false,
      roleLoading:false,
      // 查询列表参数对象
      listQuery: {
        userName: '',
        account: '',
        org: '',
        role:'',
        status:'',
        currentPage: 1,
        pageSize: 10,
      },
      searchOptions:[
        {label:'用户名称',type:'input',key:'userName'},
        {label:'登录账号',type:'input',key:'account'},
        {label:'所属机构',type:'select',key:'org',items:itemsORG},
        {label:'所属角色',type:'select',key:'role',items:itemsROLE},
        {label:'用户状态',type:'select',key:'status',items:itemsSTATUS},
      ],
       roleQuery:{
        name:'',
        currentPage: 1,
        pageSize: 10,
      },
      dialogFormTitle: "",
      // 新增/编辑提交表单对象
      dialogForm: {
        userName: '',
        der:'',
        idCard:'',
        org:'',
        account:'',
        code:'',
        email:'',
        phone: '',
      },
      options:[
        {label:'用户名称',type:'input',key:'userName',required:true},
        {label:'身份证号码',type:'input',key:'idCard',required:true},
        {label:'所属机构',type:'select',key:'org',items:itemsORG,required:true},
        {label:'所属部门',type:'select',key:'der',items:itemsDER},
        {label:'登录账号',type:'input',key:'account',required:true},
        {label:'手机号码',type:'input',key:'phone',required:true},
        {label:'邮箱',type:'input',key:'email'},
        {label:'员工编号',type:'input',key:'code'},
      ],
      // 数据总条数
      total: 0,
      roleTotal:0,//分配角色总数
      // 表格数据数组
      // tableData: [],
      // 多选数据暂存数组
      multipleSelection: [],
      multipleSelectionRole: [],
      // 新增/编辑 弹出框显示/隐藏
      formVisible: false,
      resetPsForm: {
        newPassword: "",
        qrPassword: "",
      },
      resetPsVisable: false,
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
    handleSelectionChangeResources(val) {
      this.multipleSelectionRole = val;
    },
    // 删除数据
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将删除选中数据, 是否继续?", "提示", {
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
    //注销
    handleCancellation() {
      if (this.multipleSelection.length < 1) {
        this.$message({
          message: "请先选择要注销的数据！",
          type: "warning",
        });
      } else {
        this.$confirm(
          "注销用户影响使用该用户的系统功能,确定注销选择用户吗?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {
            // 此处可添加--注销接口
            // 注销成功调用fetchData方法更新列表
            this.$message({
              type: "success",
              message: "注销成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消注销",
            });
          });
      }
    },
    //激活
    handleActivation() {
      if (this.multipleSelection.length < 1) {
        this.$message({
          message: "请先选择要激活的数据！",
          type: "warning",
        });
      } else {
        this.$message({
          type: "success",
          message: "激活成功!",
        });
      }
    },
    //解锁
    handleUnlocking(type) {
      if (type === "0") {
        if (this.multipleSelection.length < 1) {
          this.$message({
            message: "请先选择要解锁的数据！",
            type: "warning",
          });
        } else {
          //调接口
          this.$message({
            type: "success",
            message: "解锁成功!",
          });
        }
      } else {
        //调接口
        this.$message({
          type: "success",
          message: "解锁成功!",
        });
      }
    },
    //重置密码
    resetPassword(row) {
      this.$confirm("确定重置选择用户密码吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.resetPsVisable = true;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重置密码",
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
    handleClose(){
     this.resetPsVisable=false
    },
    // 分配角色弹出框 关闭时操作
    handleClose2() {
      this.dialogTableVisible = false;
      this.roleQuery.name=''
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
    //获取分配角色的列表
    fetchRoleData(){
      this.roleLoading=true
    },
    //分配角色
    allocationRole(index, row){
      this.dialogTableVisible=true
    },
    // 查询数据
    onSubmit() {
      this.listQuery.currentPage = 1;
      this.fetchData();
    },
    //重置密码表单确认提交
    submitResetPsForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 此处添加 新增/编辑数据的接口 新增成功后调用fetchData方法更新列表
          // 先 this.isSubmit = true 接口返回成功后 再 this.isSubmit = false
          this.resetPsVisable = false;
          this.$message({
            type: "success",
            message: "重置密码成功!",
          });
        } else {
          this.isSubmit = false;
          return false;
        }
      });
    },
    // 新增/编辑表单确认提交
    submitForm(formName) {
      this.formVisible=false
    },
    //取消重置密码
    cancleResetPsForm() {
      this.$refs.dialogResetPsForm.resetFields();
      this.resetPsVisable = false;
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
  // .el-dialog__body{
  //   padding: 40px 20px!important;
  // }
  .search-form {
    padding-top: 18px;
    // margin-bottom: 15px;
    background-color: #f7f8fb;
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
