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
            {{ user.name}}
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
    return {
      openNav: true,
      user: {
        name: "张笑"
      }
    };
  },
  methods: {
    logout() {
      console.log("out");
      this.$router.push("/login");
    }
  },
  mounted() {
    this.user.name = this.$store.state.userInfo.name;
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
    border-bottom: 1px solid #1c7e7c;
    .userinfo {
      color: #1c7e7c;
      font-weight: bold;
      float: right;
    }
  }
  span {
    line-height: 80px;
  }
  .logo {
    height: 80px;
    float: left;
    img {
      height: 100%;
    }
  }
  .text {
    float: left;
    color: #1c7e7c;
    font-weight: bold;
  }
}
</style>