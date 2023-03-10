import request from '@/utils/request'

// 获取并网信息详情
export function getProjectStatusNum(params) {
  return request({
    url: '/admin/seProjectInfo/getProjectStatusNum',
    method: 'get',
    params
  })
}
