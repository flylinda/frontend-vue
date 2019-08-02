<template>
<div class="haurJX" id="u-trips">
    <div class="lbRuvc">
      <div class="fnbOBK">
      <el-form :model="itemChild" :label-position="labelPosition" :rules="rules" ref="itemChild" label-width="110px" :inline="true" class="demo-form-inline">
        <div class="iMXjWL">
          <el-tooltip :content="isEdit ? '出发时间': ''" :value="isEdit?true:false" :placement="isEdit ? 'top-start' : 'null'" effect="dark" popper-class="tooltip">
            <el-form-item prop="startTime">
              <el-date-picker
                v-model="itemChild.startTime"
                style="width:100%;"
                prefix-icon="none"
                clear-icon="none"
                type="datetime">
              </el-date-picker>
            </el-form-item>
          </el-tooltip>
          <div class="place" :style="isEdit ? 'pointer-events:none':'pointer-events:unset'">
            <strong class="eEQXzb">{{itemChild.startTime | hoursFilter}}</strong>
            <p class="bouuM">{{itemChild.startTime | dateFilter}}</p>
          </div>
        </div>
        <div class="iMXjWL">
          <el-tooltip :content="isEdit ? '到站时间': ''" :placement="isEdit ? 'top-start' : 'null'" effect="dark" popper-class="tooltip">
            <el-form-item prop="arriveTime">
              <el-date-picker
                v-model="itemChild.arriveTime"
                style="width:100%;"
                prefix-icon="none"
                clear-icon="none"
                type="datetime">
              </el-date-picker>
            </el-form-item>
          </el-tooltip>
          <div class="place" :style="isEdit ? 'pointer-events:none':'pointer-events:unset'">
            <strong class="eEQXzb">{{itemChild.arriveTime | hoursFilter}}</strong>
            <p class="bouuM">{{itemChild.arriveTime | dateFilter}}</p>
          </div>
        </div>
      </el-form>
      </div>
      <div v-if="isEdit" class="fnbRigtwo">
      <el-form  :model="itemChild" :label-position="labelPosition" :rules="rules" ref="itemChild" label-width="110px" :inline="true" class="demo-form-inline">
        <el-tooltip content="出发机场" placement="top-start" effect="dark" popper-class="tooltip">
          <el-form-item prop="fromPlaceAirport">
            <el-input v-model.trim="itemChild.fromPlaceAirport" auto-complete="off" size="mini" style="width: 70%" class="fromPlace"></el-input>
          </el-form-item>
        </el-tooltip>
        <div class="detailCon">
          <el-tooltip content="航空公司" placement="top-start" effect="dark" popper-class="tooltip">
            <el-form-item prop="airlineCompany">
                <el-input placeholder="航空公司" v-model.trim="itemChild.airlineCompany" auto-complete="off" size="mini" style="width: 110%"></el-input>
            </el-form-item>
          </el-tooltip>
          <el-tooltip content="航班号" placement="top-start" effect="dark" popper-class="tooltip">
            <el-form-item prop="flightNumber">
              <el-input placeholder="航班号" v-model.trim="itemChild.flightNumber" auto-complete="off" size="mini" style="width: 110%;"></el-input>
            </el-form-item>
          </el-tooltip>
          <el-tooltip content="机型" placement="top-start" effect="dark" popper-class="tooltip">
             <el-form-item prop="planeType">
              <el-input placeholder="机型" v-model.trim="itemChild.planeType" auto-complete="off" size="mini" style="width: 110%;"></el-input>
             </el-form-item>
          </el-tooltip>
          <el-tooltip content="舱种" placement="top-start" effect="dark" popper-class="tooltip">
              <el-form-item prop="classType">
                <el-input placeholder="舱种" v-model.trim="itemChild.classType" auto-complete="off" size="mini" style="width: 110%;"></el-input>
              </el-form-item>
          </el-tooltip>
          <el-tooltip content="历时" placement="top-start" effect="dark" popper-class="tooltip">
              <el-form-item prop="spendTime">
                <el-input placeholder="历时" v-model.trim="itemChild.spendTime" auto-complete="off" size="mini" style="width: 110%;"></el-input>
              </el-form-item>
          </el-tooltip>
        </div>
        <el-tooltip content="到达机场" placement="top-start" effect="dark" popper-class="tooltip">
          <el-form-item prop="toPlaceAirport">
            <el-input v-model.trim="itemChild.toPlaceAirport" auto-complete="off" size="mini" style="width: 70%" class="toPlace"></el-input>
          </el-form-item>
        </el-tooltip>
      </el-form>
      </div>
      <div v-else class="fnbRig">
        <p class="fromPlace">{{itemChild.fromPlaceAirport}}</p>
        <div class="detailCon">
          <div class="trainType">
            <p>
              <span>{{itemChild.airlineCompany}}</span>
              <span>{{itemChild.flightNumber}}</span>
            </p>
            <p class="specific">
              <span>{{itemChild.planeType}}</span>
              <span>{{itemChild.classType}}</span>
            </p>
          </div>
          <div class="trainTime">
            <p>
              <span>{{itemChild.spendTime}}分钟</span>
            </p>
            <p class="specific">旅途时长</p>
          </div>
        </div>
        <p class="toPlace">{{itemChild.toPlaceAirport}}</p>
      </div>
    </div>

</div>
</template>

