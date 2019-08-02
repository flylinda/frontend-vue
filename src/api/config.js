import request from '@/utils/request'

export function listAllUser (params) {
  return request({
    url: '/rock-activity/api/v1/manage/config/listAllConfig',
    method: 'get'
  })
}
export function addConfig (data) {
  return request({
    url: '/rock-activity/api/v1/manage/config/addConfig',
    method: 'post',
    data
  })
}
export function editConfig (data) {
  return request({
    url: '/rock-activity/api/v1/manage/config/updateConfig',
    method: 'put',
    data
  })
}
