<template>
  <div>
    <div class="mainContent">
      <el-collapse v-model="pages.collapse_activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <h3 class="title">基本信息</h3>
          </template>
          <PersonalInfo></PersonalInfo>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <h3 class="title">查房记录</h3>
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
                @click="pages.questionnaire.chooseDialogVisible=true"
                type="success"
              >新增</el-button>
            </div>
            <div class="treatmentLog">
              <div v-show="API_treatmentLog&&API_treatmentLog.length==0" class="tips">暂无护理记录</div>
              <div
                v-for="item in showTable.slice((pages.currentPage-1)*pages.pageSize,(pages.currentPage-1)*pages.pageSize+pages.pageSize)"
                :key="item.id"
                class="card"
              >
                <div class="date">
                  <p>{{ new Date(item.API_date).toLocaleDateString()}}</p>
                </div>
                <div class="treatmentLog">
                  <p>患者状况：{{item.API_patientState.join(',')||"暂无"}}</p>
                  <p>治疗意见：{{item.API_description.join(',')||"暂无"}}</p>
                  <div v-if="item.API_prescription.length>0">
                    <el-link @click="lookPrescription(item.API_prescription)" type="primary">查看处方</el-link>
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

      <!-- 问卷类型选择对话框 -->
      <el-dialog
        title="请选择量表类型"
        :modal="false"
        :visible.sync="pages.questionnaire.chooseDialogVisible"
        top="35vh"
        width="300px"
      >
        <el-select v-model="pages.questionnaire.target" placeholder="请选择">
          <el-option
            v-for="item in pages.questionnaire.questionnaireOptions"
            :key="item.value"
            :value="item"
          ></el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirmQuestionnaire">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 问卷选择对话框 -->
      <el-dialog
        title="吞咽风险评估表"
        :modal="false"
        :visible.sync="pages.questionnaire.questionnaireDialogVisible"
        width="600px"
      >
        <!-- <DIEDAO></DIEDAO> -->
        <!-- <TUNYAN></TUNYAN> -->
        <HULI></HULI>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            @click="pages.questionnaire.questionnaireDialogVisible = false"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Prescription from "../../components/common/Prescription.vue";
import SpecialInput from "../../components/common/SpecialInput.vue";
import NewTreatmentLog from "./components/NewTreatmentLog.vue";
import PersonalInfo from "./components/PersonalInfo.vue";
import questionnaire from "./questionnaires/mixin.js";
export default {
  mixins: [questionnaire],
  components: {
    PrescriptionTable: Prescription,
    SpecialInput: SpecialInput,
    PersonalInfo: PersonalInfo,
    NewTreatmentLog: NewTreatmentLog
  },
  data() {
    return {
      pages: {
        pageSize: 5,
        currentPage: 1,
        collapse_activeNames: ["1", "2"],
        search: {
          API_name: "",
          API_state: "",
          API_dateRange: ""
        },
        questionnaire: {
          chooseDialogVisible: false,
          questionnaireDialogVisible: true,
          target: "",
          questionnaireOptions: ["吞咽功能评定", "跌掉风险评定"]
        },
        stateOptions: [],
        tempPrescription: []
      },
      patientInfo: {
        API_basicInfo: {}
      },
      API_treatmentLog: []
    };
  },
  computed: {
    showTable() {
      let result = [];
      this.API_treatmentLog.forEach(item => {
        if (
          !this.pages.search.API_dateRange ||
          (item.API_date > this.pages.search.API_dateRange[0] &&
            item.API_date < this.pages.search.API_dateRange[1])
        ) {
          result.push(item);
        }
      });
      result.sort((a, b) => {
        let time1 = new Date(a.API_date).getTime();
        let time2 = new Date(b.API_date).getTime();
        return time2 - time1;
      });
      return result;
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pages.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pages.currentPage = val;
    },
    confirmQuestionnaire() {
      this.pages.questionnaire.chooseDialogVisible = false;
      this.pages.questionnaire.questionnaireDialogVisible = true;
    },
    postNewLog() {
      if (this.newTreatmentLog.API_treatment.length > 0) {
        newTreatmentLog(localStorage.getItem("pid"), this.newTreatmentLog).then(
          res => {
            if (res) {
              this.$message.success("成功");
              getPatientsDetails(localStorage.getItem("pid")).then(res => {
                this.patientInfo.API_basicInfo = res.API_basicInfo;
                this.API_treatmentLog = res.API_treatmentLog;
              });
            }
          }
        );
        this.pages.addTreatmentLogDialogVisible = false;
        this.newTreatmentLog = {
          API_treatment: [],
          API_prescription: []
        };
      } else {
        this.$message.error("请完善治疗记录");
      }
    },
    prescription(data) {
      this.newTreatmentLog.API_prescription = data;
    },
    lookPrescription(data) {
      this.pages.prescriptionDialogVisible = true;
      this.pages.tempPrescription = data;
    }
  },
  mounted() {
    // getPatientsDetails(pid).then(res => {
    //   this.patientInfo.API_basicInfo = res.API_basicInfo;
    //   this.API_treatmentLog = res.API_treatmentLog;
    // });
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
      background-color: #eff3f4;
      border-radius: 5px;
      padding: 15px;
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

.inputBox {
  position: fixed;
  left: 240px;
  bottom: 0px;
  width: calc(95% - 240px);
  z-index: 3000;
  transition: 0.5s;
}

.tips {
  margin-top: 20px;
  font-size: 18px;
}
</style>
