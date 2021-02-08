const treeData =[{
  id: '1',
  label: '系统管理',
  level:'2',
  children: [{
      id: '1-1',
      label: '机构管理',
      level:'3',
    },
    {
      id: '1-2',
      label: '用户管理',
      level:'3',
    }]
}, {
  id: '2',
  label: '学生信息管理',
  level:'2',
  children: [{
      id: '2-1',
      label: '年度管理',
      level:'3',
    },
    {
      id: '2-2',
      label: '在校生信息管理',
      level:'3',
    }]
}, {
  id: '3',
  label: '诚信管理',
  level:'2',
  children: [{
    id: '3-1',
    label: '诚信调查',
    level:'3',
  }, {
    id: '3-2',
    label: '诚信黑名单',
    level:'3',
  }]
}]
const departmentSelectData = [{
    value: '1',
    label: '学校机构'
  }, {
    value: '2',
    label: '政府机构'
  }, {
    value: '3',
    label: '社会机构'
  }]
  const departmentTypeData = [{
    value: '1',
    label: '大学'
  }, {
    value: '2',
    label: '高中'
  }, {
    value: '3',
    label: '初中'
  },{
    value: '4',
    label: '小学'
  }, {
    value: '5',
    label: '学前'
  }]
  const departmentTypeCData = [{
    value: '1',
    label: '总院'
  }, {
    value: '2',
    label: '分校'
  }, {
    value: '3',
    label: '院系'
  }]
  const majorClassificationData=[
    {
        value: '1',
        label: '哲学'
      }, {
        value: '2',
        label: '历史学'
      }
  ]
  const citys= [{
    value: 'zhinan',
    label: '安徽',
    children: [{
      value: 'shejiyuanze',
      label: '合肥市',
      children: [{
        value: 'yizhi',
        label: '蜀山区'
      }, {
        value: 'fankui',
        label: '庐阳区'
      }, {
        value: 'xiaolv',
        label: '高新区'
      }, {
        value: 'kekong',
        label: '包河区'
      }]
    }, {
      value: 'daohang',
      label: '安庆',
      children: [{
        value: 'cexiangdaohang',
        label: '宜秀区'
      }, {
        value: 'dingbudaohang',
        label: '大观区'
      }]
    }]
  }]
  export { treeData,departmentSelectData,departmentTypeData,departmentTypeCData,majorClassificationData,citys}