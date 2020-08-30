<template>
  <div id="uesrtext">
    <div class="menu">
      <span class="file">
        <el-upload
          class="upload-demo"
          action="http://132.232.18.227:8087/upload"
          :on-success="handleSuccess"
          :headers="uploadToken"
          :auto-upload="true"
          :show-file-list="false"
        >
          <i class="iconfont icon-picture"></i>
        </el-upload>
      </span>
      <span class="file">
        <i class="iconfont icon-huatong"></i>
        <input type="file" name id />
      </span>
    </div>
    <textarea placeholder="按 Ctrl + Enter 发送" v-model="content" v-on:keyup="addMessage"></textarea>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "uesrtext",
  data() {
    return {
      content: "",
      uploadToken: {
        Authorization: localStorage.getItem("token")
      }
    };
  },
  methods: {
    handleSuccess(res, files, fileList) {
      console.log(res);

      this.$store.commit("instantInfo/addMessage", {
        content:
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        msgType: "img"
      });
      this.content = "";
    },
    addMessage(e) {
      if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
        this.$store.commit("instantInfo/addMessage", {
          content: this.content,
          msgType: "text"
        });
        this.content = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#uesrtext {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 30%;
  border-top: solid 1px #ddd;
  .menu {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    i {
      cursor: pointer;
    }
    .file {
      height: 30px;
      line-height: 30px;
      width: 30px;
      position: relative;
      display: inline-block;
      overflow: hidden;
      text-decoration: none;
      cursor: pointer;
      margin-right: 5px;
      text-align: center;
      input {
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 0;
        opacity: 0;
      }
    }
  }
  > textarea {
    padding: 10px;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
  }
}
</style>
