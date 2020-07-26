import {
    getOrgDetails,
    modifyBadicInfo,
    delMember,
    addMember,
    modifyMember
  } from "../../../api/orgmanage/orgmanage.js";
  export default {
    name: "Deatails",
    data() {
      return {
        uploadToken: {
          Authorization: localStorage.getItem("token")
        },
        currentDate: new Date(),
        doc: {
          count: 10,
          searchRule: {
            Name: "",
            DepartmentIName: ""
          },
          currentPage: 1,
          pageSize: 5,
          addDialogVisible: false,
          addDialog: {
            Name: "",
            UserID: "",
            Password: "",
            DepartmentIName: ""
          },
          delDialogVisible: false,
          modifyDialogVisible: false,
          modifyDialog: {
            Name: "",
            UserID: "",
            Password: "",
            DepartmentIName: ""
          },
          targetRow: {}
        },
        nur: {
          searchRule: {
            name: "",
            department: ""
          },
          addDialogVisible: false,
          addDialog: {
            Name: "",
            UserID: "",
            Password: "",
            DepartmentIName: ""
          },
          delDialogVisible: false,
          modifyDialogVisible: false,
          modifyDialog: {
            Name: "",
            UserID: "",
            Password: "",
            DepartmentIName: ""
          },
          targetRow: {},
          count: 10
        },
        HospitalID: "",
        activeName: "second",
        orgInfo: {
          HospitalOrgDetails: {
            HospitalName: "北京协和医院",
            HospitalLeve: "三级甲等",
            HospitalType: "综合医院",
            Address: "北京市东城区帅府园1号（东院）;西城区大木仓胡同41号（西院）",
            ContactPhone: "010-67096611(总机)",
            Image: ""
          },
          HospitalIntroduction: ``,
          Doctor: [],
          Nurse: []
        }
      };
    },
    computed: {
      docShowTable: function() {
        let result = [];
        let departmentList = [];
        this.orgInfo.Doctor.forEach(data => {
          if (departmentList.indexOf(data.DepartmentIName) == -1) {
            departmentList.push(data.DepartmentIName);
          }
          if (
            (!this.doc.searchRule.Name ||
              data.Name == this.doc.searchRule.Name) &&
            (!this.doc.searchRule.DepartmentIName ||
              data.DepartmentIName == this.doc.searchRule.DepartmentIName)
          ) {
            result.push(data);
          }
        });
        return { result: result, departmentList: departmentList };
      },
      nurShowTable: function() {
        let result = [];
        let departmentList = [];
        this.orgInfo.Nurse.forEach(data => {
          if (departmentList.indexOf(data.DepartmentIName) == -1) {
            departmentList.push(data.DepartmentIName);
          }
          if (
            (!this.nur.searchRule.Name ||
              data.Name == this.nur.searchRule.Name) &&
            (!this.nur.searchRule.DepartmentIName ||
              data.DepartmentIName == this.nur.searchRule.DepartmentIName)
          ) {
            result.push(data);
          }
        });
        return { result: result, departmentList: departmentList };
      }
    },
    methods: {
      handleAvatarSuccess(res) {
        this.orgInfo.HospitalOrgDetails.Image = "http://" + res.url;
      },
      HospitalOrgDetails() {
        this.orgInfo.HospitalOrgDetails.HospitalIntroduction = this.orgInfo.HospitalIntroduction;
        modifyBadicInfo(this.HospitalID, this.orgInfo.HospitalOrgDetails);
      },
      docReSet() {
        this.doc.searchRule.Name = "";
        this.doc.searchRule.DepartmentIName = "";
      },
      addDoctor() {
        let obj = this.doc.addDialog;
        obj.RoleName = "医生";
        addMember(this.HospitalID, obj).then(res => {
          if (res) {
            this.orgInfo.Doctor.push(obj);
          }
        });
        this.doc.addDialogVisible = false;
      },
      delDoctor(data) {
        this.doc.delDialogVisible = true;
        this.doc.targetRow = data;
      },
      //缺认删除医师
      confirmDocDel() {
        delMember(this.HospitalID, this.doc.targetRow.UserID).then(res => {
          if (res) {
            this.orgInfo.Doctor.forEach((item, index) => {
              if (item.UserID == this.doc.targetRow.UserID) {
                this.orgInfo.Doctor.splice(index, 1);
              }
            });
          }
        });
        this.doc.delDialogVisible = false;
      },
      modifyDoctor(data) {
        this.doc.modifyDialogVisible = true;
        this.doc.targetRow = data;
        this.doc.modifyDialog = data;
      },
      //医生修改确认
      confirmDocmodify() {
        modifyMember(this.doc.modifyDialog);
        this.doc.modifyDialogVisible = false;
      },
      nurReSet() {
        this.nur.searchRule.Name = "";
        this.nur.searchRule.DepartmentIName = "";
        this.nur.count = 10;
      },
      addNurShowCount() {
        this.nur.count += 10;
      },
      addNurse() {
        let obj = this.nur.addDialog;
        obj.RoleName = "护士";
        this.nur.addDialogVisible = false;
        addMember(this.HospitalID, obj).then(res => {
          if (res) {
            this.orgInfo.Nurse.push(obj);
          }
        });
      },
      delNurse(data) {
        this.nur.delDialogVisible = true;
        this.nur.targetRow = data;
      },
      // 缺认删除护士
      confirmNusDel() {
        delMember(this.HospitalID, this.nur.targetRow.UserID).then(res => {
          if (res) {
            this.orgInfo.Nurse.forEach((item, index) => {
              if (item.UserID == this.nur.targetRow.UserID) {
                this.orgInfo.Nurse.splice(index, 1);
              }
            });
          }
        });
        this.nur.delDialogVisible = false;
      },
      modifyNurse(data) {
        this.nur.modifyDialogVisible = true;
        this.nur.targetRow = data;
        this.nur.modifyDialog = data;
      },
      confirmNurmodify() {
        modifyMember(this.nur.modifyDialog);
        this.nur.modifyDialogVisible = false;
      }
    },
    mounted() {
      let HospitalID = localStorage.getItem("HospitalID");
      this.HospitalID = HospitalID;
      getOrgDetails(HospitalID).then(res => {
        this.orgInfo = res;
        console.log(res);
        console.log(this.orgInfo);
      });
    }
  };