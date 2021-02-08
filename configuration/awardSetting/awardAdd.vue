<template>
    <div class="awardAdd">
    <el-card class="details-main" shadow="always">
      <div slot="header" class="clearfix infoTitle">
        <span>奖项添加</span>
      </div>
      <div class="main-content basic-info">
        <div class="info-details">
            
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="230px" class="form-list">
                <div class="infoTitle1">奖项设置</div>
                <el-form-item label="是否启用 ：" prop="switch">
                <el-switch v-model="ruleForm.switch" />
                </el-form-item>
                <el-form-item label="奖项名称 ：" prop="inputLimit">
                <el-input v-model="ruleForm.inputLimit" maxlength="15" show-word-limit placeholder="请输入" />
                </el-form-item>
                <el-form-item label="年度：" prop="inputLimit">
                    <el-select v-model="ruleForm.inputLimit" placeholder="请选择年度">
                    <el-option label="2.5年" value="2.5年"/>
                    <el-option label="3年" value="3年"/>
                    <el-option label="4年" value="4年"/>
                    <el-option label="5年" value="5年"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="资助类型：" prop="inputLimit">
                    <el-select v-model="ruleForm.inputLimit" placeholder="请选择资助类型">
                    <el-option label="2.5年" value="2.5年"/>
                    <el-option label="3年" value="3年"/>
                    <el-option label="4年" value="4年"/>
                    <el-option label="5年" value="5年"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="发放形式：" prop="inputLimit">
                    <el-select v-model="ruleForm.inputLimit" placeholder="请选择发放形式">
                    <el-option label="2.5年" value="2.5年"/>
                    <el-option label="3年" value="3年"/>
                    <el-option label="4年" value="4年"/>
                    <el-option label="5年" value="5年"/>
                    </el-select>
                </el-form-item>
                <el-row>
                <el-col :span="14">
                    <el-form-item style="width:40%" label="是否学术科技奖项：" prop="switch">
                <el-switch v-model="ruleForm.switch" />
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item style="width:40%" label="是否团体奖项：" prop="switch">
                    <el-switch v-model="ruleForm.switch" />
                    </el-form-item>
                </el-col>
                </el-row>
                
                <el-form-item label="申请有效期：" required>
                <el-col :span="11">
                    <el-form-item prop="dateVal">
                    <el-date-picker v-model="ruleForm.dateVal" type="date" placeholder="选择日期" style="width: 100%;" />
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-form-item prop="timeVal">
                    <el-date-picker v-model="ruleForm.dateVal" type="date" placeholder="选择日期" style="width: 100%;" />
                    </el-form-item>
                </el-col>
                </el-form-item>
                <el-form-item label="社会审核人：" prop="inputLimit">
                    <el-select v-model="ruleForm.inputLimit" placeholder="请选择社会审核人">
                    <el-option label="2.5年" value="2.5年"/>
                    <el-option label="3年" value="3年"/>
                    <el-option label="4年" value="4年"/>
                    <el-option label="5年" value="5年"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="奖项金额：" prop="switch">
                    <el-input v-model.number="ruleForm.inputNum" maxlength="11" placeholder="请输入奖项金额" />
                </el-form-item>
                <div class="infoTitle1">奖项描述</div>
                <el-form-item label="奖项描述(图片)：" prop="switch">
                    <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePreview">
                    <i class="el-icon-plus" />
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl">
                    </el-dialog>
                </el-form-item>
                <el-form-item label="奖项描述(文字)：">
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                
                <div class="infoTitle1">申请限制</div>
                <el-form-item label="年级限制：" prop="switch">
                   <el-switch v-model="ruleForm.switch" />
                   <div>勾选是才展开下面的选项，选中后的项目才可申请奖金</div>
                   <el-checkbox-group v-model="ruleForm.type">
                    <el-checkbox label="大一" name="大一"></el-checkbox>
                    <el-checkbox label="大二" name="大二"></el-checkbox>
                    <el-checkbox label="大三" name="大三"></el-checkbox>
                    <el-checkbox label="大四" name="大四"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="贫困等级限制：" prop="switch">
                   <el-switch v-model="ruleForm.switch" />
                   <div>勾选是才展开下面的选项，选中后的项目才可申请奖金</div>
                   <el-checkbox-group v-model="ruleForm.type">
                    <el-checkbox label="特别贫困" name="特别贫困"></el-checkbox>
                    <el-checkbox label="贫困" name="贫困"></el-checkbox>
                    <el-checkbox label="一般贫困" name="一般贫困"></el-checkbox>
                    <el-checkbox label="不贫困" name="不贫困"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="院系限制：" prop="switch">
                   <el-switch v-model="ruleForm.switch" />
                   <div>勾选是才展开下面的选项，选中后的项目才可申请奖金</div>
                   <el-checkbox-group v-model="ruleForm.type">
                    <el-checkbox label="化学系" name="化学系"></el-checkbox>
                    <el-checkbox label="物理系" name="物理系"></el-checkbox>
                    <el-checkbox label="电子系" name="电子系"></el-checkbox>
                    <el-checkbox label="生物系" name="生物系"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="专业限制：" prop="switch">
                   <el-switch v-model="ruleForm.switch" />
                   <div>勾选是才展开下面的选项，选中后的项目才可申请奖金</div>
                   <el-checkbox-group v-model="ruleForm.type">
                    <el-checkbox label="专业一" name="专业一"></el-checkbox>
                    <el-checkbox label="专业二" name="专业二"></el-checkbox>
                    <el-checkbox label="专业三" name="专业三"></el-checkbox>
                    <el-checkbox label="专业四" name="专业四"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="攻读学历限制：" prop="switch">
                   <el-switch v-model="ruleForm.switch" />
                   <div>勾选是才展开下面的选项，选中后的项目才可申请奖金</div>
                   <el-checkbox-group v-model="ruleForm.type">
                    <el-checkbox label="专科" name="专科"></el-checkbox>
                    <el-checkbox label="本科" name="本科"></el-checkbox>
                    <el-checkbox label="研究生" name="研究生"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="不及格课程不超过：" prop="inputLimit">
                <el-input v-model="ruleForm.inputLimit" maxlength="15" show-word-limit placeholder="请输入" />
                </el-form-item>
                <el-form-item label="班级排名(%)：" prop="inputLimit">
                <el-input v-model="ruleForm.inputLimit" maxlength="15" show-word-limit placeholder="请输入" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">确认</el-button>
                    <el-button>取消</el-button>
                    <el-button @click="backTo" type="primary">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
      </div>
      <!-- <div class="back">
          <el-button @click="backTo" type="primary">返回</el-button>
      </div> -->
    </el-card>
  </div>
