<template>
  <!-- 
说明：
传入的数据：
    prescription：原有的处方数组，可以为空，表示新添加的处方
    drugsInfo：传入医疗药品的信息
向父组件传值：
    input事件，每次确定一个药品的时候触发，可以改变原有的处方列表
    flag事件，传递出false，当所有药品编辑完成后传递出true,标志着处方是否完成编辑
  -->
  <div>
    <div v-show="prescription.length>0">
      <el-table size="mini" :data="prescription" style="width: 100%">
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
              <el-option value="一次两片"></el-option>
              <el-option value="一次三片"></el-option>
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
        <el-table-column label="操作" width="150px">
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
    <el-dialog title="添加药品" :visible.sync="diglogVisible" width="700px">
      <div class="search">
        <el-input v-model="searchName" size="mini" style="width:50%;margin-right:10px"></el-input>
        <el-button size="mini" @click="medicalSearch" type="primary">查询</el-button>
      </div>
      <div
        class="medicalCard"
        v-for="item in medicalData.slice(currentIndexRange[0],currentIndexRange[1])"
        :key="item.id"
      >
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
              <el-col :span="12">药品本位码：{{item.standardCode}}</el-col>
              <el-button @click="medicalSelect(item)" class="select" type="success" size="mini">选择</el-button>
            </el-row>
          </div>
        </div>
      </div>
      <div class="pageSwitch">
        <div class="btn">
          <el-link
            @click="page.current-=1"
            v-show="currentIndexRange[0]>0"
            style="margin-right:20px"
          >上一页</el-link>
          <el-link @click="page.current+=1" v-show="currentIndexRange[1]<medicalData.length">下一页</el-link>
        </div>
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
    },
    currentIndexRange() {
      return [
        (this.page.current - 1) * this.page.pageSize,
        (this.page.current - 1) * this.page.pageSize + this.page.pageSize
      ];
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
    }
  },
  data() {
    return {
      searchName: "",
      flag: true,
      diglogVisible: false,
      medicalData: [
        {
          name: "青霉素V钾颗粒",
          type: "颗粒剂",
          specification: "2g:0.125g",
          manufacturer: "国药集团威奇达药业有限公司",
          class: "化学药品",
          standardCode: "86902954003796",
          approvalNumber: "国药准字H20051939"
        },
        {
          name: "青霉素V钾颗粒",
          type: "颗粒剂",
          specification: "2g:0.125g",
          manufacturer: "国药集团威奇达药业有限公司",
          class: "化学药品",
          standardCode: "86902954003796",
          approvalNumber: "国药准字H20051939"
        },
        {
          name: "青霉素V钾颗粒",
          type: "颗粒剂",
          specification: "2g:0.125g",
          manufacturer: "国药集团威奇达药业有限公司",
          class: "化学药品",
          standardCode: "86902954003796",
          approvalNumber: "国药准字H20051939"
        },
        {
          name: "青霉素V钾颗粒",
          type: "颗粒剂",
          specification: "2g:0.125g",
          manufacturer: "国药集团威奇达药业有限公司",
          class: "化学药品",
          standardCode: "86902954003796",
          approvalNumber: "国药准字H20051939"
        }
      ],
      page: {
        current: 1,
        maxPage: 10,
        pageSize: 3
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
      console.log(this.searchName);
    },
    medicalSelect(medical) {
      this.prescription.push({
        API_drugsName: medical.name,
        API_drugsNumberUnits: "",
        API_drugsNumber: "",
        API_drugsUsage: "",
        API_useFrequency: "",
        API_useTime: "",
        API_drugsSpecification: medical.specification,
        isEditable: true
      });
      this.diglogVisible = false;
    },
    nextPage() {
      this.page.current += 1;
      getDurgsInfo(this.page.current, this.searchName).then(res => {
        this.medicalData = res.medicalData;
        this.page.maxPage = res.maxPage;
      });
    },
    prePage() {
      this.page.current -= 1;
      getDurgsInfo(this.page.current, this.searchName).then(res => {
        this.medicalData = res.medicalData;
        this.page.maxPage = res.maxPage;
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
  height: 100px;
  background-color: rgb(201, 196, 196);
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
</style>