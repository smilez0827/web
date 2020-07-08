<template>
  <div class="header" height="80px">
    <div class="content">
      <el-row>
        <div class="logo">
          <img src="../../assets/img/logo.png" />
        </div>
        <span class="text">远程医疗系统</span>
        <div>
          <span class="userinfo">
            欢迎：
            {{this.$store.getters.userInfo.name}}
            <a @click="logout">
              <i class="el-icon-switch-button" style="margin-left: 10px"></i>
              <span click="logout">退出登录</span>
            </a>
          </span>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  watch: {},
  methods: {
    logout() {
      localStorage.removeItem("token");
      // this.$store.commit('resetUser')
      this.$router.push("/login");
      window.location.reload();
    }
  },
  mounted() {
    if(localStorage.getItem('name')){
    this.$store.state.user.userInfo.name=localStorage.getItem('name').replace(/\"/g,"")
    }
  }
};
</script>

<style scoped lang="scss">
.header {
  line-height: 80px;
  color: #1c7e7c;
  .content {
    width: 100%;
    height: 100%;
    .userinfo {
      color: #1c7e7c;
      font-weight: bold;
      float: right;
    }
  }
  span {
    line-height: 80px;
    font-size: 18px;
  }
  .logo {
    height: 80px;
    float: left;
    img {
      height: 100%;
    }
  }
  .text {
    font-size: 24px;
    float: left;
    color: #1c7e7c;
    font-weight: bold;
  }
}
</style>