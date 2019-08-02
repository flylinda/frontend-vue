import request from '@/utils/request'
import qs from 'qs'

export function getUserInfo (data) {
  return request({
    url: '/im/v1/users/me',
    method: 'get',
    data: qs.stringify(data)
  })
}

export function getRole (params) {
  return request({
    url: `/admin/api/v1/authorization/menus`,
    method: 'get',
    params
  })
}
