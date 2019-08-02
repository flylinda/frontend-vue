<template>
  <div class="search-multiple">
    <div class="sm-left" @click="controlSearch">
      <span class="iconfont icon-guolv first"></span>
      <span class="iconfont icon-below-s second"></span>
    </div>
    <div class="sm-right">
      <el-input size="mini" v-model="input" placeholder="请输入内容">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 控制复杂框显示隐藏
      controlSearchShow: false,
      input: '',
    }
  },
  methods: {
    controlSearch () {
      this.controlSearchShow = !this.controlSearchShow
      this.$emit('controlSearchShow', this.controlSearchShow)
      if (this.controlSearchShow) {
        this.$emit('changeTableHeight', document.body.clientHeight - 344)
      } else {
        setTimeout(() => {
          this.$emit('changeTableHeight', document.body.clientHeight - 200)
        }, 500)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.search-multiple{
  display: flex;
  justify-content: space-around;
  align-items: center;
  .sm-left{
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 32px;
    border-radius: 16px;
    background-color: #ffffff;
    margin-right: 16px;
    .first{
      font-size: 24px;
    }
    .second{
      font-size: 10px;
    }
  }
  .sm-right{
   input{
     width: 40%;
   }
  }
}
</style>
