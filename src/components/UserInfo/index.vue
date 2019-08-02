<template>
  <div class="user">
    <div class="section singleLine">
      <div class="left">手机：</div>
      <div class="right">{{item.userMobile}}</div>
    </div>
    <div class="section singleLine">
      <div class="left">证件号：</div>
      <div class="right">{{item.certificateNo}}</div>
    </div>
    <div class="section singleLine">
      <div class="left">证件类型：</div>
      <div class="right">{{item.certificateType | certificateTypeFilter}}</div>
    </div>
    <div class="section doubleLine">
        <div class="left">所属部门：</div>
        <div class="right">{{item.userDepartment}}</div>
    </div>
    <div class="section doubleLine">
        <div class="left">客户类型：</div>
        <div class="right">{{item.userType | userTypeFilter}}</div>
    </div>
    <div class="section doubleLine">
      <div class="left titleWidth">第三方订单号：</div>
      <div class="right">{{item.thirdOrderNo}}</div>
    </div>
    <div class="section doubleLine">
        <div class="left titleWidth">第三方订单状态：</div>
        <div class="right">{{item.thirdOrderStatus}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  props: {
    item: {
      type: Object
    }
  },
  filters: {
    // 证件类型
    certificateTypeFilter (status) {
      const statusMap = {
        '1': '二代身份证',
        '2': '一代身份证',
        'C': '港澳通行证',
        'B': '护照',
        'G': '台湾通行证',
        'H': '外国人永久居留身份证'
      }
      return statusMap[status]
    },
    // 客户类型
    userTypeFilter (status) {
      const statusMap = {
        0: 'hr系统用户',
        1: '磐石系统公司外部人员'
      }
      return statusMap[status]
    }
  }
}
</script>

<style lang="scss" scoped>
.user{
  display: flex;
  flex-wrap: wrap;
  .singleLine{
    width: 700px;
  }
  .doubleLine{
    width: 330px;
  }
  .titleWidth{
    width: 115px !important;
  }
  .section{
    display: flex;
    margin-bottom: 8px;
    .left{
      width: 115px;
      text-align: left;
      margin-right: 10px;
      color: #676767;
    }
    .right{
      color: #000000
    }
  }
}
</style>
