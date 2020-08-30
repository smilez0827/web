<template>
  <div>
    <div class="mainContent">
      <el-collapse v-model="pages.collapse_activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <h3 class="title">基本信息</h3>
          </template>
          <personal-info :prsonalInfo="patientInfo.API_basicInfo"></personal-info>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <h3 class="title">病情概况</h3>
          </template>
          <ill-state
            :illState="this.patientInfo.API_illState"
            @modify="inputBoxShow('illState')"
            @vedio="videoPlay($event)"
          ></ill-state>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <h3 class="title">患者病史</h3>
          </template>
          <div class="history">
            <p>既往史：{{this.patientInfo.API_history.API_patientHistory||"暂无"}}</p>
            <p>家族史：{{this.patientInfo.API_history.API_familyHistory||"暂无"}}</p>
            <p>过敏史：{{this.patientInfo.API_history.API_allergyHistory||"暂无"}}</p>
          </div>
        </el-collapse-item>
        <el-collapse-item name="4">
          <template slot="title">
            <h3 class="title">检查结果</h3>
          </template>
          <ExamingResult :examInfo="this.patientInfo.API_examResult"></ExamingResult>
          <!-- <div class="examResult">
            <span v-if="patientInfo.API_examResult.length==0" class="textdefault">{{"无"}}</span>
            <el-tabs v-else type="card" value="0">
              <el-tab-pane
                v-for="(item,index) in patientInfo.API_examResult"
                :key="item.id"
                :name="index+''"
              >
                <template slot="label">检查{{pages.nums[index+1]}}</template>
                <template v-if="item.API_type=='img'">
                  <div class="imgExam">
                    <div class="img">
                      <el-image
                        style="width: 500px;"
                        :src="item.API_img"
                        :preview-src-list="[item.API_img]"
                      >
                        <div slot="placeholder" class="image-slot">
                          加载中
                          <span class="dot">...</span>
                        </div>
                      </el-image>
                    </div>
                    <div class="info">
                      <div>
                        <span class="label">智能诊断</span>
                      </div>
                      <div>
                        <p class="text">{{item.API_aiResult}}</p>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-if="item.API_type=='table'">
                  <div class="tableExam">
                    <div class="table">
                      <el-table
                        size="mini"
                        max-height="350px"
                        :data="item.API_table.API_data"
                        style="width: 100%"
                      >
                        <el-table-column prop="API_item" label="项目"></el-table-column>
                        <el-table-column label>
                          <template slot-scope="scope">
                            <i
                              v-if="scope.row.API_result<scope.row.API_rangeBottom"
                              class="el-icon-bottom"
                            ></i>
                            <i
                              v-if="scope.row.API_result>scope.row.API_rangeTop"
                              class="el-icon-top"
                            ></i>
                          </template>
                        </el-table-column>
                        <el-table-column prop="API_result" label="结果"></el-table-column>
                        <el-table-column prop="API_unit" label="单位"></el-table-column>
                        <el-table-column label="参考范围">
                          <template slot-scope="scope">
                            <span>{{scope.row.API_rangeBottom+"~"+scope.row.API_rangeTop}}</span>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                    <div class="pic">
                      <el-image
                        style="width:100%;"
                        :src="item.API_img"
                        :preview-src-list="[item.API_img]"
                      ></el-image>
                    </div>
                  </div>
                </template>
              </el-tab-pane>
            </el-tabs>
          </div>-->
        </el-collapse-item>
        <el-collapse-item name="5">
          <template slot="title">
            <h3 class="title">诊断结论</h3>
          </template>
          <div class="diagResult">
            <div class="head clearfix">
              <!-- <div class="checkBox">
                <el-checkbox-group v-model="API_diagInfo.API_diagResult">
                  <el-checkbox
                    v-for="item in pages.diagResultCheckReconmendList.slice(0,2)"
                    :key="item.id"
                    :label="item.value"
                  ></el-checkbox>
                </el-checkbox-group>
              </div>-->
              <div class="more">
                <!-- <el-link @click="diagResultModify" class="link" type="success">更多选项</el-link> -->
                <el-link
                  @click="pages.HistoryDialogVisable=true"
                  class="link"
                  type="success"
                >+导入诊断结论</el-link>
              </div>
            </div>
            <div class="text">
              <div class="box" @click="inputBoxShow('diagResult')">
                <p>{{API_diagInfo.API_diagResult.join("，")||"暂无"}}</p>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="6">
          <template slot="title">
            <h3 class="title">治疗方案</h3>
          </template>
          <div class="diagResult">
            <div class="head clearfix">
              <div class="more">
                <el-link
                  @click="pages.HistoryTreatmentDialogVisable=true"
                  class="link"
                  type="success"
                >+导入治疗方案</el-link>
              </div>
            </div>
            <div class="text">
              <div @click="inputBoxShow('treatment')" class="box">
                <p>{{API_diagInfo.API_treatment.API_description.join("，")||"暂无"}}</p>
              </div>
            </div>
            <div class="prescription">
              <div v-show="API_diagInfo.API_treatment.API_prescription.length>0">
                <span class="label">处方</span>
                <el-link type="danger" @click="delPrescription" style="float:right">删除</el-link>
              </div>
              <prescription-edit
                @flagChange="prescriptionFlagChange"
                :prescription="API_diagInfo.API_treatment.API_prescription"
                v-model="API_diagInfo.API_treatment.API_prescription"
                type="type1"
              ></prescription-edit>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="7">
          <template slot="title">
            <h3 class="title">后续治疗</h3>
          </template>
          <after @after="afterInfo($event)"></after>
          <!-- <div class="after">
            <div>
              <span
                class="label"
              >推荐医疗机构：{{API_diagInfo.API_after.API_org.API_orgName||(API_diagInfo.API_after.API_org.API_orgName=='null'?"未选择":API_diagInfo.API_after.API_org.API_orgName)}}</span>
              <div class="box">
                <choose-radio v-model="pages.choosedOrg" :options="pages.medicalInfo" type="org"></choose-radio>
              </div>
            </div>
            <div>
              <span
                class="label"
              >推荐主管医师：{{API_diagInfo.API_after.API_doc.API_docName||(API_diagInfo.API_after.API_doc.API_docName=='null'?"未选择":API_diagInfo.API_after.API_doc.API_docName)}}</span>
              <div v-if="pages.choosedOrg.doctors.length>0" class="box">
                <choose-radio
                  v-model="API_diagInfo.API_after.API_doc"
                  :options="pages.choosedOrg.doctors"
                  type="doc"
                ></choose-radio>
              </div>
            </div>
            <div>
              <span
                class="label"
              >推荐主管护士：{{API_diagInfo.API_after.API_nur.API_nurName||(API_diagInfo.API_after.API_nur.API_nurName=='null'?"未选择":API_diagInfo.API_after.API_nur.API_nurName)}}</span>
              <div v-if="pages.choosedOrg.nurses.length>0" class="box">
                <choose-radio
                  v-model="API_diagInfo.API_after.API_nur"
                  :options="pages.choosedOrg.nurses"
                  type="nur"
                ></choose-radio>
              </div>
            </div>
          </div>-->
        </el-collapse-item>
        <el-button @click="save" size="medium" type="primary" class="btn">保存</el-button>
      </el-collapse>
    </div>
    <div :class="this.$store.state.pageState?'inputBox':'inputBox2'">
      <!-- 病情描述输入 -->
      <special-input
        :data="pages.stateOptions"
        :flag="pages.inputBoxVisible.illState"
        :preValue="patientInfo.API_illState.API_description"
        @blur="inputBoxBlur('illState')"
        @select="inputBoxSelect($event,'illState')"
        @delete="inputBoxDelete($event,'illState')"
      ></special-input>

      <!-- 诊断结论描述输入 -->
      <special-input
        :data="pages.diagResultCheckReconmendList"
        :flag="pages.inputBoxVisible.diagResult"
        :preValue="API_diagInfo.API_diagResult"
        @blur="inputBoxBlur('diagResult')"
        @select="inputBoxSelect($event,'diagResult')"
        @delete="inputBoxDelete($event,'diagResult')"
      ></special-input>

      <!-- 治疗方案输入框 -->
      <special-input
        :data="pages.treatmentCheckReconmendList"
        :flag="pages.inputBoxVisible.treatment"
        :preValue="API_diagInfo.API_treatment.API_description"
        @blur="inputBoxBlur('treatment')"
        @select="inputBoxSelect($event,'treatment')"
        @delete="inputBoxDelete($event,'treatment')"
      ></special-input>
    </div>
    <!-- 病情描述对话框 -->
    <el-dialog title="病情概况" :visible.sync="pages.illStateDialog" width="40%">
      <check-box :options="pages.stateOptions" :checked="pages.checkList" v-model="pages.checkList"></check-box>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="illStateSave">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 视频对话框 -->
    <div v-show="pages.videoDialogVisible" v-drag class="drag">
      <span @click="videoDialogClose">X</span>
      <video :src="pages.videoDialogSrc" controls="controls" style="width:100%"></video>
    </div>

    <!-- 导入历史诊断结论 -->
    <el-dialog title="历史诊断结论" :visible.sync="pages.HistoryDialogVisable" width="40%">
      <el-table :data="pages.diagHistory" style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="诊断结论">
          <template slot-scope="scope">
            <span>{{ scope.row.join('，') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" width="100" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="importResult(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="pages.HistoryDialogVisable=false">取消</el-button>
      </span>
    </el-dialog>

    <!-- 导入历史治疗方案 -->
    <el-dialog title="历史治疗方案" :visible.sync="pages.HistoryTreatmentDialogVisable" width="700px">
      <el-table ref="historyTreatment" :data="pages.treatHistory" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <PrescriptionTable :prescription="scope.row.API_prescription"></PrescriptionTable>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="治疗方案" width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.API_description.join('，') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="处方">
          <template slot-scope="scope">
            <el-button type="text" @click="toogleExpand(scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="address" width="100" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="importTreatment(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="pages.HistoryTreatmentDialogVisable = false;">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPatientDetails,
  savePatientDiagInfo,
  getStateOptions,
  getResultOptions,
  getTreatmentOptions,
  getDiagHistory,
  getTreatHistory,
  getMedicalInfo
} from "../../api/patientdiag/patientdiag.js";
import message from "../../store/message/message.js";
import CheckBox from "../../components/common/CheckBox.vue";
import Prescription from "../../components/common/Prescription.vue";
import Radio from "../../components/common/Radio.vue";
import SpecialInput from "../../components/common/SpecialInput.vue";
import PrescriptionEdit from "../../components/common/PrescriptionEdit.vue";
import mixin from "./components/index.js";
export default {
  mixins: [mixin],
  components: {
    CheckBox: CheckBox,
    PrescriptionTable: Prescription,
    ChooseRadio: Radio,
    SpecialInput: SpecialInput,
    PrescriptionEdit: PrescriptionEdit
  },
  data() {
    return {
      pages: {
        nums: [
          "零",
          "一",
          "二",
          "三",
          "四",
          "五",
          "六",
          "七",
          "八",
          "九",
          "十"
        ],
        collapse_activeNames: ["1", "2", "3", "4", "5", "6", "7"], //页面中激活的折叠面板
        AVshow: "video", //音视频切换标志
        videoDialogVisible: false, //视频播放框是否可见
        videoDialogSrc: "", //视频播放框中vedio标签的源
        illStateDialog: false, //病情描述对话框是否可见标志
        checkList: [], //病情描述选中的项目数组
        stateOptions: [{ pinyin: "dx", value: "担心" }], //可以选择的病情描述项目，每一项由首字母组成的pinyin和项目名组成
        diagResultCheckReconmendList: [
          { pinyin: "aezhmzzq", value: "阿尔兹海默症中期" }
        ], //可以选择的诊断结论描述项目，每一项由首字母组成的pinyin和项目名组成
        diagResultCheckList: [], //诊断结论选中的项目数组
        treatmentCheckReconmendList: [
          { pinyin: "yjjxsszl", value: "建议到医院进行手术治疗" }
        ], //可以选择的治疗方案描述项目，每一项由首字母组成的pinyin和项目名组成
        treatmentCheckList: [], //治疗方案选中的项目数组
        diagResultDialogVisible: false, //诊断结论对话框是否可见
        treatmentDialogVisible: false, //治疗方案对话框是否可见
        afterInfo: {
          orgList: [
            {
              orgName: "成都市第三人民医院",
              orgId: "0001"
            },
            {
              orgName: "成都市第一人民医院",
              orgId: "2"
            }
          ],
          docList: [
            { docName: "张三", docId: "0001" },
            { docName: "李四", docId: "101002" }
          ],
          nurList: [
            { nurName: "张三", nurId: "0001" },
            { nurName: "王二", nurId: "103001" }
          ]
        }, //医疗机构选项
        prescriptionDialogVisible: false, //处方对话框是否可见
        prescription: [
          {
            API_drugsName: "",
            API_drugsNumberUnits: "",
            API_drugsNumber: "",
            API_drugsUsage: "",
            API_useFrequency: "",
            API_useTime: "",
            API_isEditable: false,
            API_days: ""
          }
        ], //默认处方表格格式
        diagHistory: [
          ["智能诊断系统显示患有阿尔兹海默症", "神经损伤"],
          ["神经损伤"]
        ], //可选的历史诊断结论
        HistoryDialogVisable: false, //导入历史诊断结论对话框是否可见
        treatHistory: [
          {
            API_description: ["建议采用中药治疗", "建议采用西药治疗"],
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
            API_description: ["建议采用中药治疗"],
            API_prescription: []
          },
          {
            API_description: ["建议采用中药治疗"],
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
          }
        ], //可选的历史治疗方案
        HistoryTreatmentDialogVisable: false, //导入历史治疗方案对话框是否可见
        medicalInfo: [
          {
            orgId: "1",
            orgName: "成都市第三人民医院",
            doctors: [
              { docId: "101002", docName: "李四" },
              { docId: "101003", docName: "王五" },
              { docId: "101004", docName: "赵六" }
            ],
            nurses: [
              { nurId: "1", nurName: "王三" },
              { nurId: "2", nurName: "王二" },
              { nurId: "3", nurName: "王大" }
            ]
          }
        ], //可选的医疗机构、医师、护士信息
        choosedOrg: {
          orgId: "",
          orgName: "",
          doctors: [],
          nurses: []
        },
        inputBoxVisible: {
          illState: false,
          diagResult: false,
          treatment: false
        }
      },
      //患者相关信息
      patientInfo: {
        // 患者基本信息
        API_basicInfo: {
          API_pic: "",
          API_name: "",
          API_gender: "",
          API_birthday: "",
          API_address: "",
          API_tel: "",
          API_date: ""
        },
        // 患者病情描述
        API_illState: {
          API_description: [],
          API_audio: [
            {
              API_date: "",
              API_name: "",
              API_text: "",
              API_time: "",
              API_type: "",
              API_voice: ""
            }
          ],
          API_video: [
            {
              API_date: "",
              API_name: "",
              API_text: "",
              API_time: "",
              API_type: "",
              API_video: ""
            }
          ] //视频的地址，以数组的形式发过来
        },
        API_history: {
          API_allergyHistory: "",
          API_familyHistory: "",
          API_patientHistory: ""
        },
        API_examResult: [
          // {
          //   API_type: "",
          //   API_title: "",
          //   API_img: "", //图片文件
          //   API_aiResult: "" //智能诊断结论
          // }
        ]
      },
      API_diagInfo: {
        //诊断结论
        API_diagResult: [],
        //治疗方案
        API_treatment: {
          API_description: [],
          API_prescription: [
            // {
            //   API_drugsName: "含曲林片",
            //   API_drugsNumberUnits: "盒",
            //   API_drugsNumber: "2",
            //   API_drugsUsage: "一次两粒",
            //   API_useFrequency: "一天一次",
            //   API_useTime: "饭后",
            //   API_isEditable: false,
            //   API_days: "7"
            // }
          ] //处方
        },
        // 推荐医疗机构/医师/护士
        API_after: {
          API_org: {
            API_orgId: "",
            API_orgName: ""
          },
          API_doc: {
            API_docId: "",
            API_docName: ""
          },
          API_nur: {
            API_nurId: "",
            API_nurName: ""
          }
        }
      }
    };
  },
  methods: {
    prescriptionFlagChange(flag) {
      this.API_diagInfo.API_treatment.API_prescriptionFlag = flag;
    },
    videoDialogClose() {
      this.pages.videoDialogVisible = false;
      this.pages.videoDialogSrc = "";
    },
    videoPlay(item) {
      this.pages.videoDialogVisible = true;
      this.pages.videoDialogSrc = item.API_video;
    },
    mediaSwich(type) {
      this.pages.AVshow = type;
    },
    searchHistory() {
      console.log("查看病历");
    },
    handleEdit(index, row) {
      row.isEditable = true;
    },
    handleSave(index, row) {
      row.isEditable = false;
    },
    handleDelete(index, row) {},
    prescriptionModify() {
      this.pages.prescriptionDialogVisible = true;
      let obj = JSON.parse(
        JSON.stringify(this.API_diagInfo.API_treatment.API_prescription)
      );
      obj.forEach(item => {
        item.isEditable = false;
      });
      this.pages.prescription = obj;
    },
    sevePrescription() {
      this.pages.prescriptionDialogVisible = false;
      this.API_diagInfo.API_treatment.API_prescription = JSON.parse(
        JSON.stringify(this.pages.prescription)
      );
    },
    delPrescription() {
      this.pages.prescription = [];
      this.API_diagInfo.API_treatment.API_prescription = [];
    },
    addMedical() {
      this.pages.prescription.push({
        name: "",
        specification: "",
        number: "",
        usage: "",
        frequency: "",
        isEditable: true,
        days: ""
      });
    },
    delMedical(index, row) {
      this.pages.prescription.splice(index, 1);
    },
    save() {
      savePatientDiagInfo(
        localStorage.getItem("pid"),
        this.API_state,
        this.patientInfo.API_illState.API_description,
        this.API_diagInfo
      );
    },
    illStateModify() {
      this.pages.checkList = JSON.parse(
        JSON.stringify(this.patientInfo.API_illState.API_description)
      );
      this.pages.illStateDialog = true;
    },
    illStateSave() {
      if (this.pages.checkList.length > 0) {
        this.patientInfo.API_illState.API_description = JSON.parse(
          JSON.stringify(this.pages.checkList)
        );
      } else {
        this.patientInfo.API_illState.API_description = [];
      }
      this.pages.illStateDialog = false;
    },
    diagResultModify() {
      if (this.API_diagInfo.API_diagResult.length > 0) {
        this.pages.diagResultCheckList = JSON.parse(
          JSON.stringify(this.API_diagInfo.API_diagResult)
        );
      } else {
        this.pages.diagResultCheckList = [];
      }
      this.pages.diagResultDialogVisible = true;
    },
    diagResultSave() {
      if (this.pages.diagResultCheckList.length > 0) {
        this.API_diagInfo.API_diagResult = JSON.parse(
          JSON.stringify(this.pages.diagResultCheckList)
        );
      } else {
        this.API_diagInfo.API_diagResult = [];
      }
      this.pages.diagResultDialogVisible = false;
    },
    treatmentModify() {
      if (this.API_diagInfo.API_treatment.API_description.length > 0) {
        this.pages.treatmentCheckList = JSON.parse(
          JSON.stringify(this.API_diagInfo.API_treatment.API_description)
        );
      } else {
        this.pages.treatmentCheckList = [];
      }
      this.pages.treatmentDialogVisible = true;
    },
    treatmentSave() {
      if (this.pages.treatmentCheckList.length > 0) {
        this.API_diagInfo.API_treatment.API_description = JSON.parse(
          JSON.stringify(this.pages.treatmentCheckList)
        );
      } else {
        this.API_diagInfo.API_treatment.API_description = [];
      }
      this.pages.treatmentDialogVisible = false;
    },
    importResult(row) {
      this.API_diagInfo.API_diagResult = row;
      this.pages.HistoryDialogVisable = false;
    },
    importTreatment(row) {
      this.API_diagInfo.API_treatment = row;
      this.pages.HistoryTreatmentDialogVisable = false;
    },
    toogleExpand(row) {
      console.log(row);
      let $table = this.$refs.historyTreatment;
      $table.toggleRowExpansion(row);
    },
    inputBoxShow(type) {
      switch (type) {
        case "illState":
          this.inputBoxBlur("diagResult");
          this.inputBoxBlur("treatment");
          this.pages.inputBoxVisible.illState = true;
          break;
        case "diagResult":
          this.inputBoxBlur("illState");
          this.inputBoxBlur("treatment");
          this.pages.inputBoxVisible.diagResult = true;
          break;
        case "treatment":
          this.inputBoxBlur("illState");
          this.inputBoxBlur("diagResult");
          this.pages.inputBoxVisible.treatment = true;
          break;
      }
    },
    inputBoxBlur(type) {
      switch (type) {
        case "illState":
          this.pages.inputBoxVisible.illState = false;
          break;
        case "diagResult":
          this.pages.inputBoxVisible.diagResult = false;
          break;
        case "treatment":
          this.pages.inputBoxVisible.treatment = false;
          break;
      }
    },
    inputBoxDelete(index, type) {
      switch (type) {
        case "illState":
          this.patientInfo.API_illState.API_description.splice(index, 1);
          break;
        case "diagResult":
          this.API_diagInfo.API_diagResult.splice(index, 1);
          break;
        case "treatment":
          this.API_diagInfo.API_treatment.API_description.splice(index, 1);
          break;
      }
    },
    inputBoxSelect(data, type) {
      switch (type) {
        case "illState":
          this.patientInfo.API_illState.API_description.push(data);
          break;
        case "diagResult":
          this.API_diagInfo.API_diagResult.push(data);
          break;
        case "treatment":
          this.API_diagInfo.API_treatment.API_description.push(data);
          break;
      }
    },
    afterInfo(info) {
      console.log(info);
    }
  },
  directives: {
    drag: {
      // 指令的定义
      bind: function(el) {
        let odiv = el; //获取当前元素
        el.onmousedown = e => {
          //算出鼠标相对元素的位置
          let disX = e.clientX - odiv.offsetLeft;
          let disY = e.clientY - odiv.offsetTop;
          let left = "";
          let top = "";
          document.onmousemove = e => {
            //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            left = e.clientX - disX;
            top = e.clientY - disY;
            //绑定元素位置到positionX和positionY上面
            //移动当前元素
            odiv.style.left = left + "px";
            odiv.style.top = top + "px";
          };
          document.onmouseup = e => {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      }
    }
  },
  watch: {
    "API_diagInfo.API_after.API_orgId": function(value) {
      if (value) {
        // 发起http请求获得该机构医生及护士
        console.log(value);
      } else {
        //将医生和护士选择列表置空
        this.pages.afterInfo.docList = [];
        this.pages.afterInfo.nurList = [];
        this.API_diagInfo.API_after.API_docId = "";
        this.API_diagInfo.API_after.API_nurId = "";
      }
    },
    "pages.choosedOrg": function(value) {
      this.API_diagInfo.API_after.API_doc = {
        API_docName: "",
        API_docId: ""
      };
      this.API_diagInfo.API_after.API_nur = {
        API_nurName: "",
        API_nurId: ""
      };
      this.API_diagInfo.API_after.API_org.API_orgName = value.orgName;
      this.API_diagInfo.API_after.API_org.API_orgId = value.orgId;
    }
  },
  mounted() {
    let pid = localStorage.getItem("pid");
    getPatientDetails(pid).then(res => {
      this.patientInfo = res.patientInfo;
      this.API_diagInfo = res.API_diagInfo;
      this.API_state = res.API_state;
      console.log(this.patientInfo);
    });
    getStateOptions().then(res => {
      this.pages.stateOptions = res;
    });
    getResultOptions().then(res => {
      this.pages.diagResultCheckReconmendList = res;
    });
    getTreatmentOptions().then(res => {
      this.pages.treatmentCheckReconmendList = res;
    });
    getDiagHistory().then(res => {
      this.pages.diagHistory = res;
    });
    getTreatHistory().then(res => {
      this.pages.treatHistory = res;
    });
    getMedicalInfo().then(res => {
      this.pages.medicalInfo = res;
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

  .history {
    p {
      font-size: 18px;
      text-indent: 40px;
    }
  }
  .examResult {
    width: 95%;
    margin: auto;
    .textdefault {
      text-indent: 40px;
      font-size: 18px;
      word-wrap: break-word;
      word-break: break-all;
    }
    .imgExam {
      display: flex;
      justify-content: space-between;
      .info {
        width: 300px;
        padding-left: 30px;
        border-left: 2px solid #d9d9d9;
        .label {
          font-weight: bold;
          font-size: 20px;
        }
        .text {
          text-indent: 20px;
          font-size: 18px;
          word-wrap: break-word;
          word-break: break-all;
        }
      }
      .img {
        flex-shrink: 0;
      }
    }
    .tableExam {
      display: flex;
      justify-content: space-between;
      max-height: 350px;
      .table {
        flex-shrink: 0;
        width: 50%;
        min-width: 500px;
      }
      .pic {
        width: 45%;
        margin-top: 30px;
        margin-left: 30px;
        // max-height: 300px;
        overflow-y: auto;
      }
    }
  }
  .diagResult {
    width: 95%;
    margin: auto;
    .head {
      .checkBox {
        float: left;
      }
      .more {
        float: right;
        .link {
          margin-left: 30px;
        }
      }
    }
    .box {
      width: 100%;
      min-height: 100px;
      margin-top: 5px;
      border: 1px solid #e4e7ed;
      p {
        margin-top: 5px;
        font-size: 18px;
        text-indent: 20px;
      }
    }

    .prescription {
      margin-top: 20px;
      .label {
        font-size: 18px;
        color: #1c7e7c;
      }
    }
  }
  .after {
    width: 95%;
    margin: auto;
    .select {
      margin-top: 20px;
      margin-right: 50px;
    }
    .label {
      font-size: 18px;
    }
    .doc-nur {
      margin-top: 20px;
      display: flex;
      div {
        margin-right: 20px;
      }
    }
    .box {
      width: 100%;
      margin-top: 5px;
      margin-bottom: 20px;
      // border: 1px solid #e4e7ed;
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
.inputBox {
  position: fixed;
  bottom: 0px;
  width: calc(89% - 240px);
  z-index: 100;
  transition: 0.5s;
}

.inputBox2 {
  position: fixed;
  bottom: 0px;
  width: calc(89%);
  transition: 0.5s;
}
</style>

<style lang="scss">
</style>
