<template>
  <div class="page">
    <div class="thispage">
      <div class="header">
        <the-header></the-header>
      </div>
      <div class="main">
        <div class="side">
          <the-sidebar></the-sidebar>
        </div>
        <div class="content">
          <div class="tag">123</div>
          <div>
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../components/layout/Header";
import Aside from "../../components/layout/Aside";

export default {
  name: "TheLayout",
  data() {},
  methods: {},
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
  height: 100vh;
  width: 100%;
  padding-left: 10%;
  padding-right: 10%;
  background-color: #eff3f4;
  .thispage {
    position: relative;
    height: 100%;
    width: 100%;
    .header {
      width: 100%;
      height: 80px;
    }
    .main {
      position: absolute;
      top: 0px;
      width: 100%;
      height: 100%;
      .side {
        height: 100%;
        padding-top: 80px;
      }
      .content {
        position: absolute;
        top: 80px;
        right: 0px;
        width: calc(100% - 240px);
        height: calc(100% - 80px);
        background-color: white;
        overflow:auto;
        .tag {
          width: 100%;
          height: 50px;
          background-color: #D2E5E5;
          margin-bottom:20px ;
        }
      }
    }
  }
}
</style>