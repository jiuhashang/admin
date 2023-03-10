import request from '@/utils/request'

export function login(data, callback) {
  return request({
    url: '/admin/login',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/seAdminUser/getUserInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
