<template>
  <div>
    <el-button @click="test">就诊申请</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    test() {
      this.$socket.client.emit(
        "seekMedicalAdvice",
        JSON.stringify({
          fromid: "101003", //这个写101001-101200之间的数字都可以
          toid: "101001", //这个写医生的账号
          API_name: "王小虎",
          API_symptom: "感冒发烧流鼻涕"
        })
      );
    }
  }
};
</script>

<style scoped lang="scss">
</style>
