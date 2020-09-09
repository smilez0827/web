<template>
  <div>
    <el-table v-if="prescription.length>0" size="mini" :data="prescription" style="width: 100%">
      <el-table-column label="名称">
        <template slot-scope="scope">
          <span>{{ scope.row.API_drugsName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="生产厂家">
        <template slot-scope="scope">
          <span>{{ scope.row.API_manufacturer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="规格">
        <template slot-scope="scope">
          <span>{{ scope.row.API_drugsSpecification }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数量" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.API_drugsNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单位" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.API_drugsNumberUnits }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单次用量">
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
</template>

<script>
// 处方、表格展示表格组件
export default {
  name: "CheckBox",
  props: {
    prescription: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },

  methods: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>