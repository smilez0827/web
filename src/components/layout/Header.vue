<template>
  <div class="header" height="80px">
    <div class="content">
      <div class="logo">
        <img src="../../assets/img/logo.png" class="image" />
        <span class="text">远程医疗系统</span>
      </div>
      <div class="user">
        <span class="user-info">
          欢迎：
          {{ user.name}}
          <a @click="logout">
            <i class="el-icon-switch-button" style="margin-left: 10px"></i>
            <span click="logout">退出登录</span>
          </a>
        </span>
      </div>
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
  div {
    display: inline-block;
  }
  .content {
    // position: absolute;
    width: 100%;
    height: 100%;
    border-bottom: 1px solid #1c7e7c;
  }

  .logo {
    text-align: center;
    font-size: 24px;
    .image {
      // margin-left: 10px;
      width: 200px;
      vertical-align: middle;
    }

    .text {
      color: #1c7e7c;
      font-weight: bold;
    }
  }
  .user {
    float: right;
    margin-right: 10px;
    font-size: 18px;
    font-weight: bold;
    font-family: "Microsoft YaHei";
    color: #1c7e7c;
    a {
      margin-left: 10px;
      cursor: pointer;
    }
    i {
      vertical-align: middle;
    }
  }
}
</style>