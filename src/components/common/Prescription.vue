<template>
  <div>
    <el-table size="mini" :data="prescription" style="width: 100%">
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
</template>

<script>
// 处方、表格展示表格组件
export default {
  name: "CheckBox",
  props: {
    prescription: Array
  },

  methods: {
    
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>