<template>
  <div>
    <div class="mainContent">
      <el-collapse v-model="pages.collapse_activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <h3 class="title">基本信息</h3>
          </template>
          <div class="basicInfo clearfix">
            <div class="pic">
              <img :src="patientInfo.API_basicInfo.API_pic" alt />
            </div>
            <div class="info">
              <div>
                <div>姓名：{{patientInfo.API_basicInfo.API_name}}</div>
                <div>性别：{{patientInfo.API_basicInfo.API_gender}}</div>
                <div>出生日期：{{new Date(patientInfo.API_basicInfo.API_birthday).toLocaleDateString()}}</div>
              </div>
              <div>
                <div>家庭住址：{{patientInfo.API_basicInfo.API_address}}</div>
              </div>
              <div>
                <div>联系方式：{{patientInfo.API_basicInfo.API_tel}}</div>
                <div>就诊时间：{{patientInfo.API_basicInfo.API_date}}</div>
                <div>
                  <el-link type="primary" style="margin-right:20px">诊断记录</el-link>
                  <el-link type="primary" style="margin-right:20px">查房记录</el-link>
                </div>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <h3 class="title">治疗记录</h3>
          </template>
          <div class="container">
            <div class="search">
              <span class="formLabel">时间：</span>
              <el-date-picker
                v-model="pages.search.API_dateRange"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>

              <el-button
                class="addbtn"
                @click="pages.addTreatmentLogDialogVisible=true"
                type="success"
              >新增</el-button>
            </div>
            <div class="treatmentLog">
              <div v-for="item in API_treatmentLog" :key="item.id" class="card">
                <div class="date">
                  <p>2020/7/7</p>
                </div>
                <div class="treatmentLog">
                  <p>患者症状：{{item.API_state}}</p>
                  <p>患者治疗：{{item.API_treatment}}</p>
                  <div v-if="item.API_prescription.length>0">
                    <el-link @click="pages.prescriptionDialogVisible = true" type="primary">查看处方</el-link>
                  </div>
                </div>
              </div>
            </div>
            <div class="page clearfix">
              <div class="block">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="pages.currentPage"
                  :page-sizes="[5, 10, 20]"
                  :page-size="pages.pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="showTable.length"
                ></el-pagination>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <!-- 查看处方对话框 -->
    <el-dialog title="处方" :visible.sync="pages.prescriptionDialogVisible" width="700px">
      <PrescriptionTable :prescription="API_treatmentLog[0].API_prescription"></PrescriptionTable>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="pages.prescriptionDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增治疗记录对话框 -->
    <el-dialog title="新增治疗记录" :visible.sync="pages.addTreatmentLogDialogVisible" width="1000px">
      <!-- <PrescriptionTable :prescription="API_treatmentLog[0].API_prescription"></PrescriptionTable> -->
      <check-box
        :options="pages.treatmentCheckReconmendList"
        :checked="pages.checkList"
        v-model="pages.checkList"
      ></check-box>
      <div>
        <el-link
          v-if="this.pages.tempPrescription==0"
          @click="addMedical"
          class="addprescription"
          type="success"
        >+添加处方</el-link>
        <div v-else>
          <el-table size="mini" :data="pages.tempPrescription" style="width: 100%">
            <el-table-column label="名称">
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.isEditable"
                  v-model="scope.row.API_drugsName"
                  style="width:100%;hight:100%"
                ></el-input>
                <span v-else>{{ scope.row.API_drugsName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="数量">
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.isEditable"
                  v-model="scope.row.API_drugsNumber"
                  style="width:100%;hight:100%"
                ></el-input>
                <span v-else>{{ scope.row.API_drugsNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column label="单位">
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.isEditable"
                  v-model="scope.row.API_drugsNumberUnits"
                  style="width:100%;hight:100%"
                ></el-input>
                <span v-else>{{ scope.row.API_drugsNumberUnits }}</span>
              </template>
            </el-table-column>
            <el-table-column label="用法">
              <template slot-scope="scope">
                <el-select
                  v-if="scope.row.isEditable"
                  v-model="scope.row.API_drugsUsage"
                  placeholder="请选择"
                >
                  <el-option value="口服"></el-option>
                  <el-option value="外用"></el-option>
                </el-select>
                <span v-else>{{ scope.row.API_drugsUsage }}</span>
              </template>
            </el-table-column>
            <el-table-column label="频率">
              <template slot-scope="scope">
                <el-select
                  v-if="scope.row.isEditable"
                  v-model="scope.row.API_useFrequency"
                  placeholder="请选择"
                >
                  <el-option value="一天一次"></el-option>
                  <el-option value="一天两次"></el-option>
                  <el-option value="一天三次"></el-option>
                </el-select>
                <span v-else>{{ scope.row.API_useFrequency }}</span>
              </template>
            </el-table-column>
            <el-table-column label="使用时间">
              <template slot-scope="scope">
                <el-select
                  v-if="scope.row.isEditable"
                  v-model="scope.row.API_useTime"
                  placeholder="请选择"
                >
                  <el-option value="饭前"></el-option>
                  <el-option value="饭后"></el-option>
                  <el-option value="均可"></el-option>
                </el-select>
                <span v-else>{{ scope.row.API_useTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150px">
              <template slot-scope="scope">
                <el-button
                  v-if="!scope.row.isEditable"
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button>
                <el-button v-else size="mini" @click="handleSave(scope.$index, scope.row)">确定</el-button>
                <el-button size="mini" type="danger" @click="delMedical(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="width:100px ;margin:20px auto">
            <el-link @click="addMedical" type="primary">+添加药品</el-link>
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="pages.addTreatmentLogDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getTodayPatients } from "../../api/patientdiag/patientdiag.js";
import Prescription from "../../components/common/Prescription.vue";
import CheckBox from "../../components/common/CheckBox.vue";

export default {
  components: {
    PrescriptionTable: Prescription,
    CheckBox: CheckBox
  },
  data() {
    return {
      pages: {
        pageSize: 10,
        currentPage: 1,
        collapse_activeNames: ["1", "2"],
        search: {
          API_name: "",
          API_state: "",
          API_dateRange: ""
        },
        prescriptionDialogVisible: false,
        addTreatmentLogDialogVisible: true,
        treatmentCheckReconmendList: [
          { pinyin: "jyjxbszl", value: "建议进行保守治疗" },
          { pinyin: "jyjxzyzl", value: "建议采用中药治疗" },
          { pinyin: "yjdyyjxjc", value: "推荐到医院进行检查" },
          { pinyin: "yjjxsszl", value: "建议到医院进行手术治疗" }
        ],
        checkList: [],
        tempPrescription: []
      },
      patientInfo: {
        // 患者基本信息
        API_basicInfo: {
          API_pic: require("../../assets/img/default/person.png"),
          API_name: "王小虎",
          API_gender: "男",
          API_birthday: "1996-07-23",
          API_address: "四川省成都市",
          API_tel: "19999999999",
          API_date: "2020-06-24"
        }
      },
      API_treatmentLog: [
        {
          API_state: "记忆力下降，语言混乱",
          API_treatment: "西药治疗",
          API_prescription: [
            {
              API_drugsName: "含曲林片",
              API_drugsNumberUnits: "盒",
              API_drugsNumber: "2",
              API_drugsUsage: "一次两粒",
              API_useFrequency: "一天一次",
              API_useTime: "饭后",
              API_isEditable: false,
              API_days: "7"
            }
          ]
        },
        {
          API_state: "1",
          API_treatment: "2",
          API_prescription: []
        },
        {
          API_state: "1",
          API_treatment: "2",
          API_prescription: []
        }
      ]
    };
  },
  computed: {
    showTable() {
      return this.API_treatmentLog;
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pages.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pages.currentPage = val;
    },
    addMedical() {
      this.pages.tempPrescription.push({
        name: "",
        specification: "",
        number: "",
        usage: "",
        frequency: "",
        isEditable: true,
        days: ""
      });
    }
  }
};
</script>

<style scoped lang="scss">
.mainContent {
  width: 95%;
  height: 100%;
  margin: 20px auto;
  .title {
    font-size: 20px;
    color: #1c7e7c;
  }
  .basicInfo {
    padding-left: 20px;
    padding-top: 20px;
    .pic {
      width: 170px;
      height: 150px;
      border-right: 1px solid #d9d9d9;
      padding-right: 20px;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
      }
      margin: auto;
      float: left;
    }
    .info {
      float: left;
      margin-left: 20px;
      width: 70%;
      height: 130px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      div {
        display: flex;
        justify-content: space-between;
        font-size: 18px;
      }
    }
  }
  .btn {
    float: right;
    margin-top: 50px;
    margin-bottom: 50px;
    margin-right: 50px;
    width: 120px;
  }
}
.clearfix:after {
  content: ""; /*设置内容为空*/
  height: 0; /*高度为0*/
  line-height: 0; /*行高为0*/
  display: block; /*将文本转为块级元素*/
  visibility: hidden; /*将元素隐藏*/
  clear: both; /*清除浮动*/
}
.drag {
  width: 300px;
  position: absolute;
  top: 30%;
  left: calc(50% - 150px);
  span {
    z-index: 100;
    position: absolute;
    top: 0px;
    right: 10px;
    color: white;
    cursor: pointer;
  }
}
.container {
  width: 95%;
  margin: auto;
  .search {
    .formLabel {
      font-size: 20px;
      color: #1c7e7c;
    }
    .addbtn {
      // float: right;
      margin-left: 20px;
      width: 90px;
    }
  }
  .treatmentLog {
    .card {
      width: 95%;
      margin: auto;
      display: flex;
      margin-top: 20px;
      .date {
        font-size: 18px;
        color: #1c7e7c;
      }
      .treatmentLog {
        margin-left: 30px;
        font-size: 18px;
      }
    }
  }
  .page {
    width: 95%;
    .block {
      float: right;
    }
  }
}
.addprescription {
  margin-top: 20px;
  font-size: 18px;
}
</style>