<script>
import { updateArtificialOrderPlaneTicket } from '../../api/order'
export default {
  data () {
    return {
      rules: {
        fromPlaceAirport: [{ required: true, message: '必填', trigger: 'blur' }],
        toPlaceAirport: [{ required: true, message: '必填', trigger: 'blur' }],
        airlineCompany: [{ required: true, message: '必填', trigger: 'blur' }],
        flightNumber: [{ required: true, message: '必填', trigger: 'blur' }],
        fromPlaceName: [{ required: true, message: '必填', trigger: 'blur' }],
        toPlaceName: [{ required: true, message: '必填', trigger: 'blur' }],
        planeType: [{ required: true, message: '必填', trigger: 'blur' }],
        classType: [{ required: true, message: '必填', trigger: 'blur' }],
        startTime: [{ required: true, message: '必填', trigger: 'blur' }],
        arriveTime: [{ required: true, message: '必填', trigger: 'blur' }],
        spendTime: [{ required: true, message: '必填', trigger: 'blur' }]
      },
      labelPosition: 'left',
      itemChild: null
    }
  },
  props: {
    item: {
      type: Object
    },
    rowData: {
      type: Object
    },
    orderData: {
      type: Object
    },
    isEdit: {
      type: Boolean,
      default: false
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
      return year + '-' + month + '-' + day
    },
    // 时间戳转换
    hoursFilter (time) {
      if (!time) return ''
      let date = new Date(time)
      let hour = date.getHours()
      hour = hour < 10 ? ('0' + hour) : hour
      let minute = date.getMinutes()
      minute = minute < 10 ? ('0' + minute) : minute
      return hour + ':' + minute
    }
  },
  watch: {
    item (val) {
      this.itemChild = val
    }
  },
  created () {
    this.itemChild = this.item
  },
  methods: {
    confirm () {
      if (this.rowData.auditStatus === 4 && this.rowData.artificial === 1) {
        // 校验表单数据
        let newArr = []
        this.$refs.itemChild.validate((valid) => {
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
          this.commitInfo()
        } else {
          this.$message({
            type: 'info',
            message: '信息不完整，请您填写信息后再提交哦'
          })
          this.loading = false
        }
      } else {
        this.commitInfo()
      }
    },
    commitInfo () {
      let planeTicketParamsArray = []
      this.itemChild.startTime = (new Date(this.itemChild.startTime).getTime())
      this.itemChild.arriveTime = (new Date(this.itemChild.arriveTime).getTime())
      planeTicketParamsArray.push(this.itemChild)
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
            this.$emit('editStatus')
          }
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.haurJX {
    margin-bottom: 16px;
    border-radius: 8px;
}
.lbRuvc {
    position: relative;
    padding: 0 15px;
    display:flex;
    margin:15px 0;
}

.fnbOBK {
    display: inline-block;
    padding-left: 3px;
    position: relative;
    margin-left: 3px;
    width: 19%;
    .iMXjWL {
      position: relative;
      font-size: 14px;
      /deep/ .el-input__inner{
        border: none;
        position: relative;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 50%;
        height: 70px;
        opacity: 0;
      }
      .place{
        pointer-events: none;
        position: absolute;
        top: 2px;
        .eEQXzb {
          margin: 0 0 0 2px;
          width: 40px;
          font-size:17px;
          color: rgb(51, 51, 51);
        }
      }
    }
    .bfhTpq {
      margin:15px 0;
      color: rgb(153, 153, 153);
      span{
        display: block;
      }
    }
    /deep/ .el-input__inner{
      padding-right: 0px;
      padding-left: 0px;
    }
}
.fnbOBK::after{
  content: "";
  position: absolute;
  top: 14px;
  left: 91px;
  bottom: 89px;
  border-left: 2px solid #D8D8D8;
}
.fnbRig{
  width: 70%;
  margin-top:-10px;
  .toPlace,.fromPlace{
    color:#565450;
  }
  .detailCon{
    display: flex;
    flex:1;
    align-items: center;
    justify-content: space-around;
    border-radius: 10px;
    color:#565450;
    font-size: 14px;
    padding:28px 5px;
    .trainType,.trainTime{
      .specific{
        font-size: 12px;
        color:#9B9B9B;
        span:last-child{
          margin:0 0 0 10px;
        }
      }
    }
    .trainType::after{
      content: "";
      position: absolute;
      top: 77px;
      left: 365px;
      bottom: 142px;
      border-left: 1px solid #D8D8D8;
    }
  }
}
.fnbRigtwo{
  width: 60%;
  height: 221px;
  display: flex;
  flex-direction: column;
  margin-top:3px;
  .toPlace,.fromPlace{
    color:#565450;
  }
  .detailCon{
    display: flex;
    flex:1;
    align-items: center;
    border-radius: 10px;
    color:#565450;
    font-size: 14px;
    padding:27px 5px;
  }
}
.iMXjWL:first-child {
  padding:0 0 53px 0;
}
.iMXjWL:last-child {
  margin-top: 26px;
}
.bouuM{
  margin:4px 0 0 2px;
  color:#666;
  font-size: 12px;
}
.iMXjWL::after {
    content: "";
    width: 12px;
    height: 12px;
    position: absolute;
    left: 83px;
    top: 2px;
    border-width: 2px;
    border-style: solid;
    border-color: #D8D8D8;
    -o-border-image: initial;
    border-image: initial;
    border-radius: 50%;
}
</style>
