<template>
  <!-- 
个人信息

  -->
  <div class="personalInfo">
    <div class="img">
      <img :src="prsonalInfo.API_pic" alt />
    </div>
    <div class="info">
      <el-row>
        <el-col :span="8">姓名：{{prsonalInfo.API_name}}</el-col>
        <el-col :span="8">性别：{{prsonalInfo.API_gender}}</el-col>
        <el-col
          :xs="24"
          :sm="24"
          :md="24"
          :lg="8"
          :xl="8"
        >出生日期：{{new Date(prsonalInfo.API_birthday).toLocaleDateString() }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">家庭住址：{{prsonalInfo.API_address}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">联系方式：{{prsonalInfo.API_tel}}</el-col>
        <el-col :span="12">
          就诊时间：{{
          new Date(prsonalInfo.API_date).toLocaleDateString()
          }}
        </el-col>
        <el-col :span="6">
          <el-link type="success" @click="startCommunication">发起会话</el-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    prsonalInfo: {
      type: Object,
      default: () => {
        return {
          API_pic:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          API_name: "张三",
          API_gender: "男",
          API_birthday: "2017/9/24",
          API_address: "四川成都市",
          API_tel: "19982055906",
          API_date: "2019/7/8"
        };
      }
    }
  },
  methods: {
    startCommunication() {
      console.log(this.$store.state.instantInfo.sessions);
      let flag = true;
      this.$store.state.instantInfo.sessions.forEach(person => {
        if (person.id == "101001") {
          flag = false;
        }
      });
      if (flag) {
        this.$store.commit("instantInfo/addPerson", {
          id: "101001",
          name: "李四",
          img: this.prsonalInfo.API_pic
        });
      } else {
        this.$store.commit("instantInfo/changeCurrentSessionId", "101001");
        this.$router.push("/instantinfo/message");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.personalInfo {
  width: 100%;
  display: flex;
  .img {
    width: 170px;
    height: 150px;
    padding-left: 30px;
    padding-right: 20px;
    flex-shrink: 0;
    border-right: 1px solid #d9d9d9;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    margin-left: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 18px;
  }
}
</style>