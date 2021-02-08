<template>
  <div class="ele-tree-wrapper">
    <el-row :gutter="20">
      <el-col :span="5">
        <el-card class="main-height" shadow="always">
          <div slot="header" class="title">机构管理</div>
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
            <div class="warning">*机构树左击节点可查看详情，右击节点可进行新增子级构，编辑，删除操作</div>
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
            <el-form-item label="机构名称：" prop="departmentName">
              <el-input
                :disabled="isEdit"
                v-model="ruleForm.departmentName"
                maxlength="100"
                show-word-limit
                placeholder="请输入机构名称"
              />
            </el-form-item>
            <el-form-item label="机构代码：" prop="departmentCode">
              <el-input
                :disabled="isEdit"
                v-model="ruleForm.departmentCode"
                maxlength="50"
                show-word-limit
                placeholder="请输入机构代码"
              />
            </el-form-item>
            <el-form-item label="机构分类：" prop="departmentSelect">
              <el-select
               :disabled="isEdit"
                v-model="ruleForm.departmentSelect"
                placeholder="请选择机构分类"
              >
                <el-option
                  v-for="item in departmentSelectData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="机构类型：" prop="departmentType">
              <el-select
               :disabled="isEdit"
                v-model="ruleForm.departmentType"
                placeholder="请选择机构类型"
              >
                <el-option
                  v-for="item in departmentTypeData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item v-if="isDisabled" label="机构子类型：" prop="departmentTypeC">
              <el-select
              :disabled="isEdit"
                v-model="ruleForm.departmentTypeC"
                placeholder="请选择机构子类型"
              >
                <el-option
                  v-for="item in departmentTypeCData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item v-if="isDisabled" label="专业分类：" prop="majorClassification">
              <el-select
              :disabled="isEdit"
                v-model="ruleForm.majorClassification"
                placeholder="请选择专业分类"
              >
                <el-option
                  v-for="item in majorClassificationData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item v-if="isDisabled" label="开设专业：" prop="createMajor">
              <el-checkbox
              :disabled="isEdit"
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
                >全选</el-checkbox
              >
              <div style="margin: 15px 0"></div>
              <el-checkbox-group
              :disabled="isEdit"
                v-model="checkedCities"
                @change="handleCheckedCitiesChange"
              >
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{
                  city
                }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="所属区域：" prop="city">
              <el-cascader
              :disabled="isEdit"
                v-model="ruleForm.city"
                :options="citys"
                :props="{ checkStrictly: true }"
                clearable
              ></el-cascader>
            </el-form-item>
            <el-form-item label="联系人：" prop="personName">
              <el-input
              :disabled="isEdit"
                v-model="ruleForm.personName"
                maxlength="10"
                show-word-limit
                placeholder="请输入联系人"
              />
            </el-form-item>
            <el-form-item label="联系电话：" prop="personPhone">
              <el-input
              :disabled="isEdit"
                v-model="ruleForm.personPhone"
                show-word-limit
                placeholder="请输入11位手机号码或者固定电话（格式0551-0000000）"
              />
            </el-form-item>
            <el-form-item label="联系地址：" prop="personAddress">
              <el-input
               :disabled="isEdit"
                v-model="ruleForm.personAddress"
                maxlength="100"
                show-word-limit
                placeholder="请输入联系地址"
              />
            </el-form-item>
            <el-form-item class="submit-box">
              <el-button :disabled="isEdit"  type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button :disabled="isEdit"  @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  treeData,
  departmentSelectData,
  departmentTypeData,
  departmentTypeCData,
  majorClassificationData,
  citys,
} from "./data"
import { checkTel } from '../../../utils/validate'
const cityOptions = ["哲学", "历史学", "伦理学", "逻辑学"];
const validPhone=(rule, value,callback)=>{
      if (!value){
          callback()
      }else if (!checkTel(value)){
        callback(new Error('请输入正确的11位手机号码或者固定电话'))
      }else {
          callback()
      }
  }
export default {
  name: "department",
  data() {
    return {
      treeData,
      departmentSelectData,
      departmentTypeData,
      departmentTypeCData,
      majorClassificationData,
      citys,
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
        departmentName: "",
        departmentCode: "",
        departmentSelect: "",
        departmentType: "",
        departmentTypeC: "",
        majorClassification: "",
        personName:'',
        personPhone:'',
        personAddress:'',
        city: "",
        checkedMajor: [
          {
            value: "1",
            label: "哲学",
          },
        ],
      },
      // 表单校验 trigger: ['blur', 'change'] 为多个事件触发
      formRules: {
        departmentName: [{ required: true, message: "请输入机构名称", trigger: "change" }],
        departmentCode: [{ required: true, message: "请输入机构代码", trigger: "change" }],
        departmentSelect: [{ required: true, message: "请选择机构分类", trigger: "change" }],
        departmentType: [{ required: true, message: "请选择机构类型", trigger: "change" }],
        departmentTypeC: [{ required: true, message: "请选择子机构类型", trigger: "change" }],
        majorClassification: [{ required: true, message: "请选择专业分类", trigger: "change" }],
        city: [{ required: true, message: "请选择所属区域", trigger: "change" }],
        personPhone: [{validator:validPhone, trigger: "change" }],
      },
      checkAll: false,
      checkedCities: ["哲学", "历史学"],
      cities: cityOptions,
      isIndeterminate: true,
      currentNode:{},
      isEdit:true,
      ruleFormVisible:false,
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