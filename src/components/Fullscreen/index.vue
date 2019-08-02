<template>
  <div class="full-screen-btn-con">
    <Tooltip :content="value ? '退出全屏' : '全屏'" placement="bottom">
      <Icon @click.native="handleChange" :type="value ? 'android-contract' : 'android-expand'" :size="23"></Icon>
    </Tooltip>
  </div>
</template>

<script>
import Util from '@/utils'

export default {
  name: 'Fullscreen',
  //   computed: {
  //     showFullScreenBtn () {
  //       return window.navigator.userAgent.indexOf('MSIE') < 0
  //     }
  //   },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    fullscreenObj: HTMLDivElement,
  },
  methods: {
    handleFullscreen () {
      let main = document.body
      Util.toggleClass(main, 'full-screen')
      if (this.fullscreenObj) {
        Util.toggleClass(this.fullscreenObj, 'full-screen-obj')
      }
      this.$emit('input', !this.value)
      this.$emit('on-change', !this.value)
    },
    handleChange () {
      this.handleFullscreen()
    },
  },
}
</script>

<style lang="less">
.full-screen-btn-con {
    display: inline-block;
    margin-right: 10px;
    vertical-align: top;
    .ivu-tooltip-rel {
        height: 33px;
        line-height: 40px;
        i{
            cursor: pointer;
        }
    }
}
</style>
