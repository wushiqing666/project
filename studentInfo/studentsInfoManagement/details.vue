<template>
    <div class="studentInfoDetails">
    <el-card class="details-main" shadow="always">
      <div slot="header" class="clearfix infoTitle">
        <span>基本信息</span>
      </div>
      <div class="main-content basic-info">
        <div class="infoTitle1">学生信息</div>
        <div class="info-details">
            <div class="info-item" v-for="(item,index) in basicInfoData" :key="index">
                <span class="label">{{item.label}}：</span>
                <span class="value">{{item.value}}</span>
            </div>
        </div>
      </div>
      <div class="main-content funding-history">
        <div class="infoTitle1">资助历史</div>
        <!-- 表格栏 -->
      <el-table
        ref="multipleTable"
        v-loading="listLoading"
        :data="fundingHistoryData"
        tooltip-effect="dark"
        style="width: 100%"
        height='250'
        size="medium"
      >
        <el-table-column  type="index" label="序号" align="center" width="80" sortable/>
        <el-table-column  prop="xn"  label="年度"  width="200"  align="center"></el-table-column>
        <el-table-column  prop="xq"  label="学期"  width="200"  align="center"></el-table-column>
        <el-table-column  prop="zzfs"  label="资助方式"  width="200"  align="center"></el-table-column>
        <el-table-column  prop="zzdc"  label="资助档次"  width="200"  align="center"></el-table-column>
        <el-table-column  prop="pktz"  label="贫困特征"  width="200"  align="center"></el-table-column>
        <el-table-column  prop="zzje"  label="资助资金"  width="200"  align="center"></el-table-column>
        <el-table-column  prop="time"  label="发放日期" align="center"></el-table-column>
      </el-table>
      <!-- 分页栏 -->
      <Pagination
        :total="total"
        :page.sync="listQuery.currentPage"
        :limit.sync="listQuery.pageSize"
        @pagination="fetchData"
      />
      </div>
      <div class="back">
          <el-button @click="backTo" type="primary">返回</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import { fundingHistoryData } from "./data";
import formItemMixin from '../../../components/mixins';
export default {
  name: 'studentsInfoDetails',
  mixins: [formItemMixin],
    data(){
        return{
            // 查询列表参数对象
            fundingHistoryData,
            listQuery: {
                currentPage: 1,
                pageSize: 10,
            },
            total:0,
            listLoading:false,
            basicInfoData:[
                {label:'申请人姓名',value:'张三'},
                {label:'申请人身份证号',value:'3401111111111111'},
                {label:'性别',value:'女'},
                {label:'户籍所在地',value:'安徽省安庆市太和县'},
                {label:'出生年月',value:'1992年10月12日'},
                {label:'联系电话',value:'13933333333'},
                {label:'常住住址',value:'安徽省合肥市高新区望将台'},
                {label:'民族',value:'汉'},
                {label:'政治面貌',value:'党员'},
                {label:'学校名称',value:'湖北大学'},
                {label:'所在班级',value:'2011班'},
                {label:'辅导员',value:'张志'},
                {label:'培养层次',value:'本科'},
                {label:'学习形式',value:'全日制'},
                {label:'学制',value:'4'},
                {label:'入学时间',value:'2011年10月10号'},

            ]
        }
    },
    methods:{
        fetchData(){
            
        },
        backTo(){
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="less">
  .studentInfoDetails{
    .infoTitle{
        font-size: 20px;
        font-weight: 600;
    }
    .details-main{
        height: calc(100vh - 136px);
        position: relative;
        .main-content{
            width: 100%;
            height: 100%;
            padding: 10px 10px;
            box-sizing: border-box;
            .infoTitle1{
                height: 25px;
                font-size: 18px;
                padding-left: 10px;
                border-left: 5px solid #409eff;
                margin-bottom: 20px;
            }
            .info-details{
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                padding-left: 18px;
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                align-items: flex-start;
                >div{
                    width: 33%;
                    height: 16%;
                    // line-height: 40px;
                    .label{

                    }
                    .value{
                        color: #000;
                        opacity: 0.6;
                    }
                }
            }
        }
        .basic-info{
            height: 280px;
            padding-bottom: 40px;
            border-bottom: 1px solid #EBEEF5;
        }
        .funding-history{
            height: calc(100% - 330px);
            margin-top:10px;
        }
        .back{
            width:100%;
            height: 50px;
            position: absolute;
            bottom: 10px;
            text-align: center;
        }
    }
  }
</style>