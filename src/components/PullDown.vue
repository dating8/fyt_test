<template>
  <div class="pullDown">
    <div class="pullDown_input" @click="spread = !spread">
      <input type="text" readonly :value="value[currKey]">
      <span class="triangle"></span>
    </div>
    <transition name="offsetY">
      <div class="pullDown_list" v-show="spread">
        <ul>
          <li v-for="(item,index) in list" :key="index" @click="getListItem(item)">{{item[currKey]}}</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      spread: false
    }
  },
  props: {
    // 选择的值
    value: {
      type: Object
    },
    // 自定义的键,如果没有定义默认value作为键
    currKey: {
      type: String,
      default: 'value'
    },
    // 渲染的列表
    list: {
      type: Array
    },
    // 初始化显示的数组列表下标，如果没有定义默认第一个
    defaultIndex: {
      type: Number,
      default: 0
    }
  },
  mounted () {
    // 初始化数组里第一个对象
    this.$emit('input', this.list[this.defaultIndex])
  },
  methods: {
    // 添加选中事件
    getListItem (item) {
      // 发布input事件，父组件如果有v-model就会监听到
      this.$emit('input', item)
      this.spread = !this.spread
    }
  },
  watch: {
    value (value) {
      this.value = value
    }
  }
}
</script>
<style lang="less" scoped>
  @theme:#6a82fc;
  @inputHeight:40px;
  @shadow:0px 0px 10px #e9e9e9;
  @borderRadius:5px;
  .pullDown{
    display: inline-block;
    position: relative;
    z-index: 2;
    // ↓↓↓↓↓↓↓↓↓↓ 下拉栏输入框
    .pullDown_input{
      height: @inputHeight;
      width: 220px;
      box-sizing: border-box;
      position: relative;
      display: inline-block;
      box-shadow:@shadow;
      border-radius:@borderRadius;
      position: relative;
      z-index: 2;
      input{
        width: 100%;
        height: 100%;
        border: none;
        cursor: pointer;
        outline: none;
        text-indent: 10px;
      }
    }
    // ↑↑↑↑↑↑↑↑↑↑ 下拉栏输入框

    // ↓↓↓↓↓↓↓↓↓↓ 下拉列表
    .pullDown_list{
      position: absolute;
      top: @inputHeight+10;
      min-width: 100%;
      box-sizing: border-box;
      box-shadow:@shadow;
      border-radius:@borderRadius;
      overflow: hidden;
      z-index: 1;
      li{
        line-height: 30px;
        padding:5px 10px;
        cursor: pointer;
        background: white;
        &:hover{
          background: @theme;
          color: white;
        }
      }
    }
    // ↑↑↑↑↑↑↑↑↑↑ 下拉列表

    // ↓↓↓↓↓↓↓↓↓↓ 三角形
    .triangle{
      position: absolute;
      top: 0px;right: 10px;bottom: 0px;margin: auto;
      z-index: 1;
      width: 0;
      height: 0;
      border-style: solid;
      display: inline-block;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      cursor: pointer;
      vertical-align: middle;
      letter-spacing: 0px;
      // margin-right: 2px;
      border-color:@theme transparent transparent  transparent;
      border-width: 9px 7px 0px 7px;
    }
    // ↑↑↑↑↑↑↑↑↑↑ 三角形
  }

  .offsetY-enter-active,.offsetY-leave-active{
    transition: all ease 0.3s;
  }
  .offsetY-enter,.offsetY-leave-to{
    opacity: 0;
    transform:translateY(-20px)
  }
  .offsetY-enter-to,.offsetY-leave{
    transform:translateY(0px);
    opacity: 1
  }
</style>
