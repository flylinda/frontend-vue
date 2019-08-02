<template>
  <el-select size="small" v-model="nowSelected" placeholder="请选择" @change="handelChange">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    options: {
      type: Array
    },
    nowSelect: {}
  },
  data () {
    return {
      nowSelected: this.nowSelect
    }
  },
  methods: {
    handelChange (val) {
      this.$emit('selectChange', { val })
    }
  }
}
</script>