</template>
<script>
import formItemMixin from '../../../components/mixins';
export default {
  name: 'studentsInfoDetails',
  mixins: [formItemMixin],
    data(){
        return{
            ruleForm: {
                inputLimit: '',
                inputNum: '',
                select1: '',
                select2: '',
                dateVal: '',
                timeVal: '',
                switch: true,
                slider: 32,
                type: [],
                cascader1: [],
                cascader2: [],
                radio: '线下',
                checkbox: ['音乐'],
                content: ''
            },
            rules: {
                inputLimit: [
                { required: true, message: '内容不能为空', trigger: 'blur' }
                ],
                inputNum: [
                { required: true, message: '内容不能为空', trigger: 'blur' },
                { type: 'number', message: '内容必须为数字值', trigger: 'blur' }
                ],
                password: [
                { required: true, message: '内容不能为空', trigger: 'blur' },
                { min: 6, max: 16, message: '密码长度在 6 到 16 个字符', trigger: ['blur', 'change'] },
                { pattern: /^[a-zA-Z0-9_-]{6,16}$/, message: '密码只支持字母、数字和下划线', trigger: ['blur', 'change'] }
                ],
                select1: [
                { required: true, message: '请选择', trigger: 'change' }
                ],
                select2: [
                { required: true, message: '请选择', trigger: 'change' }
                ],
                dateVal: [
                { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                timeVal: [
                { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ]
            },
            dialogImageUrl: '',
      dialogVisible: false,
    
        }
    },
    methods:{
        fetchData(){
            
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
    handlePreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
        backTo(){
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="less">
  .awardAdd{
    .infoTitle{
        font-size: 20px;
        font-weight: 600;
    }
    .details-main{
        height: calc(100vh - 136px);
        overflow: auto;
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
            //height: 280px;
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
    .form-list-wrapper {
  .el-card {
    padding-top: 20px;
  }

}
  }
    .form-list {
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