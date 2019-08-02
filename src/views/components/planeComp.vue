<template>
<div class="planeComp" v-loading="planeloading" element-loading-text="Loading">
  <h4>出行人员（共{{gridData.length}}人）</h4>
  <div v-for="(item, key) in gridData" :key="key">
    <div class="planeDetail">
      <el-row>
        <a @click="changeHide(item)"><p class="title-type"><i :class="item._openDetail ? 'el-icon-arrow-down': 'el-icon-arrow-right'"></i>{{item.username}}</p></a>
      </el-row>
      <el-row>
        <div class="planeInfo" v-if="item.airlineCompany">
          <el-tooltip content="航空公司" placement="top-start" effect="dark" popper-class="tooltip">
            <el-col :span="4" >{{item.airlineCompany}}</el-col>
          </el-tooltip>
          <el-col :span="1">-</el-col>
          <el-tooltip content="航班号" placement="top-start" effect="dark" popper-class="tooltip">
            <el-col :span="4">{{item.flightNumber}}</el-col>
          </el-tooltip>
          <el-col :span="1">-</el-col>
          <el-tooltip content="机型" placement="top-start" effect="dark" popper-class="tooltip">
            <el-col :span="4">{{item.planeType}}</el-col>
          </el-tooltip>
          <el-col :span="1">-</el-col>
          <el-tooltip content="舱种" placement="top-start" effect="dark" popper-class="tooltip">
            <el-col :span="5">{{item.classType}}</el-col>
          </el-tooltip>
        </div>
      </el-row>
      <el-row class="startTime">
        <span>出发时间：</span>
        <span class="planeInfo">{{item.startTime | dateFilter}}</span>
      </el-row>
    </div>
    <el-row v-if="item._openDetail" :id="key">
      <div class="user_info">
      <UserInfo :item="item" />
      </div>
      <orderDetailComp :rowData="rowData" :item="item" :orderData="orderData"/>
    </el-row>
  </div>
</div>
</template>
<script>
import orderDetailComp from './orderDetailComp'
import UserInfo from '@/components/UserInfo'
export default {
  components: { orderDetailComp, UserInfo },
  props: {
    gridData: {
      type: Array
    },
    rowData: {
      type: Object
    },
    orderData: {
      type: Object
    },
    planeloading: {
      type: Boolean
    }
  },
  filters: {
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
    changeHide (item) {
      this.$set(item, '_openDetail', !item._openDetail)
    }
  }

}
</script>
<style lang="scss" scoped>
.planeComp{
  .user_info{
    padding-left: 26px;
    padding-bottom: 10px;
    background: #fff;
  }
  a{
    color: #606266
  }
  h4{
    padding: 0px 0px 0px 24px;
    color: #909399
  }
  .planeDetail{
    background: #fff;
    padding: 0px 26px 26px 26px;
    position: relative;
    margin-top: 15px;
  .planeInfo{
    color: black;
  }
  .title-type{
    font-size: 20px;
    color: #000000;
    font-family: 'Courier New', Courier, monospace
  }
  .startTime{
    color: gray;
    margin-top: 8px;
  }
  .el-button--warning.is-plain {
    color: #ED6C00;
    border-color: #ED6C00;
    padding: 10px 35px 10px 35px
  }
  .el-icon-arrow-right{
    font-size: 15px;
    margin-left: -20px;
    margin-right: 6px;
  }
  .el-icon-arrow-down{
    font-size: 15px;
    margin-left: -20px;
    margin-right: 6px;
  }
  }
}

</style>
