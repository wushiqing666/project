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
      >
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="80"
          sortable
        />
        <el-table-column
          prop="name"
          label="操作类型"
          width="250"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="year"
          label="操作内容"
          align="center"
          width="350"
        >
        <template slot-scope="scope">
          <span @click="showDetails(scope.row)" style="color:#409EFF;cursor: pointer;">{{scope.row.year}}</span>
        </template>
        </el-table-column>
        <el-table-column
          prop="ssyx"
          label="操作用户"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="type"
          label="操作用户姓名"
          align="center"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="pycc"
          label="操作时间"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="xxxs"
          label="操作用户IP"
          align="center"
        ></el-table-column>
      </el-table>
      <!-- 分页栏 -->
      <Pagination
        :total="total"
        :page.sync="listQuery.currentPage"
        :limit.sync="listQuery.pageSize"
        @pagination="fetchData"
      />
    </el-card>
    <el-drawer
      title="我是标题"
      :visible.sync="show"
      :with-header="false">
      <span>{{detailsText}}</span>
    </el-drawer>
  </div>
</template>

<script>
import { getTableList } from "../../../api";
import { tableData } from "./data";
import formItemMixin from '../../../components/mixins';
export default {
  name: 'log',
  mixins: [formItemMixin],
  data() {
    const itemsTYPE=[
      {value:'修改',value:'修改'},
      {value:'新增',value:'新增'},
      {value:'删除',value:'删除'},
    ]
    return {
      // 数据列表加载动画
      tableData,
      listLoading: false,
      // 查询列表参数对象
      listQuery: {
        czName: '',
        user: '',
        type: '',
        ip:'',
        time:'',
        currentPage: 1,
        pageSize: 10,
      },
      searchOptions:[
        {label:'操作内容',type:'input',key:'czName'},
        {label:'操作用户',type:'input',key:'user'},
        {label:'操作类型',type:'select',key:'type',items:itemsTYPE},
        {label:'操作用户IP',type:'input',key:'ip'},
        {label:'操作时间',type:'datePicker',key:'time'},
      ],
      // 数据总条数
      total: 0,
      drawer:false,
      detailsText:'',
      show:false
    };
  },
  created() {
    // this.fetchData()
  },
  methods: {
    onReset(formName){
    },
    showDetails(value){
      this.show=true
      this.detailsText=value
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
