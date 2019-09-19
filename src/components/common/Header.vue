<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i class="el-icon-menu"></i>
    </div>
    <div class="logo">
      后台管理
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <!-- 消息中心 -->
        <!-- <div class="btn-bell">
                    <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
        </div>-->
        <!-- 用户头像 -->
        <!-- <div class="user-avator">
          <img :src="baseUrl + this.$store.state.user.headUrl" v-if="this.$store.state.user.headUrl">
					<img v-else src="../../assets/img/img.jpg" alt="">
        </div> -->
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{this.$store.state.user.username}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item command="showinfo">个人资料</el-dropdown-item>
            <el-dropdown-item command="showpass">修改密码</el-dropdown-item> -->
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <el-dialog title="修改密码" :visible.sync="isPwd" width="450px">
      <el-form ref="pwdForm" :model="pwd" :rules="rules" label-width="80px">
        <el-form-item label="旧密码" prop="oldpwd">
          <el-input v-model="pwd.oldpwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpwd">
          <el-input v-model="pwd.newpwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="respwd" :error="error">
          <el-input v-model="pwd.respwd" type="password" @blur="inputPwd()"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editPwd('pwdForm')">保存</el-button>
          <el-button @click="isPwd = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import bus from "../common/bus";
import http from "@/http/server/api";
import config from "@/config/index";
export default {
  data() {
    return {
      collapse: true,
      fullscreen: false,
      name: "admin",
      isShow: false,
      info: {},
      imageUrl: "",
      isPwd: false,
      pwd: {},
      baseUrl: config.baseUrl,
			upImgageUrl: config.baseUrl + "/api/upImage",
			error: '',
      rules: {
        oldpwd: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
        newpwd: [{ required: true, message: "请输入新密码", trigger: "blur" }],
        respwd: [{ required: true, message: "再次输入密码", trigger: "blur" }]
      }
    };
  },
  created() {
    // http.login({}).then(res => {
    //   this.info = res.data;
    // });
  },
  methods: {
		inputPwd() {
			if(this.pwd.newpwd !== this.pwd.respwd) {
				this.error = "两次密码不一致！";
			}
		},
    editPwd(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          const param = {
            newpwd: that.pwd.newpwd,
            oldpwd: that.pwd.oldpwd,
            id: that.info.id
          };
          that.edit(param);
        }
      });
    },
    editInfo() {
      this.edit(this.info);
    },
    edit(param) {
      http
        .saveUser(param)
        .then(res => {
          if (res.data.original && res.data.original.updated) {
            this.isShow = false;
            this.isPwd = false;
            // this.$store.state.user.headUrl = this.info.headUrl;
            this.$store.commit('setHeadUrl', this.info.headUrl);
            this.$message.success("修改成功！");
          } else if (res.data.original && res.data.original.find) {
            this.$message.error(res.data.original.message);
          } else if (res.data.original && res.data.original.updatepwd) {
						this.$message.success("修改成功！");
						this.clear();
          } else {
            this.$message.error("修改失败！");
          }
        })
        .catch(res => {});
    },
    clear() {
      this.$cookies.remove("username");
      this.$cookies.remove("user_id");
      this.$cookies.remove("city_id");
      this.$cookies.remove("level");
      this.$router.push("/login");
    },
    handleAvatarSuccess(res, file) {
      if (res.res) {
        this.info.headUrl =  res.url;
      } else {
        this.$message.error("上传失败！");
      }
    },
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == "loginout") {
        this.clear();
      } else if (command == "showinfo") {
        this.isShow = true;
      } else if (command == "showpass") {
        this.isPwd = true;
      }
    },
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse;
      bus.$emit("collapse", this.collapse);
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  },
  mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
  }
};
</script>
<style scoped>
.avatar-uploader {
  margin: 10px auto;
  width: 92px;
  height: 92px;
  overflow: hidden;
  border-radius: 50%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  width: 90px;
  height: 90px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 90px;
  height: 90px;
  line-height: 90px;
  text-align: center;
}
.avatar {
  width: 90px;
  height: 90px;
  display: block;
}

.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>

