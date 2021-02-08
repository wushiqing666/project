<template>
    <div class="awardAdd">
    <el-card class="details-main" shadow="always">
      <div slot="header" class="clearfix infoTitle">
        <span>奖项添加</span>
      </div>
      <div class="main-content basic-info">
        <div class="infoTitle1">奖项设置</div>
        <div class="info-details">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="230px" class="form-list">
        <el-form-item label="输入框（长度限制）：" prop="inputLimit">
          <el-input v-model="ruleForm.inputLimit" maxlength="15" show-word-limit placeholder="请输入" />
        </el-form-item>
        <el-form-item label="纯数字（纯数字）：" prop="inputNum">
          <el-input v-model.number="ruleForm.inputNum" maxlength="11" placeholder="请输入数字" />
        </el-form-item>
        <el-form-item label="输入框（密码隐藏）：" prop="password">
          <el-input v-model="ruleForm.password" placeholder="请输入密码" maxlength="16" show-password />
        </el-form-item>
        <el-form-item label="日期和时间选择器：" required>
          <el-col :span="11">
            <el-form-item prop="dateVal">
              <el-date-picker v-model="ruleForm.dateVal" type="date" placeholder="选择日期" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="timeVal">
              <el-time-picker v-model="ruleForm.timeVal" placeholder="选择时间" style="width: 100%;" />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="switch开关（隐藏下面表单）：" prop="switch">
          <el-switch v-model="ruleForm.switch" />
        </el-form-item>
        <div v-if="ruleForm.switch">
          <el-form-item label="滑块条（初始值）：" prop="slider">
            <el-slider v-model="ruleForm.slider" />
          </el-form-item>
          <el-form-item label="级联选择器（自定义）：">
            <el-col :span="10">
              <el-form-item prop="cascader1">
                <el-cascader v-model="ruleForm.cascader1" :options="cascaderData" :props="{ expandTrigger: 'hover' }">
                  <template slot-scope="{ node, data }">
                    <span>{{ data.label }}</span>
                    <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                  </template>
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col class="tip-title" :span="4">（懒加载）</el-col>
          </el-form-item>
          <el-form-item label="单选框（带禁止）：" prop="radio">
            <el-radio-group v-model="ruleForm.radio">
              <el-radio label="免费" />
              <el-radio label="收费" />
              <el-radio label="赞助" />
              <el-radio label="线上" disabled />
              <el-radio label="线下" disabled />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="多选框（带禁止）：" prop="checkbox">
            <el-checkbox-group v-model="ruleForm.checkbox">
              <el-checkbox label="游泳" />
              <el-checkbox label="跑步" />
              <el-checkbox label="健身" />
              <el-checkbox label="阅读" />
              <el-checkbox label="电影" disabled />
              <el-checkbox label="音乐" disabled />
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="文本域（长度限制）：" prop="content">
            <el-input
              v-model="ruleForm.content"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 5 }"
              placeholder="请输入内容"
              maxlength="50"
              show-word-limit
            />
          </el-form-item>
        </div>
        <el-form-item class="submit-box">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
        </div>
      </div>
      <div class="main-content funding-history">
        <div class="infoTitle1">资助历史</div>

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
            }
    
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
  }
</style>