import request from '@/utils/request'

export function getList (params) {
  return request({
    url: '/api/mock/template',
    method: 'get',
    params
  })
}

// 查询模板列表数据
export function getTemplate (params) {
  return request({
    url: `rock-activity/api/v1/manage/template`,
    method: 'get',
    params
  })
}

// 物料模板数据查询
export function getMaterielTemplate (params) {
  return request({
    url: `/rock-activity/api/v1/manage/materielTemplate`,
    method: 'get',
    params
  })
}

// 新增模板
export function postTemplate (data) {
  return request({
    url: `/rock-activity/api/v1/manage/template`,
    method: 'post',
    data
  })
}

// 删除模板
export function deleteTemplate (params) {
  return request({
    url: `/rock-activity/api/v1/manage/template`,
    method: 'delete',
    params
  })
}

// 修改模板
export function putMaterielTemplate (data) {
  return request({
    url: `/rock-activity/api/v1/manage/materielTemplate`,
    method: 'put',
    data
  })
}
