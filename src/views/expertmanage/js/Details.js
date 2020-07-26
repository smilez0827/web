import {
  getExpertDetails,
  modifyBadicInfo,
  addMember,
  delMember,
  modifyMember
} from "../../../api/expertmanage/expertmanage.js";
import { checkUserName, checkPassword ,regIsNumber} from "../../../utils/verify.js"
export default {
  name: "Deatails",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (!regIsNumber(this.exp.addDialog.UserID)) {
          callback(new Error('只能包含字母数字'));
        }
        callback();
      }
    };
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else {
        if (!regIsNumber(this.exp.addDialog.UserID)) {
          callback(new Error('以字母开头，只能包含字母数字下划线和减号，4到16位'));
        }
        callback();
      }
    };
    return {
      uploadToken: {
        Authorization: localStorage.getItem("token")
      },
      ExpertID: "",
      exp: {
        count: 10,
        searchRule: {
          Name: "",
          department: ""
        },
        addDialogVisible: false,
        addDialog: {
          Name: "",
          UserID: "",
          Password: "",
          department: "",
          Research: ""
        },
        delDialogVisible: false,
        modifyDialogVisible: false,
        modifyDialog: {
          Name: "",
          UserID: "",
          Password: "",
          department: ""
        },
        targetRow: {}
      },
      activeName: "first",
      expertGroupInfo: {
        expertdetails: {
          ExpertImage: "",
          ExpertName: "",
          ExpertSpecialty: "",
          ExpertIntroduction:
            "",
          ExpertID: "",
          ExpertTel: ""
        },
        TeamDoctor: [
          {
            Name: "",
            ID: "",
            Image: "",
            department: ""
          }
        ]
      },
      rules: {
        Password: [
          { validator: validatePass, trigger: 'blur' },
        ],
        UserID: [
          { validator: validateUsername, trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    expShowTable: function () {
      let result = [];
      let departmentList = [];
      this.expertGroupInfo.TeamDoctor.forEach(data => {
        if (departmentList.indexOf(data.department) == -1) {
          departmentList.push(data.department);
        }
        if (
          (!this.exp.searchRule.Name ||
            data.Name == this.exp.searchRule.Name) &&
          (!this.exp.searchRule.department ||
            data.department == this.exp.searchRule.department)
        ) {
          result.push(data);
        }
      });
      return { result: result, departmentList: departmentList };
    }
  },
  methods: {
    handleAvatarSuccess(res) {
      this.expertGroupInfo.expertdetails.ExpertImage = "http://" + res.url;
    },
    expReSet() {
      this.exp.searchRule.Name = "";
      this.exp.searchRule.department = "";
    },
    basicInfo() {
      modifyBadicInfo(this.ExpertID, this.expertGroupInfo.expertdetails);
    },

    addExpert() {
      let obj = this.exp.addDialog;
      obj.RoleName = "专家";
      this.$refs.addDialog.validate(valid => {
        if (valid) {
          addMember(this.ExpertID, obj).then(res => {
            if (res) {
              this.expertGroupInfo.TeamDoctor.push(obj);
              this.exp.addDialogVisible = false;
            }
          });
        }
      })

    },
    delExpert(data) {
      this.exp.delDialogVisible = true;
      this.exp.targetRow = data;
    },
    //确认删除医师
    confirmExpDel() {
      delMember(this.ExpertID, this.exp.targetRow.UserID).then(res => {
        if (res) {
          this.expertGroupInfo.TeamDoctor.forEach((item, index) => {
            if (item.UserID == this.exp.targetRow.UserID) {
              this.expertGroupInfo.TeamDoctor.splice(index, 1);
            }
          });
        }
      });
      this.exp.delDialogVisible = false;
    },
    modifyExpert(data) {
      this.exp.modifyDialogVisible = true;
      this.exp.targetRow = data;
      this.exp.modifyDialog = data;
    },
    //医生修改确认
    confirmExpmodify() {
      modifyMember(this.exp.modifyDialog);
      this.exp.modifyDialogVisible = false;
    }
  },
  mounted() {
    this.ExpertID = localStorage.getItem("ExpertID");
    getExpertDetails(this.ExpertID).then(res => {
      this.expertGroupInfo = res;
    });
  }
};