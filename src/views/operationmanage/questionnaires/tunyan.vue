<template>
  <div class="questionnaire">
    <!-- 
    吞咽功能评定
    -->
    <el-form size="mini" ref="form" label-position="left" :model="form" label-width="400px">
      <div>
        <div>
          <span class="label">一、初评</span>
          <el-form-item v-for="item in table.partOne" :key="item.id" :label="item.text">
            <el-radio-group v-model="item.result">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div>
          <span style="font-weight:bold;margin:30px 20px">排除标准</span>
          <span>如上述任何答案为“是”都不要尝试以下饮水试验</span>
        </div>
        <div>
          <span class="label">二、操作方法</span>
          <p v-for="(item,index) in table.partTwo" :key="item.id">{{'（'+(index+1)+'）'+item}}</p>
        </div>

        <div>
          <span class="label">三、吞咽情况结果判定</span>
          <el-form-item label-width="0px" prop="region">
            <el-select style="width:90%" v-model="table.result.selected" placeholder="请选择吞咽情况结果判定">
              <el-option v-for="item in table.result.options" :key="item.id" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <span class="label">四、建议指导</span>
          <el-form-item label-width="0px" prop="region">
            <el-select style="width:90%" v-model="table.advice.selected" placeholder="请选择建议指导">
              <el-option v-for="item in table.advice.options" :key="item.id" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      table: {
        title: "吞咽功能评定",
        time: "",
        partOne: [
          {
            text: "病人已经或怀疑患有吸入性肺炎",
            result: ""
          },
          {
            text: "靠气管造口呼吸",
            result: ""
          },
          {
            text: "需要经常性吸痰",
            result: ""
          },
          {
            text: "有困难处理口水及分泌物",
            result: ""
          },
          {
            text: "意识水平波动",
            result: ""
          },
          {
            text: "不合作",
            result: ""
          },
          {
            text: "有不正常等口部反射动作例如:咬紧牙关",
            result: ""
          },
          {
            text: "不能脱离面罩吸氧30分钟",
            result: ""
          },
          {
            text: "不能坐起",
            result: ""
          }
        ],
        partTwo: [
          "使病人正坐位，卧床患者至少抬高床头大于60",
          "清患者自行咳嗽一次，检查有无咳嗽反射",
          "指导患者整个试验过程不能说话，勿紧张",
          "准备一杯40ml的温开水，一小茶匙",
          "以每次5ml喂给患者，共2次，共计10ml温开水",
          "请患者张口，用手电筒检查患者口腔有无残留水（必要时测量氧饱和度）",
          "余下的30ml请患者用药杯一次喝完，观察记录饮水情况",
          "再次请患者张口，用手电筒检查患者口腔有无残留水（必要时测量氧饱和度）"
        ],
        result: {
          options: [
            "可一口喝完，无呛咳",
            "分两次喝完，无呛咳",
            "能一口喝完，但是有呛咳",
            "分两次喝完，有呛咳",
            "常常呛住，难以全部喝完"
          ],
          selected: ""
        },
        advice: {
          options: [
            "Ⅲ级:给予指导自行吞咽训练",
            "Ⅳ级:给予吞咽训练及指导自行吞咽训练",
            "V级:建议给予留置胃管"
          ],
          selected: ""
        }
      }
    };
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.questionnaire {
  max-height: 300px;
  overflow-y: auto;
  .label {
    font-size: 16px;
    color: #1e7e7c;
    display: block;
    margin: 10px 0;
  }
}
</style>

<style lang="scss">
.questionnaire {
  .el-form-item {
    margin-bottom: 0px;
  }
  .el-form-item__content {
    line-height: 25px;
  }
  .el-form-item__label {
    line-height: 25px;
  }
}
</style>