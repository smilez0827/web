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
      </div>
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
                <div>姓名：{{patientInfo.API_basicInfo.API_name||"无"}}</div>
                <div>性别：{{patientInfo.API_basicInfo.API_gender||"无"}}</div>
                <div>出生日期：{{new Date(patientInfo.API_basicInfo.API_birthday||"无").toLocaleDateString()}}</div>
              </div>
              <div>
                <div>家庭住址：{{patientInfo.API_basicInfo.API_address||"无"}}</div>
              </div>
              <div>
                <div>联系方式：{{patientInfo.API_basicInfo.API_tel||"无"}}</div>
                <div>就诊时间：{{patientInfo.API_basicInfo.API_date||"无"}}</div>
                <div>
                  <!-- <el-link type="primary" style="margin-right:20px">诊断记录</el-link>
                  <el-link type="primary" style="margin-right:20px">查房记录</el-link>-->
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
                  <p>患者治疗：{{item.API_description.join(',')||"暂无"}}</p>
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
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="pages.prescriptionDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增治疗记录对话框 -->
    <el-dialog title="新增治疗记录" :visible.sync="pages.addTreatmentLogDialogVisible" width="1000px">
      <div class="box" @click="inputBoxShow()">
        <p>{{newTreatmentLog.API_treatment.join('，')||"暂无"}}</p>
      </div>
      <div>
        <prescription-edit @flagChange="flagChange" v-model="newTreatmentLog.API_prescription"></prescription-edit>
      </div>
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
import CheckBox from "../../components/common/CheckBox.vue";
import SpecialInput from "../../components/common/SpecialInput.vue";
import PrescriptionEdit from "../../components/common/PrescriptionEdit.vue";
export default {
  components: {
    PrescriptionTable: Prescription,
    CheckBox: CheckBox,
    SpecialInput: SpecialInput,
    PrescriptionEdit: PrescriptionEdit
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
          treatment: false
        }
      },
      patientInfo: {
        API_basicInfo: {}
      },
      API_treatmentLog: [],
      newTreatmentLog: {
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
    inputBoxShow() {
      this.pages.inputBoxVisible.treatment = true;
    },
    inputBoxBlur() {
      this.pages.inputBoxVisible.treatment = false;
    },
    inputBoxDelete(index) {
      this.newTreatmentLog.API_treatment.splice(index, 1);
    },
    inputBoxSelect(data) {
      this.newTreatmentLog.API_treatment.push(data);
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
    lookPrescription(data) {
      this.pages.prescriptionDialogVisible = true;
      this.pages.tempPrescription = data;
    }
  },
  mounted() {
    let pid = localStorage.getItem("pid");
    getPatientsDetails(pid).then(res => {
      this.patientInfo.API_basicInfo = res.API_basicInfo;
      this.API_treatmentLog = res.API_treatmentLog;
      console.log(this.patientInfo);
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
.box {
  width: 100%;
  min-height: 80px;
  margin-top: 5px;
  border: 1px solid #e4e7ed;
  p {
    margin-top: 5px;
    font-size: 18px;
    text-indent: 20px;
  }
}
.inputBox {
  position: fixed;
  bottom: 0px;
  left: calc(50% - 500px);
  width: 1000px;
  z-index: 3000;
  transition: 0.5s;
}
.tips {
  margin-top: 20px;
  font-size: 18px;
}
</style>
