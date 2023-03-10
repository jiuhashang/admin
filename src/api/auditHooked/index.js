import request from '@/utils/request'

// 获取并网信息详情
export function getGirdConnectionList(params) {
  return request({
    url: '/admin/seProjectInfo/getGirdConnectionList',
    method: 'get',
    params
  })
}

// 审核驳回/通过
export function girdConnectionExamine(params) {
  return request({
    url: '/admin/seProjectInfo/girdConnectionExamine',
    method: 'get',
    params
  })
}
