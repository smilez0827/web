<template functional>
  <el-submenu v-on="listeners" :key="data.key" :index="data.key">
    <template slot="title">
      <span class="subTitle" slot="title">{{data.attrs.subMenu.functionName}}</span>
    </template>
    <template v-for="item in data.attrs.subMenu.children">
      <el-menu-item v-if="!item.children" :key="item.functionName" :index="item.functionAddress">
        <span class="subTitle">{{item.functionName}}</span>
      </el-menu-item>
      <the-submenu v-else :subMenu="item" :key="item.functionName"></the-submenu>
    </template>
  </el-submenu>
</template>

<script>
export default {
  methods:{
    
  }
}
</script>