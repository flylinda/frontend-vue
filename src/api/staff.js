import request from '@/utils/request'

// 查询外部人员管理列表
export function getListAllUser (params) {
  return request({
    url: `/rock-activity/api/v1/manage/externalUser/listAllUser`,
    method: 'get',
    params
  })
}

// 新增外部人员
export function addExternalUser (data) {
  return request({
    url: `/rock-activity/api/v1/manage/externalUser/addExternalUser`,
    method: 'post',
    data
  })
}

// 编辑外部人员
export function updateExternalUser (data) {
  return request({
    url: `/rock-activity/api/v1/manage/externalUser/updateExternalUser`,
    method: 'put',
    data
  })
}
