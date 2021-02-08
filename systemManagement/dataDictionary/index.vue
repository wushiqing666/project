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
          label="字典名称"
          width="250"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="code"
          label="字典编码"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="page"
          label="字典简介"
          width="250"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="rolejj"
          label="创建时间"
          align="center"
          width="250"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete('1', scope.row)">删除</el-button>
            <el-button size="mini"  type="primary" @click="allocationdictionary(scope.$index, scope.row)">字典项</el-button>
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
      <el-dialog center :close-on-click-modal=false title="字典项" :visible.sync="dialogTableVisible" :before-close="handleClose2">
        <el-input style="width:400px" v-model="dictionaryQuery.name" placeholder="请输入字典项名称">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-table v-loading="dictionaryLoading" max-height='400' ref="dictionaryTable" size="medium" :data="gridData" @selection-change="handleSelectionChangedictionary">
          <el-table-column type="selection" width="60" />
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column property="name" label="字典项名称" width="300">
            <template slot-scope="{row}">
            <template v-if="row.editable1">
              <el-input v-model="row.name" style="width: 200px;" />
              <el-button class="cancel-btn" type="warning" @click="cancelEdit(row)">取消</el-button>
            </template>
            <span v-else>{{ row.name }}</span>
          </template>
          </el-table-column>
          <el-table-column property="code" label="字典项编码" width="300">
            <template slot-scope="{row}">
            <template v-if="row.editable2">
              <el-input v-model="row.code" style="width: 200px;" />
              <el-button class="cancel-btn" type="warning" @click="cancelEdit1(row)">取消</el-button>
            </template>
            <span v-else>{{ row.code }}</span>
          </template>
          </el-table-column>
          <el-table-column property="status" label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.row.editable1 || scope.row.editable2" type="success" size="small" @click="confirmEdit(scope.row)">保存</el-button>
              <el-button v-else type="primary" size="small" @click="scope.row.editable1 = !scope.row.editable1;scope.row.editable2 = !scope.row.editable2">编辑</el-button>
              <el-button type="danger" size="small" @click="deleteDictionary(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div @click="addDictionary" class="addBtn"><i class="el-icon-plus"></i><span>新增字典项</span></div>
        <div class="footer-dialogTable">
          <el-button @click="dialogTableVisible=false">取 消</el-button>
          <el-button type="primary">保 存</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getTableList } from "../../../api";
import { tableData } from "./data";
import formItemMixin from '../../../components/mixins';
export default {
  name: 'dataDictionary',
  mixins: [formItemMixin],
  data() {
    const itemsTYPE=[
      {value:'菜单',value:'菜单'},
      {value:'链接',value:'链接'},
      {value:'方法',value:'方法'},
      {value:'按钮',value:'按钮'}
    ]
    const itemsMODEL=[
      {value:'系统管理',value:'系统管理'},
      {value:'学生管理',value:'学生管理'},
    ]
    return {
      // 数据列表加载动画
      tableData,
      listLoading: false,
      dictionaryLoading:false,
      // 查询列表参数对象
      listQuery: {
        zdName: '',
        code: '',
        jj: '',
        time:'',
        currentPage: 1,
        pageSize: 10,
      },
      searchOptions:[
        {label:'字典名称',type:'input',key:'zdName'},
        {label:'字典编码',type:'input',key:'code'},
        {label:'字典简介',type:'input',key:'jj'},
        {label:'创建时间',type:'datePicker',key:'time'},
      ],
      dictionaryQuery:{
        name:'',
        currentPage: 1,
        pageSize: 10,
      },
      dialogFormTitle: "",
      // 新增/编辑提交表单对象
      dialogForm: {
        modelName: '',
        zdName: '',
        code:'',
        type:'',
        jj:''
      },
      options:[
        {label:'模块名称',type:'select',key:'modelName',items:itemsMODEL,required: true},
        {label:'字典名称',type:'input',key:'zdName',required: true},
        {label:'字典编码',type:'input',key:'code',required: true},
        {label:'编码类型',type:'input',key:'type',items:itemsTYPE,required: true},
        {label:'资源简介',type:'input',key:'jj'},
      ],
      // 数据总条数
      total: 0,
      dictionaryTotal:0,//分配资源总数
      // 表格数据数组
      // tableData: [],
      // 多选数据暂存数组
      multipleSelection: [],
      multipleSelectiondictionary:[],
      // 新增/编辑 弹出框显示/隐藏
      formVisible: false,
      // 防止多次连续提交表单
      isSubmit: false,
      gridData: [{
          name: '年度审核',
          editable1:false,
          editable2:false,
          originalName:'年度审核',
          code: '#views/financeNeeds',
          originalCode:'#views/financeNeeds',
          status: '已授权',
          jj:'年度审核需求菜单描述'
        },
        {
          name: '年度审核',
          editable:false,
          editable1:false,
          editable2:false,
          originalName:'年度审核',
          code: '#views/financeNeeds',
          originalCode:'#views/financeNeeds',
          status: '未授权',
          jj:'年度审核需求菜单描述'
        },
        {
          name: '年度审核',
          editable1:false,
          editable2:false,
          originalName:'年度审核',
          code: '#views/financeNeeds',
          originalCode:'#views/financeNeeds',
          status: '已授权',
          jj:'年度审核需求菜单描述'
        },
        {
          name: '年度审核',
          editable:false,
          editable1:false,
          editable2:false,
          originalName:'年度审核',
          code: '#views/financeNeeds',
          originalCode:'#views/financeNeeds',
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
    cancelEdit(row) {
      row.name = row.originalName
      row.editable1 = false
    },
    cancelEdit1(row) {
      row.code = row.originalCode
      row.editable2 = false
    },
    confirmEdit(row) {
      row.editable1 = false
      row.editable2 = false
      row.originalName = row.name
      row.originalCode = row.code
      // 此处添加 后端保存数据接口
    },
    addDictionary(){
      this.gridData.push(
        {
          name: '',
          editable:true,
          editable1:true,
          editable2:true,
          originalName:'',
          code: '',
          originalCode:'',
          status: '',
          jj:''
        }
      )
      this.$nextTick(() => {
        this.$refs.dictionaryTable.bodyWrapper.scrollTop = this.$refs.dictionaryTable.bodyWrapper.scrollHeight;
      })
    },
    deleteDictionary(index){
      console.log(index)
      this.gridData.splice(index,1)
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 分配资源-多选操作
    handleSelectionChangedictionary(val) {
      this.multipleSelectiondictionary = val;
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
    allocationdictionary(index, row){
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
      this.dictionaryQuery.name=''
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
    fetchdictionaryData(){
      this.dictionaryLoading=true
    },
    // 查询数据
    onSubmit() {
      this.listQuery.currentPage = 1;
      this.fetchData();
    },
    // 新增/编辑表单确认提交
    submitForm(formName) {
      this.formVisible = false;
    },
  },
};
</script>

<style lang="less">
.table-classic-wrapper {
  .el-card {
    //min-height: 656px;
  }
  .addBtn{
    width: 98%;
    margin: 20px auto 0 auto;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px dashed #cccccc;
  }
  .footer-dialogTable{
    // float: right;
    text-align: center;
    margin: 30px auto 0 auto;
    // text-align: right;
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
