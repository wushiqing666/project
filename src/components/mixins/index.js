
import Pagination from "../Pagination";
import SearchForm from "../SearchForm";
import UploadDialog from '../UploadDialog'
import ExportDialog from '../ExportDialog'
import DialogForm from '../dialogForm'
import Buttons from '../Buttons'
export default {
    components: { Pagination, SearchForm,UploadDialog,ExportDialog,DialogForm,Buttons},
    methods: {
    // 新建数据
       handleCreate() {
        this.dialogFormTitle = "新增";
        this.formVisible = true;
        Object.keys(this.dialogForm).forEach(v=>{
          this.$set(this.dialogForm,v,'')
        })
      },
      // 编辑数据
      handleEdit(index, row) {
        this.dialogFormTitle = "编辑";
        this.formVisible = true;
        this.dialogForm=JSON.parse(JSON.stringify(row));
      },
      // 新增/编辑表单取消提交
      cancleForm(formName) {
        this.formVisible = false;
      },
      // 新增/编辑弹出框 关闭时操作
       handleClose1() {
        this.formVisible = false;
      },
    },
  };
  