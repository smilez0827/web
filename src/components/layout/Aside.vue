<template>
  <aside class="sidebar">
    <el-menu
      class="sidebar-menu"
      :router="true"
      background-color="transparent"
      text-color="white"
    >
      <template v-for="menu in user.accessMenu">
        <el-menu-item v-if="!menu.children" :key="menu.functionName" :index="menu.functionAddress">
          <i :class="menu.icon" class="iconfont" v-if="menu.icon"></i>
          <span slot="title" class="mainTitle">{{menu.functionName}}</span>
        </el-menu-item>
        <el-submenu :key="menu.functionID" :index="menu.functionAddress" v-else>
          <template slot="title">
            <i :class="menu.icon" class="iconfont" v-if="menu.icon"></i>
            <span slot="title" class="mainTitle">{{menu.functionName}}</span>
          </template>
          <template v-for="item in menu.children">
            <el-menu-item v-if="!item.children" :key="item.functionID" :index="item.functionAddress">
              <span class="subTitle">{{item.functionName}}</span>
            </el-menu-item>
            <the-submenu  :key="item.functionID" :subMenu="item" v-else></the-submenu>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </aside>
</template>

<script>
import SubAside from './SubAside.vue'
export default {
  name: "Aside",
  components:{
    'the-submenu': SubAside
  },
  data() {
    return {
      openNav: true,
      user: {
        accessMenu: []
      }
    };
  },
  mounted() {
    this.user.accessMenu = this.$store.state.function;
    // console.log(this.user.accessMenu);
    // this.$store.state.function=JSON.parse(localStorage.getItem("store"))
  },
  methods:{
  }
};
</script>

<style scoped lang="scss">
.sidebar {
  // position: absolute;
  float: left;
  width: 240px;
  height: 100%;
  overflow: auto;
  background-color: #1c7e7c;
  .sidebar-menu {
    border: none;
    height: 100%;
    .mainTitle {
      font-size: 24px;
    }
    .subTitle {
      font-size: 20px;
    }
    i {
      font-size: 24px;
      color: white;
      margin-right: 20px;
    }
  }
}
</style>
