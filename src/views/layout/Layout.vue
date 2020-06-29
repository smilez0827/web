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
            <template v-for="(item,index) in this.path">
              <span :key="item.id" v-if="(index==0)">{{item}}</span>
              <span :key="item.id" v-else>{{" > "+item}}</span>
            </template>
          </div>
          <div class="mainContent">
            <router-view />
          </div>
        </div>
      </div>
    </div>
    <div :class="noticHide?'noticeHide':'notice'">
      <div>
        <p v-for="item in noticData" :key="item.id">
          <router-link :to="item.router">[{{item.time}}]{{item.msg}}</router-link>
        </p>
      </div>
    </div>
    <div :class="noticHide?'noticebtnHide':'noticebtn'" @click="noticChange">
      <i :class="noticHide?'el-icon-caret-left':'el-icon-caret-right'"></i>
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
      isHide: false,
      noticHide: false,
      path: [],
      noticData: [
        {
          type: "huizhen",
          time: "15:30:43",
          msg: "您有新会诊信息",
          router: "/recommend"
        },
        {
          type: "zhuanzhen",
          time: "15:34:43",
          msg: "您有新转诊信息",
          router: "/personalinfo/basicinfo"
        },
        {
          type: "huanzhe",
          time: "15:30:43",
          msg: "您有新会诊信息",
          router: "/recommend"
        },
        {
          type: "huanzhe",
          time: "15:30:43",
          msg: "您有新会诊信息",
          router: "/recommend"
        },
        {
          type: "huanzhe",
          time: "15:30:43",
          msg: "您有新会诊信息",
          router: "/recommend"
        },
        {
          type: "huanzhe",
          time: "15:30:43",
          msg: "您有新会诊信息",
          router: "/recommend"
        },
        {
          type: "huanzhe",
          time: "15:30:43",
          msg: "您有新会诊信息",
          router: "/recommend"
        },
        {
          type: "huanzhe",
          time: "15:30:43",
          msg: "您有新会诊信息",
          router: "/recommend"
        }
      ]
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  methods: {
    hide() {
      this.isHide = !this.isHide;
    },
    getBreadcrumb() {
      let matched = this.$route.matched;
      this.path = [];
      matched.forEach((element, index) => {
        if (index === 0) {
          this.path.push("首页");
        } else {
          this.path.push(element.name);
        }
      });
    },
    noticChange() {
      this.noticHide = !this.noticHide;
    }
  },
  components: {
    "the-header": Header,
    "the-sidebar": Aside
  },
  mounted() {
    this.getBreadcrumb();
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
  background-color: #eff3f4;
  overflow: hidden;
  div {
    transition: 0.5s;
  }
  .thispage {
    position: relative;
    height: 100%;
    width: 1500px;
    margin: auto;
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
        .tag {
          width: 100%;
          height: 50px;
          background-image: linear-gradient(to right, #9adfbf, #d2e5e5);
          color: #1c7e7c;
          line-height: 50px;
        }
        .mainContent {
          width: 98%;
          overflow: auto;
          margin: 15px auto;
          background-color: white;
          height: calc(100% - 80px);
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
      .contentHide {
        position: absolute;
        top: 80px;
        right: 0px;
        width: 100%;
        height: calc(100% - 80px);
        background-color: white;
        .tag {
          width: 100%;
          height: 50px;
          background-color: #d2e5e5;
          color: #1c7e7c;
          line-height: 50px;
        }
        .mainContent {
          overflow: auto;
          height: calc(100% - 50px);
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
  .notice {
    z-index: 100;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 250px;
    height: 200px;
    background-color: #EDEDED;
    overflow: auto;
    padding: 10px;
    border-radius: 5px;
    p {
      color: #1c7e7c;
      margin-top: 10px;
    }
  }
  .noticeHide {
    z-index: 100;
    position: absolute;
    right: -300px;
    bottom: 0;
    width: 250px;
    height: 200px;
    background-color:#EDEDED ;
    overflow: auto;
    border-radius: 5px;
    padding: 10px;
    p {
      color: #1c7e7c;
      margin-top: 10px;
    }
  }
  .noticebtn {
    z-index: 100;
    position: absolute;
    right: 250px;
    bottom: 160px;
    height: 40px;
    font-size: 40px;
    cursor: pointer;
    color: #409eff;
  }
  .noticebtnHide {
    z-index: 100;
    position: absolute;
    right: 0px;
    bottom: 160px;
    height: 40px;
    font-size: 40px;
    cursor: pointer;
    color: #f56c6c;
  }
}
</style>