import request from '@/utils/request'

export function setProjectBuildDamageElement(params) {
  return request({
    url: '/admin/seProjectBuildDamageElement/getList',
    method: 'get',
    params
  })
}
