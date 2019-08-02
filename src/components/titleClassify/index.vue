<template>
  <div class="title-classify">
    <div class="tc-left">
      <span class="text">{{title}}</span>
      <span></span>
    </div>
    <div class="tc-right">
      <div class="tcr-div" v-for="(item,index)  in titleContext" :key="index">
        <div class="title">{{ item.title }}</div>
        <div class="count">{{ item.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    titleContext: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data () {
    return {
      titleContext1: [
        {
          title: '正式',
          count: 179,
        },
        {
          title: '试用',
          count: 79,
        },
        {
          title: '兼职',
          count: 39,
        },
        {
          title: '外包',
          count: 50,
        },
      ],
    }
  },
  methods: {

  },
}
</script>

<style lang="scss" scoped>
.title-classify{
  display: flex;
  justify-content: space-around;
  align-items: center;
  .tc-left{
    .text{
      width: 96px;
      height: 22px;
      font-family: PingFangSC;
      font-size: 16px;
      font-weight: 500;
      color: #212121;
    }
  }
  .tc-right{
    // width: 320px;
    height: 32px;
    border-radius: 4px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    .tcr-div{
      // width: 25%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid #f1f2f3;
      .title{
        // width: 24px;
        font-family: PingFangSC;
        font-size: 12px;
        font-weight: 500;
        color: #212121;
        margin-right: 4px;
        padding: 0 10px;
      }
      .count{
        font-family: TrebuchetMS;
        font-size: 12px;
        color: #999999;
        margin-right: 10px;
      }
    }
  }
}
</style>
