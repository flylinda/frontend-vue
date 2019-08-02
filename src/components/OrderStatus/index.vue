<template>
  <div class="order-status" v-loading="loading" element-loading-text="Loading">
    <div class="os-detail">
      <div class="osd-line">
        <span class="osdl-title">所属活动：</span>
        <span class="osdl-value">{{ownData.activityName}}</span>
      </div>
      <div class="osd-line">
        <span class="osdl-title">订单状态：</span>
        <span class="osdl-value" :style="{'color':innerOrderStatusMap(ownData.innerOrderStatus).color}">{{innerOrderStatusMap(ownData.innerOrderStatus).value}}</span>
      </div>
      <div class="osd-line">
        <span class="osdl-title">内部订单状态：</span>
        <span class="osdl-value" :style="{'color': auditStatusMap(auditOrder.auditStatus).color} ">{{auditStatusMap(auditOrder.auditStatus).value}}</span>
      </div>
      <div class="osd-line" v-if="auditOrder.rejectReason">
        <span class="osdl-title">拒绝原因：</span>
        <span class="osdl-value reject-reason">{{auditOrder.rejectReason}}</span>
      </div>
      <div class="osd-line">
        <span class="osdl-title">发起者：</span>
        <span class="osdl-value">{{auditOrder.promoterName}}（手机号：{{auditOrder.promoterMobile}}）</span>
      </div>
      <div class="osd-line">
        <span class="osdl-title">审核者：</span>
        <span class="osdl-value" v-if="auditOrder.auditorName">{{auditOrder.auditorName}}（手机号：{{auditOrder.auditorMobile}}）</span>
      </div>
      <div class="osd-line">
        <span class="osdl-title">渠道类型：</span>
        <el-input class="osdl-input" @blur="changeChannelCode" v-if="auditOrder.auditStatus===4&&ownData.artificial===1" v-model="ownData.channelCode" auto-complete="off" size="mini"></el-input>
        <span class="osdl-value" v-else>{{ownData.channelCode}}</span>
      </div>
      <div class="osd-price">
        <div class="osdp-num">
          ¥
          <el-input class="osdpn-price-input" @blur="changeOrderAmount" v-if="auditOrder.auditStatus===4&&ownData.artificial===1" v-model="ownData.orderAmount" auto-complete="off" type="number"></el-input>
          <span class="osdpn-price" v-else>{{ownData.orderAmount | formatMoney}}</span>
        </div>
        <div class="osdp-num">订单金额</div>
        <el-button class="osdp-button" :class="auditOrder.auditStatus!==4||ownData.artificial!==1||ownData.innerOrderStatus!==1 ? 'osdp-disabled' : ''" size="small" :disabled="auditOrder.auditStatus!==4||ownData.artificial!==1||ownData.innerOrderStatus!==1" @click.native.prevent="notify">短信通知</el-button>
        <div class="osdp-sented" v-if="sentedAll">已通知</div>
      </div>
    </div>
    <div class="os-nonecessary" v-if="!hide">
      <div class="osn-line">
        <span class="osnl-title">内部订单号：</span>
        <span class="osnl-value">{{ownData.innerOrderNo}}</span>
      </div>
      <div class="osn-line osn-remark">
        <span class="osnl-title">备注：</span>
        <div class="osnl-remark">{{ownData.remark ? ownData.remark : '暂无备注'}}</div>
      </div>
    </div>
    <div class="os-btn" @click="changeHide">
      <i class="one" :class="hide ? 'one-arrow-down' :  'one-arrow-up'"></i>
    </div>
  </div>
</template>

<script>
import { sendMessageAfterPaySuccess } from '@/api/order'

