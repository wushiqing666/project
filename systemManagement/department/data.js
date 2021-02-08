const treeData = [{
    id:'0',
    level:'1',
    label:'安徽省智慧资助管理系统',
    children:[{
        id: '1',
        label: '小学',
        level:'2',
        children: [{
            id: '1-1',
            label: '外国语小学',
            level:'3',
          }]
      }, {
        id: '2',
        label: '高中',
        level:'2',
        children: [{
            id: '2-1',
            label: '外国语高中',
            level:'3',
          }]
      }, {
        id: '3',
        label: '大学',
        level:'2',
        children: [{
          id: '3-1',
          label: '安徽大学',
          level:'3',
        }, {
          id: '3-2',
          label: '安徽职业学院',
          level:'3',
        }]
      },
      {
        id: '4',
        label: '学前',
        level:'2',
        children: [{
            id: '4-1',
            label: '外国语学前',
            level:'3',
          }]
      },
      {
        id:'5',
        label: '省教育局',
        level:'2',
        children: [{
          id: '5-1',
          label: '省教育局',
          level:'3',
        }]
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