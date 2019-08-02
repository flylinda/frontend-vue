<template>
  <div class="search-multiple-all">
    <div class="sm-triangle"></div>
    <div class="sm-top text-width">
      <div>
        <el-select size="mini" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-time-select
          size="mini"
          v-model="value"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30'
          }"
          placeholder="选择时间">
        </el-time-select>
      </div>
    </div>
    <div class="sm-bottom text-width">
      <el-button size="mini">取消</el-button>
      <el-button size="mini" type="primary">筛选</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {

  },
}
</script>

<style lang="scss" scoped>
.search-multiple-all{
  width: 100%;
  height: 128px;
  border-radius: 4px;
  background-color: #ffffff;
  .sm-triangle{
    position: absolute;
    top: 62px;
    right: 228px;
    border:20px solid transparent;
    border-bottom: 20px solid #fff;
    border-top: none;
  }
  .sm-top{
    display: flex;
    align-items: center;
    height: 50%;
    div{
      margin-right: 16px;
    }
  }
  .sm-bottom{
    text-align: center;
    line-height: 64px;
    border-top: 1px solid #f1f2f3;
  }
  .text-width{
    width: 96%;
    margin: auto;
  }
}
</style>
