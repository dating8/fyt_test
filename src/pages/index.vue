<template>
  <div class="tabBox">
    <div class="pullBox">
      <pull-down :list="dplist" currKey="name" :defaultIndex="idx" v-model="city"></pull-down>
      <pull-down :list="dplist1" v-model="city1"></pull-down>
    </div>
  </div>
</template>

<script>
import PullDown from 'src/components/PullDown'
export default {
  components: {
    PullDown
  },
  data () {
    return {
      city: {},
      idx: 1,
      dplist: [{
        id: 0,
        name: '不限'
      }, {
        id: 1,
        name: '茂名'
      }, {
        id: 2,
        name: '阳江'
      }, {
        id: 3,
        name: '肇庆'
      }],
      city1: {},
      dplist1: [{
        id: 0,
        value: '不限'
      }, {
        id: 1,
        value: '茂名1'
      }, {
        id: 2,
        value: '阳江1'
      }, {
        id: 3,
        value: '肇庆1'
      }]
    }
  }
}
</script>

<style lang="less">
  .info {
    margin-left: 50px;
    font-size: 30px;
  }
</style>
