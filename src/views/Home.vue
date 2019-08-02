<template>
  <div>
     <Row>
      <Button type="warning" size="small" style="margin-left: 5px" shape="circle" @click="add()">添加</Button>
    </Row>
    <br/>
    <Row>
      <Table border :columns="columns12" :data="data6">
          <template slot-scope="{ row }" slot="name">
              <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
              <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
              <Button type="error" size="small" @click="remove(index)">删除</Button>
          </template>
      </Table>
    </Row>

    <!-- 点击添加按钮时，显示的对话框 -->
    <Modal
        v-model="modal1"
        title="添加"
        @on-ok="ok"
        @on-cancel="cancel">
        <Form :model="formItem" :label-width="80">
          <FormItem label="姓名">
              <Input v-model="formItem.name" placeholder="请输入姓名" />
          </FormItem>
          <FormItem label="年龄">
              <Input v-model="formItem.age" placeholder="请输入年龄" />
          </FormItem>
          <FormItem label="住址">
              <Input v-model="formItem.address" placeholder="请输入住址" />
          </FormItem>
        </Form>
    </Modal>

  </div>
</template>
<script>
// 前后端交互使用axios
// import axios from 'axios'
export default {
  data () {
    return {
      // 表格表头
      columns12: [
        {
          title: '姓名',
          slot: 'name'
        },
        {
          title: '年龄',
          key: 'age'
        },
        {
          title: '住址',
          key: 'address'
        },
        {
          title: '操作列',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      // 表格每列的具体数据
      data6: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park'
        }
      ],
      // 当点击添加的时候，对话框显示，默认不显示为false
      modal1: false,
      // 添加的表单数据
      formItem: {
        name: '',
        age: '',
        address: ''
      }
    }
  },
  methods: {
    // 查看
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
      })
    },
    // 删除
    remove (index) {
      this.data6.splice(index, 1)
    },
    // 添加
    add () {
      this.modal1 = true
    },
    // 添加弹出的对话框-点击确认按钮走的方法
    ok () {
      // 目前的所有数据都是模拟的---------------start----------------
      this.data6.push({
        name: this.formItem.name,
        age: this.formItem.age,
        address: this.formItem.address
      })
      // 目前的所有数据都是模拟的---------------end----------------
      // 前后端交互---------start--------------------------------
      // 一般添加的方法是post请求，需要传递参数body
      // 在这个例子中，body是this.formItem
      // 接下来进行前后端交互，以下是交互代码
      // axios({
      //   // 请求方式：get、post、put、delete
      //   method: 'post',
      //   // 后端接口url
      //   url: '',
      //   // 传递的参数
      //   data: this.formItem
      // }).then(res => {
      //   // res是前后端交互的结果
      //   console.log(res)
      // }).catch(function (error) {
      //   // 当交互失败时，捕捉到的错误
      //   console.log(error)
      // })
      // 前后端交互---------end--------------------------------
    },
    // 添加弹出的对话框-点击取消按钮走的方法
    cancel () {
      this.$Message.info('Clicked cancel')
    }
  }
}
</script>
