<template>
  <el-row class="page">
    <el-col :span="24" style="position: absolute;">
      <the-header></the-header>
    </el-col>
    <el-col :span="24" class="page-main">
      <the-sidebar></the-sidebar>
      <div class="page-content">
        123
      </div>
    </el-col>
  </el-row>
</template>

<script>
import Header from "../../components/layout/Header";
import Aside from "../../components/layout/Aside";

export default {
  name: "TheLayout",
  data() {
    return {
      openNav: true,
    };
  },
  methods: {
    toggleOpen() {
      this.openNav = !this.openNav;
    },

  },
  components: {
    "the-header": Header,
    "the-sidebar": Aside
  }
};
</script>

<style scoped lang="scss">
.page {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: #eff3f4;

  .page-main {
    box-sizing: border-box;
    padding-top: 80px;
    height: 100%;

    .page-content {
      overflow: auto;
      margin-left: 390px;
      height: 100%;
      //   background-color: #EBEEF5;
    }
  }
}
</style>