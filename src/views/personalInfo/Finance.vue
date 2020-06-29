<template>
  <div>
    <!-- <el-row class="title">
      <el-col :span="6" :offset="1">
        <span>收入明细</span>
      </el-col>
    </el-row>-->

    <div class="filter">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <template slot="label">
            <span class="formLabel">账户：</span>
          </template>
          <el-input v-model="formInline.account" placeholder="请输入账户" style="width:150px"></el-input>
        </el-form-item>
        <el-form-item>
          <template slot="label">
            <span class="formLabel">类型：</span>
          </template>
          <el-select v-model="formInline.type" placeholder="请选择" style="width:100px">
            <el-option label="银行卡" value="银行卡"></el-option>
            <el-option label="支付宝" value="支付宝"></el-option>
            <el-option label="微信" value="微信"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <template slot="label">
            <span class="formLabel">时间：</span>
          </template>
          <el-date-picker
            v-model="formInline.dateRange"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="reSet" class="btn">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="eltable">
      <el-table
        :data="showTable.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        style="width: 100%"
        border
        :cell-style="{'text-align':'center'}"
        :header-cell-style="{background:'#EFF3F4',color:'#1c7e7c','text-align':'center',  'font-size': '18px','font-weight': 'bold',}"
      >
        <el-table-column label="序号" width="80" type="index"></el-table-column>
        <el-table-column label="时间" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>

        <el-table-column label="账户" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.account }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类别" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column label="描述">
          <template slot-scope="scope">
            <span>{{ scope.row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="金额" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.amount }}</span>
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

<script type="text/javascript">
import { getFinanceInfo } from "../../api/user/user.js";
export default {
  name: "More",
  data() {
    return {
      formInline: {
        account: "",
        type: "",
        dateRange: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          age: "14",
          gender: "男",
          symptom: "感冒发烧流鼻涕"
        }
      ],
      tableData2: [
        {
          date: "2016-05-02",
          account: "19984333897",
          type: "支付宝",
          description: "视频会诊",
          amount: "18"
        },
        {
          date: "2016-05-02",
          account: "19984333897",
          type: "支付宝",
          description: "视频会诊",
          amount: "18"
        },{
          date: "2016-05-02",
          account: "19984333897",
          type: "支付宝",
          description: "视频会诊",
          amount: "18"
        },{
          date: "2016-05-02",
          account: "19984333897",
          type: "支付宝",
          description: "视频会诊",
          amount: "18"
        },{
          date: "2016-05-02",
          account: "19984333897",
          type: "支付宝",
          description: "视频会诊",
          amount: "18"
        }
        ,{
          date: "2016-05-02",
          account: "19984333897",
          type: "微信",
          description: "视频会诊",
          amount: "18"
        },{
          date: "2016-05-02",
          account: "19984333897",
          type: "银行卡",
          description: "视频会诊",
          amount: "18"
        }
      ],
      currentPage: 1,
      pageSize: 10
    };
  },
  methods: {
    reSet() {
      (this.formInline.account = ""),
        (this.formInline.type = ""),
        (this.formInline.dateRange = "");
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  },
  mounted() {
    getFinanceInfo().then(res => {
      console.log(res);
    });
  },
  computed: {
    showTable: function() {
      let result = [];
      let time = 0;
      this.tableData2.forEach(data => {
        time = Date.parse(data.date);
        if (
          (!this.formInline.account || data.account == this.formInline.account) &&
          (!this.formInline.type || data.type == this.formInline.type)
        ) {
          if (
            !this.formInline.dateRange ||
            (time > this.formInline.dateRange[0].getTime() &&
              time < this.formInline.dateRange[1].getTime())
          ) {
            result.push(data);
          }
        }
      });
      return result;
    }
  }
};
</script >

<style scoped lang="scss">
.title {
  font-size: 20px;
  font-weight: bold;
  color: #1c7e7c;
  margin-top: 20px;
}
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
  font-size: 18px;
  font-weight: bold;
  color: #1c7e7c;
  margin-left: 5px;
}
.btn {
  // background-color: #1c7e7c;
  margin-left: 30px;
}
</style>
