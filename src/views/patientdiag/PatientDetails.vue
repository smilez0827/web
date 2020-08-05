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
              <img src="../../assets/img/default/person.png" alt />
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
                  <el-link type="primary" @click="searchHistory">查看病历</el-link>
                </div>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <h3 class="title">病情概况</h3>
          </template>
          <div class="illState">
            <div class="description">
              <div>
                <p>{{this.patientInfo.API_illState.API_description}}</p>
              </div>
              <div>
                <el-link @click="pages.illStateDialog=true" type="success" style="float:right">+添加</el-link>
              </div>
            </div>
            <div
              class="media"
              v-if="patientInfo.API_illState.API_audio.length>0||patientInfo.API_illState.API_video.length>0"
            >
              <div>
                <el-link
                  v-if="patientInfo.API_illState.API_audio.length>0"
                  type="primary"
                  @click="mediaSwich('audio')"
                >音频</el-link>
                <template>
                  <span
                    v-if="patientInfo.API_illState.API_audio.length>0&&patientInfo.API_illState.API_video.length>0"
                    class="switch"
                  >/</span>
                  <el-link
                    v-if="patientInfo.API_illState.API_video.length>0"
                    type="primary"
                    @click="mediaSwich('video')"
                  >视频</el-link>
                </template>
              </div>
              <div
                v-if="patientInfo.API_illState.API_audio.length>0"
                v-show="this.pages.AVshow=='audio'"
              >
                <div v-for="item in patientInfo.API_illState.API_audio" :key="item.id">
                  <div>
                    <audio
                      :src="item.API_voice"
                      controls="controls"
                      preload="auto"
                      style="height:20px"
                    ></audio>
                  </div>
                  <div>
                    <!-- <p>{{item.API_text}}</p> -->
                  </div>
                </div>
              </div>
              <div
                v-if="patientInfo.API_illState.API_video.length>0"
                v-show="this.pages.AVshow=='video'"
              >
                <video
                  :src="patientInfo.API_illState.API_video[0].API_video"
                  preload="auto"
                  controls="controls"
                  style="width:100%"
                ></video>
                <!-- <div v-for="(item,index) in patientInfo.API_illState.API_video" :key="item.id">
                  <el-link @click="videoPlay(item)">{{index+1}}.{{item.API_name}}</el-link>
                </div>-->
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <h3 class="title">既往病史</h3>
          </template>
          <div class="history">
            <p>{{this.patientInfo.API_history}}</p>
          </div>
        </el-collapse-item>
        <el-collapse-item name="4">
          <template slot="title">
            <h3 class="title">检查结果</h3>
          </template>
          <div class="examResult">
            <el-tabs type="card" value="血常规">
              <el-tab-pane
                v-for="(item) in patientInfo.API_examResult"
                :key="item.id"
                :label="item.API_title"
                :name="item.API_title"
              >
                <template v-if="item.API_type=='img'">
                  <div class="imgExam">
                    <div class="img">
                      <el-image
                        style="width: 500px;"
                        :src="item.API_img"
                        :preview-src-list="[item.API_img]"
                      ></el-image>
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
                        src="http://132.232.18.227:8081/download?url=upload/b6104e874850891c00be62a23a8db3d2.jpg"
                      ></el-image>
                      <!-- <el-image
                        style="width:100%;"
                        :src="item.API_img"
                        :preview-src-list="item.API_table.API_pic"
                      ></el-image>-->
                    </div>
                  </div>
                </template>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-collapse-item>
        <el-collapse-item name="5">
          <template slot="title">
            <h3 class="title">诊断结论</h3>
          </template>
          <div class="diagResult">
            <div class="head clearfix">
              <div class="checkBox">
                <el-checkbox-group v-model="pages.diagResultCheckList">
                  <el-checkbox
                    v-for="item in pages.diagResultCheckReconmendList.slice(0,2)"
                    :key="item.id"
                    :label="item"
                  ></el-checkbox>
                </el-checkbox-group>
              </div>
              <div class="more">
                <el-link
                  @click="pages.diagResultDialogVisible=true"
                  class="link"
                  type="success"
                >更多选项</el-link>
                <!-- <el-link class="link" type="success">+导入诊断结论</el-link> -->
              </div>
            </div>
            <div class="text">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="API_diagInfo.API_diagResult"
              ></el-input>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="6">
          <template slot="title">
            <h3 class="title">治疗方案</h3>
          </template>
          <div class="diagResult">
            <div class="head clearfix">
              <div class="checkBox">
                <el-checkbox-group v-model="pages.treatmentCheckList">
                  <el-checkbox
                    v-for="item in pages.treatmentCheckReconmendList.slice(0,2)"
                    :key="item.id"
                    :label="item"
                  ></el-checkbox>
                </el-checkbox-group>
              </div>
              <div class="more">
                <el-link @click="pages.treatmentDialogVisible=true" class="link" type="success">更多选项</el-link>
                <el-link
                  @click="prescriptionModify"
                  class="link"
                  type="success"
                >{{API_diagInfo.API_treatment.API_prescription.length>0?"修改处方":"添加处方"}}</el-link>
                <!-- <el-link class="link" type="success">+导入治疗方案</el-link> -->
              </div>
            </div>
            <div class="text">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="API_diagInfo.API_treatment.API_description"
              ></el-input>
            </div>
            <div v-show="API_diagInfo.API_treatment.API_prescription.length>0" class="prescription">
              <span class="label">处方</span>
              <el-link type="danger" @click="delPrescription" style="float:right">删除</el-link>
              <el-table
                size="mini"
                :data="API_diagInfo.API_treatment.API_prescription"
                style="width: 100%"
              >
                <el-table-column label="名称">
                  <template slot-scope="scope">
                    <span>{{ scope.row.API_drugsName }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="数量">
                  <template slot-scope="scope">
                    <span>{{ scope.row.API_drugsNumber }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="单位">
                  <template slot-scope="scope">
                    <span>{{ scope.row.API_drugsNumberUnits }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="用法">
                  <template slot-scope="scope">
                    <span>{{ scope.row.API_drugsUsage }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="频率">
                  <template slot-scope="scope">
                    <span>{{ scope.row.API_useFrequency }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="使用时间">
                  <template slot-scope="scope">
                    <span>{{ scope.row.API_useTime }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="7">
          <template slot="title">
            <h3 class="title">后续治疗</h3>
          </template>
          <div class="after">
            <div>
              <span class="label">推荐医疗机构：</span>
              <el-select
                class="select"
                clearable
                v-model="API_diagInfo.API_after.API_org.API_orgId"
                placeholder="请选择医疗机构"
              >
                <el-option
                  v-for="item in pages.afterInfo.orgList"
                  :key="item.id"
                  :label="item.orgName"
                  :value="item.orgId"
                ></el-option>
              </el-select>
            </div>
            <div class="doc-nur clearfix">
              <div>
                <span class="label">推荐主管医师：</span>
                <el-select
                  clearable
                  v-model="API_diagInfo.API_after.API_doc.API_docId"
                  placeholder="请选择主管医师"
                >
                  <el-option
                    v-for="item in pages.afterInfo.docList"
                    :key="item.id"
                    :label="item.docName"
                    :value="item.docId"
                  ></el-option>
                </el-select>
              </div>
              <div>
                <span class="label">推荐主管护士：</span>
                <el-select
                  clearable
                  v-model="API_diagInfo.API_after.API_nur.API_nurId"
                  placeholder="请选择主管护士"
                >
                  <el-option
                    v-for="item in pages.afterInfo.nurList"
                    :key="item.id"
                    :label="item.nurName"
                    :value="item.nurId"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-button @click="save" size="medium" type="primary" class="btn">保存</el-button>
      </el-collapse>
    </div>
    <!-- 病情描述对话框 -->
    <el-dialog title="病情概况" :visible.sync="pages.illStateDialog" width="40%">
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="patientInfo.API_illState.API_description"
      ></el-input>
      <el-checkbox-group v-model="pages.checkList">
        <el-checkbox label="情绪低落"></el-checkbox>
        <el-checkbox label="心情急躁"></el-checkbox>
        <el-checkbox label="头疼"></el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="pages.illStateDialog = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 视频对话框 -->
    <div v-show="pages.videoDialogVisible" v-drag class="drag">
      <span @click="videoDialogClose">X</span>
      <video :src="pages.videoDialogSrc" controls="controls" style="width:100%"></video>
    </div>
    <!-- 诊断结论更多选项对话框对话框 -->
    <el-dialog title="诊断结论" :visible.sync="pages.diagResultDialogVisible" width="40%">
      <el-input type="textarea" placeholder="请输入内容" v-model="API_diagInfo.API_diagResult"></el-input>
      <el-checkbox-group v-model="pages.diagResultCheckList">
        <el-checkbox
          v-for="item in pages.diagResultCheckReconmendList"
          :key="item.id"
          :label="item"
        ></el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="pages.diagResultDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 治疗方案更多选项对话框 -->
    <el-dialog title="治疗方案" :visible.sync="pages.treatmentDialogVisible" width="40%">
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="API_diagInfo.API_treatment.API_description"
      ></el-input>
      <el-checkbox-group v-model="pages.treatmentCheckList">
        <el-checkbox v-for="item in pages.treatmentCheckReconmendList" :key="item.id" :label="item"></el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="pages.treatmentDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加处方对话框 -->
    <el-dialog title="添加处方" :visible.sync="pages.prescriptionDialogVisible" width="60%">
      <el-table size="mini" :data="pages.prescription" style="width: 100%">
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
        <el-link class="link" @click="addMedical" type="primary">+添加药品</el-link>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sevePrescription">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { arrSubtraction } from "../../utils/common.js";
import {
  getPatientDetails,
  savePatientDiagInfo
} from "../../api/patientdiag/patientdiag.js";
import message from "../../store/message/message.js";
export default {
  data() {
    return {
      pages: {
        collapse_activeNames: ["1", "2", "3", "4", "5", "6", "7"],
        exam_activeNames: "0",
        AVshow: "video",
        videoDialogVisible: false,
        videoDialogSrc: "",
        illStateDialog: false,
        checkList: [],
        diagResultCheckReconmendList: [
          "智能诊断系统显示患者患有阿尔兹海默症",
          "神经损伤",
          "大脑纤维束受损",
          "阿尔兹海默症中期"
        ],
        diagResultCheckList: [],
        treatmentCheckReconmendList: [
          "建议进行保守治疗",
          "建议采用中药治疗",
          "推荐到医院进行检查",
          "建议到医院进行手术治疗"
        ],
        treatmentCheckList: [],
        diagResultDialogVisible: false,
        treatmentDialogVisible: false,
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
        },
        prescriptionDialogVisible: false,
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
        ]
      },
      patientInfo: {
        API_basicInfo: {
          API_pic: "",
          API_name: "",
          API_gender: "",
          API_birthday: "",
          API_address: "",
          API_tel: "",
          API_date: ""
        },
        API_illState: {
          API_description: "",
          API_audio: [],
          API_video: [
            require("../../assets/video/movie.mp4"),
            require("../../assets/video/movie.mp4"),
            require("../../assets/video/movie.mp4")
          ] //视频的地址，以数组的形式发过来
        },
        API_history: "xxxxx",
        API_examResult: [
          // {
          //   API_type: "img",
          //   API_title: "CT",
          //   API_img: require("../../assets/img/patienDia/ct.png"), //图片文件
          //   API_aiResult:
          //     "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx234xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" //智能诊断结论
          // },
          // {
          //   API_type: "table",
          //   API_title: "血常规",
          //   API_table: {
          //     API_data: [
          //       {
          //         API_item: "血小板",
          //         API_result: "99",
          //         API_unit: "%", //单位
          //         API_rangeBottom: "18", //上限
          //         API_rangeTop: "20" //下限
          //       },
          //       {
          //         API_item: "血小板",
          //         API_result: "99",
          //         API_unit: "%", //单位
          //         API_rangeBottom: "18", //上限
          //         API_rangeTop: "20" //下限
          //       },
          //       {
          //         API_item: "血小板",
          //         API_result: "99",
          //         API_unit: "%", //单位
          //         API_rangeBottom: "18", //上限
          //         API_rangeTop: "20" //下限
          //       },
          //       {
          //         API_item: "白细胞",
          //         API_result: "10",
          //         API_unit: "%", //单位
          //         API_rangeBottom: "18", //上限
          //         API_rangeTop: "20" //下限
          //       },
          //       {
          //         API_item: "白细胞",
          //         API_result: "19",
          //         API_unit: "%", //单位
          //         API_rangeBottom: "18", //上限
          //         API_rangeTop: "20" //下限
          //       },
          //       {
          //         API_item: "白细胞",
          //         API_result: "19",
          //         API_unit: "%", //单位
          //         API_rangeBottom: "18", //上限
          //         API_rangeTop: "20" //下限
          //       },
          //       {
          //         API_item: "白细胞",
          //         API_result: "19",
          //         API_unit: "%", //单位
          //         API_rangeBottom: "18", //上限
          //         API_rangeTop: "20" //下限
          //       },
          //       {
          //         API_item: "白细胞",
          //         API_result: "19",
          //         API_unit: "%", //单位
          //         API_rangeBottom: "18", //上限
          //         API_rangeTop: "20" //下限
          //       }
          //     ],
          //     API_pic: [
          //       require("../../assets/img/patienDia/xuechanggui.png")
          //       // require("../../assets/img/patienDia/ct.png")
          //     ] //这一项检查对应的
          //   }, //图片文件
          //   API_aiResult: "xxxxxxxxxx" //智能诊断结论
          // }
        ]
      },
      API_diagInfo: {
        //诊断结论
        API_diagResult: "",
        //治疗方案
        API_treatment: {
          API_description: "",
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
      console.log(index, row);
    },
    handleSave(index, row) {
      row.isEditable = false;
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
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
      savePatientDiagInfo(this.patientInfo, this.API_diagInfo);
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
  computed: {},
  watch: {
    "pages.checkList": function(newList, preList) {
      if (newList.length > preList.length) {
        let str = "";
        if (this.patientInfo.API_illState.API_description.length > 0) {
          str = "、" + arrSubtraction(newList, preList)[0];
        } else {
          str = arrSubtraction(newList, preList)[0];
        }
        this.patientInfo.API_illState.API_description += str;
      } else {
        let str = arrSubtraction(preList, newList)[0];
        this.patientInfo.API_illState.API_description = this.patientInfo.API_illState.API_description.replace(
          "、" + str,
          ""
        );
        this.patientInfo.API_illState.API_description = this.patientInfo.API_illState.API_description.replace(
          str,
          ""
        );
      }
    },
    "pages.diagResultCheckList": function(newList, preList) {
      if (newList.length > preList.length) {
        let str = "";
        if (this.API_diagInfo.API_diagResult.length > 0) {
          str = "、" + arrSubtraction(newList, preList)[0];
        } else {
          str = arrSubtraction(newList, preList)[0];
        }
        this.API_diagInfo.API_diagResult += str;
      } else {
        let str = arrSubtraction(preList, newList)[0];
        this.API_diagInfo.API_diagResult = this.API_diagInfo.API_diagResult.replace(
          "、" + str,
          ""
        );
        this.API_diagInfo.API_diagResult = this.API_diagInfo.API_diagResult.replace(
          str,
          ""
        );
        // this.patientInfo.API_illState.API_description;
      }
    },
    "pages.treatmentCheckList": function(newList, preList) {
      if (newList.length > preList.length) {
        let str = "";
        if (this.API_diagInfo.API_treatment.API_description.length > 0) {
          str = "、" + arrSubtraction(newList, preList)[0];
        } else {
          str = arrSubtraction(newList, preList)[0];
        }
        this.API_diagInfo.API_treatment.API_description += str;
      } else {
        let str = arrSubtraction(preList, newList)[0];
        this.API_diagInfo.API_treatment.API_description = this.API_diagInfo.API_treatment.API_description.replace(
          "、" + str,
          ""
        );
        this.API_diagInfo.API_treatment.API_description = this.API_diagInfo.API_treatment.API_description.replace(
          str,
          ""
        );
      }
    },
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
    }
  },
  mounted() {
    let pid = localStorage.getItem("pid");
    getPatientDetails(pid).then(res => {
      this.patientInfo = res.patientInfo;
      this.API_diagInfo = res.API_diagInfo;
      console.log(res);
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
      width: 65%;
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
  .illState {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .description {
      width: 100%;
      height: 100%;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        font-size: 18px;
        text-indent: 40px;
      }
    }
    .media {
      flex-shrink: 0;
      align-self: stretch;
      width: 450px;
      border-left: 2px solid #d9d9d9;
      padding-left: 20px;
      .switch {
        margin: 0 5px;
      }
      audio {
        margin-top: 10px;
      }
    }
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
    .text {
      margin-top: 5px;
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
      font-size: 16px;
    }
    .doc-nur {
      margin-top: 20px;
      display: flex;
      div {
        margin-right: 20px;
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
</style>

<style lang="scss">
</style>
