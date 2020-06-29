<template>
  <div>
    <el-row class="title">
      <el-col :span="6" :offset="1">
        <span>新消息设置</span>
      </el-col>
    </el-row>

    <el-row class="message">
      <el-col :span="6" :offset="2">
        <span>是否自动提醒新消息</span>
      </el-col>
      <el-col :span="1" :offset="1">
        <el-switch v-model="notice"></el-switch>
      </el-col>
    </el-row>
    <el-divider class="line"></el-divider>
    <el-row class="title">
      <el-col :span="8" :offset="1">
        <span>密码设置</span>
      </el-col>
    </el-row>

    <el-row class="password">
      <el-form
        :model="formData"
        status-icon
        :rules="rules"
        label-width="100px"
        class="demo-formData"
      >
        <el-col :span="7" :offset="7">
          <el-form-item label="用户名" prop="pass">
            <el-input type="password" v-model="formData.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="原密码" prop="check">
            <el-input type="password" v-model="formData.prepass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="check">
            <el-input type="password" v-model="formData.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="age">
            <el-input v-model.number="formData.check"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-row>
      <el-col :span="2" :offset="10">
        <el-button class="btn">提交</el-button>
      </el-col>
    </el-row>
    <el-divider type="primary" class="line"></el-divider>
  </div>
</template>

<script type="text/javascript">
// import { getBasicInfo, changeBasicInfo } from "../../api/user/user.js";
export default {
  name: "More",
  data() {
    return {
      formData: {
        username: "",
        prepass: "",
        pass: "",
        check: ""
      },
      notice: false
    };
  },
  methods: {}
};
</script >

<style scoped lang="scss">
.title {
  font-size: 20px;
  font-weight: bold;
  color: #1c7e7c;
  margin: 20px 0px 0px 0px;
}

.message {
  margin-top: 30px;
  margin-bottom: 40px;
  font-size: 18px;
}
.password {
  margin-top: 30px;
  margin-bottom: 10px;
}
.line {
  width: 85%;
  margin: auto;
  margin-top: 20px;
}
.btn {
  width: 100%;
  height: 40px;
  color: white;
  background-color: #409eff;
}
</style>
