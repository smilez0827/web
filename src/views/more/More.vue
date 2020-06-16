<template>
  <div>
      <div class="rollpic">
        <el-carousel :interval="5000" type="card" height="200px">
          <el-carousel-item v-for="item in imgList" :key="item.id">
            <a href="http://www.baidu.com" target="_blank">
              <h3 class="medium">
                <img :src="item.idView" />
              </h3>
            </a>
          </el-carousel-item>
        </el-carousel>
      </div>
    <div class="adContent">
      <el-collapse v-model="activeNames" >
        <el-collapse-item name="1">
          <template slot="title">
            <h3 class="title">热门文章</h3>
          </template>
          <div class="cardContainer">
            <div class="cardInfo">
              <img src="../../assets/img/more/p1.jpg" alt />
              <span>
                <a href="/">在界面中一致：所有的元素和结构需保持一致。</a>
              </span>
            </div>
            <div class="cardInfo">
              <img src="../../assets/img/more/p2.jpg" alt />
              <span>
                <a href="/">在界面中一致：所有的元素和结构需保持一致。</a>
              </span>
            </div>
            <div></div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <h3 class="title">最新论文</h3>
          </template>
          <div class="paper">
          <a href="/">王静.阿尔兹海默症脑电图特点及与其他疾病脑电图的鉴别诊断[J].首都食品与医药,2020,27(11):40-41.</a>
          </div>
          <div class="paper">
          <a href="/">王智贤,胡国恒.阿尔兹海默病中医辨治研究概况[J].湖南中医杂志,2020,36(05):155-157.</a>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "More",
  data() {
    return {
      imgList: [
        { id: 0, idView: require("../../assets/img/more/ad1.jpg") },
        {
          id: 1,
          name: "详情",
          idView: require("../../assets/img/more/ad2.jpg")
        },
        {
          id: 2,
          name: "推荐",
          idView: require("../../assets/img/more/ad3.jpg")
        }
      ],
      activeNames: ["1", "2"]
    };
  },
  methods: {
  }
};
</script >

<style scoped lang="scss">
.rollpic {
    width: 90%;
  margin-left: 5%;
}
.adContent {
  width: 90%;
  margin: 10px auto;
  a {
    color: #1c7e7c;
  }
  .title {
    font-size: 20px;
    color: #1c7e7c;
  }
  .cardContainer {
    width: 95%;
    margin-top: 10px;
    .cardInfo {
      margin-bottom: 10px;
      float: left;
      width: 50%;
      border-left: 5px solid #eff3f4;
      padding-left:20px ;
      img {
        float: left;
        width: 20%;
        height: 100px;
      }
      span {
        float: left;
        height: 100px;
        width: 60%;
        margin-left: 20px;
        font-size: 18px;
      }
    }
  }
  .paper {
    width: 80%;
    font-size: 18px;
  }
}
</style>

