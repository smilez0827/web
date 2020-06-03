<template>
  <el-header class="header" height="80px">
    <div class="content">
      <div class="logo" :class="{'logo-hide': !openNav}">
        <img src="../../assets/img/logo.png" class="image" />
        <span class="text">远程医疗系统</span>
      </div>
      <div class="user">
        <span class="user-info">
          欢迎： 
          {{ user.name}}
          <a>
          <i class="el-icon-switch-button" style="margin-left: 10px"></i>
          退出登录
          </a>
          
        </span>
      </div>
    </div>
  </el-header>
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
    navOpenToggle() {
      console.log("toggle-open");
    }
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
    position: absolute;
    left: 7%;
    height: 100%;
    width: 86%;
    border-bottom: 1px solid #1c7e7c;
  }

  .logo {
    text-align: center;
    font-size: 24px;
    .image {
      margin-left: 10px;
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
    font-family:"Microsoft YaHei" ;
    color: #1c7e7c;
    a {
      margin-left: 10px;
    }
    i {
      vertical-align: middle;
    }
  }
}
</style>