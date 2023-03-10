import request from '@/utils/request'

// 获取组件列表
export function setProjectBuildElementCode(params) {
  return request({
    url: '/admin/seProjectBuildElementCode/getElementCodeList',
    method: 'get',
    params
  })
}

// 获取逆变器列表
export function setProjectBuildInverterCode(params) {
  return request({
    url: '/admin/seProjectBuildInverterCode/getInventCodeList',
    method: 'get',
    params
  })
}

// 删除组件
export function deleteProjectBuildInverterCode(params) {
  return request({
    url: '/admin/seProjectBuildElementCode/deleteElementCode',
    method: 'get',
    params
  })
}

// 删除逆变器
export function deleteBuildInverterCode(params) {
  return request({
    url: '/admin/seProjectBuildInverterCode/deleteInverterCode',
    method: 'get',
    params
  })
}
