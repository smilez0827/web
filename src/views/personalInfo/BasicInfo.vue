<template>
  <div class="content">
    <el-collapse v-model="activeNames">
      <el-form size="small " :inline="true" :model="formData" ref="formData">
        <el-collapse-item name="基本信息">
          <template slot="title">
            <h3 class="title">基本信息</h3>
          </template>

          <div>
            <el-row>
              <el-col :span="4" :offset="1">
                <el-upload
                  class="avatar-uploader"
                  action="http://132.232.18.227:8087/upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  :headers="uploadToken"
                >
                  <!-- <img v-if="" :src="this.formData.basicInfo.portrait.ImageAddressName" class="avatar" /> -->
                  <i  class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>
              <el-col :span="18" :offset="1">
                <el-row>
                  <el-col :span="7">
                    <el-form-item label="姓名：" prop="name">
                      <el-input
                        v-model="formData.basicInfo.Name"
                        placeholder="请输入姓名"
                        style="width:120px"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="性别：" prop="gender">
                      <el-input
                        v-model="formData.basicInfo.gender"
                        placeholder="请输入性别"
                        style="width:120px"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="出生日期：" prop="date">
                      <el-input v-model="formData.basicInfo.birthday" placeholder="请输入出生日期"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="10">
                    <el-form-item label="邮箱：" prop="post">
                      <el-input
                        v-model="formData.basicInfo.post"
                        placeholder="请输入邮箱"
                        style="width:100%"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="电话：" prop="tel">
                      <el-input
                        v-model="formData.basicInfo.tel"
                        placeholder="请输入电话"
                        style="width:100%;"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col>
                    <el-form-item label="工作单位：" prop="job">
                      <el-input
                        v-model="formData.basicInfo.job"
                        placeholder="请输入工作单位"
                        style="width:200%"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="家庭住址：" prop="address">
                      <el-input
                        v-model="formData.basicInfo.address"
                        placeholder="请输入家庭住址"
                        style="width:200%"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item
          v-for="(item) in formData.exp"
          :key="item.id"
          :name="item.title"
          style="margin-bottom:20px"
        >
          <template slot="title">
            <h3 class="title">{{item.title}}</h3>
          </template>
          <el-row>
            <el-col>
              <el-input type="textarea" v-model="item.text" class="text"></el-input>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-button type="primary" class="btn" @click="save">保存</el-button>
      </el-form>
    </el-collapse>
  </div>
</template>

<script type="text/javascript">
import { getBasicInfo, changeBasicInfo } from "../../api/user/user.js";
export default {
  name: "More",
  data() {
    return {
      uploadToken: {
        Authorization: localStorage.getItem("token")
      },
      activeNames: ["基本信息", "教育经历", "工作经历", "科研经历", "教学经历"],
      formData: {
        basicInfo: {
          portrait: {
            ImageAddressName: ""
          },
          Name: "张三",
          gender: "男",
          birthday: "19960723",
          address: "成都市郫都区西南交通大学",
          job: "西南交通大学",
          post: "111111111@qq.com",
          tel: "11111111111"
        },
        exp: [
          {
            title: "教育经历",
            text:
              "教育过程开始于一个人的出生并持续终身，对人产生持久而深刻的变化。有些人甚至认为教育可以开始得更早，一些父母通过外部的言语和音乐来影响子宫里成长着的胎儿，进行胎教，希望给孩子以积极的健康的发展。"
          },
          {
            title: "工作经历",
            text:
              "教育过程开始于一个人的出生并持续终身，对人产生持久而深刻的变化。有些人甚至认为教育可以开始得更早，一些父母通过外部的言语和音乐来影响子宫里成长着的胎儿，进行胎教，希望给孩子以积极的健康的发展。"
          },
          {
            title: "科研经历",
            text:
              "教育过程开始于一个人的出生并持续终身，对人产生持久而深刻的变化。有些人甚至认为教育可以开始得更早，一些父母通过外部的言语和音乐来影响子宫里成长着的胎儿，进行胎教，希望给孩子以积极的健康的发展。"
          },
          {
            title: "教学经历",
            text:
              "教育过程开始于一个人的出生并持续终身，对人产生持久而深刻的变化。有些人甚至认为教育可以开始得更早，一些父母通过外部的言语和音乐来影响子宫里成长着的胎儿，进行胎教，希望给孩子以积极的健康的发展。"
          }
        ]
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.formData.basicInfo.portrait.ImageAddressName = "http://" + res.url;
      console.log(res.url);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    save() {
      // console.log(this.formData)
      changeBasicInfo(this.formData)
        .then(res => {
          if (res.status == 200) {
            this.$message({
              message: "个人信息修改成功",
              type: "success"
            });
          } else {
            this.$message.error("信息修改失败");
          }
        })
        .catch(() => {
          this.$message.error("网络中断");
        });
    }
  },
  mounted() {
    getBasicInfo().then(res => {
      this.formData.basicInfo = res.data.Info.basicInfo;
      this.formData.exp = res.data.Info.exp;
    });
  }
};
</script >

<style scoped lang="scss">
.content {
  margin: 20px 5%;
  .title {
    font-size: 20px;
    color: #1c7e7c;
  }
  .text {
    width: 90%;
    float: right;
  }
}
.btn {
  float: right;
  width: 100px;
  // background-color: #1c7e7c;
  margin-bottom: 50px;
  margin-left: 50px;
}
</style>

<style lang="scss">
.el-collapse-item__wrap {
  border-bottom: 0px;
}
.el-collapse {
  border-bottom: 0px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 100%;
  height: 1%;
  display: block;
}
</style>