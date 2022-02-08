<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <a-spin :spinning="spinning"  v-if="spinning" class="app-load" tip="页面加载中...">
      </a-spin>
      <Layout v-else />
    </a-config-provider>
  </div>
</template>

<script>
import Layout from './layout'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
  components: {
    Layout
  },
  data () {
    return {
      locale: zhCN
    }
  },
  computed: {
    spinning () {
      return this.$store.state.app.flag
    }
  },
  created () {
    Window.global = process.env
  }
}
</script>

<style lang="less">
@import url('./css/global.less');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  // border: 1px solid red;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #fff;
  margin-top: 0px !important;
}

</style>
