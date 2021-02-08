<template>
    <el-dialog
        title="导出数据"
        :visible.sync="visable"
        :close-on-click-modal=false
        width="30%"
      >
        <div class="export-data">
          <el-button type="primary" @click="exportTable('xlsx')">EXCEL格式</el-button>
          <el-button type="primary" @click="exportTable('csv')">CSV格式</el-button>
          <el-button type="primary" @click="exportTable('txt')">TXT格式</el-button>
        </div>
        <div class="hints">TIP：请选择要导出数据的格式。</div>
      </el-dialog>
</template>

<script>
import excel from "../../utils/excel";
export default {
  name: 'ExportDialog',
  props: {
    exportVisible: {
      type: Boolean,
      default: false
    },
  },
  computed:{
    visable(){
        return this.exportVisible
    }
  },
  methods: {
    // 导出数据--excle格式
    exportTable(type) {
      if (this.tableData.length) {
        const params = {
          header: [
            "编号",
            "姓名",
            "性别",
            "手机",
            "学历",
            "婚姻状况",
            "禁止编辑",
            "爱好",
          ],
          key: [
            "id",
            "name",
            "sex",
            "phone",
            "education",
            "married",
            "forbid",
            "hobby",
          ],
          data: this.tableData,
          autoWidth: true,
          fileName: "综合表格",
          bookType: type,
        };
        excel.exportDataToExcel(params);
        this.visable = false;
      }
    },
  }
}
</script>

<style lang="less">
.UploadDialog{
  display: inline-block;
  vertical-align: top;
}
</style>
