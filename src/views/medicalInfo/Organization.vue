<template>
  <div>
    <el-row class="search">
      <el-form :inline="true" class="demo-form-inline">
        <el-col :span="8" >
          <el-form-item>
            <template slot="label">
              <span class="label">医疗机构检索：</span>
            </template>
            <el-input placeholder="请输入医疗机构名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <div>
            <el-form-item>
              <el-button type="primary">查询</el-button>
            </el-form-item>
          </div>
        </el-col>
      </el-form>
    </el-row>
    <el-divider type="primary" class="underline"></el-divider>
    <el-row>
      <el-col :span="22" :offset="1">
        <div class="card">
          <span class="line"></span>
          <div class="pic">
            <img src="../../assets/img/medicalInfo/xiehe.png" alt />
          </div>
          <div class="info">
            <span>
              <p class="name">北京协和医院</p>
              <p>等级：三级甲等</p>
              <p>地址：北京市东城区帅府园1号（东院）;西城区大木仓胡同41号（西院）</p>
              <p>简介：北京协和医院是集医疗、教学、科研于一体的大型三级甲等综合医院......</p>
            </span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-divider type="primary" class="underline"></el-divider>
    <el-row>
      <el-col :span="22" :offset="1">
        <div class="card">
          <span class="line"></span>
          <div class="pic">
            <img src="../../assets/img/medicalInfo/xiehe.png" alt />
          </div>
          <div class="info">
            <span>
              <p class="name">北京协和医院</p>
              <p>等级：三级甲等</p>
              <p>地址：北京市东城区帅府园1号（东院）;西城区大木仓胡同41号（西院）</p>
              <p>简介：北京协和医院是集医疗、教学、科研于一体的大型三级甲等综合医院......</p>
            </span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-divider type="primary" class="underline"></el-divider>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "More",
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script >

<style scoped lang="scss">
.search {
  margin: 30px 0 0 5%;
  .label {
    font-size: 22px;
  }
}
.card {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  // background-color: red;
  .line {
    display: inline-block;
    height: 200px;
    border-left: 10px solid #eff3f4;
    border-top: 10px solid white;
    border-bottom: 10px solid white;
  }
  .pic {
    position: absolute;
    top: 5%;
    display: inline-block;
    width: 190px;
    height: 190px;
    margin-left: 10px;
    padding-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    position: absolute;
    left: 20%;
    display: inline-block;
    width: calc(90% - 200px);
    height: 200px;
    span {
      .name {
        font-size: 20px;
        font-weight: bold;
        color: #1c7e7c;
      }
      p {
        margin-top: 15px;
        font-size: 18px;
      }
    }
    :hover{
        text-decoration: underline;
        cursor: pointer;
      }
    
  }
}
.underline {
  width: 90%;
  margin: 20px auto;
}
</style>