export default {
  props: {
    orderData: {
      type: Object
    },
    loading: {
      type: Boolean
    }
  },
  data () {
    return {
      hide: true,
      sentedAll: false,
      auditOrder: {},
      ownData: {}
    }
  },
  watch: {
    orderData (value) {
      this.ownData = value
      this.auditOrder = value.auditOrder
      this.checkSented(value)
    }
  },
  filters: {
    // 格式化金额
    formatMoney (num) {
      let money = num && num.toFixed(2) + ''
      var regex = /(?!^)(?=(\d{3})+\.)/g
      return money && money.replace(regex, ',')
    }
  },
  methods: {
    changeHide () {
      this.hide = !this.hide
    },
    innerOrderStatusMap (status) {
      const statusMap = {
        0: {
          value: '进行中',
          color: '#ED6C00'
        },
        1: {
          value: '已完成',
          color: '#6BA528'
        }
      }
      return statusMap[status] || { color: '', value: '' }
    },
    auditStatusMap (status) {
      const statusMap = {
        0: {
          value: '已提交，待审核',
          color: '#ED6C00'
        },
        2: {
          value: '已取消',
          color: '#999'
        },
        4: {
          value: '审核通过',
          color: '#6BA528'
        },
        6: {
          value: '审核拒绝',
          color: '#F56C6C'
        },
        8: {
          value: '通过后再拒绝',
          color: '#F56C6C'
        }
      }
      return statusMap[status] || { color: '', value: '' }
    },
    // 改变渠道类型
    changeChannelCode (e) {
      this.$emit('changeChannelCodeOrOrderAmount', 'channelCode', e.target.value)
    },
    changeOrderAmount (e) {
      this.$emit('changeChannelCodeOrOrderAmount', 'orderAmount', e.target.value)
    },
    // 短信通知他人
    notify () {
      // 根据内部订单号通过短信方式将订单信息通知此订单下的所有人
      let innerOrderNo = { innerOrderNo: this.orderData.innerOrderNo }
      this.$confirm('本操作会通知此订单所有人哦，请确保相关信息已编辑完毕哦', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sendMessageAfterPaySuccess(innerOrderNo).then(
          res => {
            if (res.isSuccess) {
              this.$message({
                type: 'success',
                message: res.resultMsg
              })
              this.sentedAll = true
            }
          },
          error => {
            console.log(error)
          }
        )
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消短信通知'
        })
      })
    },
    checkSented (value) {
      let list = value.hotelList || value.planeTicketList || value.trainTicketList
      for (let i = 0; i < list.length; i++) {
        if (!list[i].messageSent) {
          this.sentedAll = false
          return
        }
      }
      this.sentedAll = true
    }
  }
}
</script>
<style lang="scss" scoped>
.order-status {
  background: #fff;
  padding: 26px;
  position: relative;
  margin-bottom: 30px;
  .os-detail {
    position: relative;
    .osd-line {
      display: flex;
      align-items: flex-start;
      margin-bottom: 15px;
      .osdl-title {
        color: #676767;
        font-size: 14px;
        display: inline-block;
        width: 100px;
      }
      .osdl-value {
        color: #2B2B2B;
        margin-left: 15px;
      }
      .osdl-input {
        display: inline-block;
        width: 150px;
        margin-left: 15px;
      }
    }
    .osd-price {
      position: absolute;
      right: 0;
      top: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      .osdp-num{
        color: #676767;
        font-size: 14px;
        .osdpn-price{
          color: #ED6C00;
          font-size: 30px;
          font-weight: bold;
          margin-left: 8px;
        }
        .osdpn-price-input {
          width: 120px;
          margin-bottom: 5px;
          margin-left: 8px;
          /deep/ .el-input__inner{
            color: #ED6C00;
            font-size: 30px;
            font-weight: bold;
            padding: 0 0 0 10px;
          }
        }
      }
      .osdp-button {
        color: #E3700F;
        font-weight: 400;
        border: 1px solid #E3700F;
        height: 32px;
        padding: 10px 20px;
        margin-top: 20px;
      }
      .osdp-disabled {
        color: #999;
        border: 1px solid #999;
      }
      .osdp-sented {
        color: #6BA528;
        align-self:flex-end;
        margin-top: 5px;
        font-size: 12px;
      }
    }
  }
  .os-nonecessary{
    border-top: 1px solid #e3e3e3;
    padding: 26px 0 0;
    .osn-line {
      margin-bottom: 15px;
      .osnl-title {
        color: #676767;
        font-size: 14px;
        display: inline-block;
        width: 115px;
      }
      .osnl-value {
        color: #2B2B2B;
        margin-left: 15px;
      }
    }
    .osn-remark {
      margin-top: 30px;
      .osnl-remark {
        color: #2B2B2B;
        margin-top: 6px;
      }
    }
  }
  .os-btn {
    width: 60px;
    height: 20px;
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translate(-50%, 0);
    text-align: center;
    line-height: 20px;
    background: #fff;
    border-radius: 0 0 5px 5px;
    .one{
      color: #d8d8d8;
      font-size: 20px;
    }
  }
}
.reject-reason {
  display: inline-block;
  max-width: 340px;
}
</style>
