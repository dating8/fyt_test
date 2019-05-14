<template>
  <div class="tab">
    <div class="item" v-for="(item, i) in currOptions" :class="item | tabItemClass" :key="i" @click="onTabSelect(item)">{{item.text}}</div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String
    },
    options: {
      type: Array
    }
  },
  data () {
    return {
      // 拷贝一个value
      currValue: this.value,
      currOptions: []
    }
  },
  mounted () {
    this.initOptions()
  },
  methods: {
    initOptions () {
      // 拷贝一个options
      this.currOptions = this.options.map(item => {
        return {
          ...item,
          active: item.value === this.currValue,
          disabled: !!item.disabled
        }
      })
    },
    // 添加选中事件
    onTabSelect (item) {
      if (item.disabled) return
      this.currOptions.forEach(obj => {
        obj.active = false
      })
      item.active = true
      this.currValue = item.value
      // 发布input事件，父组件如果有v-model就会监听到
      this.$emit('input', this.currValue)
    }
  },
  filters: {
    tabItemClass (item) {
      let classList = []
      if (item.active) classList.push('active')
      if (item.disabled) classList.push('disabled')
      return classList.join('')
    }
  },
  watch: {
    options () {
      this.initOptions()
    },
    value (value) {
      this.currValue = value
    }
  }
}
</script>

<style lang="less" scoped>
  .tab {
  @borderColor: #ddd;
  @radius: 5px;
  width: 100%;
  margin: 50px;
  overflow: hidden;
  position: relative;
  .item {
    padding: 10px 50px;
    border-top: 1px solid @borderColor;
    border-left: 1px solid @borderColor;
    border-bottom: 1px solid @borderColor;
    font-size: 30px;
    background-color: #fff;
    float: left;
    user-select: none;
    cursor: pointer;
    transition: 300ms;
    &:first-child {
      border-top-left-radius: @radius;
      border-bottom-left-radius: @radius;
    }
    &:last-child {
      border-right: 1px solid @borderColor;
      border-top-right-radius: @radius;
      border-bottom-right-radius: @radius;
    }
    &.active {
      color: #fff;
      background-color: red;
    }
    &:hover {
      color: #fff;
      background-color: #f06;
    }
    &.disabled {
      color: #fff;
      background-color: pink;
      cursor: no-drop;
    }
  }
  }
</style>
