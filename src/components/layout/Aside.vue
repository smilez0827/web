<template>
  <aside class="sidebar">
    <el-menu class="sidebar-menu" :collapse="!openNav" :collapse-transition="false" :router="true"  background-color="transparent" text-color="white">
      <template v-for="menu in user.accessMenu">
        <el-menu-item v-if="!menu.children" :key="menu.functionName" :index="menu.functionAddress">
          <!-- <i :class="menu.icon" v-if="menu.icon"></i> -->
          <span slot="title">{{menu.functionName}}</span>
        </el-menu-item>
        <el-submenu :key="menu.functionID" :index="menu.functionAddress"  v-else>
          <template slot="title">
            <!-- <i :class="menu.icon" v-if="menu.icon"></i> -->
            <span slot="title">{{menu.functionName}}</span>
          </template>
          <template v-for="item in menu.children">
            <el-menu-item :key="item.functionID" :index="item.functionAddress">
              <!-- <a-icon :type="item.icon" v-if="item.icon" /> -->
              <span>{{item.functionName}}</span>
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
    this.user.accessMenu=this.$store.state.function
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
  background-color: #1C7E7C;
  .sidebar-menu {
    border: none;
    height: 100%;
    i {
      color: white;;
    }
  }
}


</style>
