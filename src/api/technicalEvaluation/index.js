import request from '@/utils/request'

// 项目列表
// export function getList(params) {
//   return request({
//     url: '/admin/seProjectInfo/selectList',
//     method: 'get',
//     params
//   })
// }

// 项目详情
export function getOneByProjectId(params) {
  return request({
    url: '/admin/seProjectSkillEstimate/getOneByProjectId',
    method: 'get',
    params
  })
}

// 修改详情
export function getUpdate(data) {
  return request({
    url: '/admin/seProjectSkillEstimate/saveOrUpdateOne',
    method: 'post',
    data
  })
}

// 获取项目主线
export function getUpdateInfo(params) {
  return request({
    url: '/admin/seProjectInfo/getProjectInfoByProjectId',
    method: 'get',
    params
  })
}
