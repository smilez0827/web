<template>
  <div>
    <div class="card">
      <div class="pic">
        <img src="../../assets/img/medicalInfo/xiehe.png" alt />
      </div>
      <div class="info">
        <div class="form">
          <el-form status-icon label-width="100px" size="small">
            <el-form-item label="名称：">
              <el-input v-model="orgInfo.basicInfo.name" style="width:50%"></el-input>
            </el-form-item>
            <el-form-item label="等级：">
              <el-input v-model="orgInfo.basicInfo.class" style="width:50%"></el-input>
            </el-form-item>
            <el-form-item label="类型：">
              <el-input v-model="orgInfo.basicInfo.type" style="width:50%"></el-input>
            </el-form-item>
            <el-form-item label="医院地址：">
              <el-input v-model="orgInfo.basicInfo.address"></el-input>
            </el-form-item>
            <el-form-item label="联系方式：">
              <el-input v-model="orgInfo.basicInfo.tel"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button style="float:right" type="primary">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="tab">
      <el-tabs v-model="activeName">
        <!-- 医疗机构简介 -->
        <el-tab-pane label="简介" name="first">
          <el-input type="textarea" :rows="10" placeholder="请输入医院简介" v-model="orgInfo.introduction"></el-input>
          <el-button type="primary" style="float:right;margin-top:30px">保存</el-button>
        </el-tab-pane>

        <!-- 医疗医师管理 -->
        <el-tab-pane label="医师" name="second">
          <div>
            <div class="filter">
              <el-form :inline="true" :model="doc.searchRule" class="demo-form-inline">
                <el-form-item>
                  <template slot="label">
                    <span class="formLabel">姓名：</span>
                  </template>
                  <el-input v-model="doc.searchRule.name" placeholder="请输入姓名" style="width:150px"></el-input>
                </el-form-item>
                <el-form-item>
                  <template slot="label">
                    <span class="formLabel">科室：</span>
                  </template>
                  <el-select
                    v-model="doc.searchRule.department"
                    placeholder="请选择"
                    style="width:100px"
                  >
                    <el-option label="银行卡" value="银行卡"></el-option>
                    <el-option label="支付宝" value="支付宝"></el-option>
                    <el-option label="微信" value="微信"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="docReSet" style="margin-left:30px">重置</el-button>
                  <el-button type="success" @click="addDoctor" style="margin-left:30px">添加</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="eltable">
              <el-table
                :data="docShowTable.slice((doc.currentPage-1)*doc.pageSize,doc.currentPage*doc.pageSize)"
                style="width: 100%"
                border
                height="350"
                :cell-style="{'text-align':'center'}"
                :header-cell-style="{background:'#EFF3F4',color:'#1c7e7c','text-align':'center',  'font-size': '18px','font-weight': 'bold',}"
              >
                <el-table-column label="序号" width="80" type="index"></el-table-column>
                <el-table-column label="姓名">
                  <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="科室">
                  <template slot-scope="scope">
                    <span>{{ scope.row.department }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="账号">
                  <template slot-scope="scope">
                    <span>{{ scope.row.account }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="modifyDoctor(scope.row)"
                      style="margin-right:10%"
                    >修改</el-button>
                    <el-button size="mini" type="danger" @click="delDoctor(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="page">
              <div class="block">
                <el-pagination
                  @size-change="docSizeChange"
                  @current-change="docCurrentChange"
                  :current-page="doc.currentPage"
                  :page-sizes="[5, 10, 20]"
                  :page-size="doc.pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="docShowTable.length"
                ></el-pagination>
              </div>
            </div>
          </div>
          <div class="footer"></div>
        </el-tab-pane>

        <!-- 医疗护士管理 -->
        <el-tab-pane label="护士" name="third">
          <div>
            <div class="filter">
              <el-form :inline="true" :model="nur.searchRule" class="demo-form-inline">
                <el-form-item>
                  <template slot="label">
                    <span class="formLabel">姓名：</span>
                  </template>
                  <el-input v-model="nur.searchRule.name" placeholder="请输入姓名" style="width:150px"></el-input>
                </el-form-item>
                <el-form-item>
                  <template slot="label">
                    <span class="formLabel">科室：</span>
                  </template>
                  <el-select
                    v-model="nur.searchRule.department"
                    placeholder="请选择"
                    style="width:200px"
                  >
                  <el-option v-for="item in nurShowTable.departmentList" :key="item.id" :label="item" :value="item"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="nurReSet" style="margin-left:30px">重置</el-button>
                  <el-button type="success" @click="addNurse" style="margin-left:30px">添加</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="cardContainer" style="overflow:auto">
              <div
                v-for="(item,index) in nurShowTable.result.slice(0,this.nur.count)"
                :key="item.id"
                class="cardItem"
              >
                <el-card :body-style="{ padding: '0px' }">
                  <img :src="item.portrait" class="image" />
                  <div style="padding: 14px;">
                    <p>姓名：{{item.name}}</p>
                    <p>账号：{{item.account}}</p>
                    <div class="bottom clearfix">
                      <span class="time">{{ item.department }}</span>
                      <el-button
                        type="text"
                        @click="delNurse(index)"
                        class="button"
                        style="color:#F56C6C;margin-left:10px"
                      >删除</el-button>
                      <el-button type="text" @click="modifyNurse(index)" class="button">查看</el-button>
                    </div>
                  </div>
                </el-card>
              </div>
              <div v-if="this.nur.count<nurShowTable.result.length" class="cardItem">
                <div class="more">
                  <i @click="addNurShowCount" class="iconfont icon-more icon"></i>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>

      </el-tabs>
    </div>

    <!-- 添加医师对话框 -->
    <el-dialog title="添加医师" :visible.sync="doc.addDialogVisible" width="700px">
      <el-form>
        <el-form-item label="姓名：" label-width="100px">
          <el-input v-model="doc.addDialog.name"></el-input>
        </el-form-item>
        <el-form-item label="账号：" label-width="100px">
          <el-input v-model="doc.addDialog.account"></el-input>
        </el-form-item>
        <el-form-item label="密码：" label-width="100px">
          <el-input v-model="doc.addDialog.password"></el-input>
        </el-form-item>
        <el-form-item label="科室：" label-width="100px">
          <el-select v-model="doc.addDialog.department" placeholder="请选择所属科室" style="width:100%">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="doc.addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doc.addDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 删除医师对话框 -->
    <el-dialog title="删除医师用户" :visible.sync="doc.delDialogVisible" width="30%">
      <span>您确定要删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="doc.delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDocDel">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改医师对话框 -->
    <el-dialog title="添加医师" :visible.sync="doc.modifyDialogVisible" width="700px">
      <el-form>
        <el-form-item label="姓名：" label-width="100px">
          <el-input v-model="doc.modifyDialog.name"></el-input>
        </el-form-item>
        <el-form-item label="账号：" label-width="100px">
          <el-input v-model="doc.modifyDialog.account"></el-input>
        </el-form-item>
        <el-form-item label="密码：" label-width="100px">
          <el-input v-model="doc.modifyDialog.password"></el-input>
        </el-form-item>
        <el-form-item label="科室：" label-width="100px">
          <el-select v-model="doc.modifyDialog.department" placeholder="请选择所属科室" style="width:100%">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="doc.modifyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doc.modifyDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加护士对话框 -->
    <el-dialog title="添加护士" :visible.sync="nur.addDialogVisible" width="700px">
      <el-form>
        <el-form-item label="姓名：" label-width="100px">
          <el-input v-model="nur.addDialog.name"></el-input>
        </el-form-item>
        <el-form-item label="账号：" label-width="100px">
          <el-input v-model="nur.addDialog.account"></el-input>
        </el-form-item>
        <el-form-item label="密码：" label-width="100px">
          <el-input v-model="nur.addDialog.password"></el-input>
        </el-form-item>
        <el-form-item label="科室：" label-width="100px">
          <el-select v-model="nur.addDialog.department" placeholder="请选择所属科室" style="width:100%">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="nur.addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="nur.addDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 删除护士对话框 -->
    <el-dialog title="删除护士用户" :visible.sync="nur.delDialogVisible" width="30%">
      <span>您确定要删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="nur.delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmNusDel()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改护士对话框 -->
    <el-dialog title="修改护士" :visible.sync="nur.modifyDialogVisible" width="700px">
      <el-form>
        <el-form-item label="姓名：" label-width="100px">
          <el-input v-model="nur.modifyDialog.name"></el-input>
        </el-form-item>
        <el-form-item label="账号：" label-width="100px">
          <el-input v-model="nur.modifyDialog.account"></el-input>
        </el-form-item>
        <el-form-item label="密码：" label-width="100px">
          <el-input v-model="nur.modifyDialog.password"></el-input>
        </el-form-item>
        <el-form-item label="科室：" label-width="100px">
          <el-select v-model="nur.modifyDialog.department" placeholder="请选择所属科室" style="width:100%">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="nur.modifyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="nur.modifyDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
  // import Deatails from "./js/Details.js";
export default {
  name: "Deatails",
  data() {
    return {
      currentDate: new Date(),
      doc: {
        searchRule: {
          name: "",
          department: ""
        },
        currentPage: 1,
        pageSize: 5,
        addDialogVisible: false,
        addDialog: {
          name: "",
          account: "",
          password: "",
          department: ""
        },
        delDialogVisible: false,
        modifyDialogVisible: false,
        modifyDialog: {
          name: "",
          account: "",
          password: "",
          department: ""
        },
        targetRow: {}
      },
      nur: {
        searchRule: {
          name: "",
          department: ""
        },
        addDialogVisible: false,
        addDialog: {
          name: "",
          account: "",
          password: "",
          department: ""
        },
        delDialogVisible: false,
        modifyDialogVisible: false,
        modifyDialog: {
          name: "",
          account: "",
          password: "",
          department: ""
        },
        targetRow: {},
        count: 10,
      },

      activeName: "third",
      orgInfo: {
        basicInfo: {
          name: "北京协和医院",
          class: "三级甲等",
          type: "综合医院",
          address: "北京市东城区帅府园1号（东院）;西城区大木仓胡同41号（西院）",
          tel: "010-67096611(总机)"
          // pic: require("../../assets/img/medicalInfo/xiehe.png")
        },
        introduction: `首都医科大学附属北京天坛医院始建于1956年8月23日，首都医科大学附属北京天坛医院始建于1956年8月23日，首都医科大学附属北京天坛医院始建于1956年8月23日，首都医科大学附属北京天坛医院始建于1956年8月23日，首都医科大学附属北京天坛医院始建于1956年8月23日，`,
        doctors: [
          {
            name: "张三",
            account: "19984333897",
            department: "支付宝",
            docId: "1"
          },
          {
            name: "张三",
            account: "19984333897",
            department: "支付宝",
            docId: "1"
          },
          {
            name: "张三",
            account: "19984333897",
            department: "支付宝",
            docId: "1"
          },
          {
            name: "张三",
            account: "19984333897",
            department: "支付宝",
            docId: "1"
          },
          {
            name: "张三",
            account: "19984333897",
            department: "支付宝",
            docId: "1"
          },
          {
            name: "张三",
            account: "19984333897",
            department: "银行卡",
            docId: "1"
          },
          {
            name: "张三",
            account: "19984333897",
            department: "微信",
            docId: "1"
          }
        ],
        nurses: [
          {
            name: "王五",
            account: "19984333897",
            department: "肝胆外科",
            docId: "1",
            portrait: require("../../assets/img/personalInfo/profile.png")
          },
          {
            name: "王五",
            account: "19984333897",
            department: "肝胆外科",
            docId: "1",
            portrait: require("../../assets/img/personalInfo/profile.png")
          },
          {
            name: "王五",
            account: "19984333897",
            department: "肝胆外科",
            docId: "1",
            portrait: require("../../assets/img/personalInfo/profile.png")
          },
          {
            name: "王五",
            account: "19984333897",
            department: "肝胆外科",
            docId: "1",
            portrait: require("../../assets/img/personalInfo/profile.png")
          },
          {
            name: "王五",
            account: "19984333897",
            department: "肝胆外科",
            docId: "1",
            portrait: require("../../assets/img/personalInfo/profile.png")
          },
          {
            name: "王五",
            account: "19984333897",
            department: "肝胆外科",
            docId: "1",
            portrait: require("../../assets/img/personalInfo/profile.png")
          },
          {
            name: "王五",
            account: "19984333897",
            department: "肝胆外科",
            docId: "1",
            portrait: require("../../assets/img/personalInfo/profile.png")
          },
          {
            name: "王五",
            account: "19984333897",
            department: "肝胆外科",
            docId: "1",
            portrait: require("../../assets/img/personalInfo/profile.png")
          },
          {
            name: "王五",
            account: "19984333897",
            department: "肝胆外科",
            docId: "1",
            portrait: require("../../assets/img/personalInfo/profile.png")
          },
          {
            name: "王五",
            account: "19984333897",
            department: "肝胆外科",
            docId: "1",
            portrait: require("../../assets/img/personalInfo/profile.png")
          },
          {
            name: "王五",
            account: "19984333897",
            department: "肝胆外科",
            docId: "1",
            portrait: require("../../assets/img/personalInfo/profile.png")
          },
          {
            name: "王五",
            account: "19984333897",
            department: "肝胆外科",
            docId: "1",
            portrait: require("../../assets/img/personalInfo/profile.png")
          },
          {
            name: "王五",
            account: "19984333897",
            department: "肝胆外科",
            docId: "1",
            portrait: require("../../assets/img/personalInfo/profile.png")
          },
          {
            name: "王五",
            account: "19984333897",
            department: "肝胆外科",
            docId: "1",
            portrait: require("../../assets/img/personalInfo/profile.png")
          },
          {
            name: "王五",
            account: "19984333897",
            department: "肝胆外科",
            docId: "1",
            portrait: require("../../assets/img/personalInfo/profile.png")
          },
          {
            name: "王五",
            account: "19984333897",
            department: "肝胆外科",
            docId: "1",
            portrait: require("../../assets/img/personalInfo/profile.png")
          },
          {
            name: "王五",
            account: "19984333897",
            department: "肝胆外科",
            docId: "1",
            portrait: require("../../assets/img/personalInfo/profile.png")
          },
          {
            name: "王五",
            account: "19984333897",
            department: "肝胆外科",
            docId: "1",
            portrait: require("../../assets/img/personalInfo/profile.png")
          },
          {
            name: "王五",
            account: "19984333897",
            department: "肝胆外科",
            docId: "1",
            portrait: require("../../assets/img/personalInfo/profile.png")
          },
          {
            name: "赵四",
            account: "19984333897",
            department: "神经外科",
            docId: "1",
            portrait: require("../../assets/img/personalInfo/profile.png")
          },
          {
            name: "赵四",
            account: "19984333897",
            department: "神经内科",
            docId: "1",
            portrait: require("../../assets/img/personalInfo/profile.png")
          },
          {
            name: "赵四",
            account: "19984333897",
            department: "脑科",
            docId: "1",
            portrait: require("../../assets/img/personalInfo/profile.png")
          },
          {
            name: "赵四",
            account: "19984333897",
            department: "神经内科",
            docId: "1",
            portrait: require("../../assets/img/personalInfo/profile.png")
          },
          {
            name: "张三",
            account: "19984333897",
            department: "神经外科",
            docId: "1",
            portrait: require("../../assets/img/personalInfo/profile.png")
          },
          {
            name: "张三",
            account: "19984333897",
            department: "神经外科",
            docId: "1",
            portrait: require("../../assets/img/personalInfo/profile.png")
          }
        ]
      }
    };
  },
  computed: {
    docShowTable: function() {
      let result = [];
      this.orgInfo.doctors.forEach(data => {
        if (
          (!this.doc.searchRule.name ||
            data.name == this.doc.searchRule.name) &&
          (!this.doc.searchRule.department ||
            data.department == this.doc.searchRule.department)
        ) {
          result.push(data);
        }
      });

      return result;
    },
    nurShowTable: function() {
      let result = [];
      let departmentList=[];
      this.orgInfo.nurses.forEach(data => {
        if(departmentList.indexOf(data.department)==-1){
          departmentList.push(data.department)
        }
        if (
          (!this.nur.searchRule.name ||
            data.name == this.nur.searchRule.name) &&
          (!this.nur.searchRule.department ||
            data.department == this.nur.searchRule.department)
        ) {
          result.push(data);
        }
      });
      return {result:result,departmentList:departmentList};
    }
  },
  methods: {
    docReSet() {
      (this.doc.searchRule.name = ""), (this.doc.searchRule.department = "");
    },
    docSizeChange(val) {
      this.doc.pageSize = val;
    },
    docCurrentChange(val) {
      this.doc.currentPage = val;
    },
    addDoctor() {
      this.doc.addDialogVisible = true;
    },
    delDoctor(data) {
      this.doc.delDialogVisible = true;
      this.doc.targetRow = data;
    },
    confirmDocDel() {
      //缺认删除医师
      console.log(this.doc.targetRow);
      this.doc.delDialogVisible = false;
    },
    modifyDoctor(data) {
      console.log(data);
      this.doc.modifyDialogVisible = true;
      this.doc.targetRow = data;
      this.doc.modifyDialog = data;
    },
    confirmDocmodify() {
      //缺认修改医师
      console.log(this.doc.targetRow);
      this.doc.modifyDialogVisible = false;
    },
    nurReSet() {
      (this.nur.searchRule.name = ""), (this.nur.searchRule.department = "");
      this.nur.count=10
    },
    addNurShowCount() {
      this.nur.count += 10;
    },
    addNurse() {
      this.nur.addDialogVisible = true;
    },
    delNurse(index) {
      this.nur.delDialogVisible = true;
      this.nur.targetRow = this.orgInfo.nurses[index];
    },
    confirmNusDel() {
      //缺认删除护士
      console.log(this.nur.targetRow);
      this.nur.delDialogVisible = false;
    },
    modifyNurse(index) {
      this.nur.modifyDialogVisible = true;
      this.nur.targetRow = this.orgInfo.nurses[index];
      this.nur.modifyDialog = this.orgInfo.nurses[index];
    },
    confirmNurmodify() {
      //缺认修改护士
      console.log(this.nur.targetRow);
      this.nur.modifyDialogVisible = false;
    }
  },
  mounted() {}
};
</script >

<style scoped lang="scss">
.card {
  width: 95%;
  height: 300px;
  margin: 20px auto 10px;
  display: flex;
  .pic {
    width: 250px;
    height: 100%;
    margin-left: 30px;
    margin-right: 30px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    width: 80%;
    height: 280px;
    margin-right: 30px;
    margin-top: 20px;
  }
  .title {
    font-size: 24px;
    font-weight: bold;
    color: #1c7e7c;
    margin-bottom: 15px;
  }
}
.tab {
  width: 90%;
  height: 300px;
  margin: auto;

  .cardContainer {
    display: flex;
    flex-wrap: wrap;
    .cardItem {
      width: 200px;
      height: 300px;
      margin: 20px 15px 0px;
      p {
        font-size: 15px;
        color: #606266;
        margin-bottom: 10px;
      }
      .more {
        text-align: center;
        .icon {
          font-size: 80px;
          color: #c0c4cc;
          line-height: 300px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>

<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 70%;
  display: block;
  margin: 20px auto;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>