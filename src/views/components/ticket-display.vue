<template>
  <div class="train-ticket-d">
    <div class="train-ticket-d-info">
      <div class="address">
        {{ ticket.fromPlaceName }} <span>-</span> {{ ticket.toPlaceName }}
      </div>
      <div class="week">
        {{ ticket.startTime | dateAllFilter}}
      </div>
      <div :class="ticket.status === 200 ? 'statusPass' : ticket.status === 100 ? 'status' : 'statusFail'">
        {{ ticket.status | orderStatusFilter }}
      </div>
      <div class="detail">
        <div class="time">
          <div class="top">
            <div class="time-t">{{ ticket.startTime | hoursFilter}}</div>
            <div class="time-b">{{ ticket.startTime | dateMonthFilter}}</div>
          </div>
          <div class="bottom">
            <div class="time-t">{{ ticket.arriveTime | hoursFilter}}</div>
            <div class="time-b">{{ ticket.arriveTime | dateMonthFilter}}</div>
          </div>
        </div>
        <div class="canvas">
          <div class="circle top"></div>
          <div class="circle bottom"></div>
        </div>
        <div class="time2">
          <div class="top">
            <div class="time-t">{{ ticket.fromPlaceAirport}}</div>
          </div>
          <div class="bottom">
            <div class="time-t">{{ ticket.toPlaceAirport}}</div>
          </div>
        </div>
        <div class="info">
          <div class="info-c">
            <div class="info-item">
              <div class="info-t">{{ticket.airlineCompany}} {{ ticket.flightNumber }}</div>
              <div class="info-b">{{ ticket.planeType }} {{ ticket.classType }}</div>
            </div>
            <div class="info-item">
              <div class="info-t">{{timeStamp(ticket.startTime,ticket.arriveTime)}}</div>
              <div class="info-b">运行时间</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="train-ticket-d-remark">
      <div class="label">备注：</div>
      <div class="content">
        {{ ticket.remark }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TicketDisplay',
  props: {
    ticket: {
      type: Object,
      default: () => {}
    }
  },
  filters: {
    // 订单状态转换
    orderStatusFilter (status) {
      const statusMap = {
        100: '未出票',
        200: '出票成功',
        300: '退票成功'
      }
      return statusMap[status]
    }
  },
  methods: {
    timeStamp (startTime, arriveTime) {
      let statusMinute = parseInt((arriveTime - startTime) / 1000 / 60)
      let hour = parseInt(statusMinute / 60)
      let min = parseInt(statusMinute % 60)
      statusMinute = ''
      if (hour > 0) {
        statusMinute += hour + '小时'
      }
      if (min > 0) {
        statusMinute += parseFloat(min) + '分钟'
      }
      return statusMinute
    }
  }
}
</script>

<style lang="scss">
.train-ticket-d {
  &-info {
    border: solid 1px #f1f1f1;
    padding: 10px;
    position: relative;
    .status{
      position: absolute;
      right: 20px;
      top: 15px;
      font-size: 18px;
      color:#fa8919
    }
    .statusPass {
      position: absolute;
      right: 20px;
      top: 15px;
      font-size: 18px;
      color:#67c23a;
    }
    .statusFail {
      position: absolute;
      right: 20px;
      top: 15px;
      font-size: 18px;
      color:#f56c6c;
    }
    .address {
      font-weight: 500;
      font-size: 16px;
      span {
        margin: 0 10px;
      }
    }
    .week {
      font-size: 12px;
      color: #9b9b9b;
      margin-top: 5px;
    }
    .detail {
      margin-top: 10px;
      display: flex;
      height: 150px;
    }
    .time {
      width: 60px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;
    }
    .time-t {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 5px;
    }
    .time-b {
      font-size: 12px;
      color: #9b9b9b;
    }
    .time2{
      margin-left:15px;
      width: 100px;
      height:139px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: left;
    }
    .canvas {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 1px;
      background: #f1f1f1;
      margin-bottom: 20px;
    }
    .circle {
      width: 10px;
      height: 10px;
      border-radius: 100%;
      border: solid 1px #d5d5d5;
      background: #fff;
      margin-left: -4px;
    }
    .info {
      margin-left:-70px;
      flex: 1;
      display: flex;
      align-items: center;
    }
    .info-c {
      background: #f8f8f9;
      width: 350px;
      display: flex;
      padding: 10px 0;
      margin-bottom: 20px;
    }
    .info-item {
      padding-left: 20px;
      text-align: center;
      flex: 1;
      &:last-child {
        margin-left: 20px;
        border-left: solid 1px #dedede;
      }
    }
    .info-b {
      margin-top: 5px;
      font-size: 12px;
      color: #9b9b9b;
    }
  }
  &-remark {
    margin-top: 10px;
    .lable {
      color: #676767;
      float: left;
      margin-right: 10px;
    }
    .content {
      word-break: break-all;
      min-height: 30px;
    }
  }
}
</style>
