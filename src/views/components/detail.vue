<template>
    <el-dialog title="飞机票订单" :visible="true" @close="handelCloseDetail">
      <div v-loading="trainloading">
        <order-status :orderData="orderData" @changeChannelCodeOrOrderAmount="changeChannelCodeOrOrderAmount" :loading="trainloading"/>
        <train-ticket
          v-if="orderData"
          :tickets="gridData"
          :row-data="rowData"
          :order-data="orderData"
          @refresh="handleGetOrderDetail"
        />
        <!-- <train-comp :rowData="rowData" :gridData="gridData" :trainloading="trainloading"/> -->
        <!-- 占位组件，仅占位用 -->
        <div class="blank-height"></div>
      </div>
    </el-dialog>
</template>

<script>
import { getOrderDetail, updateArtificialOrderTrainTicket } from '../../api/order'
import orderStatus from '@/components/OrderStatus'
import TrainTicket from './ticket'

export default {
  props: {
    pageNo: {
      type: Number
    },
    rowData: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    orderStatus,
    TrainTicket
  },
  data () {
    return {
      // 火车票订单信息
      gridData: [],
      // 加载中
      trainloading: false,
      orderData: null
    }
  },
  mounted () {
    this.handleGetOrderDetail()
  },
  methods: {
    handleGetOrderDetail () {
      this.trainloading = true
      let params = {
        id: this.rowData.id,
        orderType: this.rowData.orderType
      }
      getOrderDetail(params).then(
        (res) => {
          if (res.isSuccess) {
            this.orderData = res.data
            this.gridData = res.data.planeTicketList
            let tempOptions = []
            if (this.rowData.auditStatus === 4) {
              if (this.rowData.artificial === 1) {
                this.gridData.forEach(el => {
                  if (el.startTime) {
                    el.startTime = new Date(el.startTime)
                  } else {
                    el.startTime = null
                  }
                  if (el.arriveTime) {
                    el.arriveTime = new Date(el.arriveTime)
                  } else {
                    el.arriveTime = null
                  }
                })
              } else {
                this.gridData.forEach(el => {
                  if (el.status === 200) {
                    tempOptions.push({
                      label: el.username, value: el.id
                    })
                  }
                })
                this.options = tempOptions
              }
            }
          }
          this.trainloading = false
        }
      )
    },
    handelCloseDetail () {
      document.body.style.overflow = 'initial'
      this.$emit('cancel-detail')
    },
    // 获取子组件渠道类型 || 总价，改变渠道类型 || 总价
    changeChannelCodeOrOrderAmount (name, value) {
      let params = {
        id: this.orderData.id,
        innerOrderNo: this.orderData.innerOrderNo,
        [name]: value
      }
      updateArtificialOrderTrainTicket(params).then((res) => {
        if (res.isSuccess) {
          this.$message({
            type: 'success',
            message: name === 'channelCode' ? '渠道类型更新成功' : '价格更新成功'
          })
          this.$emit('fetchData', { flag: false, pageNo: this.pageNo })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
