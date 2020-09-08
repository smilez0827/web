<template>
  <div>
    <div v-show="prescription.length>0">
      <el-table size="mini" :data="prescription" style="width: 100%">
        <el-table-column fixed label="名称">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.isEditable"
              v-model="scope.row.API_drugsName"
              style="width:100%;hight:100%"
            ></el-input>
            <span v-else>{{ scope.row.API_drugsName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="规格">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.isEditable"
              v-model="scope.row.API_drugsSpecification"
              style="width:100%;hight:100%"
            ></el-input>
            <span v-else>{{ scope.row.API_drugsSpecification }}</span>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="80">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.isEditable"
              v-model="scope.row.API_drugsNumber"
              style="width:100%;hight:100%"
            ></el-input>
            <span v-else>{{ scope.row.API_drugsNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单位" width="80">
          <template slot-scope="scope">
            <el-select
              v-if="scope.row.isEditable"
              v-model="scope.row.API_drugsNumberUnits"
              placeholder
            >
              <el-option value="包"></el-option>
              <el-option value="片"></el-option>
              <el-option value="粒"></el-option>
            </el-select>
            <span v-else>{{ scope.row.API_drugsNumberUnits }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单次用量">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.isEditable"
              v-model="scope.row.API_drugsUsage"
              style="width:100%;hight:100%"
            ></el-input>
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
              v-show="scope.row.isEditable"
              v-model="scope.row.API_useTime"
              placeholder="请选择"
            >
              <el-option value="饭前"></el-option>
              <el-option value="饭后"></el-option>
              <el-option value="均可"></el-option>
            </el-select>
            <span v-if="!scope.row.isEditable">{{ scope.row.API_useTime }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="editaleChange(scope.$index,scope.row)"
            >{{!scope.row.isEditable?"编辑":"确定"}}</el-button>
            <el-button size="mini" type="danger" @click="delMedical(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="addMedcal">
      <div class="margin">
        <el-link @click="addMedical" class="btn" type="success">{{"+添加药品"}}</el-link>
      </div>
    </div>
    <el-dialog
      :modal="false"
      class="addmeidicaldialog"
      title="添加药品"
      :visible.sync="diglogVisible"
      width="700px"
    >
      <div class="search">
        <el-input
          placeholder="请输入药品名称或名称首字母"
          v-model="searchName"
          size="mini"
          style="width:50%;margin-right:10px"
        ></el-input>
        <el-button size="mini" @click="medicalSearch" type="primary">查询</el-button>
      </div>
      <div class="medicalCard" v-for="item in medicalData" :key="item.id">
        <div class="pic">
          <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt />
        </div>
        <div class="info">
          <div>
            <el-row>
              <el-col :span="8">名称：{{item.name}}</el-col>
              <el-col :span="5">剂型：{{item.type}}</el-col>
              <el-col :span="11">规格:{{item.specification}}</el-col>
            </el-row>
          </div>
          <div>
            <el-row>
              <el-col :span="8">厂商：{{item.manufacturer}}</el-col>
              <el-col :span="11">批准文号：{{item.approvalNumber}}</el-col>
            </el-row>
          </div>
          <div>
            <el-row>
              <el-col :span="11">药品本位码：{{item.standardCode}}</el-col>
              <el-button @click="medicalSelect(item)" class="select" type="success" size="mini">选择</el-button>
            </el-row>
          </div>
        </div>
      </div>
      <div class="pageSwitch">
        <div class="btn">
          <el-link @click="prePage" v-show="page.current>1" style="margin-right:20px">上一页</el-link>
          <el-link @click="nextPage" v-show="page.current<page.maxPage">下一页</el-link>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      :modal="false"
      class="addmeidicaldialog"
      title="添加药品"
      :visible.sync="medicalDialog"
      width="700px"
    >
      <div class="medicalCard">
        <div class="pic">
          <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt />
        </div>
        <div class="info">
          <div>
            <el-row>
              <el-col :span="8">名称：{{tempDrug.name}}</el-col>
              <el-col :span="5">剂型：{{tempDrug.type}}</el-col>
              <el-col :span="11">规格:{{tempDrug.specification}}</el-col>
            </el-row>
          </div>
          <div>
            <el-row>
              <el-col :span="8">厂商：{{tempDrug.manufacturer}}</el-col>
              <el-col :span="11">批准文号：{{tempDrug.approvalNumber}}</el-col>
            </el-row>
          </div>
          <div>
            <el-row>
              <el-col :span="12">药品本位码：{{tempDrug.standardCode}}</el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="drugPrescription">
        <el-form size="mini" :inline="true" label-width="80px">
          <el-form-item label="药品数量">
            <el-input v-model="durgsDetails.number" style="width:200px"></el-input>
          </el-form-item>

          <el-form-item label="药品单位">
            <el-select style="width:200px" v-model="durgsDetails.unit">
              <el-option value="粒"></el-option>
              <el-option value="g"></el-option>
              <el-option value="mg"></el-option>
              <el-option value="包"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单次用量">
            <el-input v-model="durgsDetails.useage" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="用量单位">
            <el-select style="width:200px" v-model="durgsDetails.useageUnit">
              <el-option value="粒"></el-option>
              <el-option value="g"></el-option>
              <el-option value="mg"></el-option>
              <el-option value="包"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用药途径">
            <el-select v-model="durgsDetails.useWay" style="width:200px">
              <el-option value="口服"></el-option>
              <el-option value="外用"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用药频次">
            <el-select v-model="durgsDetails.frequency" style="width:200px">
              <el-option value="一天一次"></el-option>
              <el-option value="一天两次"></el-option>
              <el-option value="一天三次"></el-option>
              <el-option value="两天一次"></el-option>
              <el-option value="一周一次"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="medicalDialog = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 处方、表格展示表格组件
import { getDurgsInfo } from "../../api/patientdiag/patientdiag.js";
export default {
  name: "CheckBox",
  props: {
    prescription: {
      type: Array,
      default: () => {
        return [];
      }
    },
    drugsInfo: {
      type: Array,
      default: () => {
        return [
          {
            API_drugsName: "含曲林片",
            API_drugsNumberUnits: "盒",
            API_drugsNumber: "2",
            API_drugsUsage: "一次两粒",
            API_useFrequency: "一天一次",
            API_useTime: "饭后"
          },
          {
            API_drugsName: "青霉素胶囊",
            API_drugsNumberUnits: "盒",
            API_drugsNumber: "2",
            API_drugsUsage: "一次三粒",
            API_useFrequency: "一天三次",
            API_useTime: "饭后"
          }
        ];
      }
    }
  },
  computed: {
    tempPrescription() {
      return JSON.parse(JSON.stringify(this.prescription));
    }
  },
  watch: {
    tempPrescription: {
      handler(newValue, oldValue) {
        let tempFlag = true;
        newValue.forEach((item, index) => {
          if (item.isEditable) {
            tempFlag = false;
            if (item.API_drugsName) {
              this.drugsInfo.forEach(durg => {
                if (
                  item.API_drugsName == durg.API_drugsName &&
                  item.API_drugsName != oldValue[index].API_drugsName
                ) {
                  this.prescription[index].API_drugsNumberUnits =
                    durg.API_drugsNumberUnits;
                  this.prescription[index].API_drugsNumber =
                    durg.API_drugsNumber;
                  this.prescription[index].API_drugsUsage = durg.API_drugsUsage;
                  this.prescription[index].API_useFrequency =
                    durg.API_useFrequency;
                  this.prescription[index].API_useTime = durg.API_useTime;
                }
              });
            }
          }
        });
        if (tempFlag) this.flag = true;
        else this.flag = false;
      },

      deep: true
    },
    flag(newValue, oldValue) {
      this.$emit("flagChange", newValue);
    },
    diglogVisible() {
      this.searchName = "";
      this.data = [];
      this.page.maxPage = 0;
    }
  },
  data() {
    return {
      searchName: "",
      flag: true,
      diglogVisible: false,
      medicalDialog: true,
      medicalData: [],
      page: {
        current: 1,
        maxPage: 0
      },
      tempDrug: {},
      durgsDetails: {
        number: "",
        unit: "",
        useage: "",
        useageUnit: "",
        useWay: "",
        frequency: ""
      }
    };
  },
  methods: {
    editaleChange(index, item) {
      let temp = item;
      if (!item.isEditable) {
        temp.isEditable = true;
        this.prescription.splice(index, 1, temp);
      } else {
        if (
          item.API_drugsName &&
          item.API_drugsNumberUnits &&
          item.API_drugsNumber &&
          item.API_drugsUsage &&
          item.API_useFrequency &&
          item.API_useTime &&
          item.API_drugsSpecification
        ) {
          temp.isEditable = false;
          this.prescription.splice(index, 1, temp);
          this.$emit("input", this.prescription);
        } else {
          this.$message.error("请检查填写的药品");
        }
      }
    },
    delMedical(index, item) {
      this.prescription.splice(index, 1);
      this.$emit("input", this.prescription);
    },
    addMedical() {
      this.diglogVisible = true;
    },
    medicalSearch() {
      this.page.current = 1;
      getDurgsInfo(this.page.current, this.searchName).then(res => {
        this.medicalData = res.data;
        this.page.maxPage = res.maxNum;
      });
    },
    medicalSelect(medical) {
      // this.prescription.push({
      //   API_drugsName: medical.name,
      //   API_drugsNumberUnits: "",
      //   API_drugsNumber: "",
      //   API_drugsUsage: "",
      //   API_useFrequency: "",
      //   API_useTime: "",
      //   API_drugsSpecification: medical.specification,
      //   isEditable: true
      // });
      this.diglogVisible = false;
      this.tempDrug = medical;
      this.medicalDialog = true;
    },
    nextPage() {
      this.page.current += 1;
      getDurgsInfo(this.page.current, this.searchName).then(res => {
        console.log(res);
        this.medicalData = res.data;
        this.page.maxPage = res.maxNum;
      });
    },
    prePage() {
      this.page.current -= 1;
      getDurgsInfo(this.page.current, this.searchName).then(res => {
        this.medicalData = res.data;
        this.page.maxPage = res.maxNum;
      });
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.addMedcal {
  width: 100%;
  margin: 0 auto;
  .margin {
    width: 80px;
    margin: auto;
    .btn {
      width: 100px;
      font-size: 16px;
      margin: 10px auto;
    }
  }
}

.medicalCard {
  display: flex;
  min-height: 100px;
  background-color: rgb(236, 231, 231);
  overflow: hidden;
  margin-top: 10px;
  padding: 5px;
  border-radius: 3px;
  .pic {
    max-width: 95px;
    max-height: 95px;
    flex-shrink: 0;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    div {
      display: flex;
      flex-direction: row;
      width: 100%;
      .select {
        float: right;
      }
    }
  }
}
.pageSwitch {
  height: 20px;
  .btn {
    float: right;
  }
}
.drugPrescription {
  margin-top: 20px;
}
</style>
<style lang="scss">
// .addmeidicaldialog {
//   z-index: 10000;
// }
</style>