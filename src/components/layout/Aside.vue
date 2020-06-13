<template>
  <aside class="sidebar">
    <el-menu class="sidebar-menu" :collapse="!openNav" :collapse-transition="false" :router="false"  background-color="transparent" text-color="white">
      <template v-for="menu in user.accessMenu">
        <el-menu-item v-if="!menu.children" :key="menu.name" :index="menu.path">
          <i :class="menu.icon" v-if="menu.icon"></i>
          <span slot="title">{{menu.title}}</span>
        </el-menu-item>
        <el-submenu :key="menu.id" :index="menu.path" v-else>
          <template slot="title">
            <i :class="menu.icon" v-if="menu.icon"></i>
            <span slot="title">{{menu.title}}</span>
          </template>
          <template v-for="item in menu.children">
            <el-menu-item :key="item.id">
              <a-icon :type="item.icon" v-if="item.icon" />
              <span>{{item.title}}</span>
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </aside>
</template>

<script>

export default {
  name: "Aside",
  data() {
    return {
      openNav: true,
      user: {
        accessMenu:[]
      }
    };
  },
  created(){
    this.user.accessMenu=this.$store.state.accessMenu
  }
};
</script>

<style scoped lang="scss">
.sidebar {
  float: left;
  margin-left: 150px;
  width: 240px;
  height: 100%;
  overflow: auto;
  background-color: #1C7E7C;

  .sidebar-menu {
    border: none;
    height: 100%;
    color: white;
    i {
      color: white;;
    }
  }
}


</style>
