<template>
<el-dialog title="飞机票订单" :visible.sync="dialogTableVisible" :close-on-click-modal="false" @close="handelCloseDetail">
  <div>
    <!-- 订单状态组件 -->
    <OrderStatus :orderData="orderData"  @changeChannelCodeOrOrderAmount="changeChannelCodeOrOrderAmount" :loading="planeloading"/>
    <!-- 订单详情组件 -->
    <plane-comp :rowData="rowData" :gridData="gridData" :orderData="orderData" :planeloading="planeloading"/>
      <!-- 占位组件，仅占位用 -->
      <div class="blank-height"></div>
  </div>
</el-dialog>
</template>

<script>
import { getOrderDetail, updateArtificialOrderPlaneTicket } from '../../api/order'
import OrderStatus from '@/components/OrderStatus'
import planeComp from './planeComp'
export default {
  props: {
    pageNo: {
      type: Number
    }
  },
  components: { OrderStatus, planeComp },
  data () {
    return {
      // 订单信息
      rowData: {},
      // 飞机票订单信息
      orderData: {},
      // 飞机票详情
      gridData: [],
      // dialog是否显示
      dialogTableVisible: false,
      // 加载中
      planeloading: false
    }
  },
  methods: {
    showDialog (index, obj) {
      this.rowData = obj
      this.dialogTableVisible = true
      this.fetchData()
    },
    fetchData () {
      this.handleGetOrderDetail()
    },
    handleGetOrderDetail () {
      this.planeloading = true
      // 根据订单id和订单类型查询飞机票详情
      let params = {
        id: this.rowData.id,
        orderType: this.rowData.orderType
      }
      getOrderDetail(params).then(
        (res) => {
          if (res.isSuccess) {
            this.orderData = res.data
            this.gridData = res.data.planeTicketList
            if (this.rowData.auditStatus === 4 && this.rowData.artificial === 1) {
              this.gridData.forEach(el => {
                el.startTime = new Date(el.startTime)
                el.arriveTime = new Date(el.arriveTime)
              })
            }
          }
          this.planeloading = false
        }
      )
    },
    handelCloseDetail () {
      this.dialogTableVisible = false
    },
    // 获取子组件渠道类型 || 总价，改变渠道类型 || 总价
    changeChannelCodeOrOrderAmount (name, value) {
      let params = {
        id: this.orderData.id,
        innerOrderNo: this.orderData.innerOrderNo,
        [name]: value
      }
      updateArtificialOrderPlaneTicket(params).then((res) => {
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
<style  lang="scss">

</style>
