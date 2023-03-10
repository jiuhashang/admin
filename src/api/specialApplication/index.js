import request from '@/utils/request'

// 获取列表
export function getSpecialCaseProjectList(params) {
  return request({
    url: '/admin/seProjectInfo/getSpecialCaseProjectList',
    method: 'get',
    params
  })
}

// 获取列表
export function getList(data, params) {
  return request({
    url: '/admin/seProjectBuildSpecialCase/getList',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data,
    params
  })
}

// 审核
export function updateOne(data) {
  return request({
    url: '/admin/seProjectBuildSpecialCase/updateOne',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data
  })
}
