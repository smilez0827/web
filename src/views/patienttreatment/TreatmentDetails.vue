<template>
  <div>
    <div class="mainContent">
      <div class="inputBox">
        <!-- 治疗方案输入框 -->
        <special-input
          :data="pages.treatmentCheckReconmendList"
          :flag="pages.inputBoxVisible.treatment"
          :preValue="newTreatmentLog.API_treatment"
          @blur="inputBoxBlur('treatment')"
          @select="inputBoxSelect($event,'treatment')"
          @delete="inputBoxDelete($event,'treatment')"
        ></special-input>

        <special-input
          :data="pages.treatmentCheckReconmendList"
          :flag="pages.inputBoxVisible.state"
          :preValue="newTreatmentLog.API_patientState"
          @blur="inputBoxBlur('state')"
          @select="inputBoxSelect($event,'state')"
          @delete="inputBoxDelete($event,'state')"
        ></special-input>
      </div>
      <el-collapse v-model="pages.collapse_activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <h3 class="title">基本信息</h3>
          </template>
          <PersonalInfo :prsonalInfo="patientInfo.API_basicInfo"></PersonalInfo>
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
              <div v-show="API_treatmentLog.length==0" class="tips">暂无治疗记录</div>
              <div
                v-for="item in showTable.slice((pages.currentPage-1)*pages.pageSize,(pages.currentPage-1)*pages.pageSize+pages.pageSize)"
                :key="item.id"
                class="card"
              >
                <div class="date">
                  <p>{{ new Date(item.API_date).toLocaleDateString()}}</p>
                </div>
                <div class="treatmentLog">
                  <p>患者状况：{{item.API_state||"暂无"}}</p>
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
    </div>
    <!-- 查看处方对话框 -->
    <el-dialog title="处方" :visible.sync="pages.prescriptionDialogVisible" width="700px">
      <PrescriptionTable :prescription="pages.tempPrescription"></PrescriptionTable>
    </el-dialog>
    <!-- 新增治疗记录对话框 -->
    <el-dialog title="新增治疗记录" :visible.sync="pages.addTreatmentLogDialogVisible" width="1000px">
      <NewTreatmentLog
        @flagChange="flagChange($event)"
        :newLog="newTreatmentLog"
        @inputBox="inputBoxShow($event)"
        @prescription="prescription($event)"
      ></NewTreatmentLog>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="postNewLog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPatientsDetails,
  newTreatmentLog
} from "../../api/patienttreatment/patienttreatment.js";
import Prescription from "../../components/common/Prescription.vue";
import SpecialInput from "../../components/common/SpecialInput.vue";
import NewTreatmentLog from "./components/NewTreatmentLog.vue";
import PersonalInfo from "./components/PersonalInfo.vue";
export default {
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
        prescriptionDialogVisible: false,
        addTreatmentLogDialogVisible: false,
        treatmentCheckReconmendList: [
          { pinyin: "jyjxbszl", value: "建议进行保守治疗" },
          { pinyin: "jyjxzyzl", value: "建议采用中药治疗" },
          { pinyin: "yjdyyjxjc", value: "推荐到医院进行检查" },
          { pinyin: "yjjxsszl", value: "建议到医院进行手术治疗" }
        ],
        checkList: [],
        tempPrescription: [],
        inputBoxVisible: {
          treatment: false,
          state: false
        }
      },
      patientInfo: {
        API_basicInfo: {}
      },
      API_treatmentLog: [],
      newTreatmentLog: {
        API_patientState: ["头疼", "眼花缭乱"],
        API_treatment: [],
        API_prescription: [],
        API_prescriptionFlag: true
      }
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
    flagChange(flag) {
      this.newTreatmentLog.API_prescriptionFlag = flag;
    },
    handleSizeChange(val) {
      this.pages.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pages.currentPage = val;
    },
    inputBoxShow(type) {
      switch (type) {
        case "state":
          this.inputBoxBlur("treatment");
          this.pages.inputBoxVisible.state = true;
          break;
        case "treatment":
          this.inputBoxBlur("state");
          this.pages.inputBoxVisible.treatment = true;
          break;
      }
    },
    inputBoxBlur(type) {
      switch (type) {
        case "state":
          this.pages.inputBoxVisible.state = false;
          break;
        case "treatment":
          this.pages.inputBoxVisible.treatment = false;
          break;
      }
    },
    inputBoxDelete(index, type) {
      switch (type) {
        case "state":
          this.newTreatmentLog.API_patientState.splice(index, 1);

          break;
        case "treatment":
          this.newTreatmentLog.API_treatment.splice(index, 1);

          break;
      }
    },
    inputBoxSelect(data, type) {
      switch (type) {
        case "state":
          this.newTreatmentLog.API_patientState.push(data);
          break;
        case "treatment":
          this.newTreatmentLog.API_treatment.push(data);
          break;
      }
    },
    postNewLog() {
      if (
        this.newTreatmentLog.API_treatment.length > 0 &&
        this.newTreatmentLog.API_prescriptionFlag
      ) {
        newTreatmentLog(localStorage.getItem("pid"), this.newTreatmentLog).then(
          res => {
            if (res) {
              this.$message.success("成功");
              getPatientsDetails(localStorage.getItem("pid")).then(res => {
                this.patientInfo.API_basicInfo = res.API_basicInfo;
                this.API_treatmentLog = res.API_treatmentLog;
                console.log(this.API_treatmentLog);
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
      console.log(data);
    },
    lookPrescription(data) {
      this.pages.prescriptionDialogVisible = true;
      this.pages.tempPrescription = data;
    }
  },
  mounted() {
    let pid = localStorage.getItem("pid");
    getPatientsDetails(pid).then(res => {
      console.log(res)
      this.patientInfo.API_basicInfo = res.API_basicInfo;
      this.API_treatmentLog = res.API_treatmentLog;
    });
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
