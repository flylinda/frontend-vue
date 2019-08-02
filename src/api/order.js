import request from '@/utils/request'

export function deleteTrainOrder (params) {
  return request({
    url: '/rock-activity/api/v1/manage/order/deleteOrder',
    method: 'delete',
    params
  })
}

// 订单物流-查询
export function getOrderLogistics (params) {
  return request({
    url: `/rock-activity/api/v1/manage/orderLogistics`,
    method: 'get',
    params
  })
}

// 订单物流-添加
export function postOrderLogistics (params) {
  return request({
    url: `/rock-activity/api/v1/manage/orderLogistics`,
    method: 'post',
    params
  })
}

// 订单物流-更新
export function putOrderLogistics (params) {
  return request({
    url: `/rock-activity/api/v1/manage/orderLogistics`,
    method: 'put',
    params
  })
}

// 订单物流-删除
export function deleteOrderLogistics (params) {
  return request({
    url: `/rock-activity/api/v1/manage/orderLogistics`,
    method: 'delete',
    params
  })
}

// 根据id和订单类型查看火车票详情/飞机票详情/酒店详情
export function getOrderDetail (params) {
  return request({
    url: `/rock-activity/api/v1/order/${params.id}?orderType=${params.orderType}`,
    method: 'get'
  })
}

// 物料订单详情查询根据订单号
export function getMaterielOrderDetails (params) {
  return request({
    url: `/rock-activity/api/v1/manage/orderDetails`,
    method: 'get',
    params
  })
}

// 修改物料价格
export function putMaterielOrderDetails (data) {
  return request({
    url: `/rock-activity/api/v1/manage/orderDetails`,
    method: 'put',
    data
  })
}

// 审核物料订单
export function updateMaterielAuditStatus (params) {
  return request({
    url: `/rock-activity/api/v1/audit/updateAuditStatus`,
    method: 'put',
    params
  })
}

// 人工火车票订单编辑
export function updateArtificialOrderTrainTicket (data) {
  return request({
    url: `/rock-activity/api/v1/manage/trainTicket/updateArtificialOrderTrainTicket`,
    method: 'put',
    data
  })
}

// 人工酒店订单编辑
export function updateArtificialOrderHotel (data) {
  return request({
    url: `/rock-activity/api/v1/manage/hotel/updateArtificialOrderHotel`,
    method: 'put',
    data
  })
}

// 人工飞机票订单编辑
export function updateArtificialOrderPlaneTicket (data) {
  return request({
    url: `/rock-activity/api/v1/manage/planeTicket/updateArtificialOrderPlaneTicket`,
    method: 'put',
    data
  })
}

// 根据不同的审核状态查询不同的订单列表
export function getOrderByAuditStatusAndOrderType (params) {
  return request({
    url: `/rock-activity/api/v1/manage/order`,
    method: 'get',
    params
  })
}

// 审核通过的人工订单信息编辑完毕后，通知所有的相关人员
export function sendMessageAfterPaySuccess (params) {
  return request({
    url: `/rock-activity/api/v1/manage/order/sendMessageAfterPaySuccess`,
    method: 'get',
    params
  })
}

// 修改订单状态：0-进行中；1-已完成
export function updateInnerOrderStatus (params) {
  return request({
    url: `rock-activity/api/v1/manage/order/updateInnerOrderStatus`,
    method: 'put',
    params
  })
}

// 火车票审核通过的自动订单-退票接口

export function refundTrainTicket (data) {
  return request({
    url: `rock-activity/api/v1/trainTicket/refundTrainTicket`,
    method: 'put',
    data
  })
}
