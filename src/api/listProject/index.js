import request from '@/utils/request'

// 项目列表
export function getList(params) {
  return request({
    url: '/admin/seProjectInfo/selectList',
    method: 'get',
    params
  })
}

// 文件预下载
export function readyDownFile(params) {
  return request.post(
    `/admin/projectFile/readyDownFile`,
    params
  )
}

// pdf 导出功能
export function getProjectPdf(projectId) {
  return request.post(
    `/admin/seProjectInfo/getProjectPdf`,
    { projectId },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
}

// 获取并网信息
export function getGirdConnectionList(params) {
  return request({
    url: '/admin/seProjectInfo/getGirdConnectionList',
    method: 'get',
    params
  })
}

// 项目详情
export function getDetail(params) {
  return request({
    url: '/admin/seProjectInfo/selectProjectInfo',
    method: 'get',
    params
  })
}

// 技术评估
export function getTechnical(params) {
  return request({
    url: '/admin/seProjectSkillEstimate/getOneByProjectId',
    method: 'get',
    params
  })
}

// 尽调信息
export function getInformation(params) {
  return request({
    url: '/admin/seProjectCompanyDueDiligence/selectOneByProjectId',
    method: 'get',
    params
  })
}

// 更新尽调信息
export function setInformation(params) {
  return request.post('/admin/seProjectCompanyDueDiligence/addOrUpdateOne', params)
}

// 项目初审
export function updateProjectStatus(params) {
  return request({
    url: '/admin/seProjectInfo/updateProjectStatus',
    method: 'get',
    params
  })
}

// 获取项目准备详情
export function getProjectPrepareInfo({ projectId } = {}) {
  return request.get(`/admin/seProjectInfo/selectProjectReady?projectId=${projectId}`)
}

// 项目准备提交
export function setProjectPrepareSubmit({ projectId } = {}) {
  return request.post(
    `/admin/seProjectInfo/updateProjectReadyStatus`,
    { projectId },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
}

// 项目准备编辑
export function modifyProjectPrepareInfo(params) {
  return request.post(
    `/admin/seProjectInfo/editProjectReady`,
    params
  )
}

// 项目监管详情, 入参projectId
export function getProjectExamineDetailInfo({ projectId } = {}) {
  return request.post(
    `/admin/seProjectInfo/selectProjectExamine`,
    { projectId },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
}

// 项目监管详情页面, 审核驳回 + 审核通过
export function updateProjectExamineStatus(params = {}) {
  return request.post(
    `/admin/seProjectInfo/updateProjectExamineStatus`,
    params
  )
}

// 项目施工节点审核 type 0:组件；1：线缆；2逆变器；3：防雷接地
export function updateProjectBuildElementStatus(params = {}) {
  return request.post(
    `/admin/seProjectInfo/updateProjectBuildElementStatus`,
    params,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
}

// 获取项目监管列表
export function getProjectExamineList(params) {
  return request({
    url: '/admin/seProjectInfo/getProjectExamineList',
    method: 'get',
    params: params
  })
}

// 终审审核接口
export function updateProjectExamineStatusByAdmin(params) {
  return request.post(
    `/admin/seProjectInfo/updateProjectExamineStatusByAdmin`,
    params,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
}

// 工作台信息
export function getProjectStatusNum() {
  return request({
    url: '/admin/seProjectInfo/getProjectStatusNum',
    method: 'get'
  })
}

// 获取脱硫煤价格
export function getDesulphurizeElectricityPrice(params) {
  return request({
    url: '/admin/seProjectElectricEstimate/getDesulphurizeElectricityPrice',
    method: 'get',
    params: params
  })
}

// 获取发电预估详情(尽调)
export function getSeProjectElectricEstimateInfo(params) {
  return request({
    url: '/admin/seProjectElectricEstimate/getSeProjectElectricEstimateInfo',
    method: 'get',
    params: params
  })
}

// 发电预估计算
export function seProjectElectricEstimateInfoCount(params = {}) {
  return request.post(
    `/admin/seProjectElectricEstimate/seProjectElectricEstimateInfoCount`,
    params
  )
}

// 获取发电预估详情(项目详情)
export function getSeProjectElectricEstimateInfoByProjectId(params) {
  return request({
    url: '/admin/seProjectElectricEstimate/getSeProjectElectricEstimateInfoByProjectId',
    method: 'get',
    params: params
  })
}
