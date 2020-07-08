<template>
  <div>
    <div class="search">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <template slot="label">
            <span class="searchLabel">医院名称：</span>
          </template>
          <el-input v-model="search.name" placeholder="请输入医院名称"></el-input>
        </el-form-item>
        <el-form-item>
          <template slot="label">
            <span class="searchLabel">医院等级：</span>
          </template>
          <el-select v-model="search.class" placeholder="请选择医院等级">
            <el-option label="三级甲等" value="三级甲等"></el-option>
            <el-option label="三级乙等" value="三级乙等"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-divider type="primary" class="searchLine"></el-divider>
    <div class="content">
      <el-row v-for="item in showTable" :key="item.key">
        <el-col :span="22" :offset="1">
          <div class="card">
            <span class="line"></span>
            <div class="pic">
              <img :src="item.pic" alt />
            </div>
            <div class="info">
              <span @click="details(item.orgId)">
                <p class="name">{{item.name}}</p>
                <p>等级：{{item.class}}</p>
                <p>地址：{{item.address}}</p>
                <p>简介：{{item.introduction}}</p>
              </span>
            </div>
          </div>
        </el-col>
        <el-divider type="primary" class="underline"></el-divider>
      </el-row>
    </div>
    <div class="footer">
      <el-pagination :hide-on-single-page="false" :total="20" layout="prev, pager, next"></el-pagination>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    showTable: function(){
      let list = [];
      this.listInfo.forEach(element => {
        if (
          (!this.search.name || element.name == this.search.name) &&
          (!this.search.class || element.class == this.search.class)
        ) {
          list.push(element);
        }
      });
      console.log(list);
      return list;
    }
  },
  data() {
    return {
      searchName: "",
      search: {
        name: "",
        class: ""
      },
      listInfo: [
        {
          pic: require("../../assets/img/medicalInfo/xiehe.png"),
          name: "北京协和医院",
          class: "三级甲等",
          address: "北京市东城区帅府园1号（东院）;西城区大木仓胡同41号（西院）",
          introduction:
            "北京协和医123院是集医疗、教学、科研于一体的大型三级甲等综合医院......",
          orgId: "1"
        },
        {
          pic: require("../../assets/img/medicalInfo/xiehe.png"),
          name: "华西医院",
          class: "三级乙等",
          address: "北京市东城区帅府园1号（东院）;西城区大木仓胡同41号（西院）",
          introduction:
            "北京协和医123院是集医疗、教学、科研于一体的大型三级甲等综合医院......",
          orgId: "1"
        },
        {
          pic: require("../../assets/img/medicalInfo/xiehe.png"),
          name: "北京协和医院",
          class: "三级甲等",
          address: "北京市东城区帅府园1号（东院）;西城区大木仓胡同41号（西院）",
          introduction:
            "北京协和医123院是集医疗、教学、科研于一体的大型三级甲等综合医院......",
          orgId: "1"
        },
        {
          pic: require("../../assets/img/medicalInfo/xiehe.png"),
          name: "北京协和医院",
          class: "三级甲等",
          address: "北京市东城区帅府园1号（东院）;西城区大木仓胡同41号（西院）",
          introduction:
            "北京协和医123院是集医疗、教学、科研于一体的大型三级甲等综合医院......",
          orgId: "1"
        },
        {
          pic: require("../../assets/img/medicalInfo/xiehe.png"),
          name: "北京协和医院",
          class: "三级甲等",
          address: "北京市东城区帅府园1号（东院）;西城区大木仓胡同41号（西院）",
          introduction:
            "北京协和医123院是集医疗、教学、科研于一体的大型三级甲等综合医院......",
          orgId: "1"
        },
        {
          pic: require("../../assets/img/medicalInfo/xiehe.png"),
          name: "北京协和医院",
          class: "三级甲等",
          address: "北京市东城区帅府园1号（东院）;西城区大木仓胡同41号（西院）",
          introduction:
            "北京协和医院是集医疗、教学、科研于一体的大型三级甲等综合医院......",
          orgId: "2"
        },
        {
          pic: require("../../assets/img/medicalInfo/xiehe.png"),
          name: "北京协和医院",
          class: "三级甲等",
          address: "北京市东城区帅府园1号（东院）;西城区大木仓胡同41号（西院）",
          introduction:
            "北京协和医院是集医疗、教学、科研于一体的大型三级甲等综合医院......",
          orgId: "3"
        }
      ]
    };
  },

  methods: {
    onSubmit() {
      console.log("123");
    },
    details(orgId) {
      this.$router.push("/organizationmanage/orgdetails");
      console.log(orgId);
    }
  }
};
</script>
<style scoped lang="scss">
.content {
  width: 95%;
  max-height: 700px;
  overflow: auto;
  margin: auto;
}
.search {
  margin: 30px 0 0 5%;
  .searchLabel {
    font-size: 20px;
    font-weight: bold;
    color: #1c7e7c;
    margin-top: 20px;
  }
}
.card {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
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
    :hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
.underline {
  width: 90%;
  margin: 20px auto;
  clear: both;
}
.searchLine {
  width: 95%;
  margin: 5px auto 20px;
}
.footer {
  float: right;
  margin-right: 5%;
  .clear {
    height: 30px;
    clear: both;
  }
}
</style>

