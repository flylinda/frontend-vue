<template>
  <div class="app-container">
    <div class="ac-header">
      <!-- 标题以及分类组件 -->
      <div class="ac-tc">
        <select-down :options="C.AUDIT_ORDER_NO_OPTIONS" :nowSelect="auditOrderNoSelected" @selectChange="fetchData"></select-down>
      </div>
    </div>
    <!-- table组件 -->
    <el-table :data="listAll" v-loading="listLoading" element-loading-text="Loading..." fit highlight-current-row size="mini" @selection-change="handleSelectionChange" :row-key="getRowKeys" @row-click="rowClick">
      <el-table-column
        :reserve-selection="true"
        type="selection"
        width="40">
      </el-table-column>
      <el-table-column fixed="left" align="center" label='序号' width="50">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column fixed="left" label="发起人" prop="promoterName" align="center" width="100">>
        <template slot-scope="scope">
          {{scope.row.promoterName}}
        </template>
      </el-table-column>
      <el-table-column label="飞机票订单号" prop="innerOrderNo" width="150" align="center">
        <template slot-scope="scope">
          {{scope.row.innerOrderNo}}
        </template>
      </el-table-column>
      <el-table-column label="订单状态" prop="orderType" align="center" width="120">
        <template slot-scope="scope">
          <el-select v-if="scope.row.auditStatus===4&&scope.row.artificial===1" size="mini" v-model="scope.row.innerOrderStatus" placeholder="请选择" @change="updateInnerOrderStatus(scope.row.innerOrderNo, scope.row.innerOrderStatus)">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span v-else :class="scope.row.innerOrderStatus=== 0 ? 'innerOrderStatusStyle' : 'auditStatusPassStyle'">{{scope.row.innerOrderStatus | innerOrderStatusFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否为人工订单" align="center" width="120">
        <template slot-scope="scope">
          <i style="font-size: 17px;" v-if="scope.row.artificial=== 1" class="el-icon-check right"></i>
          <i style="font-size: 17px;" v-if="scope.row.artificial=== 0" class="el-icon-close error"></i>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" align="center" width="120">
        <template slot-scope="scope">
          <span :class="scope.row.auditStatus===6? 'auditStatusStyle': scope.row.auditStatus===2? 'auditStatusCancelStyle': scope.row.auditStatus===4?'auditStatusPassStyle':'auditStyle'">{{scope.row.auditStatus | auditStatusFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动名称" align="center" width="180">
        <template slot-scope="scope">
          {{scope.row.activityName}}
        </template>
      </el-table-column>
      <el-table-column label="渠道类型" align="center" width="130">
        <template slot-scope="scope">
          {{scope.row.channelCode}}
        </template>
      </el-table-column>
      <el-table-column label="第三方订单状态" align="center" width="120">
        <template slot-scope="scope" v-if="scope.row.channelCode==='聚合数据'">
          {{scope.row.thirdOrderStatus | thirdOrderStatusFilter}}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" sortable prop="gmtCreate" align="center" width="260">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span class="createtime">{{scope.row.gmtCreate | dateFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="250" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click.native.prevent="viewDetail(scope.row)">查看</el-button>
          <el-button size="small" :disabled="scope.row.auditStatus!==4||scope.row.artificial!==1||scope.row.innerOrderStatus!==1" type="success" @click.native.prevent="notify(scope.$index, scope.row)">发短信</el-button>
          <el-button size="small" type="danger" :disabled="scope.row.auditStatus !== 6 && scope.row.auditStatus !== 2" @click="handelDeletePlace(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :current-page="pageNo"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next"
      :total="total">
    </el-pagination>
    <plane-detail
      v-if="currentShowId"
      :row-data="currentOrderData"
      :page-no="pageNo"
      @cancel-detail="cancelDetail"
      @fetchData="fetchData"
    ></plane-detail>
  </div>
</template>

<script>
import { getOrderByAuditStatusAndOrderType, sendMessageAfterPaySuccess, updateInnerOrderStatus, deleteTrainOrder } from '@/api/order'
import selectDown from '@/components/SelectDown'
import * as C from '@/content'
import planeDetail from './components/detail'

export default {
  props: {
    listType: String
  },
  data () {
    return {
      C,
      options: [
        { value: 0, label: '进行中' },
        { value: 1, label: '已完成' }
      ],
      listAll: [],
      listLoading: false,
      pageNo: 1, // 当前页码
      total: 0, // 数据总条目
      pageSize: 10, // 每页显示多少条数据
      auditOrderNoSelected: C.AUDIT_STATUS_TO.ALL_STATUS,
      currentShowId: 0
    }
  },
  components: {
    selectDown,
    planeDetail
  },
  filters: {
    auditStatusFilter (status) {
      const statusMap = {
        [C.AUDIT_STATUS.WAITING_FOR_AUDIT]: '待审核',
        [C.AUDIT_STATUS.CANCELLED]: '已取消',
        [C.AUDIT_STATUS.PASS]: '审核通过',
        [C.AUDIT_STATUS.REJECT]: '审核拒绝'
      }
      return statusMap[status]
    },
    innerOrderStatusFilter (status) {
      const statusMap = {
        [C.INNER_ORDER_STATUS.ONGOING]: '进行中',
        [C.INNER_ORDER_STATUS.FINISHED]: '已完成'
      }
      return statusMap[status]
    },
    thirdOrderStatusFilter (status) {
      const statusMap = {
        0: '已提交，待处理',
        1: '订单取消',
        2: '占座成功待支付',
        3: '支付成功待出票',
        4: '出票成功',
        5: '出票失败',
        6: '正在处理线上退票请求',
        7: '有乘客退票(改签)成功',
        8: '有乘客退票失败'
      }
      return statusMap[status]
    },
    dateFilter (time) {
      if (!time) return ''
      let date = new Date(time)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      month = month < 10 ? ('0' + month) : month
      let day = date.getDate()
      day = day < 10 ? ('0' + day) : day
      let hour = date.getHours()
      hour = hour < 10 ? ('0' + hour) : hour
      let minute = date.getMinutes()
      minute = minute < 10 ? ('0' + minute) : minute
      let seconds = date.getSeconds()
      seconds = seconds < 10 ? ('0' + seconds) : seconds
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + seconds
    }
  },
  methods: {
    // 查看飞机票订单详情
    viewDetail (row) {
      this.currentOrderData = row
      this.currentShowId = row.id
    },
    cancelDetail () {
      this.currentShowId = 0
    },
    // 根据订单类型和审核状态查询订单列表
    fetchData (obj) {
      let pramas = obj || {}
      let { val = this.auditOrderNoSelected, pageNo = 1, pageSize = 10, flag = true } = pramas
      if (flag) {
        this.listLoading = true
      }
      // 审核状态
      this.auditOrderNoSelected = val
      this.pageNo = pageNo
      this.pageSize = pageSize
      // 订单类型
      let orderType = C.ORDER_TYPE.PLANE
      let body = {
        orderType: orderType,
        auditStatus: this.auditOrderNoSelected,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      getOrderByAuditStatusAndOrderType(body).then(
        (res) => {
          if (res.isSuccess) {
            this.listAll = res.data.entities
            this.total = res.data.entityCount
          }
          this.listLoading = false
        }
      )
    },
    // 页码选择
    handleCurrentChange (val) {
      this.pageNo = val
      this.fetchData({ val: this.auditOrderNoSelected, pageNo: this.pageNo, pageSize: this.pageSize })
    },
    handleSizeChange (val) {
      if (this.pageNo !== 1) {
        this.pageNo = 1
      }
      this.pageSize = val
      this.fetchData({ val: this.auditOrderNoSelected, pageNo: this.pageNo, pageSize: this.pageSize })
    },
    handleSelectionChange (val) {
      this.tempMaterielChange(val)
    },
    getRowKeys (row) {
      return row.id
    },
    rowClick (val) {},
    // 短信通知他人
    notify (index, row) {
      // 根据内部订单号通过短信方式将订单信息通知此订单下的所有人
      let innerOrderNo = { innerOrderNo: row.innerOrderNo }
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
            }
          }
        )
      })
    },
    // 修改订单状态
    updateInnerOrderStatus (innerOrderNo, innerOrderStatus) {
      let body = {
        innerOrderNo: innerOrderNo,
        innerOrderStatus: innerOrderStatus
      }
      this.$confirm('此操作会修改当前订单的状态，您确定要修改吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateInnerOrderStatus(body).then(
          (res) => {
            if (res.isSuccess) {
              this.$message({
                type: 'success',
                message: res.resultMsg
              })
              this.dialogTableVisible = false
              this.fetchData({ val: this.auditOrderNoSelected, pageNo: this.pageNo, pageSize: this.pageSize })
            }
          }
        )
      }).catch(() => {
        this.fetchData({ val: this.auditOrderNoSelected, pageNo: this.pageNo, pageSize: this.pageSize })
      })
    },
    handelDeletePlace (row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteTrainOrder({ orderId: row.id, deleteReason: 'true' }).then(
            res => {
              if (res.isSuccess) {
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
                this.fetchData()
              }
            }
          )
        })
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>
<style lang="scss" scoped>
.app-container{
  .ac-header{
    display: flex;
    justify-content: space-between;
    .ac-tc{
      margin: 16px 0;
    }
    .ac-sm{
      margin-bottom: 16px;
    }
  }
  .createtime{
    margin-left:5px;
  }
  .ac-sma{
    margin-bottom: 16px;
  }
  .auditStatusStyle{
    color: #F56C6C
  }
  .auditStatusPassStyle{
    color: #67C23A
  }
  .auditStyle{
    color: #fa8919
  }
  .innerOrderStatusStyle{
    color: #fa8919
  }
  .auditStatusCancelStyle{
    color: gray
  }
  .right{
    color:#67C23A
  }
  .error{
    color:#F56C6C
  }
}
</style>
