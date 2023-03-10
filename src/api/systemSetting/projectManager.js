import request from '@/utils/request'

// 获取项目经理列表
export function getProjectManagerList(params) {
  const pageIndex = params.pageIndex || 1
  const pageSize = params.pageSize || 10
  return request.post(`/admin/seProjectManagerInfo/getList?pageIndex=${pageIndex}&pageSize=${pageSize}`, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 添加或修改项目经理
export function addOrUpdateProjectManager(params) {
  return request.post('/admin/seProjectManagerInfo/addOrUpdateOne', params)
}

// 删除项目经理人
export function deleteProjectManager(managerId) {
  return request.post('/admin/seProjectManagerInfo/deleteOne', { managerId }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 获取角色列表
export function getAdminRoleList(params) {
  const pageIndex = params.pageIndex || 1
  const pageSize = params.pageSize || 10
  const roleName = params.roleName || ''
  const id = params.id || ''
  return request.get(`/admin/seAdminRoleInfo/selectList?pageIndex=${pageIndex}&pageSize=${pageSize}&roleName=${roleName}&id=${id}`)
}

// 创建新角色
export function createNewRole(params) {
  return request.post('/admin/seAdminRoleInfo/addOne', params)
}

// 修改角色
export function modifyRole(params) {
  return request({
    url: '/admin/seAdminRoleInfo/updateOne',
    data: params,
    method: 'post'
  })
}

// 获取角色详情
export function fetchRoleInfo(roleId) {
  return request.get(`/admin/seAdminRoleInfo/selectOne?id=${roleId}`)
}

// 删除角色
export function deleteRole(params) {
  return request({
    url: '/admin/seAdminRoleInfo/deleteOne',
    data: params,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

/**
 * 获取后台管理账户列表
 * @param {*} params { pageIndex, pageSize, phone, userName }
 * @returns response Promise
 */
export function getAdminAccountUserList(params) {
  return request({
    method: 'get',
    url: '/admin/seAdminUser/selectList',
    params
  })
}

/**
 * 新增后台管理账户
 * @param {*} params
 * @returns
 */
export function createAdminAccountUser(params) {
  return request.post(
    `/admin/seAdminUser/addOne`, params
  )
}

/**
 * 修改后台管理账户
 * @param {*} params
 * @returns
 */
export function modifyAdminAccountUser(params) {
  return request.post(
    `/admin/seAdminUser/updateOne`, params
  )
}

/**
 * 获取业务账户列表
 * @param {*} params { pageIndex, pageSize, phone, userName }
 * @returns response Promise
 */
export function getBusinessAccountUserList(params) {
  return request({
    method: 'get',
    url: '/admin/seBusinessUserInfo/selectList',
    params
  })
}

/**
 * 新增业务管理账户
 * @param {*} params
 * @returns
 */
export function createBusinessAccountUser(params) {
  return request.post(
    `/admin/seBusinessUserInfo/addOne`, params
  )
}

/**
 * 修改业务管理账户
 * @param {*} params
 * @returns
 */
export function modifyBusinessAccountUser(params) {
  return request.post(
    `/admin/seBusinessUserInfo/updateOne`, params
  )
}

// 下载管理页面-查询
export function selectDownFileList({ pageIndex, pageSize, ...reset } = { pageIndex: 1, pageSize: 10 }) {
  return request.post(
    `/admin/projectFile/selectDownFileList?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    reset,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
}

// 下载管理页面-删除
export function deleteDownFileList(params) {
  return request.post(
    `/admin/projectFile/deleteDownFileList`,
    params
  )
}
