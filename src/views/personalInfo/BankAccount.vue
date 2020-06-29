<template>
  <div class="content">
    <el-row class="title">
      <el-col :span="6" :offset="1">
        <span>银行卡账户</span>
      </el-col>
    </el-row>
    <div class="card">
      <div class="icon">
        <i class="iconfont icon-huanzhezhenduan"></i>
      </div>
      <div class="info">
        <template v-if="formData.bankAccount.account">
          <span>银行名：{{formData.bankAccount.bank}}</span>
          <span>银行卡号：{{formData.bankAccount.account}}</span>
          <span>持卡人姓名：{{formData.bankAccount.name}}</span>
          <div class="btn">
            <el-button
              type="primary"
              class="btn-left"
              @click="bankDialogVisible=!bankDialogVisible"
            >修改</el-button>
            <el-button type="danger" class="btn-right" @click="bankUntie">解绑</el-button>
          </div>
        </template>
        <template v-else>
          <span>尚未绑定银行卡账户...</span>
          <div class="btn">
            <el-button type="success" @click="bankDialogVisible=!bankDialogVisible">绑定</el-button>
          </div>
        </template>
      </div>
      <div></div>
    </div>

    <el-row class="title">
      <el-col :span="6" :offset="1">
        <span>支付宝账户</span>
      </el-col>
    </el-row>
    <div class="card">
      <div class="icon">
        <i class="iconfont icon-huanzhezhenduan"></i>
      </div>
      <div class="info">
        <template v-if="formData.alipay.account">
          <span>账户名：{{formData.alipay.account}}</span>
          <span>姓名：{{formData.alipay.name}}</span>
          <div class="btn">
            <el-button
              type="primary"
              class="btn-left"
              @click="alipayDialogVisible=!alipayDialogVisible"
            >修改</el-button>
            <el-button type="danger" class="btn-right" @click="alipayUntie">解绑</el-button>
          </div>
        </template>
        <template v-else>
          <span>尚未绑定支付宝账户...</span>
          <div class="btn">
            <el-button type="success" @click="wechatDialogVisible=!wechatDialogVisible">绑定</el-button>
          </div>
        </template>
      </div>
      <div></div>
    </div>
    <el-row class="title">
      <el-col :span="6" :offset="1">
        <span>微信账户</span>
      </el-col>
    </el-row>
    <div class="card">
      <div class="icon">
        <i class="iconfont icon-huanzhezhenduan"></i>
      </div>
      <div class="info">
        <template v-if="formData.wechat.account">
          <span>账户名：{{formData.wechat.account}}</span>
          <span>姓名：{{formData.wechat.name}}</span>
          <div class="btn">
            <el-button
              type="primary"
              class="btn-left"
              @click="wechatDialogVisible=!wechatDialogVisible"
            >修改</el-button>
            <el-button type="danger" class="btn-right" @click="wechatUntie">解绑</el-button>
          </div>
        </template>
        <template v-else>
          <span>尚未绑定微信账户...</span>
          <div class="btn">
            <el-button type="success" @click="wechatDialogVisible=!wechatDialogVisible">绑定</el-button>
          </div>
        </template>
      </div>
      <div></div>
    </div>

    <el-dialog title="银行卡绑定" :visible.sync="bankDialogVisible">
      <el-form>
        <el-form-item label="银行" :label-width="formLabelWidth">
          <el-input v-model="newBankAccount.bank"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号" :label-width="formLabelWidth">
          <el-input v-model="newBankAccount.account"></el-input>
        </el-form-item>
        <el-form-item label="持卡人姓名" :label-width="formLabelWidth">
          <el-input v-model="newBankAccount.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" :label-width="formLabelWidth">
          <el-input v-model="newBankAccount.cardId"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="bankDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBankAccount">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="支付宝绑定" :visible.sync="alipayDialogVisible">
      <el-form>
        <el-form-item label="支付宝账户" :label-width="formLabelWidth">
          <el-input v-model="newAlipayAccount.bank"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="newAlipayAccount.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" :label-width="formLabelWidth">
          <el-input v-model="newAlipayAccount.cardId"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="alipayDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAlipayAccount">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="微信绑定" :visible.sync="wechatDialogVisible">
      <el-form>
        <el-form-item label="微信账户" :label-width="formLabelWidth">
          <el-input v-model="newWechatAccount.account"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="newWechatAccount.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" :label-width="formLabelWidth">
          <el-input v-model="newWechatAccount.cardId"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="wechatDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addWechatAccount">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="untieDialogVisible" width="30%" >
      <span>确定解除绑定？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="untieDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="untie">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
// import { getBasicInfo, changeBasicInfo } from "../../api/user/user.js";
export default {
  name: "More",
  data() {
    return {
      untieDialogVisible: false,
      untieFlag: "",
      formLabelWidth: "120px",
      bankDialogVisible: false,
      alipayDialogVisible: false,
      wechatDialogVisible: false,
      newBankAccount: {
        bank: "",
        account: "",
        name: "",
        cardId: ""
      },
      newAlipayAccount: {
        account: "",
        name: "",
        cardId: ""
      },
      newWechatAccount: {
        account: "",
        name: "",
        cardId: ""
      },
      formData: {
        bankAccount: {
          bank: "中国工商银行",
          account: "1998238738992342",
          name: "张三"
        },
        alipay: {
          account: "GASDFD23",
          name: "张三"
        },
        wechat: {
          account: "",
          name: "张三"
        }
      },
    };
  },
  methods: {
    addBankAccount() {
      console.log(this.newBankAccount);
      this.bankDialogVisible = !this.bankDialogVisible;
    },
    addAlipayAccount() {
      console.log(this.newAlipayAccount);
      this.alipayDialogVisible = !this.alipayDialogVisible;
    },
    addWechatAccount() {
      console.log(this.newWechatAccount);
      this.wechatDialogVisible = !this.wechatDialogVisible;
    },
    bankUntie() {
      this.untieDialogVisible = true;
      this.untieFlag = "bank";
    },
    alipayUntie() {
      this.untieDialogVisible = true;
      this.untieFlag = "alipay";
    },
    wechatUntie() {
      this.untieDialogVisible = true;
      this.untieFlag = "wechat";
    },
    untie() {
      switch (this.untieFlag) {
        case "bank":
          console.log(this.formData.bankAccount);
          break;
        case "alipay":
          console.log(this.formData.alipay);
          break;
        case "wechat":
          console.log(this.formData.wechat);
          break;
        default:
          console.log("err");
      }
    this.untieDialogVisible = false
    }
  }
};
</script >

<style scoped lang="scss">
.content {
  .title {
    font-size: 20px;
    font-weight: bold;
    color: #1c7e7c;
    margin-top: 20px;
  }
  .card {
    width: 90%;
    height: 100px;
    margin: 20px auto;
    background-color: #f2f2f2;
    border-radius: 15px;
    .icon {
      width: 10%;
      height: 100px;
      float: left;
      margin-left: 3%;
      i {
        font-size: 90px;
      }
    }
    .info {
      width: 85%;
      height: 100px;
      float: left;
      line-height: 100px;
      color: #1c7e7c;
      span {
        margin-left: 20px;
        font-size: 100%;
      }
      .btn {
        float: right;
      }
      .btn-left {
        margin-left: 20px;
        margin-right: 10px;
      }
    }
  }
}
</style>
