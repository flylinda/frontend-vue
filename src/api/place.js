import request from '@/utils/request'
// import qs from 'qs'

export function getPlaceList (params) {
  return request({
    url: '/rock-activity/api/v1/undertaking',
    method: 'get',
    params
  })
}
export function queryPlaceList (path) {
  return request({
    url: `/rock-activity/api/v1/undertaking/${path}`,
    method: 'get'
  })
}
export function addPlace (data) {
  return request({
    url: '/rock-activity/api/v1/undertaking',
    method: 'post',
    data
  })
}

export function editPlace (data) {
  return request({
    url: '/rock-activity/api/v1/undertaking',
    method: 'put',
    data
  })
}
export function deletePlace (path) {
  return request({
    url: `/rock-activity/api/v1/undertaking/${path}`,
    method: 'delete'
  })
}
export function getActivityList () {
  return request({
    url: `/rock-activity/api/v1/undertaking/relation/activity`,
    method: 'get'
  })
}
export function getCityList (params) {
  return request({
    url: '/rock-activity/api/v1/trainTicket/queryCodeByCityName',
    method: 'get',
    params
  })
}
export function getActivityListById (path) {
  return request({
    url: `/rock-activity/api/v1/undertaking/info/activity/${path}`,
    method: 'get'
  })
}
export function activityUniquenessUrl (path) {
  return request({
    url: `/rock-activity/api/v1/undertaking/relation/${path}`,
    method: 'get'
  })
}
// 承包所详情查询
export function getDetailPlaceList (path) {
  return request({
    url: `/rock-activity/api/v1/undertaking/info/undertaking/${path.id}`,
    method: 'get'
  })
}
export function addPlaceDetal (data) {
  return request({
    url: '/rock-activity/api/v1/undertaking/info',
    method: 'post',
    data
  })
}
export function editPlaceDetal (data) {
  return request({
    url: '/rock-activity/api/v1/undertaking/info',
    method: 'put',
    data
  })
}
export function deletePlaceDetal (path) {
  return request({
    url: `/rock-activity/api/v1/undertaking/info/${path}`,
    method: 'delete'
  })
}

// 供应商管理
export function getSupplierList (params) {
  return request({
    url: '/rock-activity/api/v1/supplier/undertaking',
    method: 'get',
    params
  })
}
export function addSupplier (data) {
  return request({
    url: '/rock-activity/api/v1/supplier',
    method: 'post',
    data
  })
}
export function editSupplier (data) {
  return request({
    url: '/rock-activity/api/v1/supplier',
    method: 'put',
    data
  })
}
export function deleteSupplier (path) {
  return request({
    url: `/rock-activity/api/v1/supplier/${path}`,
    method: 'delete'
  })
}

// 餐厅管理
export function getDiningList (params) {
  return request({
    url: '/rock-activity/api/v1/dining/conditions/undertaking',
    method: 'get',
    params
  })
}
export function addDining (data) {
  return request({
    url: '/rock-activity/api/v1/dining/conditions',
    method: 'post',
    data
  })
}
export function editDining (data) {
  return request({
    url: '/rock-activity/api/v1/dining/conditions',
    method: 'put',
    data
  })
}
export function deleteDining (path) {
  return request({
    url: `/rock-activity/api/v1/dining/conditions/${path}`,
    method: 'delete'
  })
}

// 上传图片相关
export function getPictureList (params) {
  return request({
    url: '/rock-activity/api/v1/pictures',
    method: 'get',
    params
  })
}
export function addPicture (data) {
  return request({
    url: '/rock-activity/api/v1/pictures',
    method: 'post',
    data
  })
}
export function editPicture (data) {
  return request({
    url: '/rock-activity/api/v1/pictures',
    method: 'put',
    data
  })
}
export function deletePicture (path) {
  return request({
    url: `/rock-activity/api/v1/pictures/${path}`,
    method: 'delete'
  })
}

// 承办地活动相关
export function addActivity (data) {
  return request({
    url: '/rock-activity/api/v1/undertaking/relation',
    method: 'post',
    data
  })
}
export function editActivity (data) {
  return request({
    url: '/rock-activity/api/v1/undertaking/relation',
    method: 'put',
    data
  })
}

export function deleteActivity (params) {
  return request({
    url: `/rock-activity/api/v1/undertaking/relation/${params.undertakingId}/${params.activityId}`,
    method: 'delete'
  })
}
