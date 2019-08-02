<template>
  <el-dialog title="删除" :visible.sync="visible" ref="ruleForm" width="550px" :close-on-click-modal="false" @close="handelCancel" append-to-body>
    <div>{{`确认删除【${name ? name : ''}】？`}}</div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handelCancel" size="small">取消</el-button>
      <el-button type="primary" @click="handelDelete('all')" size="small">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      obj: null,
      name: null,
    }
  },
  methods: {
    showDialog (name, obj) {
      this.visible = true
      this.name = name
      this.obj = obj
    },
    handelCancel () {
      this.visible = false
    },
    handelDelete () {
      this.$emit('handelDeleteData', this.obj)
    },
  },
}
</script>
