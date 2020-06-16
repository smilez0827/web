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
        <div :class="this.isHide?'contentHide':'content'">
          <div class="tag">
            <i :class="this.isHide?'el-icon-s-unfold':'el-icon-s-fold'" @click="hide"></i>
            <span>更多推荐</span>
          </div>
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
  data() {
    return {
      isHide: false
    };
  },
  methods: {
    hide() {
      this.isHide = !this.isHide;
      console.log(this.isHide);
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
  height: 100vh;
  width: 100%;
  padding-left: 10%;
  padding-right: 10%;
  background-color: #eff3f4;
  div {
    transition: 0.5s;
  }
  .thispage {
    position: relative;
    height: 100%;
    width: 100%;
    .header {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 80px;
      z-index: 100;
    }
    .main {
      position: absolute;
      top: 0px;
      width: 100%;
      height: 100%;

      .side {
        height: 100%;
        padding-top: 80px;
        z-index: 1;
        width: 240px;
      }
      .content {
        position: absolute;
        top: 80px;
        right: 0px;
        width: calc(100% - 240px);
        height: calc(100% - 80px);
        background-color: white;
        overflow: auto;
        .tag {
          width: 100%;
          height: 50px;
          background-color: #d2e5e5;
          margin-bottom: 20px;
          color: #1c7e7c;
          line-height: 50px;
        }
        i {
          font-size: 25px;
          margin-right: 20px;
        }
        span {
          font-size: 25px;
        }
      }
      .contentHide {
        position: absolute;
        top: 80px;
        right: 0px;
        width: 100%;
        height: calc(100% - 80px);
        background-color: white;
        overflow: auto;
        .tag {
          width: 100%;
          height: 50px;
          background-color: #d2e5e5;
          margin-bottom: 20px;
          color: #1c7e7c;
          line-height: 50px;
        }
        i {
          font-size: 25px;
          margin-right: 20px;
          cursor: pointer;
        }
        span {
          font-size: 25px;
        }
      }
    }
  }
}
</style>