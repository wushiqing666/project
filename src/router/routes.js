import Layout from '../layout'

/**
 * hidden: true                  如果设置为 true，该项菜单将不会显示在菜单栏中(默认为 false)
 * meta : {
    title: 'title'               菜单名
    icon: 'icon-name'            图标名
    fixed: true                  如果设置为 true，该项 tag 将一直存在 tag 栏中(默认为 false)
  }
 * */

export const asyncRoutes = [
  {
    path: '/error-page',
    name: 'ErrorPage',
    hidden:true,
    component: Layout,
    redirect: '/error-page/page-401',
    meta: {
      title: '错误页面',
      icon: 'vue-dsn-icon-bug'
    },
    children: [
      {
        path: 'page-401',
        name: 'Page401',
        component: () => import('../views/error-page/401'),
        meta: {
          title: '401页面'
        }
      },
      {
        path: 'page-404',
        name: 'Page404',
        component: () => import('../views/error-page/404'),
        meta: {
          title: '404页面'
        }
      }
    ]
  },
  {
    path: '/studentInfo',
    component: Layout,
    redirect: '/studentInfo/menu1',
    name: '学生管理',
    meta: {
      title: '学生管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'annualManagement',
        component: () => import('@/views/studentInfo/annualManagement/index'), // Parent router-view
        name: '年度管理',
        hidden:true,
        meta: { title: '年度管理' },
      },
      {
        path: 'studentsInfoManagement',
        component: () => import('@/views/studentInfo/studentsInfoManagement/index'),
        name: '学生管理',
        meta: { title: '学生管理' }
      },
      {
        path: 'studentsInfoDetails',
        component: () => import('@/views/studentInfo/studentsInfoManagement/details'),
        name: '学生详情',
        hidden:true,
        meta: { title: '学生详情' }
      },
      {
        path: 'poorCollegeStudents',
        hidden:false,
        component: () => import('@/views/studentInfo/poorCollegeStudents/index'),
        name: '贫困生管理',
        meta: { title: '贫困生管理' }
      }
    ]
  },
  {
    path: '/fundingManagement',
    component: Layout,
    hidden:false,
    redirect: '/fundingManagement/fundingApproval',
    name: '资助管理',
    meta: {
      title: '资助管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'fundingApproval',
        component: () => import('@/views/fundingManagement/fundingApproval/index'), // Parent router-view
        //redirect: '/fundingManagement/fundingApproval/applicationDetails',
        name: '资助审批',
        meta: { title: '资助审批' },
      },
      {
        path: 'fundingApproval/applicationDetails',
        hidden:true,
        component: () => import('@/views/fundingManagement/fundingApproval/componentsPage/applicationDetails'), // Parent router-viewement
        name: '申请资助详情',
        meta: { title: '申请资助详情' },
      },
    ]
  },
  {
    path: '/configuration',
    component: Layout,
    redirect: '/configuration/awardSetting',
    name: '奖项管理',
    meta: {
      title: '奖项管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'awardSetting',
        component: () => import('@/views/configuration/awardSetting/index'), // Parent router-view
        name: '奖项设置',
        alwaysShow:true,
        meta: { title: '奖项设置' },
      },
      {
        path: 'awardAdd',
        hidden: true, // 不在侧边栏显示  
        component: () => import('@/views/configuration/awardSetting/awardAdd'), // Parent router-view
        name: '奖项添加',
        meta: { title: '奖项添加' },
      },
      {
        path: 'awardDistribution',
        component: () => import('@/views/configuration/awardDistribution/index'),
        name: '奖项分配',
        meta: { title: '奖项分配' }
      }
    ]
  },

  {
    path: '/studentPortrait',
    component: Layout,
    hidden:true,
    redirect: '/studentPortrait/menu1',
    name: '学生个人画像',
    meta: {
      title: '学生个人画像',
      icon: 'nested'
    },
    children: [
      {
        path: 'studentTags',
        component: () => import('@/views/studentPortrait/studentTags/index'), // Parent router-view
        name: '词库（学生标签）',
        meta: { title: '词库（学生标签）' },
      },
      {
        path: 'searchEngine',
        component: () => import('@/views/studentPortrait/searchEngine/index'),
        name: '检索引擎',
        meta: { title: '检索引擎' }
      }
    ]
  },
  {
    path: '/integrityManagement',
    component: Layout,
    hidden:true,
    redirect: '/integrityManagement/menu1',
    name: '诚信管理',
    meta: {
      title: '诚信管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'integritySurvey',
        component: () => import('@/views/integrityManagement/integritySurvey/index'), // Parent router-view
        name: '诚信调查',
        meta: { title: '诚信调查' },
      },
      {
        path: 'integrityBlacklist',
        component: () => import('@/views/integrityManagement/integrityBlacklist/index'),
        name: '诚信黑名单',
        meta: { title: '诚信黑名单' }
      }
    ]
  },
  {
    path: '/accurateIdentification',
    component: Layout,
    hidden:true,
    redirect: '/accurateIdentification/poorStudentsApply',
    name: '困难生认定',
    meta: {
      title: '困难生认定',
      icon: 'nested'
    },
    children: [
      {
        path: 'poorStudentsApply',
        component: () => import('@/views/accurateIdentification/poorStudentsApply/index'), // Parent router-view
        name: '学生申请贫困生认定',
        meta: { title: '学生申请贫困生认定' },
      },
      {
        path: 'verificationDistribution',
        component: () => import('@/views/accurateIdentification/verificationDistribution/index'),
        name: '认定审核及分配',
        meta: { title: '认定审核及分配' }
      },
      {
        path: 'questionnaireManagement',
        component: () => import('@/views/accurateIdentification/questionnaireManagement/index'), // Parent router-view
        name: '问卷管理',
        meta: { title: '问卷管理' },
      },
      {
        path: 'questionnaireFilling',
        component: () => import('@/views/accurateIdentification/questionnaireFilling/index'),
        name: '问卷填写',
        meta: { title: '问卷填写' }
      }
    ]
  },
  {
    path: '/nationalAwardsGrants',
    component: Layout,
    hidden:true,
    redirect: '/nationalAwardsGrants/targetAllocation',
    name: '国家奖助学金管理',
    meta: {
      title: '国家奖助学金管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'targetAllocation',
        component: () => import('@/views/nationalAwardsGrants/targetAllocation/index'), // Parent router-view
        name: '指标分配',
        meta: { title: '指标分配' },
      },
      {
        path: 'application',
        component: () => import('@/views/nationalAwardsGrants/application/index'),
        name: '国家奖助学金申请',
        meta: { title: '国家奖助学金申请' }
      },
      {
        path: 'checked',
        component: () => import('@/views/nationalAwardsGrants/checked/index'), // Parent router-view
        name: '国家奖助学金审核',
        meta: { title: '国家奖助学金审核' },
      },
    ]
  },
  {
    path: '/onCampusGrants',
    component: Layout,
    hidden:true,
    redirect: '/onCampusGrants/awardManagement',
    name: '校内奖助学金管理',
    meta: {
      title: '校内奖助学金管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'awardManagement',
        component: () => import('@/views/onCampusGrants/awardManagement/index'), // Parent router-view
        name: '奖项管理',
        meta: { title: '奖项管理' },
      },
      {
        path: 'targetAllocation',
        component: () => import('@/views/onCampusGrants/targetAllocation/index'),
        name: '指标分配',
        meta: { title: '指标分配' }
      },
      {
        path: 'application',
        component: () => import('@/views/onCampusGrants/application/index'), // Parent router-view
        name: '校内奖助学金申请',
        meta: { title: '校内奖助学金申请' },
      },
      {
        path: 'onScholarshipChecked',
        component: () => import('@/views/onCampusGrants/onScholarshipChecked/index'), // Parent router-view
        name: '校内奖学金审核',
        meta: { title: '校内奖学金审核' },
      },
      {
        path: 'onGrantChecked',
        component: () => import('@/views/onCampusGrants/onGrantChecked/index'), // Parent router-view
        name: '校内助学金审核',
        meta: { title: '校内助学金审核' },
      },
    ]
  },
  {
    path: '/socialAwardsGrantsManagement',
    component: Layout,
    hidden:true,
    redirect: '/socialAwardsGrantsManagement/awardManagement',
    name: '社会奖助学金管理',
    meta: {
      title: '社会奖助学金管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'awardManagement',
        component: () => import('@/views/socialAwardsGrantsManagement/awardManagement/index'), // Parent router-view
        name: '奖项管理',
        meta: { title: '奖项管理' },
      },
      {
        path: 'targetAllocation',
        component: () => import('@/views/socialAwardsGrantsManagement/targetAllocation/index'),
        name: '指标分配',
        meta: { title: '指标分配' }
      },
      {
        path: 'application',
        component: () => import('@/views/socialAwardsGrantsManagement/application/index'), // Parent router-view
        name: '社会奖助学金申请',
        meta: { title: '社会奖助学金申请' },
      },
      {
        path: 'socialGrantChecked',
        component: () => import('@/views/socialAwardsGrantsManagement/socialGrantChecked/index'), // Parent router-view
        name: '社会助学金审核',
        meta: { title: '社会助学金审核' },
      },
      {
        path: 'socialScholarshipChecked',
        component: () => import('@/views/socialAwardsGrantsManagement/socialScholarshipChecked/index'), // Parent router-view
        name: '社会奖学金审核',
        meta: { title: '社会奖学金审核' },
      },
    ]
  },
  {
    path: '/publicityManagement',
    component: Layout,
    hidden:true,
    redirect: '/publicityManagement/menu1',
    name: '公示管理',
    meta: {
      title: '公示管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'progressQuery',
        component: () => import('@/views/publicityManagement/progressQuery/index'), // Parent router-view
        name: '进度查询',
        meta: { title: '进度查询' },
      },
      {
        path: 'publicity',
        component: () => import('@/views/publicityManagement/publicity/index'),
        name: '公示管理',
        meta: { title: '公示管理' }
      }
    ]
  },
  {
    path: '/statisticalAnalysis',
    component: Layout,
    hidden:true,
    redirect: '/statisticalAnalysis/menu1',
    name: '统计分析',
    meta: {
      title: '统计分析',
      icon: 'nested'
    },
    children: [
      
      {
        path: 'report',
        component: () => import('@/views/statisticalAnalysis/report/index'),
        name: '资助项目报表',
        meta: { title: '资助项目报表' }
      },{
        path: 'analysis',
        component: () => import('@/views/statisticalAnalysis/analysis/index'), // Parent router-view
        name: '资助数据分析',
        meta: { title: '资助数据分析' },
      },
      {
        path: 'history',
        component: () => import('@/views/statisticalAnalysis/history/index'),
        name: '历史查询',
        meta: { title: '历史查询' }
      }
    ]
  },
  {
    path: '/workStudyManagement',
    component: Layout,
    hidden:true,
    redirect: '/workStudyManagement/menu1',
    name: '勤工助学管理',
    meta: {
      title: '勤工助学管理',
      icon: 'nested'
    },
    children: [  
      {
        path: 'release',
        component: () => import('@/views/workStudyManagement/release/index'),
        name: '岗位发布',
        meta: { title: '岗位发布' }
      },{
        path: 'apply',
        component: () => import('@/views/workStudyManagement/apply/index'), // Parent router-view
        name: '岗位申请',
        meta: { title: '岗位申请' },
      },
      {
        path: 'postManagement',
        component: () => import('@/views/workStudyManagement/postManagement/index'),
        name: '岗位管理',
        meta: { title: '岗位管理' }
      }
    ]
  },
  {
    path: '/systemManagement',
    component: Layout,
    redirect: '/systemManagement/menu1',
    name: '系统管理',
    meta: {
      title: '系统管理',
      icon: 'nested'
    },
    children: [  
      {
        path: 'department',
        component: () => import('@/views/systemManagement/department/index'),
        name: '机构管理',
        meta: { title: '机构管理' }
      },{
        path: 'resources',
        component: () => import('@/views/systemManagement/resources/index'),
        name: '资源管理',
        meta: { title: '资源管理' }
      },
      {
        path: 'menu',
        component: () => import('@/views/systemManagement/menu/index'),
        name: '菜单管理',
        meta: { title: '菜单管理' }
      },
      {
        path: 'role',
        component: () => import('@/views/systemManagement/role/index'),
        name: '角色管理',
        meta: { title: '角色管理' }
      },
      {
        path: 'user',
        component: () => import('@/views/systemManagement/user/index'), // Parent router-view
        name: '用户管理',
        meta: { title: '用户管理' },
      },
      {
        path: 'major',
        component: () => import('@/views/systemManagement/major/index'),
        name: '专业管理',
        meta: { title: '专业管理' }
      },
      {
        path: 'class',
        component: () => import('@/views/systemManagement/class/index'),
        name: '班级管理',
        meta: { title: '班级管理' }
      },
      {
        path: 'log',
        component: () => import('@/views/systemManagement/log/index'),
        name: '日志管理',
        meta: { title: '日志管理' }
      },
      {
        path: 'configure',
        component: () => import('@/views/systemManagement/configure/index'),
        name: '配置管理',
        hidden:true,
        meta: { title: '配置管理' }
      },
      {
        path: 'settings',
        component: () => import('@/views/systemManagement/settings/index'),
        name: '系统设置',
        hidden:true,
        meta: { title: '系统设置' }
      },
      {
        path: 'dataDictionary',
        component: () => import('@/views/systemManagement/dataDictionary/index'),
        name: '数据字典',
        meta: { title: '数据字典' }
      },
     
      
      {
        path: 'password',
        component: () => import('@/views/systemManagement/password/index'),
        name: '密码管理',
        hidden:true,
        meta: { title: '密码管理' }
      }
    ]
  },
]
