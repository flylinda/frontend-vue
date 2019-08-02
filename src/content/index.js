/** 物料用到的常量 */
export const PURCHASE_AT_DAYONE = { // 是否在dayone购买
  AT_DAYONE: 0,
  AT_SPOT: 1
}

export const ORDER_TYPE = { // 订单类型
  HOTEL: 1,
  TRAIN: 2,
  PLANE: 3,
  MATERIEL: 4,
  OTHERS: 5
}
export const AUDIT_STATUS = { // 审核状态(后端返回的)
  WAITING_FOR_AUDIT: 0,
  CANCELLED: 2,
  PASS: 4,
  REJECT: 6
}
export const AUDIT_STATUS_TO = { // 审核状态(传给后端的)
  ALL_STATUS: '',
  WAITING_FOR_AUDIT: 0,
  PASS: 1,
  REJECT: 2,
  CANCELLED: 3
}
export const INNER_ORDER_STATUS = { // 内部订单状态
  ONGOING: 0,
  FINISHED: 1
}

export const AUDIT_ORDER_NO_OPTIONS = [
  {
    value: '',
    label: '全部状态'
  },
  {
    value: 0,
    label: '待审核'
  },
  {
    value: 1,
    label: '审核通过'
  },
  {
    value: 2,
    label: '审核拒绝'
  },
  {
    value: 3,
    label: '已取消'
  }
]
