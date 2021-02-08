<template>
  <div class="table-classic-wrapper">
    <el-card class="main-height" shadow="always">
      <!-- 操作栏 -->
      <SearchForm :basicSearchBtnShow='false' :searchOptions="searchOptions" :listQuery='listQuery' @onReset='onReset'>
        <template slot="confirmButton">
          <div style="float: right;margin-right:20px">
            <el-button type="primary" @click="awardAdd">添加奖项</el-button>
            <el-button  @click="awardAdd">编辑</el-button>
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
          prop="name"
          label="奖项名称"
          align="center"
          width="350"
        >
        <template slot-scope="scope">
          <span @click="showDetails(scope.row)" style="color:#409EFF;cursor: pointer;">{{scope.row.name}}</span>
        </template>
        </el-table-column>
        <el-table-column
          prop="year"
          label="年度"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="price"
          label="奖项金额"
          align="center"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="发布状态"
          width="200"
          align="center"
        >
        <template slot-scope="scope">
              <span v-if="scope.row.status==='已发布'" style="color:green">• {{scope.row.status}}</span>
              <span v-else-if="scope.row.status==='待发布'" style="color:#E6A23C">• {{scope.row.status}}</span>
              <span v-else style="color:red">• {{scope.row.status}}</span>
          </template></el-table-column>
        <el-table-column
          prop="time"
          label="发布时间"
          align="center"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)"
              >复制链接</el-button
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
    </el-card>
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
        {label:'问卷名称/问卷编号',type:'input',key:'czName'},
      ],
      // 数据总条数
      total: 0,
      drawer:false,
      detailsText:'',
      show:false,
      multipleSelection:[]
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
      this.multipleSelection = val
    },
    awardAdd(){
      this.$router.push({path:'/configuration/awardAdd'})
    },
    showDetails(value){
      this.show=true
      this.detailsText=value
    },
    // 删除数据
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("确定删除选择的数据吗", "提示", {
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
