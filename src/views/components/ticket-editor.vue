<template>
  <div class="ticket-editor">
    <el-form class="train" ref="editTicket" :model="editTicket" :rules="rules">

      <el-form-item label="起飞机场：" prop="fromPlaceAirport">
        <el-input v-model.trim="editTicket.fromPlaceAirport"></el-input>
      </el-form-item>
      <el-form-item label="到达机场：" prop="toPlaceAirport">
        <el-input v-model.trim="editTicket.toPlaceAirport"></el-input>
      </el-form-item>
      <el-form-item label="出发地：" prop="fromPlaceName">
        <el-input v-model.trim="editTicket.fromPlaceName"></el-input>
      </el-form-item>
      <el-form-item label="目的地：" prop="toPlaceName">
        <el-input v-model.trim="editTicket.toPlaceName"></el-input>
      </el-form-item>
      <el-form-item label="航空公司：" prop="airlineCompany">
        <el-input v-model.trim="editTicket.airlineCompany"></el-input>
      </el-form-item>
      <el-form-item prop="flightNumber" label="航班号：">
        <el-input v-model.trim="editTicket.flightNumber"></el-input>
      </el-form-item>
      <el-form-item label="机型：" prop="planeType">
        <el-input v-model.trim="editTicket.planeType"></el-input>
      </el-form-item>
      <el-form-item label="舱种：" prop="classType">
        <el-input v-model.trim="editTicket.classType"></el-input>
      </el-form-item>
      <el-row class="time" :gutter="14">
        <el-col :span="24">
          <el-form-item prop="startTime" label="起飞时间">
            <el-date-picker type="datetime" placeholder="起飞时间" v-model="editTicket.startTime" style="width: 100%;" :picker-options="pickerOptions" :default-value="new Date()"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="arriveTime" label="到达时间">
            <el-date-picker type="datetime" placeholder="到达时间" v-model="editTicket.arriveTime" style="width: 100%;" :picker-options="pickerOptions" :default-value="new Date()" @blur="onHandleEndDateBlur"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="运行时间：" prop="spendTime" class="spendTimeStyle">
        {{timeStamp(editTicket.startTime,editTicket.arriveTime)}}
      </el-form-item>
      <el-form-item label="备注：">
        <el-input type="textarea" v-model="editTicket.remark"></el-input>
      </el-form-item>
      <el-form-item>
      <el-button type="primary" :loading="loading" @click.stop="onSubmit('editTicket')" class="left">保存</el-button>
      <el-button class="right" @click.stop="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updateArtificialOrderPlaneTicket } from '../../api/order'

export default {
  name: 'TrainTicketEditor',
  props: {
    ticket: {
      type: Object,
      default: () => {}
    },
    orderData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      editTicket: null,
      rules: {
        fromPlaceAirport: [{ required: true, message: '必填', trigger: 'blur' }],
        toPlaceAirport: [{ required: true, message: '必填', trigger: 'blur' }],
        airlineCompany: [{ required: true, message: '必填', trigger: 'blur' }],
        flightNumber: [{ required: true, message: '必填', trigger: 'blur' }],
        fromPlaceName: [{ required: true, message: '必填', trigger: 'blur' }],
        toPlaceName: [{ required: true, message: '必填', trigger: 'blur' }],
        planeType: [{ required: true, message: '必填', trigger: 'blur' }],
        classType: [{ required: true, message: '必填', trigger: 'blur' }],
        startTime: [{ required: true, message: '必填', trigger: 'change' }],
        arriveTime: [{ required: true, message: '必填', trigger: 'change' }]
      },
      loading: false,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      }
    }
  },
  watch: {
    ticket (val) {
      this.editTicket = this._.cloneDeep(val)
    }
  },
  created () {
    this.editTicket = this._.cloneDeep(this.ticket)
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
    },
    onHandleEndDateBlur () {
      if (this.editTicket.arriveTime <= this.editTicket.startTime) {
        this.$message({
          type: 'warning',
          message: '到达时间不能早于或等于起飞时间'
        })
        return false
      }
      return true
    },
    checkSpendTime () {
      this.editTicket.spendTime = parseInt((this.editTicket.arriveTime - this.editTicket.startTime) / 1000 / 60)
      if (this.editTicket.spendTime === 0 || this.editTicket.spendTime === null) {
        return false
      }
      return true
    },
    onSubmit (item) {
      this.loading = true
      this.checkForm(item)
    },
    onCancel () {
      this.$emit('cancel')
      this.$emit('hideEditPanel')
    },
    checkForm (item) {
      // 校验表单数据
      this.$refs[item].validate((valid) => {
        if (valid) {
          if (this.onHandleEndDateBlur()) {
            if (this.checkSpendTime()) {
              this.commitInfo()
            } else {
              this.loading = false
              this.$message({
                type: 'warning',
                message: '运行时间不能为空哦'
              })
            }
          } else {
            this.loading = false
            this.$message({
              type: 'warning',
              message: '到达时间不能早于或等于起飞时间'
            })
          }
        } else {
          this.loading = false
          this.$message({
            type: 'info',
            message: '信息不完整，请您填写信息后再提交哦'
          })
        }
      })
    },
    commitInfo () {
      let planeTicketParamsArray = []
      this.editTicket.startTime = (new Date(this.editTicket.startTime).getTime())
      this.editTicket.arriveTime = (new Date(this.editTicket.arriveTime).getTime())
      this.editTicket.spendTime = parseInt((this.editTicket.arriveTime - this.editTicket.startTime) / 1000 / 60)
      this.editTicket.status = 200
      planeTicketParamsArray.push(this.editTicket)
      let body = {
        id: this.orderData.id,
        innerOrderNo: this.orderData.innerOrderNo,
        remark: this.orderData.remark,
        planeTicketParamsList: planeTicketParamsArray
      }
      updateArtificialOrderPlaneTicket(body).then(
        (res) => {
          if (res.isSuccess) {
            this.$message({
              type: 'success',
              message: res.resultMsg
            })
            this.$emit('ok')
            this.$emit('editStatus')
          }
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.train {
  margin-top: 15px;
  width: 536px;
  .line {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
  }
  .left {
    margin-left: 78px;
    margin-right: 40px;
    width: 92px;
    border-radius: 20px;
    vertical-align: middle;
  }
  .right {
    width: 92px;
    border-radius: 20px;
    vertical-align: middle;
  }

  /deep/ .el-input__inner {
    color: #000000;
  }

  /deep/ .el-textarea__inner {
    color: #000000;
    height: 100px;
  }

  /deep/ .el-form-item__label {
    width: 115px !important;
    text-align: left;
    margin-right: 10px;
    color: #676767;
    font-weight: 400;
  }

  /deep/ .el-form-item__content {
    margin-left: 125px !important;
  }

  /deep/ .el-button {
    font-weight: 400;
    padding: 8px 20px;
  }

  /deep/ .el-input--suffix .el-input__inner {
    padding-right: 24px;
  }
}
</style>
