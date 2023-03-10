import request from '@/utils/request'

// 修改公司信息
export function setProjectCompanyInfo(data) {
  return request({
    url: '/admin/seProjectCompanyInfo/addOrUpdateOne',
    method: 'post',
    data
  })
}

// 修改项目信息
export function setProjectCompanyProjectMessage(data) {
  return request({
    url: '/admin/seProjectCompanyProjectMessage/addOrUpdateOne',
    method: 'post',
    data
  })
}

// 建筑物产证
export function setProjectCompanyBuildInfo(data) {
  return request({
    url: '/admin/seProjectCompanyBuildInfo/addOrUpdateOne',
    method: 'post',
    data
  })
}

// 增加/修改 股权结构
export function setProjectCompanyStock(data) {
  return request({
    url: '/admin/seProjectCompanyStock/addOrUpdateOne',
    method: 'post',
    data
  })
}

//  删除股权结构
export function deleteOne(data) {
  return request({
    url: '/admin/seProjectCompanyStock/deleteOne',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data
  })
}

// 增加组织结构
export function setProjectCompanyOrganization(data) {
  return request({
    url: '/admin/seProjectCompanyOrganizationPerson/addOrUpdatePerson',
    method: 'post',
    data
  })
}

//  删除组织结构
export function setProjectCompanyOrganizationPerson(data) {
  return request({
    url: '/admin/seProjectCompanyOrganizationPerson/deletePersonByPersonId',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data
  })
}

// 增删组织架构人员
export function setProjectCompanyOrganizationPersonList(data) {
  return request({
    url: '/admin/seProjectCompanyOrganization/addOrUpdateOne',
    method: 'post',
    data
  })
}

// 生产情况
export function setProjectCompanyBusinessInfo(data) {
  return request({
    url: '/admin/seProjectCompanyBusinessInfo/addOrUpdateOne',
    method: 'post',
    data
  })
}

// 财务情况
export function setProjectCompanyFinanceInfo(data) {
  return request({
    url: '/admin/seProjectCompanyFinanceInfo/addOrUpdateOne',
    method: 'post',
    data
  })
}

// 合同签约
export function setProjectContract(data) {
  return request({
    url: '/admin/seProjectContract/addOrUpdateOne',
    method: 'post',
    data
  })
}

// 获取省市区列表
export function getProvinceCity(data) {
  return request({
    url: '/admin/getProvinceCity',
    method: 'post',
    data
  })
}
