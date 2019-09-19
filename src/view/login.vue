<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">族谱管理系统</div>
      <el-form :model="user" :rules="rules" ref="user" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="user.username" placeholder="用户名">
            <el-button slot="prepend" icon="el-icon-user-solid"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="密码"
            v-model="user.password"
            @keyup.enter.native="submitForm('user')"
          >
            <el-button slot="prepend" icon="el-icon-unlock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('user')">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: function() {
    return {
      user: {
        username: "admin",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapActions(["login"]),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login({}).then(res => {
            this.$message.success("登录成功！");
            this.$router.push("/");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../assets/images/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.4);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>