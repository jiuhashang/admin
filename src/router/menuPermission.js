import cloneDeep from 'lodash/cloneDeep'

// 所有用户都有权限的页面
const allHasPermissionRoutes = ['Dashboard', '404', 'login', 'Index']

// 路由权限配置数组
export const MenuPermissionArr = [
  {
    label: '项目管理',
    id: 1,
    options: [
      { label: '项目列表', menuId: 'BD13B61D1E41', value: 'listProject,listProjectDetail' },
      { label: '项目开发', menuId: '3DDB623DC1B4', value: 'developmentProject,developmentDetail' },
      { label: '技术评估', menuId: '64DA247EF00D', value: 'technicalEvaluation,technicalDetail' },
      { label: '尽调管理', menuId: '05F8CE861908', value: 'bestManage,bestManageDetail' },
      { label: '项目初审', menuId: '44E8DADDB02E', value: 'trialProject,trialProjectDetail' },
      { label: '项目准备', menuId: 'CC97CDA2CB34', value: 'preparationProject,preparationProjectDetail' },
      { label: '组件损坏', menuId: '0CD5A8A7B987', value: 'damageComponent' },
      { label: '组件管理', menuId: 'F34B88ABB41C', value: 'manageComponent,manageComponentDetail' },
      { label: '特殊申请', menuId: 'C311C6D0305D', value: 'specialApplication,specialApplicationDetail' },
      { label: '验收初审', menuId: '350C4B90BFDA', value: 'projectSupervision,projectSupervisionDetail' },
      { label: '验收终审', menuId: '0AF68C01847C', value: 'auditAcceptance,auditAcceptanceDetail' },
      { label: '并网审核', menuId: '5063084DE6E0', value: 'auditHooked,auditHookedDetail' }
    ]
  }, {
    label: '施工单位管理',
    id: 2,
    options: [
      { label: '施工单位列表', menuId: 'B68D4461AC14', value: 'unitList,unitListDetail' }
    ]
  }, {
    label: '施工单位管理',
    id: 3,
    options: [
      { label: '账号管理', menuId: 'C121BBB28203', value: 'accountManage' },
      { label: '角色管理', menuId: 'EF4EC6E80133', value: 'roleManage,createRole' },
      { label: '项目经理管理', menuId: '2F5F2C1235A8', value: 'projectManagerManagement' },
      { label: '下载管理', menuId: 'E24EB1D6CEE1', value: 'downloadManager' }
    ]
  }
]

// 根据传入的menIds,获取当前有权限的routeNamelist string[]
export const getPermissionRouteNameArr = (menuIds) => {
  const menuIdArr = (menuIds || '').split(',').filter(v => !!v)
  const result = []
  if (!menuIdArr.length) {
    return result
  }
  const menuIdToRouteNameObj = getAllMenuPermissionArrOpts()
  menuIdArr.forEach((menuId) => {
    const value = menuIdToRouteNameObj[menuId]
    if (value) {
      result.push(...value.split(','))
    }
  })
  return result
}

// 获取所有的options, 返回结果 {[menuId:string]: string|number}
function getAllMenuPermissionArrOpts(key = 'value') {
  const result = {}
  MenuPermissionArr.forEach((item) => {
    const parentId = item.id
    item && item.options.forEach((option) => {
      const v = key === 'parentId' ? parentId : option[key]
      result[option.menuId] = v
    })
  })
  return result
}

// 处理成角色编辑的数据结构
export function getRolePermissionResult(menuIds) {
  const menuIdArr = (menuIds || '').split(',').filter(v => !!v)
  const result = ['', '', '']
  const spare = []
  if (!menuIdArr.length) {
    return { result, spare }
  }
  const menuIdToRouteNameObj = getAllMenuPermissionArrOpts('parentId')
  console.log('menuIdToRouteNameObj', menuIdToRouteNameObj)
  menuIdArr.forEach((menuId) => {
    const value = menuIdToRouteNameObj[menuId]
    if (value) {
      const index = value - 1
      const preValue = result[index]
      result[index] += (preValue ? ',' : '') + menuId
    } else {
      spare.push(menuId)
    }
  })
  return { result, spare: spare.join(',') }
}

// beforeeach 中判断登录权限
export function enterRoutePermission(store, to, next) {
  const { name } = store.getters

  // 超管
  if (name === ['a', 'd', 'm', 'i', 'n'].join('')) {
    next()
    return
  }

  // 都有权限的页面
  if (allHasPermissionRoutes.includes(to.name)) {
    next()
    return
  }

  // 用户角色
  const { userInfo: { role }} = store.state.user
  if (!role) {
    next({ path: '/404' })
    return
  }

  const { menuId = '' } = role
  if (getPermissionRouteNameArr(menuId).includes(to.name)) {
    next()
    return
  }

  next({ path: '/404' })
}

// 创建新路由
export function createCurrentUserRoute(routes, userInfo) {
  const menuId = userInfo?.role?.menuId
  if (!userInfo || userInfo?.name === ['a', 'd', 'm', 'i', 'n'].join('')) {
    return routes
  }

  const routeNames = getPermissionRouteNameArr(menuId).concat(allHasPermissionRoutes) // string[]
  const newRoute = cloneDeep(routes)
  loop(newRoute)
  console.log(newRoute)
  return newRoute

  function loop(r) {
    for (let i = 0; i < r.length; i++) {
      const item = r[i]
      if (routeNames.includes(item.name) || item.redirect) {
        if (item.children) {
          loop(item.children)
        }
        if (!item.hidden && item.children && item.children.length === 0) {
          r.splice(i, 1)
          i--
        }
      } else {
        r.splice(i, 1)
        i--
      }
    }
  }
}
