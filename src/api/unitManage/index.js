import request from '@/utils/request'

// 获取施工单位列表
export function getBuilderTeamList(params = {}) {
  const { pageIndex = 1, pageSize = 10, ...resetParam } = params
  return request({
    url: `/admin/seProjectBuildRealInformation/getList?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    method: 'post',
    params: resetParam
  })
}

// 获取单个施工单位的信息
export function getBuiderTeamById(id) {
  return request.get(`/admin/seProjectBuildRealInformation/getOneById?id=${id}`)
}

// 施工单位审核
export function addOrUpdateTeam(params = {}) {
  return request({
    url: `/admin/seProjectBuildRealInformation/addOrUpdateOne`,
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
