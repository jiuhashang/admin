import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import { createCurrentUserRoute } from './menuPermission'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    name: 'Index',
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  // 项目管理
  {
    path: '/projectManage',
    component: Layout,
    redirect: '/projectManage/listProject',
    name: 'projectManage',
    meta: { title: '项目管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'listProject',
        name: 'listProject',
        component: () => import('@/views/projectManage/listProject/index'),
        meta: { title: '项目列表', icon: 'form', roles: ['admin', 'editor'], keepAlive: true }
      },
      {
        path: 'listProjectDetail',
        name: 'listProjectDetail',
        hidden: true,
        component: () => import('@/views/projectManage/listProject/listProjectDetail/index'),
        meta: { title: '项目详情', icon: 'form', roles: ['admin', 'editor'] }
      },

      {
        path: 'developmentProject',
        name: 'developmentProject',
        component: () => import('@/views/projectManage/developmentProject/index'),
        meta: { title: '项目开发', icon: 'form', roles: ['admin', 'editor'], keepAlive: true }
      },
      {
        path: 'developmentDetail',
        name: 'developmentDetail',
        hidden: true,
        component: () => import('@/views/projectManage/developmentProject/developmentDetail/index'),
        meta: { title: '项目开发详情', icon: 'form', roles: ['admin', 'editor'] }
      },

      {
        path: 'technicalEvaluation',
        name: 'technicalEvaluation',
        component: () => import('@/views/projectManage/technicalEvaluation/index'),
        meta: { title: '技术评估', icon: 'form', roles: ['admin', 'editor'], keepAlive: true }
      },
      {
        path: 'technicalDetail',
        name: 'technicalDetail',
        hidden: true,
        component: () => import('@/views/projectManage/technicalEvaluation/technicalDetail/index'),
        meta: { title: '技术评估详情', icon: 'form', roles: ['admin', 'editor'] }
      },

      {
        path: 'bestManage',
        name: 'bestManage',
        component: () => import('@/views/projectManage/bestManage/index'),
        meta: { title: '尽调管理', icon: 'form', roles: ['admin', 'editor'], keepAlive: true }
      },
      {
        path: 'bestManageDetail',
        name: 'bestManageDetail',
        hidden: true,
        component: () => import('@/views/projectManage/bestManage/bestManageDetail/index'),
        meta: { title: '尽调管理详情', icon: 'form', roles: ['admin', 'editor'] }
      },

      {
        path: 'trialProject',
        name: 'trialProject',
        component: () => import('@/views/projectManage/trialProject/index'),
        meta: { title: '项目初审', icon: 'form', roles: ['admin', 'editor'], keepAlive: true }
      },
      {
        path: 'trialProjectDetail',
        name: 'trialProjectDetail',
        hidden: true,
        component: () => import('@/views/projectManage/trialProject/trialProjectDetail/index'),
        meta: { title: '项目初审详情', icon: 'form', roles: ['admin', 'editor'] }
      },
      {
        path: 'preparationProject',
        name: 'preparationProject',
        component: () => import('@/views/projectManage/preparationProject/index'),
        meta: { title: '项目准备', icon: 'form', roles: ['admin', 'editor'], keepAlive: true }
      },
      {
        path: 'preparationProjectDetail',
        name: 'preparationProjectDetail',
        hidden: true,
        component: () => import('@/views/projectManage/preparationProject/dealDetail/index'),
        meta: { title: '项目准备详情', icon: 'form', roles: ['admin', 'editor'] }
      },
      // {
      //   path: 'viewDetail',
      //   name: 'viewDetail',
      //   hidden: true,
      //   component: () => import('@/views/projectManage/preparationProject/viewDetail/index'),
      //   meta: { title: '项目准备详情(查看)', icon: 'form', roles: ['admin', 'editor'] }
      // },

      {
        path: 'damageComponent',
        name: 'damageComponent',
        component: () => import('@/views/projectManage/damageComponent/index'),
        meta: { title: '组件损坏', icon: 'form', roles: ['admin', 'editor'], keepAlive: true }
      },

      {
        path: 'manageComponent',
        name: 'manageComponent',
        component: () => import('@/views/projectManage/manageComponent/index'),
        meta: { title: '组件管理', icon: 'form', roles: ['admin', 'editor'], keepAlive: true }
      },
      {
        path: 'manageComponentDetail',
        name: 'manageComponentDetail',
        hidden: true,
        component: () => import('@/views/projectManage/manageComponent/manageDetail/index'),
        meta: { title: '组件管理详情', icon: 'form', roles: ['admin', 'editor'] }
      },

      {
        path: 'specialApplication',
        name: 'specialApplication',
        component: () => import('@/views/projectManage/specialApplication/index'),
        meta: { title: '特殊申请', icon: 'form', roles: ['admin', 'editor'], keepAlive: true }
      },
      {
        path: 'specialApplicationDetail',
        name: 'specialApplicationDetail',
        hidden: true,
        component: () => import('@/views/projectManage/specialApplication/specialApplicationDetail/index'),
        meta: { title: '特殊申请详情', icon: 'form', roles: ['admin', 'editor'] }
      },

      {
        path: 'projectSupervision',
        name: 'projectSupervision',
        component: () => import('@/views/projectManage/projectSupervision/index'),
        meta: { title: '验收初审', icon: 'form', roles: ['admin', 'editor'], keepAlive: true }
      },
      {
        path: 'projectSupervisionDetail',
        name: 'projectSupervisionDetail',
        hidden: true,
        component: () => import('@/views/projectManage/projectSupervision/projectSupervisionDetail/index'),
        meta: { title: '验收初审详情', icon: 'form', roles: ['admin', 'editor'] }
      },

      {
        path: 'auditAcceptance',
        name: 'auditAcceptance',
        component: () => import('@/views/projectManage/auditAcceptance/index'),
        meta: { title: '验收终审', icon: 'form', roles: ['admin', 'editor'], keepAlive: true }
      },
      {
        path: 'auditAcceptanceDetail',
        name: 'auditAcceptanceDetail',
        hidden: true,
        component: () => import('@/views/projectManage/auditAcceptance/auditAcceptanceDetail/index'),
        meta: { title: '验收终审详情', icon: 'form', roles: ['admin', 'editor'] }
      },

      {
        path: 'auditHooked',
        name: 'auditHooked',
        component: () => import('@/views/projectManage/auditHooked/index'),
        meta: { title: '并网审核', icon: 'form', roles: ['admin', 'editor'], keepAlive: true }
      },
      {
        path: 'auditHookedDetail',
        name: 'auditHookedDetail',
        hidden: true,
        component: () => import('@/views/projectManage/auditHooked/auditHookedDetail/index'),
        meta: { title: '并网审核详情', icon: 'form', roles: ['admin', 'editor'] }
      }
    ]
  },

  // 施工单位管理
  {
    path: '/unitManage',
    alwaysShow: true,
    component: Layout,
    redirect: '/unitManage/unitList',
    name: 'unitManage',
    meta: { title: '施工单位管理', icon: 'nested' },
    children: [
      {
        path: 'unitList',
        name: 'unitList',
        component: () => import('@/views/unitManage/unitList/index'), // Parent router-view
        meta: { title: '施工单位列表', icon: 'form', roles: ['admin', 'editor'], keepAlive: true }
      },
      {
        path: 'unitListDetail',
        name: 'unitListDetail',
        hidden: true,
        component: () => import('@/views/unitManage/unitList/unitListDetail/index'),
        meta: { title: '施工单位详情', icon: 'form', roles: ['admin', 'editor'] }
      }
    ]
  },

  // 系统设置
  {
    path: '/systemSettings',
    component: Layout,
    redirect: '/systemSettings/accountManage',
    name: 'systemSettings',
    meta: { title: '系统设置', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'accountManage',
        name: 'accountManage',
        component: () => import('@/views/systemSettings/accountManage/index'),
        meta: { title: '账号管理', icon: 'form', roles: ['admin', 'editor'], keepAlive: true }
      },

      {
        path: 'roleManage',
        name: 'roleManage',
        component: () => import('@/views/systemSettings/roleManage/index'),
        meta: { title: '角色管理', icon: 'form', roles: ['admin', 'editor'], keepAlive: true }
      },
      {
        path: 'createRole',
        name: 'createRole',
        hidden: true,
        component: () => import('@/views/systemSettings/roleManage/createRole/index'),
        meta: { title: '角色信息配置', icon: 'form', roles: ['admin', 'editor'] }
      },

      {
        path: 'projectManagerManagement',
        name: 'projectManagerManagement',
        component: () => import('@/views/systemSettings/projectManagerManagement/index'),
        meta: { title: '项目经理管理', icon: 'form', roles: ['admin', 'editor'], keepAlive: true }
      },

      {
        path: 'downloadManager',
        name: 'downloadManager',
        component: () => import('@/views/systemSettings/downloadManager/index'),
        meta: { title: '下载管理', icon: 'form', roles: ['admin', 'editor'], keepAlive: true }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => {
  return new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: insertMiddleComp(createCurrentUserRoute(constantRoutes, store?.state?.user?.userInfo)),
    base: process.env.VUE_APP_BASE_ROUTER_PATH
  })
}

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
  router.options.routes = newRouter.options.routes
}

// 针对开启keepalive的路由组件, 插入中间层级, 使得无需手动写入组件的name数组(keep-alive组件的include属性)
function insertMiddleComp(rs) {
  loop(rs)
  return rs
  function loop(r) {
    r.forEach((item) => {
      if (item?.meta?.keepAlive === true) {
        const cp = Vue.component('custom-keep-alive-cache', {
          name: `${item.name}AliveCache`,
          components: {
            TempComp: item.component
          },
          render(h) {
            return h('temp-comp')
          }
        })
        item.component = cp
      }
      item.children && loop(item.children)
    })
  }
}

export default router
