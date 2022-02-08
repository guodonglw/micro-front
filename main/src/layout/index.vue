<template>
  <div class="container">
    <section class="left">
      <a-menu
        :default-selected-keys="['1']"
        :selectedKeys="[$route.path]"
        mode="inline"
        theme="dark"
        :inline-collapsed="collapsed"
      >
        <template v-for="item in menus">
          <a-menu-item :key="item.path" @click="open(item)">
            <a-icon type="folder" />
            <span>{{item.name}}</span>
          </a-menu-item>
        </template>
      </a-menu>
    </section>

    <section class="right">
      <div class="up">
        <span class='icon' @click="toggle">
          <a-icon type="menu-fold" v-if="collapsed" />
          <a-icon type="menu-unfold" v-else/>
        </span>
      </div>
      <div class="down">
        <div class="content">
          <router-view></router-view>
          <!-- 子应用容器 -->
          <div id="mainContainer"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import apis from '@/api'

export default {
  name: 'Layout',
  data () {
    return {
      menus: []
    }
  },
  computed: {
    // 当前侧边栏active显示
    currentPath () {
      return '/' + this.$route.path.split('/')[1]
    },
    // 是否折叠
    collapsed () {
      return this.$store.state.app.collapsed
    }
  },
  methods: {
    toggle () {
      this.$store.dispatch('app/UpdateCollapsed', !this.collapsed)
    },
    // 路由跳转
    open (item) {
      this.$router.push({
        path: item.path,
        query: item.query
      })
    },
    init () {
      apis.getMenu().then(menus => {
        this.menus = menus
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang='less'>
.container {
  width: 100%;
  height: 100%;
  border: 1px solid red;
  display: flex;
}

.left {
  border: 1px solid blue;
  flex: 0 0 auto;
  background-color: rgb(0, 21, 41)
}

.right {
  border: 1px solid yellow;
  height: 100%;
  width: 100%;

  .up {
    height: 50px;
    border: 1px solid red;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;

    .icon {
      font-size: 20px;
    }
  }

  .down {
    height: calc(100% - 50px);
    border: 5px solid green;
    overflow: auto;
    .content {
      border: 1px solid red;
      overflow: hidden;
    }
  }
}
</style>
