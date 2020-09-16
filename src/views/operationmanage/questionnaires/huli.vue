<template>
  <div class="questionnaire">
    <!-- 
    跌倒功能评定
    -->
    <el-form size="mini" ref="form" label-position="left" :model="table" label-width="80px">
      <div>
        <div class="item">
          <el-row class="tizheng">
            <el-col :span="4">
              <span class="label">生命体征</span>
            </el-col>
            <el-col :span="20">
              <el-row>
                <el-col style="margin-top:3px" :span="2">
                  <span class="subLabel">T</span>
                </el-col>
                <el-col style="margin-top:3px" :span="6">
                  <el-input class="input"></el-input>
                  <span>℃</span>
                </el-col>
                <el-col style="margin-top:3px" :span="2">
                  <span class="subLabel">P</span>
                </el-col>
                <el-col style="margin-top:3px" :span="6">
                  <el-input class="input"></el-input>
                  <span>次/分</span>
                </el-col>
                <el-col style="margin-top:3px" :span="2">
                  <span class="subLabel">R</span>
                </el-col>
                <el-col style="margin-top:3px" :span="6">
                  <el-input class="input"></el-input>
                  <span>次/分</span>
                </el-col>
                <el-col style="margin-top:3px" :span="2">
                  <span class="subLabel">BP</span>
                </el-col>
                <el-col style="margin-top:3px" :span="6">
                  <el-input class="input"></el-input>
                  <span>mmHg</span>
                </el-col>
                <el-col style="margin-top:3px" :span="2">
                  <span class="subLabel">SPO2</span>
                </el-col>
                <el-col style="margin-top:3px" :span="6">
                  <el-input class="input"></el-input>
                  <span>%</span>
                </el-col>
                <el-col style="margin-top:3px" :span="2">
                  <span class="subLabel">血糖</span>
                </el-col>
                <el-col style="margin-top:3px" :span="6">
                  <el-input class="input"></el-input>
                  <span>mmol/L</span>
                </el-col>
                <el-col style="margin-top:3px" :span="2">
                  <span class="subLabel">体重</span>
                </el-col>
                <el-col style="margin-top:3px" :span="6">
                  <el-input class="input"></el-input>
                  <span>kg</span>
                </el-col>
                <el-col style="margin-top:3px" :span="2">
                  <span class="subLabel">身高</span>
                </el-col>
                <el-col style="margin-top:3px" :span="6">
                  <el-input class="input"></el-input>
                  <span>cm</span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div class="item">
          <el-row class="tizheng">
            <el-col :span="4">
              <span class="label">沟通能力</span>
            </el-col>
            <el-col :span="20">
              <el-radio-group v-model="radio">
                <el-radio label="自理"></el-radio>
                <el-radio label="部分自理"></el-radio>
                <el-radio label="不能自理"></el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
        </div>
        <div class="item">
          <el-row class="tizheng">
            <el-col :span="4">
              <span class="label">睡眠情况</span>
            </el-col>
            <el-col :span="20">
              <el-radio-group v-model="radio">
                <el-radio label="正常"></el-radio>
                <el-radio label="异常"></el-radio>
                <el-radio label="入睡困难"></el-radio>
                <el-radio label="易醒"></el-radio>
                <el-radio label="多梦"></el-radio>
                <el-radio label="服镇静剂"></el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
        </div>
        <div class="item">
          <el-row class="tizheng">
            <el-col :span="4">
              <span class="label">排泄情况</span>
            </el-col>
            <el-col :span="20">
              <el-row>
                <el-col :span="4">小便</el-col>
                <el-col :span="20">
                  <el-radio-group v-model="radio">
                    <el-radio label="正常"></el-radio>
                    <el-radio label="异常"></el-radio>
                  </el-radio-group>
                  <el-row v-show="radio=='异常'">
                    <el-col :span="24">
                      <el-checkbox-group v-model="radio">
                        <el-checkbox label="院外带入尿管"></el-checkbox>
                        <el-checkbox label="失禁"></el-checkbox>
                        <el-checkbox label="尿潴留"></el-checkbox>
                        <el-checkbox label="其他"></el-checkbox>
                      </el-checkbox-group>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="4">大便</el-col>
                <el-col :span="20">
                  <el-radio-group v-model="radio">
                    <el-radio label="正常"></el-radio>
                    <el-radio label="异常"></el-radio>
                  </el-radio-group>
                  <el-row v-show="radio=='异常'">
                    <el-col :span="24">
                      <el-checkbox-group v-model="radio">
                        <el-checkbox label="便秘"></el-checkbox>
                        <el-checkbox label="大便失禁"></el-checkbox>
                        <el-checkbox label="腹泻"></el-checkbox>
                        <el-checkbox label="其他"></el-checkbox>
                      </el-checkbox-group>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div class="item">
          <el-row class="tizheng">
            <el-col :span="4">
              <span class="label">皮肤情况</span>
            </el-col>
            <el-col :span="20">
              <el-radio-group v-model="radio">
                <el-radio label="正常"></el-radio>
                <el-radio label="异常"></el-radio>
              </el-radio-group>
              <el-row v-show="radio=='异常'">
                <el-col :span="24">
                  <el-checkbox-group v-model="radio">
                    <el-checkbox label="水肿"></el-checkbox>
                    <el-checkbox label="水泡"></el-checkbox>
                    <el-checkbox label="破损"></el-checkbox>
                    <el-checkbox label="压疮"></el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div class="item">
          <el-row class="tizheng">
            <el-col :span="4">
              <span class="label">过敏史</span>
            </el-col>
            <el-col :span="20">
              <el-radio-group v-model="radio">
                <el-radio label="有"></el-radio>
                <el-radio label="无"></el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
        </div>
        <div class="item">
          <el-row class="tizheng">
            <el-col :span="4">
              <span class="label">专科情况</span>
            </el-col>
            <el-col :span="20">
              <el-row>
                <el-col style="margin-top:3px" :span="4">
                  <span class="subLabel">意识状态</span>
                </el-col>
                <el-col style="margin-top:3px" :span="20">
                  <el-checkbox-group v-model="radio">
                    <el-checkbox label="清醒"></el-checkbox>
                    <el-checkbox label="嗜睡"></el-checkbox>
                    <el-checkbox label="昏睡"></el-checkbox>
                    <el-checkbox label="昏迷"></el-checkbox>
                    <el-checkbox label="意识模糊"></el-checkbox>
                    <el-checkbox label="谵妄"></el-checkbox>
                    <el-checkbox label="特殊"></el-checkbox>
                  </el-checkbox-group>
                </el-col>
                <el-col style="margin-top:3px" :span="4">
                  <span class="subLabel">认知功能</span>
                </el-col>
                <el-col style="margin-top:3px" :span="20">
                  <el-checkbox-group v-model="radio">
                    <el-checkbox label="清醒"></el-checkbox>
                    <el-checkbox label="嗜睡"></el-checkbox>
                    <el-checkbox label="昏睡"></el-checkbox>
                    <el-checkbox label="昏迷"></el-checkbox>
                    <el-checkbox label="意识模糊"></el-checkbox>
                    <el-checkbox label="谵妄"></el-checkbox>
                    <el-checkbox label="特殊"></el-checkbox>
                  </el-checkbox-group>
                </el-col>
                <el-col style="margin-top:3px" :span="4">
                  <span class="subLabel">意识状态</span>
                </el-col>
                <el-col style="margin-top:3px" :span="20">
                  <el-checkbox-group v-model="radio">
                    <el-checkbox label="清醒"></el-checkbox>
                    <el-checkbox label="嗜睡"></el-checkbox>
                    <el-checkbox label="昏睡"></el-checkbox>
                    <el-checkbox label="昏迷"></el-checkbox>
                    <el-checkbox label="意识模糊"></el-checkbox>
                    <el-checkbox label="谵妄"></el-checkbox>
                    <el-checkbox label="特殊"></el-checkbox>
                  </el-checkbox-group>
                </el-col>
                <el-col style="margin-top:3px" :span="4">
                  <span class="subLabel">意识状态</span>
                </el-col>
                <el-col style="margin-top:3px" :span="20">
                  <el-checkbox-group v-model="radio">
                    <el-checkbox label="清醒"></el-checkbox>
                    <el-checkbox label="嗜睡"></el-checkbox>
                    <el-checkbox label="昏睡"></el-checkbox>
                    <el-checkbox label="昏迷"></el-checkbox>
                    <el-checkbox label="意识模糊"></el-checkbox>
                    <el-checkbox label="谵妄"></el-checkbox>
                    <el-checkbox label="特殊"></el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div class="item">
          <el-row class="tizheng">
            <el-col :span="4">
              <span class="label">入院介绍</span>
            </el-col>
            <el-col :span="20">
              <el-row>
                <el-col style="margin-top:3px" :span="2">
                  <span class="subLabel">T</span>
                </el-col>
                <el-col style="margin-top:3px" :span="6">
                  <el-input class="input"></el-input>
                  <span>℃</span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div class="item">
          <el-row class="tizheng">
            <el-col :span="8">
              <span class="label">是否需要24小时留陪护</span>
            </el-col>
            <el-col :span="16">
              <el-row>
                <el-col style="margin-top:3px" :span="2">
                  <span class="subLabel">T</span>
                </el-col>
                <el-col style="margin-top:3px" :span="6">
                  <el-input class="input"></el-input>
                  <span>℃</span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div class="item">
          <el-row class="tizheng">
            <el-col :span="8">
              <span class="label">首次初评有无压疮风险</span>
            </el-col>
            <el-col :span="16">
              <el-row>
                <el-col style="margin-top:3px" :span="2">
                  <span class="subLabel">T</span>
                </el-col>
                <el-col style="margin-top:3px" :span="6">
                  <el-input class="input"></el-input>
                  <span>℃</span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div class="item">
          <el-row class="tizheng">
            <el-col :span="8">
              <span class="label">首次初评有无跌倒风险</span>
            </el-col>
            <el-col :span="16">
              <el-row>
                <el-col style="margin-top:3px" :span="2">
                  <span class="subLabel">T</span>
                </el-col>
                <el-col style="margin-top:3px" :span="6">
                  <el-input class="input"></el-input>
                  <span>℃</span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div class="item">
          <el-row class="tizheng">
            <el-col :span="8">
              <span class="label">日常生活评定得分</span>
            </el-col>
            <el-col :span="16">
              <el-row>
                <el-col style="margin-top:3px" :span="2">
                  <span class="subLabel">T</span>
                </el-col>
                <el-col style="margin-top:3px" :span="6">
                  <el-input class="input"></el-input>
                  <span>℃</span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "",
      table: {
        title: "护理记录首页",
        time: "",
        diagnosis: "",
        tizheng: {
          T: "", //温度
          P: "", //血压
          R: "", //呼吸
          BP: "", //血压
          BS: "", //空腹/随机血糖
          SPO2: "", //血氧饱和度
          HEIGHT: "", //身高
          WEIGHT: "" //体重
        },
        // 自理
        zili: {
          options: ["自理", "部分自理", "不能自理"],
          selected: ""
        },
        goutong: {
          options: ["正常", "下降", "不能表达"],
          selected: ""
        },
        shuimian: {
          options: ["正常", "异常", "入睡困难", "易醒", "多梦", "服镇静剂"],
          selected: ""
        },
        // 排泄情况
        paixie: {
          // 小便
          xiaobian: {
            isNormal: "",
            badOptions: ["院外带入尿管", "失禁", "尿潴留", "其他"],
            selected: []
          },
          // 大便
          dabian: {
            isNormal: "",
            badOptions: ["便秘", "大便失禁", "腹泻", "其他"],
            selected: []
          }
        },
        pifu: {
          isNormal: "",
          badOptions: ["水肿", "水泡", "破损", "压疮"],
          selected: []
        },
        // 过敏史
        allergyHistory: "", //true or false
        // 专科情况
        zhuanke: {
          // 意识状态
          yishi: {
            options: [
              "清醒",
              "嗜睡",
              "昏睡",
              "昏迷",
              "意识模糊",
              "儋妄",
              "特殊"
            ],
            selected: ""
          },
          // 认知
          renzhi: {
            options: ["查体不配合", "正常", "下降"],
            selected: ""
          },
          milu: {
            options: ["有", "无"],
            selected: ""
          }, //true or false
          yundong: {
            options: ["查体不配合", "正常", "下降"],
            positionOptions: ["左上", "左下", "右上", "右下"],
            selected: "",
            positionSelected: []
          },
          tunyan: {
            options: ["查体不配合", "正常", "异常"],
            selected: ""
          },
          ganjue: {
            options: ["查体不配合", "正常", "迟钝", "刺激性症状", "特殊"],
            selected: ""
          },
          tengtong: {
            options: ["有", "无"],
            selected: "",
            score: ""
          }
        },
        peihu: "", //true or false
        yachuang: "", //true or false
        diedao: "", //true or false
        richang: "" //true or false
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
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
  }
  .tizheng {
    // margin: 5px 0;
    .subLabel {
      line-height: 25px;
    }
    .input {
      width: 50px;
      margin-right: 5px;
    }
  }
  .item {
    margin-bottom: 10px;
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
  .el-input__inner {
    height: 25px;
    line-height: 25px;
  }
}
</style>