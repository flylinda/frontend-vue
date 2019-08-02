import request from '@/utils/request'

export default {
  getList (params) {
    return request({
      url: '/rock-activity/api/v1/manage/materielList',
      method: 'get',
      params
    })
  },

  getClassify (params) {
    return request({
      url: '/rock-activity/api/v1/manage/materielClassify',
      method: 'get',
      params
    })
  },

  deleteMateriel (params) {
    return request({
      url: '/rock-activity/api/v1/manage/materielList',
      method: 'delete',
      params
    })
  },

  addMateriel (data) {
    return request({
      url: '/rock-activity/api/v1/manage/materielList',
      method: 'post',
      data
    })
  },

  editMateriel (data) {
    return request({
      url: '/rock-activity/api/v1/manage/materielList',
      method: 'put',
      data
    })
  }
}
