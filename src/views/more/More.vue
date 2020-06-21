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
      <el-collapse v-model="activeNames">
        <el-collapse-item v-for="(item,index) in this.collapseDate" :key="item.id" :name="index">
          <template slot="title">
            <h3 class="title">{{item.title}}</h3>
          </template>
          <div class="cardContainer">
            <div class="cardInfo" v-for="card in item.content" :key="card.id">
              <img src="../../assets/img/more/p1.jpg" alt />
              <span>
                <a href="/">{{card.text}}</a>
              </span>
            </div>
            <div></div>
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
      activeNames: [0, 1],
      collapseDate: [
        {
          title: "热门文章",
          content: [
            {
              pic: "../../assets/img/more/p1.jpg",
              text: "在界面中一致：所有的元素和结构需保持一致。"
            },
            {
              pic: "src/assets/img/more/p1.jpg",
              text: "在界面中一致：所有的元素和结构需保持一致。"
            },{
              pic: "img/p1.799d1727.jpg",
              text: "在界面中一致：所有的元素和结构需保持一致。"
            },{
              pic: "img/p1.799d1727.jpg",
              text: "在界面中一致：所有的元素和结构需保持一致。"
            }
          ]
        },
        {
          title: "最新论文",
          content: [
            {
              pic: "img/p1.799d1727.jpg",
              text: "在界面中一致：所有的元素和结构需保持一致。"
            },{
              pic: "img/p1.799d1727.jpg",
              text: "在界面中一致：所有的元素和结构需保持一致。"
            },{
              pic: "img/p1.799d1727.jpg",
              text: "在界面中一致：所有的元素和结构需保持一致。"
            },
          ]
        }
      ]
    };
  },
  methods: {}
};
</script >

<style scoped lang="scss">
.rollpic {
  width: 90%;
  margin: 20px auto;
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
      padding-left: 20px;
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

