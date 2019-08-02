<template>
<el-card class="box-card" shadow="never" :body-style="{ padding: '20px',background: '#fff', border: 0 }">
  <div class="title">
    <p class="title-type">机票信息</p>
    <p class="edit" v-if="rowData.auditStatus===4&&rowData.artificial===1" @click="changeEditStatus">编辑</p>
  </div>
  <el-form :model="item" :label-position="labelPosition" ref="item" :rules="rules" label-width="110px" :inline="true" class="demo-form-inline">
    <div class="border-detail">
      <div class="train-title">
        <div class="trainLeft">
          <div class="place-departure">
            <div v-if="isEdit">
              <el-tooltip content="始发地" placement="bottom-start" effect="dark" popper-class="tooltip">
                <el-form-item prop="fromPlaceName">
                  <el-input  v-model.trim="item.fromPlaceName" auto-complete="off" size="mini" style="width: 75%" class="fromPlace"></el-input>
                </el-form-item>
              </el-tooltip>
              <el-form-item class="editicon">
                <i class="el-icon-minus"></i>
              </el-form-item>
              <el-tooltip content="目的地" placement="bottom-start" effect="dark" popper-class="tooltip">
                <el-form-item prop="toPlaceName">
                  <el-input v-model.trim="item.toPlaceName" auto-complete="off" size="mini" style="width: 75%" class="fromPlace"></el-input>
                </el-form-item>
              </el-tooltip>
            </div>
            <div v-else>
            <span>{{item.fromPlaceName}}</span><i class="el-icon-minus"></i><span>{{item.toPlaceName}}</span>
            </div>
          </div>
          <p class="time-departure">{{item.trainDate}}</p>
        </div>
        <div class="trainRight">
          <p class="trainStatus">{{item.status | orderStatusFilter}}</p>
        </div>
      </div>
      <planeTicketDetail :item="item" :rowData="rowData" :orderData="orderData" :seatTypeOptions="seatTypeOptions" :rules="rules" :isEdit="isEdit" ref="planeTicketDetailRef" @editStatus="editStatus" />
    </div>
    <div class="remarks">
        <span>备注：</span>
        <el-form-item v-if="isEdit">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="item.remark" style="width:310%"></el-input>
        </el-form-item>
        <span v-else>{{item.remark}}</span>
    </div>
    <div class="trainbtn" v-if="isEdit">
      <el-button size="small" type="primary" style="margin-left:10px;" round @click="saveInfo(item)">保 存</el-button>
      <el-button size="small" round @click="cancel(item)">取 消</el-button>
    </div>
  </el-form>
</el-card>
</template>

<script>
import planeTicketDetail from './planeTicketDetail'
export default {
  data () {
    return {
      seatTypeOptions: [
        { seatType: 'GJRW', label: '高级软卧' },
        { seatType: 'QTXB', label: '其他' },
        { seatType: 'YDW', label: '一等卧' },
        { seatType: 'EDW', label: '二等卧' },
        { seatType: 'BXYW', label: '包厢硬卧' },
        { seatType: 'YRRB', label: '一人软包' },
        { seatType: 'GJDW', label: '高级动卧' },
        { seatType: 'EDRZ', label: '二等软座' },
        { seatType: 'YDRZ', label: '一等软座' },
        { seatType: 'TDRZ', label: '特等软座' },
        { seatType: 'F', label: '动卧' },
        { seatType: '9', label: '商务座' },
        { seatType: 'P', label: '特等座' },
        { seatType: 'M', label: '一等座' },
        { seatType: 'O', label: '二等座' },
        { seatType: '6', label: '高级软卧' },
        { seatType: '4', label: '软卧' },
        { seatType: '3', label: '硬卧' },
        { seatType: '2', label: '软座' },
        { seatType: '1', label: '硬座' }
      ],
      isEdit: false,
      labelPosition: 'left',
      rules: {
        fromPlaceName: [{ required: true, message: '必填', trigger: 'blur' }],
        toPlaceName: [{ required: true, message: '必填', trigger: 'blur' }]
      },
      itemChild: null
    }
  },
  props: {
    rowData: {
      type: Object
    },
    orderData: {
      type: Object
    },
    item: {
      type: Object
    }
  },
  components: {
    planeTicketDetail
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
  created () {
    this.itemChild = this._.cloneDeep(this.item)
  },
  methods: {
    changeEditStatus () {
      this.isEdit = true
    },
    saveInfo (item) {
      this.itemChild = this._.cloneDeep(item)
      if (this.rowData.auditStatus === 4 && this.rowData.artificial === 1) {
        // 校验表单数据
        let newArr = []
        this.$refs.item.validate((valid) => {
          if (valid) {
            newArr.push(true)
          } else {
            newArr.push(false)
          }
        })
        let flag = newArr.every((val) => {
          return val === true
        })

        if (flag) {
          this.$refs.planeTicketDetailRef.confirm(item)
        } else {
          this.$message({
            type: 'info',
            message: '信息不完整，请您填写信息后再提交哦'
          })
          this.loading = false
        }
      }
    },
    cancel () {
      this.isEdit = false
      this.item = this._.cloneDeep(this.itemChild)
    },
    editStatus () {
      this.isEdit = false
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card{
  .title{
    display: flex;
    justify-content: space-between;
    .title-type{
      font-size: 16px;
    }
    .edit{
      color:#ED6C00;
      cursor: pointer;
    }
  }
  .border-detail{
    border:1px solid  #D8D8D8;
    .train-title{
      display: flex;
      justify-content: space-between;
      padding: 0 30px 0 8px;
      box-sizing: border-box;
      .trainStatus{
        font-size: 17px;
        text-align: center;
      }
    }
    .place-departure{
      margin:15px 15px;
      font-size: 16px;
      .el-icon-minus{
        margin:0 15px;
      }
    }
    .time-departure{
      color:#9B9B9B;
      font-size:15px;
      margin:15px 15px;
    }
  }
  .remarks{
    display: flex;
    margin:20px 0;
    span{
      margin-right:20px;
    }
  }
  .trainbtn{
    width:30%;
    margin:0 auto;
    display: flex;
    justify-content: space-around;
  }
}
.el-button--warning.is-plain {
    color: #ED6C00;
    border-color: #ED6C00;
    padding: 10px 35px 10px 35px
}
/deep/.el-form-item__content{
  line-height:0;
}
/deep/ .editicon{
  margin-top:8px;
  margin-left: -39px;
}
</style>
