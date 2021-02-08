<template>
  <div class="ele-tree-wrapper">
    <el-row :gutter="20">
      <el-col :span="5">
        <el-card class="main-height" shadow="always">
          <div slot="header" class="title">菜单列表</div>
          <div class="tree">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText">
            </el-input>
            <el-tree
              style="margin-top: 10px"
              ref="tree"
              :data="treeData"
              node-key="id"
              highlight-current	
              default-expand-all
              :default-expanded-keys="['0']"
              :props="defaultProps"
              :expand-on-click-node="false"
              @node-contextmenu="showButton"
              @node-click="handleNodeChange"
            >
              <span
                class="custom-tree-node"
                slot-scope="{ node, data }"
              >
                <span style="margin-right: 10px">{{ node.label }}</span>
                <span
                  :style="selectNodeId == data.id ? '' : 'visibility: hidden'"
                >
                  <el-button size="mini" type="text" @click.stop="addDepartment(data)"><i title="新增子机构" class="el-icon-circle-plus-outline"></i
                  ></el-button>
                  <el-button size="mini" type="text" @click.stop="editDepartment(data)"><i title="编辑" class="el-icon-edit"></i
                  ></el-button>
                  <el-button @click="deleteDepartment(data)" v-if="selectNodeId!=='0'" size="mini" type="text"
                    ><i title="删除" class="el-icon-delete"></i
                  ></el-button>
                </span>
              </span>
            </el-tree>
            <div class="warning">*菜单树左击节点可查看详情，右击节点可进行新增子菜单，编辑，删除操作</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="19">
        <el-card class="main-height" shadow="always">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="formRules"
            label-width="230px"
            class="form-list"
          >
            <el-form-item label="菜单名称：" prop="name">
              <el-input
                :disabled="isEdit"
                v-model="ruleForm.name"
                maxlength="100"
                show-word-limit
                placeholder="请输入菜单名称"
              />
            </el-form-item>
            <el-form-item label="关联资源：" prop="resources">
              <el-input
                :disabled="isEdit"
                v-model="ruleForm.resources"
                maxlength="50"
                show-word-limit
                placeholder="请输入关联资源"
              >
              <el-button @click="chooseResources" slot="append" icon="el-icon-upload2">选择</el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="菜单样式：" prop="style">
              <el-input
                :disabled="isEdit"
                v-model="ruleForm.style"
                maxlength="100"
                show-word-limit
                placeholder="请输入菜单样式"
              />
            </el-form-item>
            <el-form-item label="子菜单：" prop="children">
              <el-switch
                v-model="ruleForm.children"
                :disabled="isEdit">
              </el-switch>
            </el-form-item>
            <el-form-item label="菜单简介：" prop="jj">
              <el-input type="textarea" :disabled="isEdit" :rows="2" v-model="ruleForm.jj" placeholder="请输入描述"/>
            </el-form-item>
            <el-form-item v-if="!isEdit" class="submit-box">
              <el-button  type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button  @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
     <el-dialog title="选择资源" :close-on-click-modal=false :visible.sync="dialogTableVisible" :before-close="handleClose2">
        <el-input style="width:400px" v-model="resourcesQuery.name" placeholder="请输入资源名称">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-table v-loading="resourcesLoading" height='400' size="medium" :data="gridData" @selection-change="handleSelectionChangeResources">
          <el-table-column type="selection" width="60" />
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column property="name" label="资源名称" width="150"></el-table-column>
          <el-table-column property="path" label="资源路径" width="250"></el-table-column>
          <el-table-column property="jj" label="资源简介"></el-table-column>
        </el-table>
        <Pagination
        :total="resourcesTotal"
        :page.sync="resourcesQuery.currentPage"
        :limit.sync="resourcesQuery.pageSize"
        @pagination="fetchResourcesData"
      />
      </el-dialog>
  </div>
</template>

<script>
import Pagination from "../../../components/Pagination";
import { treeData} from "./data"
export default {
  name: "menu",
  components:{Pagination},
  data() {
    return {
      treeData,
      filterText: "",
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
      defaultProps: {
        children: "children",
        label: "label",
      },
      selectNodeId: "",
      ruleForm: {
        name: "",
        style: "",
        resources: "",
        children: "",
        jj: "",
      },
      // 表单校验 trigger: ['blur', 'change'] 为多个事件触发
      formRules: {
        name: [{ required: true, message: "请输入菜单名称", trigger: "change" }],
        style: [{ required: true, message: "请输入菜单样式", trigger: "change" }],
        resources: [{ required: true, message: "请选择资源", trigger: "change" }],
        children: [{ required: true, message: "请确认是否是子菜单", trigger: "change" }],
      },
      currentNode:{},
      isEdit:true,
      ruleFormVisible:false,
      dialogTableVisible:false,
      resourcesLoading:false,
      multipleSelectionResources:[],
      resourcesQuery:{
        name:'',
        currentPage: 1,
        pageSize: 10,
      },
      resourcesTotal:0,//选择资源总数
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
    };
  },
  mounted(){
    this.$nextTick(() => {
        this.$refs.tree.setCurrentKey('0')  //设置默认选中第一级
        this.currentNode=treeData[0]
      })
  },
  computed:{
   isDisabled(){
     return (this.currentNode.level==='3' && this.isEdit) || (this.currentNode.level!=='1' && !this.isEdit)
   }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
 
  methods: {
    addDepartment(data){
       this.isEdit=false
       this.currentNode=data
    }, 
    editDepartment(data){
       this.isEdit=false
    }, 
    chooseResources(){
      this.dialogTableVisible=true
      this.resourcesQuery.name=''
    },
    // 选择资源弹出框 关闭时操作
    handleClose2() {
      this.dialogTableVisible = false;
      this.resourcesQuery.name=''
    },
    //获取资源的列表
    fetchResourcesData(){
      this.resourcesLoading=true
    },
    deleteDepartment(data){
       this.$confirm("确定删除选择的机构吗？", "提示", {
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
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeChange(data) {
      this.isEdit=true
      this.currentNode=data
    },
    // 选择资源-多选操作
    handleSelectionChangeResources(val) {
      this.multipleSelectionResources = val;
    },
    showButton(MouseEvent, object, Node, element) {
      // this.isEdit=false
      this.selectNodeId = Node.data.id;
      // this.ruleFormVisible=true
      // console.log(Node);
      // setTimeout(()=>{
      //   // this.ruleFormVisible=true
      //  this.selectNodeId = Node.data.id;
      // },1)
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 此处添加后端接口
          alert('提交成功!')
        } else {
          console.log('提交失败!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  },
};
</script>
<style lang="less" scoped>

i{
  font-size: 16px;;
}
.main-height{
  position: relative;
  .warning{
  color: red;
  font-size: 12px;
  position: absolute;
  bottom: 5px;
}
}

.form-list {
    width: 55%;
    margin: 0 auto;
    margin-left: 40px;
    .el-rate {
      line-height: 2;
    }
    > .el-form-item {
      margin-bottom: 22px;
      .line {
        text-align: center;
      }
      .tip-title {
        text-align: right;
        color: #606266;
      }
    }
    .submit-box {
      margin-top: 35px;
      margin-left: 0;
      text-align: center;
    }
  }
</style>