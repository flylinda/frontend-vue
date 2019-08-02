<template>
  <div v-if="visible" class="vue-dialog" @click="handleMaskClick" ref="vueDialog">
    <div class="vue-dialog-w" @click.stop="stopFn" ref="vueDialogW">
      <div class="vue-dialog-h">
        <div class="vue-dialog-t">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <div aria-label="Close" class="vue-dialog-close" @click="handleMaskClick" ref="vueDialogClose">
          <span class="vue-dialog-close-x">
            <i class="el-icon-close"> </i>
          </span>
        </div>
      </div>
      <div class="vue-dialog-c" ref="vueDialogC">
        <slot></slot>
      </div>
      <div class="vue-dialog-f" v-if="hasFooter">
        <slot name="footer">
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ElDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '700px'
    }
  },
  computed: {
    hasFooter () {
      return this.$slots.footer !== undefined
    }
  },
  watch: {
    visible (val) {
      if (val) {
        setTimeout(() => {
          this.$refs.vueDialog.style.backgroundColor = 'rgba(0,0,0,.4)'
          this.$refs.vueDialogW.style.width = this.width
          this.$refs.vueDialogC.style.opacity = 1
          this.$refs.vueDialogClose.style.opacity = 1
        }, 0)
        // 当打开dialog的时候禁止body的滚动
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'initial'
      }
    }
  },
  mounted () {
    if (this.visible) {
      setTimeout(() => {
        this.$refs.vueDialog.style.backgroundColor = 'rgba(0,0,0,.4)'
        this.$refs.vueDialogW.style.width = this.width
        this.$refs.vueDialogC.style.opacity = 1
        this.$refs.vueDialogClose.style.opacity = 1
      }, 0)
      // 当打开dialog的时候禁止body的滚动
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'initial'
    }
  },
  methods: {
    stopFn () {},
    handleMaskClick () {
      this.$refs.vueDialog.style.backgroundColor = 'rgba(0,0,0,0)'
      this.$refs.vueDialogW.style.width = 0
      this.$refs.vueDialogC.style.opacity = 0
      this.$refs.vueDialogClose.style.opacity = 0
      setTimeout(() => {
        this.$emit('close')
      }, 300)
    }
  }
}
</script>

<style lang="scss">
.vue-dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  // background: rgba($color: #000000, $alpha: 0.4);
  background-color: rgba(0,0,0,0);
  z-index: 1000;
  height: 100%;
  transition: background-color .3s ease;
}
.vue-dialog-close {
    cursor: pointer;
    border: 0;
    position: absolute;
    right: 0;
    top: 0;
    font-weight: 700;
    line-height: 1;
    opacity: 0;
    transition: opacity .3s ease;
}
.vue-dialog-close-x {
    display: block;
    font-style: normal;
    text-align: center;
    text-transform: none;
    text-rendering: auto;
    width: 56px;
    height: 56px;
    line-height: 56px;
    font-size: 16px;
}
.vue-dialog-w {
  width: 0;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  background: #F8F8F9;
  display: flex;
  flex-direction: column;
  transition: width .3s ease;
}
.vue-dialog-h {
  height: 60px;
  padding: 16px 24px;
  border-radius: 4px 4px 0 0;
  background: #fff;
  color: rgba(0, 0, 0, 0.65);
  border-bottom: 1px solid #e8e8e8;
}
.vue-dialog-t{
  margin: 0;
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}
.vue-dialog-c {
  opacity: 0;
  flex: 1;
  overflow: auto;
  font-size: 14px;
  word-wrap: break-word;
  transition: opacity .3s ease;
}
.vue-dialog-f {
    border-top: 1px solid rgb(232, 232, 232);
    padding: 10px 16px;
    text-align: right;
}
</style>
