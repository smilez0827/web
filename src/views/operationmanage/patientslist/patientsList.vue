<template>
  <div>
    <div class="filter">
      <div style="margin-bottom: 15px">
        <span style="font-size: 18px;font-weight: bold;color: #1c7e7c;margin-left: 5px">患者查询</span>
      </div>
      <div>
        <el-form size="mini" :inline="true" :model="formInline" class="demo-form-inline">
          <el-row>
            <el-col :span="7">
              <el-form-item>
                <template slot="label">
                  <span class="formLabel">姓名：</span>
                </template>
                <el-input v-model="formInline.API_name" placeholder="请输入患者姓名" style="width:150px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item>
                <template slot="label">
                  <span class="formLabel">住院号：</span>
                </template>
                <el-input
                  v-model="formInline.API_number"
                  placeholder="请输入患者住院号"
                  style="width:150px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item>
                <template slot="label">
                  <span class="formLabel">主诊专家：</span>
                </template>
                <el-input v-model="formInline.API_expert" placeholder="请输入专家姓名" style="width:150px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item>
                <template slot="label">
                  <span class="formLabel">今日护理状态：</span>
                </template>

                <el-select clearable v-model="formInline.API_state" placeholder="请选择">
                  <el-option value="已处理"></el-option>
                  <el-option value="未处理"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item>
                <template slot="label">
                  <span class="formLabel">是否需要评估：</span>
                </template>
                <el-select clearable v-model="formInline.API_pingguState" placeholder="请选择">
                  <el-option value="是"></el-option>
                  <el-option value="否"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="eltable">
      <el-table
        :data="showTable.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        border
        :cell-style="{'text-align':'center'}"
        :header-cell-style="{background:'#EFF3F4',color:'#1c7e7c','text-align':'center',  'font-size': '16px',}"
      >
        <el-table-column label="住院号" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row. API_toHospitalID}}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名">
          <template slot-scope="scope">
            <span>{{ scope.row.API_name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="诊断专家">
          <template slot-scope="scope">
            <span>{{ scope.row.API_expert}}</span>
          </template>
        </el-table-column>

        <el-table-column label="入院时间">
          <template slot-scope="scope">
            <span>{{ new Date(scope.row.API_date).toLocaleDateString()}}</span>
          </template>
        </el-table-column>

        <el-table-column label="今日护理状态">
          <template slot-scope="scope">
            <span>{{ scope.row.API_state}}</span>
          </template>
        </el-table-column>

        <el-table-column label="是否需要评估">
          <template slot-scope="scope">
            <span>{{ scope.row.API_pingguState}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="patientDetails(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="showTable.length"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getPatientsList,
  getApplyList
} from "@api/operationmanage/operationmanage.js";
export default {
  data() {
    return {
      formInline: {
        API_name: "",
        API_number: "",
        API_expert: "",
        API_state: "",
        API_pingguState: ""
      },
      tableData: [],
      currentPage: 1,
      pageSize: 10
    };
  },
  methods: {
    reSet() {
      (this.formInline.API_name = ""), (this.formInline.API_state = "");
    },
    patientDetails(index, row) {
      localStorage.setItem("pid", row.API_pid);
      this.$router.push("/operationmanage/patientdetails");
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.API_state == "未处理" || row.API_pingguState == "是") {
        return "highlight";
      } else {
        return "";
      }
    }
  },
  computed: {
    showTable: function() {
      let result = [];
      this.tableData.forEach(data => {
        if (
          (!this.formInline.API_name ||
            data.API_name.includes(this.formInline.API_name)) &&
          (!this.formInline.API_number ||
            data.API_toHospitalID.includes(this.formInline.API_number)) &&
          (!this.formInline.API_expert ||
            data.API_expert.includes(this.formInline.API_expert)) &&
          (!this.formInline.API_state ||
            data.API_state.includes(this.formInline.API_state)) &&
          (!this.formInline.API_pingguState ||
            data.API_pingguState.includes(this.formInline.API_pingguState))
        ) {
          result.push(data);
        }
      });
      result = result.sort((a, b) => {
        if (a.API_state == "未处理") {
          return -1;
        }
        if (b.API_state == "未处理") {
          return 1;
        }
        if (a.API_pingguState == "是") {
          return -1;
        }
        if (b.API_pingguState == "是") {
          return 1;
        }
        return parseInt(a.API_toHospitalID) - parseInt(b.API_toHospitalID);
      });
      return result;
    }
  },
  mounted() {
    getPatientsList().then(res => {
      this.tableData = res;
      console.log(res);
    });
  }
};
</script>

<style scoped lang="scss">
.eltable {
  width: 90%;
  margin: 10px 5%;
}

.filter {
  margin: 20px 0px 0px 5%;
}
.page {
  float: right;
  margin: 10px 5% 10px 0px;
}
.formLabel {
  font-size: 16px;
  // font-weight: bold;
  color: #1c7e7c;
  margin-left: 5px;
}
.btn {
  background-color: #1c7e7c;
  margin-left: 30px;
}
</style>
<style>
.el-table .highlight {
  background: oldlace;
}
</style>